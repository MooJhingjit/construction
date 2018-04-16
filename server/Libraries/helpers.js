// exports.verifyToken = (req, res, next) => {
//   const bearerHeader = req.headers['authorization'];
//   if(typeof bearerHeader !== 'undefined') {
//     const bearer = bearerHeader.split(' ');
//     const token = bearer[1];
//     req.token = token;
//     next();
//   } else {
//     res.status(403).send('Forbidden')
//   }
// }
const jwtDecode = require('jwt-decode')

module.exports.getUserAuth = (token) => {
  let bearer = token.split(' ');
  let decoded = jwtDecode(bearer[1]);
  return decoded.user
}
