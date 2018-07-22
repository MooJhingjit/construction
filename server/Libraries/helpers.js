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
const moment = require('moment')

module.exports.getDate = (date, format = 'YYYY/MM/DD') => {
  if (!date) return null
  return moment(date).format(format)
}

module.exports.addDate = (date, day, format = 'YYYY/MM/DD') => {
  if (!date) return null
  return moment(date).add(day, 'day').format(format)
}

module.exports.getCurrentDate = (format = 'YYYY/MM/DD') => {
  return moment().format(format)
}

module.exports.getUserAuth = (token) => {
  let bearer = token.split(' ');
  let decoded = jwtDecode(bearer[1]);
  return decoded.user
}

module.exports.getCurrentTime = (type, dateInput = null) => {
  let res = ''
  let currentdate
  if (dateInput) {
    currentdate = new Date(dateInput)
  } else {
    currentdate = new Date()
  }
  let date = `${currentdate.getFullYear()}-${currentdate.getMonth()+1}-${currentdate.getDate()}`
  let time = `${currentdate.getHours()}:${currentdate.getMinutes()}:${currentdate.getSeconds()}`
  if (type === 'sql') {
    res = `${date} ${time}`
    // res = '2018-05-01 22:38:03'
  } else if (type === 'date') {
    res = `${date}`
  } else if (type === 'year') {
    res = currentdate.getFullYear()
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

module.exports.getDateDiff = (date1, date2) => {
  if (date1 === null || date2 === null) {
    return 0
  }
  let dateStart = moment(date1, 'YYYY/MM/DD')
  let dateEnd = moment(date2, 'YYYY/MM/DD')
  return dateEnd.diff(dateStart, 'days')
}