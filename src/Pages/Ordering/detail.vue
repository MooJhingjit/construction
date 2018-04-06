<template>
  <option-detail-template :templateObj="local.template">
    <template slot="title"><breadcrumb-bar :dataObj="local.pageObj"></breadcrumb-bar></template>
    <template slot="search-status">
      <div class="tags">
        <span class="tag">ปกติ</span>
        <span class="tag">พิเศษ</span>
        <span class="tag is-info">รอสินค้า 5</span>
        <span class="tag is-warning">รออนุมัติ 5</span>
        <span class="tag is-success">รับสินค้า 5</span>
      </div>
    </template>
    <template slot="search-input">
      <div class="search-input control has-icons-left">
        <input class="input" type="text" placeholder="ค้นหา" value="LH120610029">
        <span class="icon is-small is-left">
          <i class="fa fa-search" aria-hidden="true"></i>
        </span>
      </div>
    </template>
    <template slot="search-results">
      <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
        <thead>
          <tr>
            <th>เลขที่สัญญา</th>
            <th>ประเภท</th>
            <th>สถานะ</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>LH120610029</td>
            <td>ปกติ</td>
            <td><span class="tag is-link">รอสินค้า</span></td>
          </tr>
          <tr>
            <td>LH120610029</td>
             <td>พิเศษ</td>
             <td><span class="tag is-warning">รออนุมัติ</span></td>
          </tr>
          <tr>
            <td>LH120610026</td>
            <td>ปกติ</td>
            <td><span class="tag is-success">รับสินค้า</span></td>
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
        <div class="container-block detail-block">
          <span class="type tag">ปกติ</span>
          <div class="block c-header">
            <table class="transparent-table">
              <tr>
                <td>โครงการ:<span class="value">รามอินทรา พหลโยธิน 50</span></td>
              </tr>
              <tr>
                <td>เลขที่สัญญา:<span class="value">LH120243216</span></td>
                <td>แปลน:<span class="value">C01</span></td>
              </tr>
              <tr>
                <td>แบบบ้าน:<span class="value">244CA248C</span></td>
                <td>ขั้นตอนการตำเนินงาน:<span class="value">งานพื้นสำเร็จชั้นล่าง</span></td>
              </tr>
              <tr>
                <td>ทั้งหมด:<span class="value">5 รายการ</span></td>
                <td>จำนวนเงินทั้งหมด<span class="value">1,000 บาท</span></td>
              </tr>
              <tr>
                <td>คงเหลือ:<span class="value">1 รายการ</span></td>
                <td><span class="value">หนึ่งพันบาทถ้วน</span></td>
              </tr>
            </table>
          </div>
          <div class="block c-body">
            <table class="table is-bordered rows-table">
              <thead>
                <tr>
                  <th>ร้านค้า</th>
                  <th>วัสดุ</th>
                  <th>จำนวน</th>
                  <th>ราคา</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td width="100">ฟายด์เวิร์คกรุ๊ป</td>
                  <td>
                    <input class="input" type="text" value="EC-HDFCM8  35X800X2000 MM (เปิดขวา)">
                    <input class="input" type="text" value="HDFCM71  35X700X2000 MM">
                    <input class="input" type="text" value="(HDFCMS54)  3.5x54x90 Cm. ห้องเก็บของ (เปิดขวา)">
                  </td>
                  <td width="20">
                    <input class="input" type="text" value="1">
                    <input class="input" type="text" value="2">
                    <input class="input" type="text" value="1">
                  </td>
                  <td width="100">
                    <input class="input" type="text" value="200">
                    <input class="input" type="text" value="300">
                    <input class="input" type="text" value="500">
                  </td>
                </tr>
                <tr>
                  <td>กิจศิริ</td>
                  <td>
                    <input class="input" type="text" value="แผ่นสมาร์ทวูดหนา10 mm.">
                  </td>
                  <td width="20"><input class="input" type="text" value="1"></td>
                  <td width="100"><input class="input" type="text" value="200"></td>
                </tr>
                <!-- <tr>
                  <td>xxxxxxx</td>
                  <td><input class="input" type="text" placeholder="Text input"></td>
                  <td width="20"><input class="input" type="text" placeholder="Text input"></td>
                  <td width="100"><input class="input" type="text" placeholder="Text input"></td>
                </tr> -->
              </tbody>
            </table>
          </div>
        </div>
        <div class="container-block explain">
          <div class="block">
            <table class="transparent-table">
              <tr>
                <td>ร้านค้า: ฟายด์เวิร์คกรุ๊ป</td>
              </tr>
              <tr>
                <td>จำนวน: 3 รายการ</td>
              </tr>
              <tr>
                <td>ราคา: 20,000</td>
              </tr>
              <tr>
                <td>สองหมื่นบาทถ้วน</td>
              </tr>
              <tr>
                <td>สถานะ: <span class="tag is-warning">รออนุมัติ</span></td>
              </tr>
            </table>
          </div>
          <div class="block function container-block">
            <button class="button is-outlined">อนุมัติ</button>
            <button class="button is-outlined">ออกใบสั่งซื้อ</button>
            <button class="button is-outlined">รับของ</button>
          </div>
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
        pageObj: {
          items: [
            {name: 'การสั่งซื้อ', route: 'Ordering', key: '', active: false, icon: 'fa fa-object-group'},
            {name: 'LH120610029', route: 'OrderingDetail', key: 'LH120610029', active: true, icon: ''}
          ]
        },
        template: {
          class: 'ordering-detail-page'
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
