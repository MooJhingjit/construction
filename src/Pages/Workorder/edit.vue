<template>
    <section :class="['section', local.template.class]">
      <breadcrumb-bar :dataObj="local.pageObj"></breadcrumb-bar>
      <div class="container-block">
        <div class="detail-panel">
          <template v-if="true">
            <div class="container-block detail-block">
              <div class="c-body">
                <div class="items">
                  <div class="item">
                    <div class="item-header container-block">
                      <div class="time block">งวดที่ 1</div>
                      <div class="order-name container-block block">
                        <span class="name">รายการสั่งซื้อก่อนหน้า </span>
                        <div class="control has-icons-right">
                          <input class="input" type="text" placeholder="">
                          <span class="icon is-right">
                            <i class="fa fa-search" aria-hidden="true"></i>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div class="item-body">
                      <div class="name">รายละเอียดงาน</div>
                      <div class="inputs">
                        <div class="control container-block">
                          <input class="input block" type="text" >
                          <button class="button block is-danger"><i class="fa fa-minus" aria-hidden="true"></i></button>
                        </div>
                        <div class="control container-block">
                          <input class="input block" type="text" >
                          <button class="button block is-danger"><i class="fa fa-minus" aria-hidden="true"></i></button>
                        </div>
                        <div class="control container-block">
                          <input class="input block" type="text" >
                          <button class="button block is-danger"><i class="fa fa-minus" aria-hidden="true"></i></button>
                        </div>
                        <div class="control container-block">
                          <input class="input block" type="text" >
                          <button class="button block is-danger"><i class="fa fa-minus" aria-hidden="true"></i></button>
                        </div>
                        <div class="control container-block">
                          <input class="input block" type="text" >
                          <button class="button block is-danger"><i class="fa fa-minus" aria-hidden="true"></i></button>
                        </div>
                      </div>
                    </div>
                    <div class="item-footer container-block">
                      <div class="container-block block right">
                        <button class="button"><i class="fa fa-minus" aria-hidden="true"></i></button>
                        <button class="button"><i class="fa fa-plus" aria-hidden="true"></i></button>
                      </div>
                       <div class="container-block block action">
                        <button class="button">บันทึกข้อมูล</button>
                        <button class="button">ลบงวดนี้</button>
                        <button class="button">เพิ่มงวดถัดไป</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
          <template v-else>
            <template slot="detail">
              <div class="container-block empty-panel">
                <div class="block container-block">
                  <div class="block no-data">
                      ไม่พบข้อมูลที่ต้องการ
                  </div>
                  <div class="block select-data">
                    <i class="fa fa-hand-o-left" aria-hidden="true"></i>
                    <span>เลือกข้อมูลทางซ้ายมือเพื่อแสดง</span>
                  </div>
                  <div class="block or">
                    หรือ
                  </div>
                  <div class="block add-data">
                    <button class="button">เพิ่มข้อมูลใหม่</button>
                  </div>
                </div>
              </div>
            </template>
          </template>
        </div>
      </div>
    </section>
</template>

<script>
import breadcrumbBar from '@Components/Breadcrumb'
export default {
  props: {
    // templateName: {
    //   type: String,
    //   required: true
    // }
  },
  components: {
    breadcrumbBar
  },
  name: 'EditWorkOrderPage',
  data () {
    return {
      local: {
        pageObj: {
          items: [
            {name: 'ลำดับการทำงาน', route: 'Workorder', key: '', active: false, icon: 'fa fa-address-book-o'},
            {name: 'แก้ไข', route: 'EditWorkorder', key: 'xxxx', active: true, icon: ''}
          ]
        },
        template: {
          class: 'edit-work-order-page'
        }
      }
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
  beforeMount () {
    // console.log('beforeMount')
    // console.log(`this.$el doesn't exist yet, but it will soon!`)
  },
  mounted () {
    // console.log('mounted')
    // console.log(this.$el.textContent) // I'm text inside the component.
  },
  beforeUpdate () {
    // console.log('beforeUpdate')
    // console.log(this.counter) // Logs the counter value every second, before the DOM updates.
  },
  updated () {
    // console.log('updated')
    // Fired every second, should always be true
    // console.log(+this.$refs['dom-element'].textContent === this.counter)
  },
  beforeDestroy () {
    // console.log('beforeDestroy')
    // Perform the teardown procedure for someLeakyProperty.
    // (In this case, effectively nothing)
    // this.someLeakyProperty = null
    // delete this.someLeakyProperty
  },
  destroyed () {
    // console.log('destroyed')
    // console.log(this) // There's practically nothing here!
    // MyCreepyAnalyticsService.informService('Component destroyed. All assets move in on target on my mark.')
  },
  methods: {
  }
}
</script>

<style lang="scss">
</style>
