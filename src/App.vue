
<template>
  <div class="wrapper">
    <div
    class="background darken-pseudo"
    :style="`background-image: url('${appData.bg}');`"></div>
    <div class="content">
      <div class="menu-bar" v-if="auth">
        <menu-bar :isDisableMenu="local.isDisableMenu" @setMenuStatus="pageClick"></menu-bar>
      </div>
      <div class="page-content" @click="pageClick()">
        <transition name="fade">
          <router-view></router-view>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import {bus} from '@/main'
import MenuBar from '@Components/MenuBar'
import service from '@Services/app-service'
import config from '@Config/app.config'
import io from 'socket.io-client'
// import Helper from '@Libraries/common.helpers'
import { mapGetters, mapActions } from 'vuex'
export default {
  components: {
    MenuBar
  },
  name: 'app',
  data () {
    return {
      local: {
        isDisableMenu: false
        // isAuth: false,
        // showMenubar: true
      },
      server: {},
      socket: io(config.api.host)
    }
  },
  computed: {
    ...mapGetters([
      'appData',
      'userData',
      'auth'
    ])
  },
  created () {
    this.ROUTE_PERMISSIONS()
    bus.$on('logout', this.logout)
    bus.$on('emitSocket', this.emitSocket)
    // this.checkAuth()
    this.fetchData()
  },
  mounted () {
    this.getOrdering()
    this.socket.on('UPDATE_ORDERING', (data) => {
      this.getOrdering()
    })
    this.socket.on('UPDATE_ORDERING_STATUS', (data) => {
      bus.$emit('getOrderingStatus')
    })
  },
  methods: {
    ...mapActions([
      'setAppResource',
      'setUserData',
      'setAuth',
      'setOrderingNotification'
    ]),
    fetchData () {
      let resourceName = config.api.app.resource
      let queryString = this.BUILDPARAM([])
      service.getResource({resourceName, queryString})
        .then((res) => {
          if (res.status === 200) {
            this.server = res.data
            this.setUserData(this.server.userData)
            this.setAppResource(this.server.appResource)
          }
        })
        .catch(() => {
          this.GOTOPAGE('Login', '')
        })
    },
    // hasAuth () {
    //   let isAuth = Helper.GET_STORAGEITEM('isAuth')
    //   let token = Helper.GET_STORAGEITEM('app_token')
    //   if (!isAuth || !token) {
    //     this.setAuth(false)
    //     return false
    //     // this.GOTOPAGE('Login', '')
    //   }
    //   return true
    // },
    pageClick (tf = true) {
      this.local.isDisableMenu = tf
    },
    async getOrdering () {
      let resourceName = config.api.ordering.count
      let res = await service.getResource({resourceName, queryString: {}})
      // console.log(res.data)
      this.setOrderingNotification(res.data)
      bus.$emit('updateOrderingPage')
    },
    emitSocket (obj) {
      this.socket.emit(obj.key, obj.data)
    }
  },
  beforeDestroy () {
    bus.$off('logout', this.logout)
    bus.$off('emitSocket', this.emitSocket)
  },
  watch: {
    $route (to, from) {
      if (this.$route.name === 'Login') {
        if (this.HASAUTH()) {
          this.REDIRECTTOHOME()
        }
      } else {
        this.ROUTE_PERMISSIONS()
        if (this.HASAUTH()) {
          // this.getOrdering()
        }
      }
      this.pageClick()
    }
  }
}
</script>

<style lang="scss">
// $fa-font-path: "~font-awesome/fonts";
// @import '~font-awesome/scss/font-awesome.scss';
@import './Assets/Style/var.scss';
@import 'buefy/lib/buefy.css';
@import './Assets/Style/mystyles.scss';
@import './Assets/Style/app.scss';
// @import './Assets/Style/mystyles.scss';
.fade-enter-active, .fade-leave-active {
  transition-property: opacity;
  transition-duration: .15s;
}
.fade-enter-active {
  transition-delay: .15s;
}
.fade-enter, .fade-leave-active {
  opacity: 0
}
.background{
  position: fixed;
  top: 0; bottom: 0;
  left: 0;
  right: 0;
  background-size: cover;
  background-repeat: no-repeat;
}
.darken-pseudo:after {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: block;
  background-color: rgba(0, 0, 0, 0.6);
}
</style>
