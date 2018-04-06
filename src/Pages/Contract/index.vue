<template>
  <option-detail-template :templateObj="local.template">
    <template slot="title"><breadcrumb-bar :dataObj="local.pageObj"></breadcrumb-bar></template>
    <template slot="search-status">
      <div class="tags">
        <span class="tag is-success">เสร็จสิ้น 42</span>
        <span class="tag is-warning">รออนุมัติ 5</span>
        <span class="tag is-link">ดำเนินการ 3</span>
        <span class="tag">ทั้งหมด</span>
      </div>
    </template>
    <template slot="search-input">
      <div class="search-input control has-icons-left">
        <input class="input" type="text" placeholder="ค้นหาโครงการ">
        <span class="icon is-small is-left">
          <i class="fa fa-search" aria-hidden="true"></i>
        </span>
      </div>
      <div class="search-input control has-icons-left">
        <input class="input" type="text" placeholder="ค้นหาสัญญา">
        <span class="icon is-small is-left">
          <i class="fa fa-search" aria-hidden="true"></i>
        </span>
      </div>
    </template>
    <template slot="search-results">
      <table class="table is-hoverable">
        <thead>
          <tr>
            <th>ชื่อสัญญา</th>
            <th>วันที่</th>
            <th>สถานะ</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>LH120610015</td>
            <td>21/09/60</td>
            <td><span class="tag is-link">ดำเนินการ</span></td>
          </tr>
          <tr>
            <td>LH120243216</td>
            <td>27/08/60</td>
            <td><span class="tag is-warning">รออนุมัติ</span></td>
          </tr>
          <tr>
            <td>LH122950016</td>
            <td>27/08/60</td>
            <td><span class="tag is-link">ดำเนินการ</span></td>
          </tr>
          <tr>
            <td>LH120610397</td>
            <td>26/09/60</td>
            <td><span class="tag is-link">ดำเนินการ</span></td>
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
          <span class="type tag">ดำเนินงาน</span>
          <div class="block c-header">
            <table class="transparent-table">
              <tr>
              <td>โครงการ:<span class="value">รามอินทรา พหลโยธิน 50</span></td>
              </tr>
              <tr>
                <td>เลขที่สัญญา:<span class="value">LH120243216</span></td>
                <td>แปลน: <span class="value">C01</span></td>
              </tr>
              <tr>
                <td>แบบบ้าน:<span class="value">244CA248C</span></td>
                <td>ขั้นตอนการตำเนินงาน: <span class="value">งานพื้นสำเร็จชั้นล่าง</span></td>
              </tr>
              <tr>
                <td>วันที่งวด 9 ตามส/ญ:<span class="value">27/08/61</span></td>
                <td>วันที่งวด 9 ตามปมก.:<span class="value">27/08/61</span></td>
              </tr>
              <tr>
                <td>วันที่ End Prod.ตามส/ญ:<span class="value">16/09/61</span></td>
                <td>วันที่ทำสัญญา:<span class="value">27/08/61</span></td>
              </tr>
              <tr>
                <td colspan="2">งานล่าสุด:<span class="value">ทำสัญญาก่อสร้าง</span></td>
              </tr>
            </table>
          </div>
          <div class="block c-body">
            <table class="table rows-table is-hoverable">
              <thead>
                <tr>
                  <th>รายละเอียดงาน</th>
                  <th>วันที่ตามสัญญา</th>
                  <th>วันที่ประมาณใหม่</th>
                  <th>วันที่ทำจริง</th>
                  <th>สถานะ</th>
                  <th>งวด</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>10000 : *Confirm Lay-Out</td>
                  <td>05/01/61</td>
                  <td>05/01/61</td>
                  <td>05/01/61</td>
                  <td>เสร็จแล้ว</td>
                  <td>20</td>
                </tr>
                <tr>
                  <td>11000 : ตอกเสาเข็ม</td>
                  <td>11/01/61</td>
                  <td>20/03/61</td>
                  <td>20/03/61</td>
                  <td>เสร็จแล้ว</td>
                  <td>20</td>
                </tr>
                <tr>
                  <td>11825 : กำหนด_ติดตั้งทดสอบความสมบูรณ์เสาเข็ม</td>
                  <td>11/02/61</td>
                  <td>30/03/61</td>
                  <td>30/03/61</td>
                  <td>ยังไม่เสร็จ</td>
                  <td>20</td>
                </tr>
                <tr>
                  <td>12100 : *ทำสัญญาก่อสร้าง</td>
                  <td>05/01/61</td>
                  <td>28/02/61</td>
                  <td>28/02/61</td>
                  <td>เสร็จแล้ว</td>
                  <td>19</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="container-block footer-panel">
          <button class="button">เริ่มดำเนินงาน</button>
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
import breadcrumbBar from '@Components/Breadcrumb'
import optionDetailTemplate from '@Components/Template/option-detail'
export default {
  props: {
    // templateName: {
    //   type: String,
    //   required: true
    // }
  },
  components: {
    breadcrumbBar,
    optionDetailTemplate
  },
  name: 'ContractPage',
  data () {
    return {
      local: {
        pageObj: {
          items: [
            {name: 'ข้อมูลสัญญา', route: 'Contract', key: 'test', active: true, icon: 'fa fa-file-text'}
          ]
        },
        template: {
          class: 'contract-page'
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
