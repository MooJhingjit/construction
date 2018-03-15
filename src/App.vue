
<template>
  <div class="wrapper">
    <div class="opa"></div>
    <div class="content">
      <div class="menu-bar">
        <menu-bar></menu-bar>
      </div>
      <div class="page">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import MenuBar from '@Components/MenuBar'
export default {
  components: {
    MenuBar
  },
  name: 'app'
}
</script>

<style lang="scss">
@import './Assets/Style/app.scss';
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
