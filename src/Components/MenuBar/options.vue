<template>
    <div :class="{'sub-menu-panel box-shadow-panel options-block': true, 'active': (isActive && !isDisableMenu) }">
        <div class="container-block">
           <div class="block container-block is-mobile-only" @click="goToPage('Home')">
              <div class="icon"><i class="fa fa-home" aria-hidden="true"></i></div>
              <div class="desc">หน้าหลัก</div>
            </div>
            <div class="block container-block is-mobile-only" @click="goToPage('Ordering')">
              <div class="icon"><i class="fa fa-object-group" aria-hidden="true"></i></div>
              <div class="desc">สั่งซื้อ</div>
              <span class="tag is-danger is-rounded">1</span>
            </div>
            <div class="block container-block is-mobile-only" @click="goToPage('xxxxxx')">
              <div class="icon"><i class="fa fa-th-large" aria-hidden="true"></i></div>
              <div class="desc">จ่ายค่างวด</div>
            </div>
              <div class="block container-block is-mobile-only" @click="goToPage('Authority', 'all')">
              <div class="icon"><i class="fa fa-check-square-o" aria-hidden="true"></i></div>
              <div class="desc">ข้อมูลสูญเสีย</div>
            </div>
            <div class="block container-block" @click="GOTOPAGE('House')">
              <div class="icon"><i class="fa fa-home" aria-hidden="true"></i></div>
              <div class="desc">แบบบ้าน</div>
            </div>
            <div class="block container-block" @click="goToPage('Workorder', '')">
              <div class="icon"><i class="fa fa-tasks" aria-hidden="true"></i></div>
              <div class="desc">ลำดับการทำงาน</div>
            </div>
            <div class="block container-block" @click="GOTOPAGE('Store')">
              <div class="icon"><i class="fa fa-th-large" aria-hidden="true"></i></div>
              <div class="desc">ร้านค้า</div>
            </div>
            <div class="block container-block" @click="GOTOPAGE('OrderingGroup')">
              <div class="icon"><i class="fa fa-th-large" aria-hidden="true"></i></div>
              <div class="desc">กลุ่มวัสดุ</div>
            </div>
            <!-- <div class="block container-block" @click="goToPage('Authority', 'all')">
              <div class="icon"><i class="fa fa-check-square-o" aria-hidden="true"></i></div>
              <div class="desc">สิทธิ์การใช้งาน</div>
            </div> -->
            <div class="block container-block" @click="goToPage('Users', '')">
              <div class="icon"><i class="fa fa-address-book-o" aria-hidden="true"></i></div>
              <div class="desc">ผู้ใช้งาน</div>
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
  name: 'OptionsSubmenu',
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
    goToPage (route, key = {}) {
      this.GOTOPAGE(route, key)
    }
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
