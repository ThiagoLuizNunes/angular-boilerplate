const fs = require('fs');
const faker = require('faker');
const bodyParser = require('body-parser');
const express = require('express');
const jwt = require('jsonwebtoken');
const morgan = require('morgan');
const cors = require('./cors');

const server = express();
const router = express.Router();
const userdb = JSON.parse(fs.readFileSync(__dirname + '/users.json', 'UTF-8'));

const SECRET_KEY = '123456789';
const expiresIn = '1h';

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(cors);
server.use(morgan('tiny'));
server.use('/api/v1', router);

function createToken(payload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

// Verify the token
function verifyToken(token) {
  return jwt.verify(token, SECRET_KEY, (err, decode) => decode !== undefined ? decode : err);
}

// Check if the user exists in database
function isAuthenticated({ email, password }) {
  return userdb.users.findIndex(user => user.email === email && user.password === password) !== -1;
}

function isRegistered({ email }) {
  return userdb.users.findIndex(user => user.email === email) !== -1;
}

function getUser(email, password ) {
  return userdb.users.find(user => user.email === email && user.password === password ? user : null);
}

router.get('/auth/test', (req, res) => {
  console.log(req.headers)
  res.status(200).send(userdb);
});

router.post('/auth/validateToken', (req, res) => {
  const token = req.body.token || '';
  jwt.verify(token, SECRET_KEY, err => res.status(200).send({ valid: !err }));
});

router.post('/auth/login', (req, res) => {
  const { email, password } = req.body;
  if (isAuthenticated({ email, password }) === false) {
    const status = 401;
    const message = 'Incorrect email or password';
    res.status(status).json({ status, message });
    return;
  }

  const access_token = createToken({ email, password });
  const { name, imageUrl } = getUser(email, password);

  res.status(200).json({
    name: name,
    email: email,
    imageUrl: imageUrl,
    access_token: access_token
  });
});

router.post('/auth/signup', (req, res) => {
  const { name, email, password } = req.body;
  if (!isRegistered({ email, password }) === false) {
    const status = 401;
    const message = 'User already registered';
    res.status(status).json({ status, message });
    return;
  }

  userdb.users.push({
    id: faker.random.number(),
    name: name,
    email: email,
    password: password,
    imageUrl: 'https://almsaeedstudio.com/themes/AdminLTE/dist/img/user2-160x160.jpg'
  });

  fs.writeFileSync(__dirname + '/users.json', JSON.stringify(userdb, null, 2), 'utf8')
  const access_token = createToken({ email, password });
  res.status(200).json({ access_token });
});

server.use(/^(?!\/auth).*$/, (req, res, next) => {
  if (req.headers.authorization === undefined || req.headers.authorization.split(' ')[0] !== 'Bearer') {
    const status = 401;
    const message = 'Bad authorization header';
    res.status(status).json({ status, message });
    return;
  }
  try {
    verifyToken(req.headers.authorization.split(' ')[1]);
    next();
  } catch (err) {
    const status = 401;
    const message = 'Error: access_token is not valid';
    res.status(status).json({ status, message });
  }
});

server.listen(3000, () => {
  console.log('Run Auth API Server');
});
