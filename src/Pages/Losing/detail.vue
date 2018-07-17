<template>
  <option-detail-template ref="template"
  :templateObj="local.pageObj.template"
  :isSelected="true"
  >
    <template slot="title"><breadcrumb-bar :dataObj="local.pageObj"></breadcrumb-bar></template>
    <template slot="data-table">
      <!-- <data-table ref="dataTable"
      :resourceName="resourceName"
      :statusSearch="local.statusSearch"
      @selectedData="selectedDataHandle"
      ></data-table> -->
    </template>
    <template slot="function">
      <!-- <button class="button is-link" @click="submitForm('add')">เพิ่มข้อมูลใหม่</button> -->
    </template>
      <template slot="detail">
        <div class="container-block  detail-block">
          <div class="block c-header">
            <table class="transparent-table">
              <tr>
                <td>โครงการ:<span class="value">รามอินทรา พหลโยธิน 50</span></td>
              </tr>
              <tr>
                <td colspan="2">
                  <div class="tags tags-select">
                    <span class="tag active">00C05 (244CA248C)</span>
                    <span class="tag">00C06 (199CA238C)</span>
                    <span class="tag">00C07 (199CA238C)</span>
                    <span class="tag">00D03 (199CA238C)</span>
                    <span class="tag">00D04 (244CA248C)</span>
                    <span class="tag">00D05 (244CA248C)</span>
                    <span class="tag">00F02 (199CA238C)</span>
                    <span class="tag">00B01 (244CA248C)</span>
                    <span class="tag">00H01 (244CA248C)</span>
                    <span class="tag">00H02 (199CA238C)</span>
                  </div>
                </td>
              </tr>
            </table>
          </div>
          <div class="block c-body">
            <div class="card">
              <div class="card-name">00C05 (244CA248C)</div>
              <div class="card-content">
                <div class="detail">
                    <table class="transparent-table">
                      <tr>
                        <td>ทำสัญญา: <span class="value">20/9/2015</span></td>
                        <td>วันที่ผ่านEP: <span class="value">24/6/2016</span></td>
                      </tr>
                      <tr>
                        <td>ยอดรับงาน: <span class="value">2,187,700</span></td>
                        <td>ยอดสูญเสีย: <span class="value">34,292 (1.56%)</span></td>
                      </tr>
                    </table>
                  </div>
              </div>
            </div>
            <div class="card">
              <div class="card-name">รายการวัสดุ</div>
              <div class="card-content">
                <table class="table is-bordered rows-table">
                  <thead>
                    <tr>
                      <th>หมวดงาน</th>
                      <th>รายการ</th>
                      <th>จำนวน</th>
                      <th>หน่วย</th>
                      <th>ราคา</th>
                      <th>ราคารวม + ค่าแรง</th>
                      <th>หมายเหตุ</th>
                      <th>วันที่</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>หมวดงานประตู-หน้าต่าง</td>
                      <td>กุญแจเขาควาย K-7/B0312/SN ห้องน้ำ (เปิดซ้าย )</td>
                      <td>1</td>
                      <td>ชุด</td>
                      <td>620.8</td>
                      <td>620.8</td>
                      <td>เสียหายหน้างาน</td>
                      <td>24/6/2016</td>
                    </tr>
                    <tr>
                      <td>หมวดงานหินอ่อน-แกรนิต</td>
                      <td>หินแกรนิตดำซานซีขนาด 60 X 91 cm.</td>
                      <td>1</td>
                      <td>ชิ้น</td>
                      <td>1595</td>
                      <td>1595</td>
                      <td>ไม่ผ่าน QC.</td>
                      <td>26/6/2016</td>
                    </tr>
                    <tr>
                      <td>หมวดงานหินอ่อน-แกรนิต</td>
                      <td>หินแกรนิตดำซานซี ขนาด 20x 180 cm</td>
                      <td>1</td>
                      <td>ชิ้น</td>
                      <td>1044</td>
                      <td>1044  </td>
                      <td>ไม่ผ่าน QC.</td>
                      <td>27/6/2016</td>
                    </tr>
                    <tr>
                      <td>หมวดงานพื้นผิว</td>
                      <td>กระเบื้องพื้น GRAND VIVA 60x60 cm</td>
                      <td>4</td>
                      <td>แผ่น</td>
                      <td>179</td>
                      <td>716</td>
                      <td>เสียหายหน้างาน</td>
                      <td>28/6/2016</td>
                    </tr>
                  </tbody>
                </table>
                <div class="chart">
                  <bar-chart :data="local.materialItem" :width="150" :height="150"></bar-chart>
                  <div class="chart-name">
                    ยอดสูญเสีย: 34,292 (1.56%)
                  </div>
                </div>
              </div>
            </div>
            <div class="card">
              <div class="card-content">
                <div class="chart two-column container-block">
                  <div class="block">
                    <doughnut-chart :data="local.allContractItem" :width="250" :height="250"></doughnut-chart>
                    <div class="chart-name">
                      สรุปข้อมูลสูญเสียโครงการ รามอินทรา พหลโยธิน 50
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
  </option-detail-template>
</template>

<script>
import breadcrumbBar from '@Components/Breadcrumb'
import optionDetailTemplate from '@Components/Template/option-detail'
import noResultTemplate from '@Components/Template/no-result'
import doughnutChart from '@Components/Chart/doughnut'
import barChart from '@Components/Chart/bar'
export default {
  props: {
    // templateName: {
    //   type: String,
    //   required: true
    // }
  },
  components: {
    breadcrumbBar,
    optionDetailTemplate,
    noResultTemplate,
    doughnutChart,
    barChart
  },
  name: 'UserPage',
  data () {
    return {
      local: {
        pageObj: {
          items: [
            {name: 'ข้อมูลสูญเสีย', route: 'Losing', key: '', active: true, icon: 'fa fa-address-book-o'},
            {name: 'รายละเอียด', route: 'LosingDetail', key: '', active: true, icon: ''}
          ],
          template: {
            class: 'losing-detail-page'
          }
        },
        allProjectItem: {
          labels: [
            'มัณฑนา บางนา กม.7',
            'นันทวัน บางนา กม.7',
            'มัณฑนา อ่อนนุช - วงแหวน 5',
            'มัณฑนา ศรีนครินทร์ ร่มเกล้า',
            'นันทวัน รามอินทรา พหลโยธิน 50'
          ],
          datasets: [
            {
              backgroundColor: '#CACACA',
              data: [63915, 17224, 14392, 8527, 2070]
            }
          ]
        },
        materialItem: {
          labels: ['กุญแจเขาควาย K-7/B0312/SN ห้องน้ำ (เปิดซ้าย )', 'หินแกรนิตดำซานซีขนาด 60 X 91 cm.', 'หินแกรนิตดำซานซี ขนาด 20x 180 cm', 'กระเบื้องพื้น GRAND VIVA 60x60 cm'],
          datasets: [
            {
              backgroundColor: '#40A5EF',
              data: [620.8, 1595, 1044, 716]
            }
          ]
        },
        allContractItem: {
          labels: [
            '00C06 (199CA238C)',
            '00C07 (199CA238C)',
            '00D03 (199CA238C)',
            '00D04 (244CA248C)',
            '00D05 (244CA248C)',
            '00F02 (199CA238C)',
            '00B01 (244CA248C)',
            '00H01 (244CA248C)',
            '00H02 (199CA238C)'
          ],
          datasets: [
            {
              backgroundColor: '#f87979',
              data: [23535, 24567, 5786, 7899, 89889, 3342, 3546, 45767, 6877]
            }
          ]
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
