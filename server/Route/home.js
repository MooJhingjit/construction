const express = require('express');
const router = express.Router();

// const jwt = require('jsonwebtoken');

router.get('/home/index', function(req, res, next){
  res.send('hello worddld');
});

module.exports = router;

// app.get('/api/access', verifyToken, (req, res) => {
//   jwt.verify(req.token, 'secretkey', (err, authData) => {
//     if (err) {
//       res.status(403).send('Forbidden')
//     } else {
//       res.json({
//         message: 'Post created...',
//         authData
//       })
//     }
//   })
// })

// app.post('/api/login', (req, res) => {
//   const user = {
//     id: 2,
//     username: 'Moo2',
//     email: 'moo@gmail.com2'
//   };

//   jwt.sign({user}, 'secretkey', (err, token) => {
//     res.json({token})
//   })
// })