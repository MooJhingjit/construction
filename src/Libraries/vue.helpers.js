// import { mapGetters } from 'vuex'
// import Hepler from '@Libraries/common.helpers'
// import Config from '@AppConfig/app.config'
// import moment from 'moment'
// import swal from 'sweetalert'
export default {
  computed: {
    // ...mapGetters([
    //   'appData'
    // ])
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
    // NUMBERWITHCOMMAS (number, digit = 0) {
    //   // return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    //   return parseFloat(number).toFixed(digit).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    // },
    GOTOPAGE (pageName, key = '') {
      this.$router.push({
        name: pageName,
        params: {key: key}
      })
    }
    // BUILDPARAM (params = []) {
    //   let queryString = ''
    //   // console.log(params)
    //   // console.log()
    //   // console.log('-----------------')
    //   if (Object.keys(params).length) {
    //     Object.keys(params).forEach(function (key) {
    //       queryString += key + '=' + params[key] + '&'
    //     })
    //     return queryString.slice(0, -1)
    //   }
    //   return
    // },
    // GETALERTBOX (type, config) {
    //   if (type === 'confirm') {
    //     // return true
    //     return swal({
    //       title: config.title,
    //       text: config.text,
    //       icon: config.icon,
    //       buttons: true
    //     })
    //     .then((willDelete) => {
    //       // return willDelete
    //       return willDelete
    //     })
    //   }
    // },
    // CHECK_MULTILANG () {
    //   let isMultiLang = true
    //   if (!this.appData.isMultilanguage) {
    //     isMultiLang = false
    //   }
    //   return isMultiLang
    // }
  }
}
