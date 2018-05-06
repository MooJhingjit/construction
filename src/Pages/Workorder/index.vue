<template>
    <section :class="['section', local.template.class]">
    <breadcrumb-bar :dataObj="local.pageObj"></breadcrumb-bar>
    <div class="container-block">
      <div class="detail-panel">
        <template v-if="true">
          <div class="container-block  detail-block">
            <div class="c-header container-block block">
            </div>
            <div class="c-body">
              <div class="items">
                 <table class="table rows-table is-hoverable">
                  <thead>
                    <tr>
                      <th>งวด</th>
                      <th>รายละเอียดงาน</th>
                      <th>รายจัดซื้อก่อนหน้า</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>
                        <div class="list">ถังบำบัดน้ำเสียและถังเก็บน้ำใต้ดิน</div>
                        <div class="list">งานเดินท่อประปาใต้อาคาร</div>
                        <div class="list">งานเทพื้นชั้นหนึ่ง 100%</div>
                        <div class="list">งานโครงหลังคารอบบน ล่าง</div>
                      </td>
                      <td>
                        <div class="name">name of product group</div>
                        <div class="product-list">product xxxx</div>
                        <div class="product-list">product xxxx</div>
                        <div class="product-list">product xxxx</div>
                        <div class="product-list">product xxxx</div>
                      </td>
                    </tr>
                    <!-- <tr>
                      <td>2</td>
                      <td>
                        <div class="list">ถังบำบัดน้ำเสียและถังเก็บน้ำใต้ดิน</div>
                        <div class="list">งานเดินท่อประปาใต้อาคาร</div>
                        <div class="list">งานเทพื้นชั้นหนึ่ง 100%</div>
                        <div class="list">งานโครงหลังคารอบบน ล่าง</div>
                      </td>
                      <td>
                        <div class="name">name of product group</div>
                        <div class="product-list">product xxxx</div>
                        <div class="product-list">product xxxx</div>
                        <div class="product-list">product xxxx</div>
                        <div class="product-list">product xxxx</div>
                      </td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>
                        <div class="list">ถังบำบัดน้ำเสียและถังเก็บน้ำใต้ดิน</div>
                        <div class="list">งานเดินท่อประปาใต้อาคาร</div>
                        <div class="list">งานเทพื้นชั้นหนึ่ง 100%</div>
                        <div class="list">งานโครงหลังคารอบบน ล่าง</div>
                      </td>
                      <td>
                        <div class="name">name of product group</div>
                        <div class="product-list">product xxxx</div>
                        <div class="product-list">product xxxx</div>
                        <div class="product-list">product xxxx</div>
                        <div class="product-list">product xxxx</div>
                      </td>
                    </tr> -->
                  </tbody>
                </table>
                <div class="container-block footer-panel">
                  <button class="button" @click="GOTOPAGE('EditWorkorder', 'xxx')">แก้ไขรายการ</button>
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
  name: 'WorkOrderPage',
  data () {
    return {
      local: {
        pageObj: {
          items: [
            {name: 'ลำดับการทำงาน', route: 'Workorder', key: '', active: true, icon: 'fa fa-address-book-o'}
          ]
        },
        template: {
          class: 'work-order-page'
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
