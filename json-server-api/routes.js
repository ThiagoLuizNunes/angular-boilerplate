const express = require('express');
const faker = require('faker');
const db = require('./db');
const jwt = require('jsonwebtoken');
const router = express.Router();

// router.post('/auth/validateToken', (req, res) => {
//   const token = req.body.token || '';
//   jwt.verify(token, SECRET_KEY, err => err ? res.status(400).send({ valid: !err }) : res.status(200).send({ valid: !err }));
// });

// router.post('/auth', (req, res) => {
//   const { email, password } = req.body;
//   if (db.isAuthenticated({ email, password }) === false) {
//     const status = 401;
//     const message = 'Incorrect email or password';
//     res.status(status).json({ status, message });
//     return;
//   }
//   const access_token = await db.createToken({ email, password });
//   const user = await db.getUser(email, password);
//   delete user.password;
//   delete user.licenses;
//   user.access_token = access_token;
//   res.status(200).json(user);
// });

router.post('/users', (req, res) => {
  const { name, email, password } = req.body;
  db.isRegistered(email).then(result => {
    if (result === false) return res.status(401).json({ message: 'User already registered' });
  });

  const imageUrl = 'https://almsaeedstudio.com/themes/AdminLTE/dist/img/user2-160x160.jpg';
  const id = db.createUser(name, email, password, imageUrl);

  id.then((result) => {
      const access_token = db.createToken({ result });
      res.status(200).json({ message: 'User registered with success', token: access_token });
    })
    .catch(err => {
      throw err;
    });
});

router.get('/dashboard/profile', (req, res) => {

});

module.exports = router;
