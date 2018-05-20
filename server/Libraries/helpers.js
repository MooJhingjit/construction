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

module.exports.getCurrentTime = (type) => {
  let res = ''
  let currentdate = new Date()
  if (type === 'sql') {
    let date = `${currentdate.getFullYear()}-${currentdate.getMonth()+1}-${currentdate.getDate()}`
    let time = `${currentdate.getHours()}:${currentdate.getMinutes()}:${currentdate.getSeconds()}`
    res = `${date} ${time}`
    // res = '2018-05-01 22:38:03'
  }
  return res
}

module.exports.prepareDataTable = (result, total, config) => {
  let data = {
    total: total[0].count,
    header: config.header,
    body: ''
  }
  data.body = result.map(element => {
    let id = element.id
    let data = {}
    return {
      key: element.id,
      show: config.show,
      items: element
    }
  });
  // console.log(data)
  return data
}

module.exports.getTableoffset = (limit, currentPage) => {
  return ((currentPage - 1) * limit)
}