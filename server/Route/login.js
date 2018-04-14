const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
router.post('/login', function(req, res, next){
  const user = {
    id: 1,
    username: 'moo',
    email: 'moo@gmail.com'
  };
  jwt.sign({user}, 'secretkey', (err, token) => {
    res.status(200).json({token})
  })
});

module.exports = router;