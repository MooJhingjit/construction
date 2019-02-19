<template>
  <nav class="level is-mobile nav-menu">
    <div class="level-item has-text-centered">
      <router-link :to="{ name: 'Home'}">หน้าหลัก</router-link>
    </div>
    <div class="level-item has-text-centered" v-if="IS_ADMIN() || IS_PURCHASING()">
      <router-link :to="{ name: 'Ordering'}">การสั่งซื้อ
        <div id="meta" class="field is-grouped is-grouped-multiline">
          <div class="control" :key="index" v-for="(item, index) in orderingData">
            <div class="tags has-addons">
              <span class="tag">{{item.projectTypeName}}</span>
              <span class="tag is-success" v-if="item.normal" title="ปกติ">{{item.normal}}</span>
              <span class="tag is-warning" v-if="item.extra" title="พิเศษ">{{item.extra}}</span>
            </div>
          </div>
        </div>
      </router-link>
    </div>
    <div class="level-item has-text-centered" v-if="IS_ADMIN() || IS_PURCHASING()">
      <router-link :to="{ name: 'PayingPeriod'}">จ่ายค่างวด</router-link>
    </div>
    <div class="level-item has-text-centered" v-if="IS_ADMIN() || IS_PURCHASING()">
      <router-link :to="{ name: 'Losing'}">ข้อมูลสูญเสีย</router-link>
    </div>
    <div class="level-item has-text-centered project-name on-mobile">
      <router-link :to="{ name: 'Home'}">โชคชนายุทธ</router-link>
    </div>
    <div class="level-item has-text-centered options-panel on-mobile">
      <div class="block alert" v-if="IS_ADMIN() || IS_PURCHASING()">
        <i  v-if="normalOrdering || extraOrdering" class="fa fa-exclamation-circle" aria-hidden="true"></i>
        <div class="icon-menu" @click="openSubMenu('options', 'profile')">
            <i class="fa fa-th" aria-hidden="true"></i>
        </div>
      </div>
      <div class="block">
        <figure class="image icon-menu" @click="openSubMenu('profile', 'options')">
          <i class="fa fa-user" aria-hidden="true"></i>
        </figure>
      </div>
      <template>
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
.nav-menu{
  font-size: 1.3em;
  a {
    color: rgba(255, 255, 255, 0.6);
    &:hover{
      color: #fff;
    }
  }
  a.router-link-exact-active {
    color: #fff;
  }
}
.tag.is-warning{
  background-color: #f7894e !important;
  color: #fff;
}
.tag.is-danger{
  background-color: #fa6854 !important;
  color: #fff;
}
</style>
