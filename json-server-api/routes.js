const express = require('express');
const faker = require('faker');
const db = require('./db');
const jwt = require('jsonwebtoken');
const router = express.Router();

// router.post('/auth/validateToken', (req, res) => {
//   const token = req.body.token || '';
//   jwt.verify(token, SECRET_KEY, err => err ? res.status(400).send({ valid: !err }) : res.status(200).send({ valid: !err }));
// });

router.post('/auth', (req, res) => {
  const { email, password } = req.body;
  db.isAuthenticated(email, password).then(result => {
    if (result === false) res.status(401).json({ message : 'Incorrect email or password'});
    const access_token = db.createToken({ email, password });
    res.status(200).json({ token: access_token });
  });
});

router.post('/users', (req, res) => {
  const { name, email, password } = req.body;
  const imageUrl = 'https://almsaeedstudio.com/themes/AdminLTE/dist/img/user2-160x160.jpg';
  db.createUser(name, email, password, imageUrl)
    .then((result) => {
      if (result === false) return res.status(401).json({ message: 'User already registered' });
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
