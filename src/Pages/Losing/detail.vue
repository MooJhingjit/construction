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
        <div class="columns">
          <div class="column">
            โครงการ:<span class="value is-linkpage" @click="GOTOPAGE('Project', local.projectName)">{{local.projectName}}</span>
          </div>
          <div class="column">
            แปลง
          </div>
          <div class="column">
            เลขที่สัญญา
          </div>
        </div>
        <div class="card">
          <div class="card-content">
            <div class="content">
              <h5>ข้อมูลสูญเสีย (วัสดุ)</h5>
              <div>
              </div>
            </div>
          </div>
        </div>
        <br>
        <div class="card">
          <div class="card-content">
            <div class="content">
              <h5>ข้อมูลสูญเสีย (ค่างวด)</h5>
            </div>
          </div>
        </div>
        <br>
        <div class="card">
          <div class="card-content">
            <div class="content">
              <h5>ข้อมูลสูญเสีย (วัสดุ + ค่างวด)</h5>
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
import myAutoComplete from '@Components/Form/my-autocomp'
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
    dataTable,
    myAutoComplete
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
      }
    }
  },
  created () {
  },
  computed: {
    resourceName () {
      return config.api.losing.index
    }
  },
  methods: {
    selectedDataHandle (item) {
      // this.local.projectName = item.name
      // this.local.idSelected = item.projectId
      // this.getFullData()
    }
  }
}
</script>

<style lang="scss">
</style>
