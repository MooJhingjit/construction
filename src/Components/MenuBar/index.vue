<template>
  <nav class="level is-mobile">
    <div class="level-item has-text-centered">
      <div>
        <p class="heading" @click="GOTOPAGE('Home', '')">
          <!-- <router-link to="./">หน้าหลัก</router-link> -->
          หน้าหลัก
        </p>
      <!-- <p class="title">3,456</p> -->
      </div>
    </div>
    <div class="level-item has-text-centered">
      <div>
        <p class="heading" @click="GOTOPAGE('Ordering', '')">
          <!-- <router-link to="./ordering">การสั่งซื้อ</router-link> -->
          การสั่งซื้อ
          <span class="tag is-warning is-rounded"
            v-if="normalOrdering"
          >{{normalOrdering}}</span>
          <span class="tag is-danger is-rounded"
            v-if="extraOrdering"
          >{{extraOrdering}}</span>
        </p>
      <!-- <p class="title">123</p> -->
      </div>
    </div>
    <div class="level-item has-text-centered">
      <div>
        <p class="heading">
          <!-- <router-link to="./foo">จ่ายค่างวด</router-link> -->
          จ่ายค่างวด
        </p>
      <!-- <p class="title">456K</p> -->
      </div>
    </div>
    <div class="level-item has-text-centered">
      <div>
        <p class="heading" @click="GOTOPAGE('Losing', '')">
          <!-- <router-link to="./losing">ข้อมูลสูญเสีย</router-link> -->
          ข้อมูลสูญเสีย
        </p>
      <!-- <p class="title">789</p> -->
      </div>
    </div>
    <div class="level-item has-text-centered project-name on-mobile">
      <div>
        <p class="heading"  @click="GOTOPAGE('Home', '')">
          โชคชนายุทธ
        </p>
      </div>
    </div>
    <div class="level-item has-text-centered options-panel on-mobile">
      <div class="block alert">
        <i  v-if="normalOrdering || extraOrdering" class="fa fa-exclamation-circle" aria-hidden="true"></i>
        <div class="icon-menu" @click="openSubMenu('options', 'profile')">
            <i class="fa fa-th" aria-hidden="true"></i>
        </div>
      </div>
      <div class="block">
        <figure class="image icon-menu" @click="openSubMenu('profile', 'options')">
          <img src="../../../static/img/avatar2.png">
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
import { mapGetters } from 'vuex'
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
  computed: {
    normalOrdering () {
      if (this.orderingData !== null) {
        return this.orderingData.normal
      }
    },
    extraOrdering () {
      if (this.orderingData !== null) {
        return this.orderingData.extra
      }
    },
    ...mapGetters([
      'orderingData'
    ])
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

<style lang="scss" scoped>
.tag.is-warning{
  background-color: #f7894e !important;
  color: #fff;
}
.tag.is-danger{
  background-color: #fa6854 !important;
  color: #fff;
}
</style>
