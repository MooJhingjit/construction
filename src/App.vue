
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
      <div class="menu-bar">
        <menu-bar :isDisableMenu="local.isDisableMenu" @setMenuStatus="pageClick"></menu-bar>
      </div>
      <!-- <nav class="breadcrumb" aria-label="breadcrumbs">
        <ul>
          <li><a href="#">Bulma</a></li>
          <li class="is-active"><a href="#" aria-current="page">Breadcrumb</a></li>
        </ul>
      </nav> -->
      <div class="page-content" @click="pageClick()">
        <transition name="fade">
          <router-view></router-view>
        </transition>
      </div>
    </div>
    <model-panel></model-panel>
  </div>
</template>

<script>
import MenuBar from '@Components/MenuBar'
import ModelPanel from '@Components/Model'
export default {
  components: {
    MenuBar,
    ModelPanel
  },
  name: 'app',
  data () {
    return {
      local: {
        isDisableMenu: false
      }
    }
  },
  updated () {
    // console.log('updated')
  },
  methods: {
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
