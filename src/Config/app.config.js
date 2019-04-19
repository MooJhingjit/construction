// let url = `${window.location.protocol}//${window.location.hostname}:3000/api`
// console.log(window.location)
// if (process.env.NODE_ENV === 'production') {
//   url = `${window.location.origin}/dashboard-api`
// }
const api = {
  'host': `${window.location.protocol}//${window.location.hostname}:3000`,
  // 'apiEndPoint': 'http://localhost:3000/api',
  'apiEndPoint': `${window.location.protocol}//${window.location.hostname}:3000/api`, // for production
  'app': {
    'resource': '/app/resource'
  },
  'login': '/login',
  'home': {
    'index': '/home'
  },
  'project': {
    'index': '/project',
    'type': '/project-type',
    'dropdown': '/project-selection',
    'checkDuplicate': '/project-duplicate'
  },
  'contract': {
    'index': '/contract',
    'time': '/contract-time',
    'status': '/contract-status',
    'period': '/contract-period',
    'progress': '/contract-progress',
    'dropdown': '/contract-selection',
    'reset': '/contract-reset',
    'checkDuplicate': '/contract-duplicate'
  },
  'workOrder': {
    'index': '/work-order'
  },
  'materialGroup': {
    'index': '/material-group',
    'dropdown': '/material-group-selection'
  },
  'users': {
    'index': '/users',
    'dropdown': '/users-dropdown'
  },
  'house': {
    'index': '/house',
    'dropdown': '/house-selection',
    'color': '/house/color',
    'colorSelection': '/house/color-selection'
  },
  'plan': {
    'dropdown': '/plan-selection' // in house
  },
  'store': {
    'index': '/store',
    'dropdown': '/store-selection'
  },
  'material': {
    'index': '/material',
    'dropdown': '/material-selection'
  },
  'ordering': {
    'home': '/ordering-home',
    'index': '/ordering',
    'fullOrder': '/full-ordering',
    'extra': '/ordering-extra',
    'forward': '/ordering-forward',
    'count': '/ordering-count'
  },
  'frontSite': {
    'index': '/front-site'
    // 'update': '/'
  },
  'losing': {
    'home': '/losing-home',
    'index': '/losing',
    'fullObj': '/losing-full'
  },
  'technician': {
    'index': '/technician',
    'dropdown': '/technician-selection'
  },
  'workGroup': {
    'index': '/work-group',
    'detail': '/work-group-detail',
    'dropdown': '/work-group-selection'
  },
  'workSheet': {
    'index': '/work-sheet'
  },
  'workSheetDetail': {
    'index': '/work-sheet-detail'
  },
  'workSheetApproval': {
    'index': '/work-sheet/approval'
  },
  'payingPeriod': {
    'home': '/paying-period',
    'summary': '/paying-period/summary'
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
    extra: 'พิเศษ',
    delete: 'ลบข้อมูล'
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
    {key: 'B4PW1', name: 'B4PW-1'},
    {key: 'B4PW2', name: 'B4PW-2'},
    {key: 'B4PW3', name: 'B4PW-3'},
    {key: 'B4PW4', name: 'B4PW-4'},
    {key: 'B21', name: 'B2-1'},
    {key: 'B22', name: 'B2-2'},
    {key: 'B23', name: 'B2-2'}
  ],
  userPermission: [
    {key: 'admin', name: 'ผู้ดูแลระบบ', allow: '*'},
    {key: 'purchasing', name: 'จัดซื้อ', allow: '*'},
    {key: 'technician', name: 'หัวหน้างาน', allow: ['FrontSite', 'FrontSiteUpdate', 'Profile', 'FrontSiteVerify']}
  ],
  technicianJobType: [
    {key: 1, name: 'งานระบบไฟฟ้า'},
    {key: 2, name: 'งานระบบประปาและสุขาภิบาล'},
    {key: 3, name: 'งานเหล็กโครงหลังคา+งานเหล็กทั่วไป'},
    {key: 4, name: 'งานติดตั้งเชิงชาย,ผนังประดับ,วงกบประตูหน้าต่าง'},
    {key: 5, name: 'งานก่ออิฐฉาบปูน'},
    {key: 6, name: 'งานกระเบื้อง+หินแกรนิต+หินเทียม'},
    {key: 7, name: 'งานรั้ว+งานปูนทั่วไป'},
    {key: 8, name: 'งานปูนทั่วไป'},
    {key: 9, name: 'งานเบ็ตเดล็ตทั่วไป'},
    {key: 10, name: 'งานสี'},
    {key: 11, name: 'งานฝ้าเพดาน'},
    {key: 12, name: 'งานโครงสร้างทั่วไป'},
    {key: 13, name: 'งานทรายล้าง+หินขัด'},
    {key: 14, name: 'งานทรายล้าง'},
    {key: 15, name: 'งานปาร์เก้'},
    {key: 16, name: 'งานฝ้า'},
    {key: 17, name: 'งานโครงสร้าง'},
    {key: 18, name: 'งานกดเสาเข็ม'},
    {key: 19, name: 'งานโครงสร้าง+ก่อฉาบ'},
    {key: 20, name: 'งานทั่วไป'},
    {key: 21, name: 'งานเหล็กรั้ว'}
  ],
  workSheetStatus: [
    {key: '0', name: 'รอการบันทึก', class: 'is-white'},
    {key: '1', name: 'รอการตรวจสอบ', class: 'is-light'},
    {key: '2', name: 'ไม่ผ่านการตรวจสอบ', class: 'is-warning'},
    {key: '3', name: 'รออนุมัติจ่าย', class: 'is-link'},
    {key: '4', name: 'ไม่ผ่านการอนุมัติ', class: 'is-danger'},
    {key: '5', name: 'จ่ายเงินแล้ว', class: 'is-success'}
  ]
}

export default {
  api,
  variable
}

// user position
// loseing data of ordering
