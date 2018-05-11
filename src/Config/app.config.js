const api = {
  'apiEndPoint': 'http://localhost:3000/api',
  // 'apiEndPoint': window.location.origin + '/api',
  'app': {
    'resource': '/app/resource'
  },
  'login': '/login',
  'home': {
    'index': '/home/index'
  },
  'project': {
    'index': '/project'
  },
  'contract': {
    'index': '/contract'
  },
  'users': {
    'index': '/users'
  }
}

const variable = {
  projectType: [
    {key: '1', name: 'มัณฑนา'},
    {key: '2', name: 'นันทวัน'}
  ]
}

export default {
  api,
  variable
}
