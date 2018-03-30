<template>
  <nav class="level is-mobile">
    <div class="level-item has-text-centered">
      <div>
        <p class="heading">
          <router-link to="/">หน้าหลัก</router-link>
        </p>
      <!-- <p class="title">3,456</p> -->
      </div>
    </div>
    <div class="level-item has-text-centered">
      <div>
        <p class="heading">
          <router-link to="/ordering">การสั่งซื้อ</router-link>
        </p>
      <!-- <p class="title">123</p> -->
      </div>
    </div>
    <div class="level-item has-text-centered">
      <div>
        <p class="heading">
          <router-link to="/foo">จ่ายค่างวด</router-link>
        </p>
      <!-- <p class="title">456K</p> -->
      </div>
    </div>
    <div class="level-item has-text-centered">
      <div>
        <p class="heading">
          <router-link to="/losing">ข้อมูลสูญเสีย</router-link>
        </p>
      <!-- <p class="title">789</p> -->
      </div>
    </div>
    <div class="level-item has-text-centered project-name on-mobile">
      <div>
        <p class="heading">
          โชคชนายุทธ
        </p>
      </div>
    </div>
    <div class="level-item has-text-centered options-panel on-mobile">
      <div class="block">
        <div class="icon-menu" @click="openSubMenu('options', 'profile')">
            <i class="fa fa-th" aria-hidden="true"></i>
        </div>
      </div>
      <div class="block">
        <figure class="image icon-menu" @click="openSubMenu('profile', 'options')">
          <img src="https://lh3.googleusercontent.com/-vI_vuMTGLhY/AAAAAAAAAAI/AAAAAAAAAAA/AGi4gfyN1ZDACBSjk7nyMF0Dbw9C3mRMHQ/s64-c-mo/photo.jpg">
        </figure>
      </div>
      <template><!--  submenu    -->
        <options-menu :isDisableMenu="isDisableMenu" :isActive="local.options.isActive"></options-menu>
        <profile-menu :isDisableMenu="isDisableMenu" :isActive="local.profile.isActive"></profile-menu>
      </template>
    </div>
  </nav>
</template>

<script>
import OptionsMenu from './options'
import ProfileMenu from './profile'
export default {
  components: {
    OptionsMenu,
    ProfileMenu
  },
  name: 'MenuBar',
  props: {
    isDisableMenu: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      local: {
        options: {
          isActive: false
        },
        profile: {
          isActive: false
        }
      }
    }
  },
  methods: {
    openSubMenu (type, otherType) {
      this.local[type].isActive = true
      this.local[otherType].isActive = false
      this.$emit('setMenuStatus', false)
    }
  },
  watch: {
    // isDisableMenu: function () {
    //   this.local.options.isActive = !this.isDisableMenu
    //   this.local.profile.isActive = !this.isDisableMenu
    // }
  }
}
</script>
