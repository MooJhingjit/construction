<template>
    <div :class="{'sub-menu-panel profile-block  box-shadow-panel': true, 'active': (isActive && !isDisableMenu) }">
        <div class="container-block">
            <!-- <div class="profile-head container-block">
                <div class="prifile-img block">
                    <img src="../../../static/img/avatar2.png">
                </div>
            </div> -->
            <div class="profile-body container-block block">
                <div class="name">Pokkron Jhingjit</div>
                <div class="options container-block">
                    <div class="block" @click="GOTOPAGE('Profile', 'xxxxx')"><i class="fa fa-user-circle-o" aria-hidden="true"></i> ข้อมูลผู้ใช้</div>
                    <div class="block" @click="GOTOPAGE('Login', 'xxxxx')"><i class="fa fa-power-off" aria-hidden="true"></i> ออกจากระบบ</div>
                    <!-- <div class="block"><router-link to="/login"><i class="fa fa-power-off" aria-hidden="true"></i> ออกจากระบบ</router-link></div> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  props: {
    isActive: {
      type: Boolean,
      required: true
    },
    isDisableMenu: {
      type: Boolean,
      required: true
    }
  },
  components: {
  },
  name: 'ProfileSubmenu',
  data () {
    return {
      property: 'Blank'
    }
  },
  computed: {
    // propertyComputed() {
    //   console.log('I change when this.property changes.')
    //   return this.property
    // }
  },
  created () {
    // console.log('created')
    // this.property = 'Example property update.'
    // console.log('propertyComputed will update, as this.property is now reactive.')
  },
  mounted () {
    // console.log('mounted')
    // console.log(this.$el.textContent) // I'm text inside the component.
  },
  updated () {
    // console.log('updated')
    // Fired every second, should always be true
    // console.log(+this.$refs['dom-element'].textContent === this.counter)
  },
  destroyed () {
    // console.log('destroyed')
    // console.log(this) // There's practically nothing here!
    // MyCreepyAnalyticsService.informService('Component destroyed. All assets move in on target on my mark.')
  },
  methods: {
    //   getClass (defaultClass) {
    //   return [
    //     defaultClass,
    //     'active': true
    //   ]
    // }
  }
}
</script>

<style lang="scss">
</style>
