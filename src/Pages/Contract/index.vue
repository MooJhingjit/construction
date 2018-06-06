<template>
  <option-detail-template :templateObj="local.pageObj.template" :isSelected="local.idSelected"  @cancleForm="submitForm('cancel')">
    <template slot="title"><breadcrumb-bar :dataObj="local.pageObj"></breadcrumb-bar></template>
    <template slot="data-table">
      <data-table ref="dataTable"
      :resourceName="resourceName"
      :statusSearch="local.statusSearch"
      @selectedData="selectedDataHandle"
      ></data-table>
    </template>
    <!-- <template slot="search-status">
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
      <div class="search-input control has-icons-left">
        <input class="input" type="text" placeholder="ค้นหาแบบบ้าน">
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
            <th>แบบบ้าน</th>
            <th>สถานะ</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>LH120610015</td>
            <td>098SW319I</td>
            <td><span class="tag is-link">ดำเนินการ</span></td>
          </tr>
          <tr>
            <td>LH120243216</td>
            <td>098SW319I</td>
            <td><span class="tag is-warning">รออนุมัติ</span></td>
          </tr>
          <tr>
            <td>LH122950016</td>
            <td>119PWY22T</td>
            <td><span class="tag is-link">ดำเนินการ</span></td>
          </tr>
          <tr>
            <td>LH120610397</td>
            <td>198PWY32T</td>
            <td><span class="tag is-link">ดำเนินการ</span></td>
          </tr>
        </tbody>
      </table>
      <nav class="pagination" role="navigation" aria-label="pagination">
        <button class="pagination-previous" title="This is the first page" disabled>ก่อนหน้า</button>
        <button class="pagination-next">หน้าถัดไป</button>
      </nav>
    </template> -->
    <template v-if="local.idSelected">
      <template slot="detail">
        <div class="container-block  detail-block">
          <span class="type tag">{{GET_WORKSTATUS(local.inputs.contract.status)}}</span>
          <div class="block c-header">
            <table class="transparent-table">
              <tr>
              <td>โครงการ:<span class="value">{{local.inputs.project.name}}</span></td>
              </tr>
              <tr>
                <td>เลขที่สัญญา:<span class="value">{{local.inputs.contract.code}}</span></td>
                <td>แบบบ้าน:<span class="value">{{local.inputs.contract.house_id}}</span></td>
              </tr>
              <tr>
                <td>ขั้นตอนการตำเนินงาน: <span class="value">งานพื้นสำเร็จชั้นล่าง</span></td>
                <td>แปลน: <span class="value">{{local.inputs.contract.contractPlan}}</span></td>
              </tr>
              <tr>
                <td>วันที่งวด 9 ตามส/ญ:<span class="value">27/08/61</span></td>
                <td>วันที่งวด 9 ตามปมก.:<span class="value">27/08/61</span></td>
              </tr>
              <tr>
                <td>วันที่ End Prod.ตามส/ญ:<span class="value">16/09/61</span></td>
                <td>วันที่ทำสัญญา:<span class="value">27/08/61</span></td>
              </tr>
              <!-- <tr>
                <td colspan="2">งานปัจจุบัน:<span class="value">ทำสัญญาก่อสร้าง</span></td>
              </tr> -->
            </table>
          </div>
          <div class="block c-body">
            <table class="table rows-table is-hoverable">
              <thead>
                <tr>
                  <th>รายละเอียดงาน</th>
                  <th>วันที่ตามสัญญา</th>
                  <th>วันที่ทำจริง</th>
                  <th>สถานะ</th>
                  <th>งวด</th>
                </tr>
              </thead>
              <!-- <tbody>
                <tr>
                  <td>10000 : *Confirm Lay-Out</td>
                  <td>05/01/61</td>
                  <td>05/01/61</td>
                  <td>เสร็จแล้ว</td>
                  <td>20</td>
                </tr>
                <tr>
                  <td>11000 : ตอกเสาเข็ม</td>
                  <td>11/01/61</td>
                  <td>20/03/61</td>
                  <td>เสร็จแล้ว</td>
                  <td>20</td>
                </tr>
                <tr>
                  <td>11825 : กำหนด_ติดตั้งทดสอบความสมบูรณ์เสาเข็ม</td>
                  <td>11/02/61</td>
                  <td>30/03/61</td>
                  <td>ยังไม่เสร็จ</td>
                  <td>20</td>
                </tr>
                <tr>
                  <td>12100 : *ทำสัญญาก่อสร้าง</td>
                  <td>05/01/61</td>
                  <td>28/02/61</td>
                  <td>เสร็จแล้ว</td>
                  <td>19</td>
                </tr>
              </tbody> -->
            </table>
          </div>
          <div class="block c-extend">
            <div class="container-block period">
              <div class="block container-block" :key="index" v-for="(item, index) in local.inputs.contractTime">
                <label class="checkbox" >
                  <!-- @click="updateContractTime($event, item.id, item.is_success)" -->
                  <input type="checkbox" @change="updateContractTime(item.id, item.time)" :ref="`time_${item.time}`" :checked="item.is_success">
                  งวดที่ {{item.time}}
                </label>
              </div>
            </div>
          </div>
        </div>
        <div class="container-block footer-panel">
          <my-action
              type="update"
              :obj="{title: 'เริ่มดำเนินงาน', color: 'is-warning'}"
              @clickEvent="submitForm('update', 'ip')"
              v-if="local.inputs.contract.status == 'wait'"
            >
            </my-action>
          <my-action
            type="update"
            :obj="{title: 'ปิดงาน (เสร็จสิ้น)', color: 'is-success'}"
            @clickEvent="submitForm('update', 'done')"
            v-if="local.inputs.contract.status == 'ip'"
          >
          </my-action>
        </div>
      </template>
    </template>
    <!-- <template v-else>
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
    </template> -->
  </option-detail-template>
