
<template>
  <div class="wrapper">
    <div class="background" style="
    background: url('https://www.wallpaperup.com/uploads/wallpapers/2016/11/30/1059029/1d1ae3165389ed9dbbcc03b551a16422-700.jpg');
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-size: cover;"></div>
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
      server: {}
    }
  },
  computed: {
    ...mapGetters([
      'userData',
      'auth'
    ])
  },
  created () {
    this.ROUTE_PERMISSIONS()
    bus.$on('setNotification', this.setNotification)
    bus.$on('logout', this.logout)
    // this.checkAuth()
    this.fetchData()
  },
  updated () {
    // this.checkAuth()
  },
  methods: {
    ...mapActions([
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
            this.setNotification({type: 'ordering', value: this.server.orderingData})
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
    setNotification (obj) {
      switch (obj.type) {
        case 'ordering':
          this.setOrderingNotification(obj.value)
          break
      }
    }
  },
  beforeDestroy () {
    bus.$off('setNotification', this.setNotification)
    bus.$off('logout', this.logout)
  },
  watch: {
    $route (to, from) {
      if (this.$route.name === 'Login') {
        if (this.HASAUTH()) {
          this.REDIRECTTOHOME()
        }
      } else {
        this.ROUTE_PERMISSIONS()
      }
      this.pageClick()
    }
  }
}
</script>

<style lang="scss">
$fa-font-path: "~font-awesome/fonts";
@import '~font-awesome/scss/font-awesome.scss';
@import './Assets/Style/var.scss';
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
</style>
