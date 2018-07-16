// import { mapGetters } from 'vuex'
// import Hepler from '@Libraries/common.helpers'
// import Config from '@AppConfig/app.config'
// import moment from 'moment'
// import swal from 'sweetalert'
import config from '@Config/app.config'
import moment from 'moment'
export default {
  computed: {
    PROJECT_TYPE () {
      return config.variable.projectType
    },
    LEFTRIGHT () {
      return config.variable.leftRight
    },
    HOUSECOLOR () {
      return config.variable.housecolor
    }
  },
  filters: {
    // CAPITALIZE: function (value) {
    //   if (!value) return ''
    //   value = value.toString()
    //   return value.charAt(0).toUpperCase() + value.slice(1)
    // },
    // DATEFORMAT: function (date) {
    //   return moment(date).format('DD/MM/YYYY')
    // },
    // SUBSTR: function (str, digit = 20) {
    //   return str.substring(0, digit)
    // }
  },
  methods: {
    GET_DATE (date) { // this for buefy
      if (date === undefined || date === null) {
        return null
      }
      return new Date(date)
    },
    GET_DATEDIFF (dateStart, dateEnd) { // this for buefy
      // dateStart = new moment(dateStart)
      // dateEnd = new moment(dateEnd)
      var startDate = moment(dateStart, 'YYYY/MM/DD')
      var endDate = moment(dateEnd, 'YYYY/MM/DD')
      return endDate.diff(startDate, 'days')
      // let duration = moment.duration(dateStart.diff(dateEnd))
      // return duration.asDays()
    },
    NUMBERWITHCOMMAS (number, digit = 0) {
      return parseFloat(number).toFixed(digit).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
    GET_WORKSTATUS (statusCode) {
      return config.variable.status[statusCode]
    },
    GET_PROJECT_TYPE (key) {
      return config.variable.projectType.filter(item => {
        return item.key === key
      })
    },
    GET_STATUSNAME (key) {
      return config.variable.status[key]
    },
    GET_CURRENTDATE (format = 'YYYY-MM-DD') {
      return moment().format(format)
    },
    SET_DATEFORMAT (dateInput) {
      if (!dateInput) return null
      let date = new Date(dateInput)
      return moment(date).format('YYYY/MM/DD')
    },
    GOTOPAGE (pageName, key = '', queryString = []) {
      this.$router.push({
        name: pageName,
        params: {key: key}
      })
    },
    BUILDPARAM (params = []) {
      let queryString = ''
      if (Object.keys(params).length) {
        Object.keys(params).forEach(function (key) {
          queryString += key + '=' + params[key] + '&'
        })
        return queryString.slice(0, -1)
      }
    },
    NOTIFY (type) {
      switch (type) {
        case 'success':
          this.$snackbar.open({
            duration: 5000,
            message: 'ทำรายการเสร็จสิ้น',
            type: 'is-primary',
            position: 'is-bottom-left',
            actionText: '',
            queue: false,
            onAction: () => {
              // this.$toast.open({
              //     message: 'Action pressed',
              //     queue: false
              // })
            }
          })
          break
        case 'error':
          this.$snackbar.open({
            duration: 5000,
            message: 'เกิดข้อผิดพลาด โปรดทำรายการอีกครั้ง',
            type: 'is-danger',
            position: 'is-bottom-right',
            actionText: '',
            queue: false,
            onAction: () => {
              // this.$toast.open({
              //     message: 'Action pressed',
              //     queue: false
              // })
            }
          })
          break
      }
    },
    REDIRECTTOHOME () { // <---------------
      // GET USER TYPE FRIST
      let userType = 'admin'
      switch(userType) {
        case 'admin':
        case 'purchasing':
          this.GOTOPAGE('Home', '')
          break
        case 'technician':
          this.GOTOPAGE('FrontSite', '')
          break
        default:
        this.GOTOPAGE('Login', '')
      }
    },
    CHECK_PERMISSIONS () { // <---------------
      let routeName = this.$route.name
      let isLogin = (routeName === 'Login') ? true : false
      let userType = 'admin'
      let allow = config.variable.userPermission[userType].allow // result can be string => * and array => ['route name']
      if (allow === '*') {
        return true
      } else if (allow.indexOf(routeName) || isLogin) {
        return true
      } else {
        this.REDIRECTTOHOME()
        return false
      }
    }
  }
}
