<template>
    <section :class="['section', local.template.class]">
    <breadcrumb-bar :dataObj="local.pageObj"></breadcrumb-bar>
    <div class="container-block">
      <div class="detail-panel">
        <template v-if="true">
          <div class="container-block  detail-block">
            <div class="c-header container-block block">
              <!-- <div class="block name">
                สัญญาว่าจ้างปลูกสร้างอาคาร
                <div class="date">วันที่ 21 มีนาคม 2561</div>
              </div> -->
              <div class="block info container-block">
                <div class="block store">
                  <div>ร้านค้า: <span class="value">ควอลิตี้คอนสตรัคชั่นโปรดักส์  จำกัด (มหาชน)</span></div>
                  <div>ประเภท: <span class="value">อิฐมวลเบา</span></div>
                </div>
                <div class="block container-block house-template tags-select">
                  <div class="block">
                    <span class="title-name">มัณทนา:</span>
                    <span class="tag is-white active">098SW3</span>
                    <span class="tag is-white">105PWY</span>
                    <span class="tag is-white active">119PWY</span>
                    <span class="tag is-white">142PWY</span>
                    <span class="tag is-white">169PWY</span>
                    <span class="tag is-white">198PWY</span>
                    <span class="tag is-white">237PWY</span>
                  </div>
                  <div class="block">
                    <span class="title-name">นันทวัน:</span>
                    <span class="tag is-white">105PWY</span>
                    <span class="tag is-white">142PWY</span>
                    <span class="tag is-white">169PWY</span>
                    <span class="tag is-white">198PWY</span>
                    <span class="tag is-white">237PWY</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="c-body">
              <div class="table-template">
                <table class="table is-hoverable">
                  <thead>
                    <tr>
                      <th rowspan="2">รายการ</th>
                      <th rowspan="2">หน่วย</th>
                      <th rowspan="2">ราคา/หน่วย</th>
                      <th colspan="2">098SW319I</th>
                    </tr>
                    <tr>
                      <th>ซ้าย</th>
                      <th>ขวา</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><input type="text" class="input" value="อิฐ Q-CON 7.5 Cm."></td>
                      <td><input type="text" class="input" value="ก้อน"></td>
                      <td><input type="text" class="input" value="13.00"></td>
                      <td><input type="text" class="input" value="196.00"></td>
                      <td><input type="text" class="input" value="196.00"></td>
                    </tr>
                  </tbody>
                </table>
                <div class="table-options">
                  <button class="button">บันทึกข้อมูล</button>
                  <button class="button"><i class="fa fa-minus" aria-hidden="true"></i></button>
                  <button class="button"><i class="fa fa-plus" aria-hidden="true"></i></button>
                </div>
              </div>
              <div class="table-template">
                <table class="table is-hoverable">
                  <thead>
                    <tr>
                      <th rowspan="3">รายการ</th>
                      <th rowspan="3">หน่วย</th>
                      <th rowspan="3">ราคา/หน่วย</th>
                      <th colspan="6">105PWY22F</th>
                    </tr>
                    <tr>
                      <th colspan="3">โรงรถซ้าย</th>
                      <th colspan="3">โรงรถขวา</th>
                    </tr>
                    <tr>
                      <th colspan="3">
                        <div class="select">
                          <select>
                            <option>-----</option>
                            <option>B3PW-1</option>
                            <option>B3PW-2</option>
                          </select>
                        </div>
                      </th>
                      <th colspan="3">
                        <div class="select">
                          <select>
                            <option>-----</option>
                             <option>B3PW-1</option>
                            <option>B3PW-2</option>
                          </select>
                        </div>
                      </th>
                      <!-- <th>B3PW-2</th>
                      <th>B3PW-3</th>
                      <th>B3PW-1</th>
                      <th>B3PW-2</th>
                      <th>B3PW-3</th> -->
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><input type="text" class="input" value="แผ่นพื้นสำเร็จรูป ชนิด3ขา(LLไม่น้อยกว่า450kg/m²)  ขนาด 0.35 x 3.90 m."></td>
                      <td width="90"><input type="text" class="input" value="แผ่น"></td>
                      <td width="90"><input type="text" class="input" value="293.74"></td>
                      <td colspan="3" width="90"><input type="text" class="input" value="18.00"></td>
                      <td colspan="3" width="90"><input type="text" class="input" value="18.00"></td>
                    </tr>
                  </tbody>
                </table>
                <div class="table-options">
                  <button class="button">บันทึกข้อมูล</button>
                  <button class="button"><i class="fa fa-minus" aria-hidden="true"></i></button>
                  <button class="button"><i class="fa fa-plus" aria-hidden="true"></i></button>
                </div>
              </div>
            </div>
            <!-- <div class="c-footer container-block block">
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
            </div> -->
          </div>
          <!-- <div class="container-block footer-panel">
            <button class="button">บันทึกข้อมูล</button>
          </div> -->
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
  name: 'AddMaterialPage',
  data () {
    return {
      local: {
        pageObj: {
          items: [
            {name: 'ข้อมูลร้านค้า', route: 'Store', key: '', active: false, icon: 'fa fa-address-book-o'},
            {name: 'สร้างสินค้าใหม่', route: 'AddMaterial', key: 'store-id', active: true, icon: ''}
          ]
        },
        template: {
          class: 'add-material-page'
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
