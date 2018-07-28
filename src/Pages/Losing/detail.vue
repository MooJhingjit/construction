<template>
  <option-detail-template ref="template"
  :templateObj="local.pageObj.template"
  :isSelected="local.idSelected"
  >
    <template slot="title"><breadcrumb-bar :dataObj="local.pageObj"></breadcrumb-bar></template>
    <template slot="data-table">
      <data-table ref="dataTable"
      tableType="normal"
      :resourceName="resourceName"
      :statusSearch="local.statusSearch"
      @selectedData="selectedDataHandle"
      ></data-table>
    </template>
    <template slot="function">
      <!-- <button class="button is-link" @click="submitForm('add')">เพิ่มข้อมูลใหม่</button> -->
    </template>
      <template slot="detail">
        <div class="container-block  detail-block">
          <div class="block c-header">
            <table class="transparent-table">
              <tr>
                <td>โครงการ:<span class="value is-linkpage" @click="GOTOPAGE('Project', local.projectName)">{{local.projectName}}</span></td>
              </tr>
              <tr>
                <td colspan="2">
                  <div class="tags tags-select">
                    <!-- <span class="tag active">00C05 (244CA248C)</span>-->
                    <span class="tag" :key="contractIndex" v-for="(contract, contractIndex) in local.contractAll" @click="getLosingData(contract)">{{`${contract.code} (${contract.house_id})`}}</span>
                  </div>
                </td>
              </tr>
            </table>
          </div>
          <div class="block c-body" v-if="local.detailObj.contractSelected != null">
            <div class="card">
              <div class="card-name">{{`${local.detailObj.contractSelected.code} (${local.detailObj.contractSelected.house_id})`}}</div>
              <div class="card-content">
                <div class="detail">
                    <table class="transparent-table">
                      <tr>
                        <td>ทำสัญญา: <span class="value">{{SET_DATEFORMAT(local.detailObj.contractSelected.created_at)}}</span></td>
                        <td>วันที่ผ่านEP: <span class="value"></span></td>
                      </tr>
                      <tr>
                        <td>ยอดรับงาน: <span class="value">{{NUMBERWITHCOMMAS(local.detailObj.contractSelected.paid, 2)}}</span></td>
                        <td>ยอดสูญเสีย: <span class="value">{{NUMBERWITHCOMMAS(local.detailObj.losingTotal)}} ({{losingPercent}})</span></td>
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
                      <!-- <th>หมวดงาน</th> -->
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
                    <tr :key="index" v-for="(item, index) in local.detailObj.ordering">
                      <!-- <td>หมวดงานประตู-หน้าต่าง</td> -->
                      <td>{{item.name}}</td>
                      <td>{{item.amount}}</td>
                      <td>{{item.unit_text}}</td>
                      <td>{{NUMBERWITHCOMMAS(item.price, 2)}}</td>
                      <td>{{NUMBERWITHCOMMAS(item.price, 2)}}</td>
                      <td>{{item.note}}</td>
                      <td>{{SET_DATEFORMAT(item.created_at)}}</td>
                    </tr>
                  </tbody>
                </table>
                <div class="chart">
                  <bar-chart :data="local.detailObj.chart.materialItem" :width="150" :height="150"></bar-chart>
                  <div class="chart-name">
                    ยอดสูญเสีย: {{NUMBERWITHCOMMAS(local.detailObj.losingTotal)}} ({{losingPercent}})
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
import config from '@Config/app.config'
import dataTable from '@Components/DataTable'
import service from '@Services/app-service'
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
    barChart,
    dataTable
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
        statusSearch: [],
        idSelected: null,
        projectName: null,
        contractAll: null,
        detailObj: {
          contractSelected: null,
          losingTotal: null,
          ordering: null,
          chart: {
            materialItem: null,
            donuth: null
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
  created () {
    // console.log('created')
    // this.property = 'Example property update.'
    // console.log('propertyComputed will update, as this.property is now reactive.')
  },
  computed: {
    resourceName () {
      return config.api.losing.index
    },
    losingPercent () {
      if (this.local.detailObj.losingTotal === null) {
        return 0
      }
      let losingTotal = this.local.detailObj.losingTotal
      let paid = this.local.detailObj.contractSelected.paid
      let percent = (losingTotal * 100) / paid
      return `${this.NUMBERWITHCOMMAS(percent, 2)} %`
    }
  },
  methods: {
    selectedDataHandle (item) {
      console.log(item)
      this.local.projectName = item.name
      this.local.idSelected = item.projectId
      this.getFullData()
    },
    async getFullData () {
      let resourceName = `${config.api.losing.index}/${this.local.idSelected}`
      let queryString = []
      let res = await service.getResource({resourceName, queryString})
      this.local.contractAll = res.data
    },
    async getLosingData (contractObj) {
      this.cleanData()
      let resourceName = `${config.api.losing.fullObj}/${contractObj.code}`
      let queryString = []
      let res = await service.getResource({resourceName, queryString})
      this.local.detailObj.contractSelected = contractObj
      this.local.detailObj.losingTotal = res.data.losingTotal
      this.local.detailObj.ordering = res.data.ordering
      this.local.detailObj.chart = res.data.chart
    },
    cleanData () {
      this.local.detailObj.contractSelected = null
      this.local.detailObj.losingTotal = null
      this.local.detailObj.ordering = null
      this.local.detailObj.chart = null
    }
  }
}
</script>

<style lang="scss">
</style>
