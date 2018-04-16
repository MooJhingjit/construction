
<template>
  <div class="wrapper">
    <div class="background" style="
    background: url('../static/img/bg2.jpg');
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-size: cover;"></div>
    <div class="content">
      <div class="menu-bar" v-if="local.showMenubar">
        <menu-bar :isDisableMenu="local.isDisableMenu" @setMenuStatus="pageClick"></menu-bar>
      </div>
      <div class="page-content" @click="pageClick()">
        <transition name="fade">
          <router-view></router-view>
        </transition>
      </div>
    </div>
    <!-- <model-panel></model-panel> -->
  </div>
</template>

<script>
import MenuBar from '@Components/MenuBar'
import Helper from '@Libraries/common.helpers'
// import ModelPanel from '@Components/Model'
export default {
  components: {
    MenuBar
    // ModelPanel
  },
  name: 'app',
  data () {
    return {
      local: {
        isDisableMenu: false,
        isAuth: false,
        showMenubar: true
      }
    }
  },
  created () {
    // if (this.$route.name !== 'Login') {
    //   console.log(this.$route.name)
    //   this.local.showMenubar = true
    // } else {
    //   console.log(111)
    //   this.local.showMenubar = false
    // }
  },
  updated () {
    this.checkAuth()
  },
  methods: {
    checkAuth () {
      let token = Helper.GET_STORAGEITEM('app_token')
      if (!token) {
        this.GOTOPAGE('Login', '')
        return
      }
      this.local.isAuth = true
    },
    pageClick (tf = true) {
      this.local.isDisableMenu = tf
    }
  },
  watch: {
    $route (to, from) {
      this.pageClick()
    }
  }
}
</script>

<style lang="scss">
$fa-font-path: "~font-awesome/fonts";
@import '~font-awesome/scss/font-awesome.scss';
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
