<template>
  <option-detail-template :templateObj="local.template">
    <template slot="title"><breadcrumb-bar :dataObj="local"></breadcrumb-bar></template>
    <template slot="search-status">
      <div class="tags">
        <span class="tag">รอสินค้า 5</span>
      </div>
    </template>
    <template slot="search-input">
      <input class="input" type="text" placeholder="ค้นหา">
      <span class="icon is-small is-left">
        <i class="fa fa-search" aria-hidden="true"></i>
      </span>
    </template>
    <template slot="search-results">
      <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
        <thead>
          <tr>
            <th>รหัส</th>
            <th>จำนวน</th>
            <th>วันที่</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Three</td>
            <td>Four</td>
            <td>Four</td>
          </tr>
          <tr>
            <td>Five</td>
            <td>Six</td>
            <td>Four</td>
          </tr>
          <tr>
            <td>Seven</td>
            <td>Four</td>
            <td>Eight</td>
          </tr>
          <tr>
            <td>Nine</td>
            <td>Ten</td>
            <td>Four</td>
          </tr>
          <tr>
            <td>Eleven</td>
            <td>Four</td>
            <td>Twelve</td>
          </tr>
        </tbody>
      </table>
      <nav class="pagination" role="navigation" aria-label="pagination">
        <button class="pagination-previous" title="This is the first page" disabled>ก่อนหน้า</button>
        <button class="pagination-next">หน้าถัดไป</button>
      </nav>
    </template>
    <template v-if="true">
      <template slot="detail">
        <div class="container-block  detail-block">
          <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
            <thead>
              <tr>
                <th>#</th>
                <th>วัสดุ</th>
                <th>จำนวน</th>
                <th>ราคา</th>
                <th>สถานะ</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Four</td>
                <td>Three</td>
                <td>Four</td>
                <td><span class="tag is-success">รับแล้ว</span></td>
              </tr>
              <tr>
                <td>2</td>
                <td>Six</td>
                <td>Four</td>
                <td>Four</td>
                <td><span class="tag is-warning">รอสินค้า</span></td>
              </tr>
              <tr>
                <td>3</td>
                <td>Eight</td>
                <td>Four</td>
                <td>Four</td>
                <td><span class="tag is-success">รับแล้ว</span></td>
              </tr>
              <tr>
                <td>4</td>
                <td>Ten</td>
                <td>Four</td>
                <td>Three</td>
                <td><span class="tag is-success">รับแล้ว</span></td>
              </tr>
              <tr>
                <td>5</td>
                <td>Four</td>
                <td>Three</td>
                <td>Three</td>
                <td><span class="tag is-success">รับแล้ว</span></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="c-footer container-block block">
          <table class="transparent-table">
            <tr>
              <td>วันที่ 21 มีนาคม 2561</td>
              <td>เลขที่สัญญา: xxxxxx</td>
            </tr>
            <tr>
              <td>แบบบ้าน: xxxxxxxx</td>
              <td>ขั้นตอนการตำเนินงาน: xxxxxx</td>
            </tr>
            <tr>
              <td>ทั้งหมด: 5 รายการ</td>
              <td>จำนวนเงินทั้งหมด 1,000 บาท</td>
            </tr>
            <tr>
              <td>คงเหลือ: 1 รายการ</td>
              <td>หนึ่งพันบาทถ้วน</td>
            </tr>
          </table>
        </div>
      </template>
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
  </option-detail-template>
</template>

<script>
import optionDetailTemplate from '@Components/Template/option-detail'
import breadcrumbBar from '@Components/Breadcrumb'
export default {
  props: {
    // templateName: {
    //   type: String,
    //   required: true
    // }
  },
  components: {
    optionDetailTemplate,
    breadcrumbBar
  },
  name: 'OrderingDetail',
  data () {
    return {
      local: {
        pageObj: [
          {name: 'การสั่งซื้อ', route: 'Ordering', active: false, icon: 'fa fa-object-group'},
          {name: 'xxx', route: '', active: true, icon: ''}
        ],
        template: {
          class: 'user-page'
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