</template>

<script>
import breadcrumbBar from '@Components/Breadcrumb'
import optionDetailTemplate from '@Components/Template/option-detail'
// import service from '@Services/app-service'
import config from '@Config/app.config'
import service from '@Services/app-service'
import dataTable from '@Components/DataTable'
import myAction from '@Components/Form/my-action'
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
    dataTable,
    myAction
  },
  name: 'ContractPage',
  data () {
    return {
      local: {
        pageObj: {
          items: [
            {name: 'ข้อมูลสัญญา', route: 'Contract', key: 'test', active: true, icon: 'fa fa-file-text'}
          ],
          template: {
            class: 'contract-page'
          }
        },
        statusSearch: [
          {title: 'ทั้งหมด', key: ''},
          {title: 'เสร็จสิ้น', key: 'done'},
          {title: 'รออนุมัติ', key: 'wait'},
          {title: 'ดำเนินการ', key: 'ip'}
        ],
        idSelected: null,
        inputs: {
          project: {},
          contractTime: {},
          contract: {}
        }
      }
    }
  },
  computed: {
    resourceName () {
      return config.api.contract.index
    }
  },
  created () {
    // console.log('created')
    // this.property = 'Example property update.'
    // console.log('propertyComputed will update, as this.property is now reactive.')
  },
  methods: {
    async selectedDataHandle (item) {
      this.local.idSelected = item.code
      let queryString = this.BUILDPARAM({type: 'full'})
      let contractItem = await service.getResource({
        resourceName: `${config.api.contract.index}/${item.code}`,
        queryString
      })
      this.local.inputs.project = contractItem.data.project
      this.local.inputs.contract = contractItem.data.contract
      this.local.inputs.contractTime = contractItem.data.contractTime
    },
    async updateContractTime (id, time) {
      let ele = `time_${time}`
      let data = {
        isSuccess: this.$refs[ele][0].checked
      }
      let resourceName = `${config.api.contract.time}/${id}`
      let res = await service.putResource({data, resourceName})
      if (res.status === 200) {
        this.NOTIFY('success')
      } else {
        this.NOTIFY('error')
      }
    },
    async submitForm (type) {
      // let isValid = await this.$validator.validateAll()
      // let resourceName = this.resourceName
      if (type === 'update' && this.local.idSelected === 'new') type = 'save'
      // let data = {}
      let res = null
      switch (type) {
        case 'add':
          // this.local.idSelected = 'new'
          // this.cleanInput()
          return
        case 'cancel':
          this.local.idSelected = null
          return
        case 'update':
          // if (!isValid) return
          // data = this.local.inputs
          // resourceName = `${resourceName}/${this.local.idSelected}`
          // res = await service.putResource({data, resourceName})
          break
        case 'delete':
          // resourceName = `${resourceName}/${this.local.idSelected}`
          // let queryString = []
          // res = await service.deleteResource({resourceName, queryString})
          break
        case 'save':
          // if (!isValid) return
          // data = this.local.inputs
          // res = await service.postResource({data, resourceName})
          break
      }
      if (res.status === 200) {
        this.local.idSelected = null
        this.NOTIFY('success')
        return
      }
      this.NOTIFY('error')
    }
  }
}
</script>

<style lang="scss">
</style>
