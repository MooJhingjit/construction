<template>
  <option-detail-template :templateObj="local.template">
    <template slot="title"><breadcrumb-bar :dataObj="local.pageObj"></breadcrumb-bar></template>
    <template slot="search-status">
      <!-- <div class="tags">        
        <span class="tag">เสร็จสิ้น 42</span>
        <span class="tag">รออนุมัติ 5</span>
        <span class="tag">ดำเนินงาน 3</span>
        <span class="tag">ทั้งหมด</span>
      </div> -->
    </template>
    <template slot="search-input">
      <div class="search-input control has-icons-left">
        <input class="input" type="text" placeholder="ค้นหาร้านค้า">
        <span class="icon is-small is-left">
          <i class="fa fa-search" aria-hidden="true"></i>
        </span>
      </div>
      <div class="search-input control has-icons-left">
        <input class="input" type="text" placeholder="ค้นหาประเภท">
        <span class="icon is-small is-left">
          <i class="fa fa-search" aria-hidden="true"></i>
        </span>
      </div>
    </template>
    <template slot="search-results">
      <table class="table is-hoverable">
        <thead>
          <tr>
            <th>ร้านค้า</th>
            <th>ประเภทวัสดุ</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>00B01</td>
            <td>Three</td>
          </tr>
          <tr>
            <td>Three</td>
            <td>Five</td>
          </tr>
          <tr>
            <td>Three</td>
            <td>Seven</td>
          </tr>
          <tr>
            <td>Three</td>
            <td>Nine</td>
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
          <!-- <div class="block">
            <table class="transparent-table">
              <tr>
                <td>ประเภทวัสดุ</td>
                <td><input type="text" class="input"></td>
                <td>บริษัท/ร้านค้า</td>
                <td><input type="text" class="input"></td>
              </tr>
              <tr>
                <td>ติดต่อ</td>
                <td><input type="text" class="input"></td>
                <td>FEX</td>
                <td><input type="text" class="input"></td>
              </tr>
              <tr>
                <td>TEL</td>
                <td><input type="text" class="input"></td>
                <td>xxxxxx</td>
                <td><input type="text" class="input"></td>
              </tr>
            </table>
          </div> -->
          <div class="block">
            <table class="table is-hoverable">
              <thead>
                <tr>
                  <th>ประเภทวัสดุ</th>
                  <th>รายการ</th>
                  <th>หน่วย</th>
                  <th>ราคา/หน่วย</th>
                  <th>ซ้าย</th>
                  <th>ขวา</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>xxxxxxxxxxxxx</td>
                  <td>xxxxxxxxxxxxx</td>
                  <td>xxxxxxxxxxxxx</td>
                  <td>xxxxxxxxxxxxx</td>
                  <td>xxxxxxxxxxxxx</td>
                  <td>xxxxxxxxxxxxx</td>
                </tr>
                <tr>
                  <td>xxxxxxxxxxxxx</td>
                  <td>xxxxxxxxxxxxx</td>
                  <td>xxxxxxxxxxxxx</td>
                  <td>xxxxxxxxxxxxx</td>
                  <td>xxxxxxxxxxxxx</td>
                  <td>xxxxxxxxxxxxx</td>
                </tr>
                <tr>
                  <td>xxxxxxxxxxxxx</td>
                  <td>xxxxxxxxxxxxx</td>
                  <td>xxxxxxxxxxxxx</td>
                  <td>xxxxxxxxxxxxx</td>
                  <td>xxxxxxxxxxxxx</td>
                  <td>xxxxxxxxxxxxx</td>
                </tr>
                <tr>
                  <td>xxxxxxxxxxxxx</td>
                  <td>xxxxxxxxxxxxx</td>
                  <td>xxxxxxxxxxxxx</td>
                  <td>xxxxxxxxxxxxx</td>
                  <td>xxxxxxxxxxxxx</td>
                  <td>xxxxxxxxxxxxx</td>
                </tr>
              </tbody>
            </table>
          </div>
          
        </div>
          <!-- <div class="c-header container-block block">
            <div class="block name">
              สัญญาว่าจ้างปลูกสร้างอาคาร
              <div class="date">วันที่ 21 มีนาคม 2561</div>
            </div>
            <div class="block info">
              <table class="transparent-table">
                <tr>
                  <td>เลขที่สัญญา:</td>
                  <td><input class="input" type="text" placeholder="Text input"></td>
                  <td>ประเภทสัญญา:</td>
                  <td><input class="input" type="text" placeholder="Text input"></td>
                </tr>
                <tr>
                  <td>โครงการ:</td>
                  <td><input class="input" type="text" placeholder="Text input"></td>
                  <td>แบบบ้าน:</td>
                  <td><input class="input" type="text" placeholder="Text input"></td>
                </tr>
                <tr>
                  <td>แปลง:</td>
                  <td><input class="input" type="text" placeholder="Text input"></td>
                  <td>Quarter:</td>
                  <td><input class="input" type="text" placeholder="Text input"></td>
                </tr>
                <tr>
                  <td>ราคา:</td>
                  <td><input class="input" type="text" placeholder="Text input"></td>
                  <td>เงินเบิกล่วงหน้า:</td>
                  <td><input class="input" type="text" placeholder="Text input"></td>
                </tr>
                <tr>
                  <td>วันที่ออกสัญญา:</td>
                  <td><input class="input" type="text" placeholder="Text input"></td>
                  <td></td>
                  <td></td>
                </tr>
              </table>
            </div>
          </div>
          <div class="c-body">
            <table class="table is-hoverable">
              <thead>
                <tr>
                  <th>งวดที่</th>
                  <th>จำนวนเงิน</th>
                  <th>วันกำหนดเสร็จ</th>
                  <th>วัสดุนอกสัญญา ( * ยกเว้นค่าของ, ** ยกเว้นค่าของและค่าแรง )</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td width="70"><input type="text" class="input"></td>
                  <td width="130"><input type="text" class="input"></td>
                  <td width="130"><input type="text" class="input"></td>
                  <td><input type="text" class="input"></td>
                </tr>
                <tr>
                  <td><input type="text" class="input"></td>
                  <td><input type="text" class="input"></td>
                  <td><input type="text" class="input"></td>
                  <td><input type="text" class="input"></td>
                </tr>
                <tr>
                  <td><input type="text" class="input"></td>
                  <td><input type="text" class="input"></td>
                  <td><input type="text" class="input"></td>
                  <td><input type="text" class="input"></td>
                </tr>
                <tr>
                  <td><input type="text" class="input"></td>
                  <td><input type="text" class="input"></td>
                  <td><input type="text" class="input"></td>
                  <td><input type="text" class="input"></td>
                </tr>
                <tr>
                  <td><input type="text" class="input"></td>
                  <td><input type="text" class="input"></td>
                  <td><input type="text" class="input"></td>
                  <td><input type="text" class="input"></td>
                </tr>
              </tbody>
            </table>
            <div class="table-options">
              <button class="button"><i class="fa fa-minus" aria-hidden="true"></i></button>
              <button class="button"><i class="fa fa-plus" aria-hidden="true"></i></button>
            </div>
          </div>
          <div class="c-footer container-block block">
            <table class="transparent-table">
              <tr>
                <td>จำนวนงวด: 10 งวด</td>
                <td>จำนวนเงินทั้งหมด 1,000 บาท</td>
              </tr>
              <tr>
                <td>วันที่ 21 มีนาคม 2561 ถึงวันที่ 10 ธันวาคม 2561</td>
                <td>หนึ่งพันบาทถ้วน</td>
              </tr>
            </table>
          </div>
        </div>
        <div class="container-block footer-panel">
          <button class="button is-warning">รออนุมัติ</button>
          <button class="button is-success">เริ่มดำเนินงาน</button>
        </div> -->
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
  name: 'MaterialPage',
  data () {
    return {
      local: {
        pageObj: {
          items: [
            {name: 'ข้อมูลวัสดุ', route: 'Material', key: '', active: true, icon: 'fa fa-file-text'}
          ]
        },
        template: {
          class: 'material-page'
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
