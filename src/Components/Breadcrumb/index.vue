<template>
  <nav class="breadcrumb" aria-label="breadcrumbs">
    <ul>
      <li :class="{'active': page.active}" :key="key" v-for="(page, key) in dataObj.items" >
        <i v-if="page.icon" aria-hidden="true" :class="page.icon"></i>
        <a @click="goToPage(page.route, page.key)">{{page.name}}</a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  components: {
  },
  name: 'Breadcrumb',
  props: {
    dataObj: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      // local: {
      //   options: {
      //     isActive: false
      //   },
      //   profile: {
      //     isActive: false
      //   }
      // }
    }
  },
  methods: {
    goToPage (routeName, key = '') {
      if (routeName === '') return
      this.GOTOPAGE(routeName, key)
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
