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
function verifyToken(token) {
  return jwt.verify(token, SECRET_KEY, (err, decode) => decode !== undefined ? decode : err);
}
function isAuthenticated({ email, password }) {
  return userdb.users.findIndex(user => user.email === email && user.password === password) !== -1;
}
function isRegistered({ value }) {
  return userdb.users.findIndex(user => user.email === value || user.id === value) !== -1;
}
function getUser(email, password) {
  return userdb.users.find(user => user.email === email && user.password === password ? user : null);
}

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
  const user = getUser(email, password);
  user.access_token = access_token;
  res.status(200).json(user);
});

router.post('/auth/signup', (req, res) => {
  const { name, email, password } = req.body;
  if (!isRegistered(email) === false) {
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

router.patch('/auth/user', (req, res) => {
  const id = req.body.id;
  if (!isRegistered(id) === false) {
    const status = 401;
    const message = 'User not found';
    res.status(status).json({ status, message });
    return;
  }
  const access_token = createToken({id});
  const index = userdb.users.findIndex(k => k.id == id);
  userdb.users[index].name = req.body.name;
  userdb.users[index].email = req.body.email;
  userdb.users[index].password = req.body.password;
  userdb.users[index].imageUrl = req.body.imageUrl;
  fs.writeFileSync(__dirname + '/users.json', JSON.stringify(userdb, null, 2), 'utf8');
  const user = { ...req.body, access_token };
  res.status(200).json(user);
});

server.use(/^(?!\/api\/v1\/).*$/, (req, res, next) => {
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
