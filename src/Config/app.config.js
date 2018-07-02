const api = {
  'apiEndPoint': 'http://localhost:3000/api',
  // 'apiEndPoint': window.location.origin + '/api',
  'app': {
    'resource': '/app/resource'
  },
  'login': '/login',
  'home': {
    'index': '/home'
  },
  'project': {
    'index': '/project',
    'dropdown': '/project-selection'
  },
  'contract': {
    'index': '/contract',
    'time': '/contract-time',
    'status': '/contract-status',
    'period': '/contract-period',
    'progress': '/contract-progress',
    'dropdown': '/contract-selection'
  },
  'workOrder': {
    'index': '/work-order'
  },
  'materialGroup': {
    'index': '/material-group',
    'dropdown': '/material-group-selection'
  },
  'users': {
    'index': '/users'
  },
  'house': {
    'index': '/house',
    'dropdown': '/house-selection'
  },
  'plan': {
    'dropdown': '/plan-selection' // in house
  },
  'store': {
    'index': '/store'
  },
  'material': {
    'index': '/material',
    'dropdown': '/material-selection'
  },
  'ordering': {
    'home': '/ordering-home',
    'index': '/ordering',
    'fullOrder': '/full-ordering',
    'extra': '/ordering-extra'
  }
}

const variable = {
  projectType: [
    {key: 1, name: 'มัณฑนา'},
    {key: 2, name: 'นันทวัน'}
  ],
  status: {
    wait: 'รออนุมัติ',
    ip: 'กำลังดำเนินงาน',
    done: 'เสร็จสิ้น',
    confirmed: 'รอสินค้า',
    received: 'รับของแล้ว',
    normal: 'ปกติ',
    extra: 'พิเศษ'
  },
  workingStatus: {
    wait: 'รอ',
    ip: 'ดำเนินงาน',
    done: 'เสร็จสิ้น'
  },
  times: 10,
  leftRight: [
    {key: 'none', name: 'ไม่ระบุ'},
    {key: 'left', name: 'ซ้าย'},
    {key: 'right', name: 'ขวา'}
  ],
  housecolor: [
    {key: 'B3PW1', name: 'B3PW-1'},
    {key: 'B3PW2', name: 'B3PW-2'},
    {key: 'B3PW3', name: 'B3PW-3'},
    {key: 'B3PW4', name: 'B3PW-4'},
    {key: 'B21', name: 'B2-1'},
    {key: 'B22', name: 'B2-2'},
    {key: 'B23', name: 'B2-2'}
  ]
}

export default {
  api,
  variable
}
