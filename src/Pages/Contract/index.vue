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
    <template v-if="local.item.status === 'success'">
      <template slot="detail">
        <div class="container-block  detail-block">
          <span class="type tag">{{GET_WORKSTATUS(local.item.contract.status)}}</span>
          <div class="block c-header">
            <table class="transparent-table">
              <tr>
              <td>โครงการ:<span class="value">{{local.item.project.name}}</span></td>
              </tr>
              <tr>
                <td>เลขที่สัญญา:<span class="value">{{local.item.contract.code}}</span></td>
                <td>แปลน: <span class="value">{{local.item.contract.plan}}</span></td>
              </tr>
              <tr>
                <td>แบบบ้าน:<span class="value">{{local.item.contract.house_temp}}</span></td>
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
              </tbody>
            </table>
          </div>
          <div class="block c-extend">
            <div class="container-block period">
              <div class="block container-block">
                <label class="checkbox">
                  <input type="checkbox">
                  งวดที่ 1
                </label>
              </div>
              <div class="block container-block">
                <label class="checkbox">
                  <input type="checkbox">
                  งวดที่ 2
                </label>
              </div>
              <div class="block container-block">
                <label class="checkbox">
                  <input type="checkbox">
                  งวดที่ 3
                </label>
              </div>
              <div class="block container-block">
                <label class="checkbox">
                  <input type="checkbox">
                  งวดที่ 4
                </label>
              </div>
              <div class="block container-block">
                <label class="checkbox">
                  <input type="checkbox">
                  งวดที่ 5
                </label>
              </div>
              <div class="block container-block">
                <label class="checkbox">
                  <input type="checkbox">
                  งวดที่ 6
                </label>
              </div>
              <div class="block container-block">
                <label class="checkbox">
                  <input type="checkbox">
                  งวดที่ 7
                </label>
              </div>
              <div class="block container-block">
                <label class="checkbox">
                  <input type="checkbox">
                  งวดที่ 8
                </label>
              </div>
              <div class="block container-block">
                <label class="checkbox">
                  <input type="checkbox">
                  งวดที่ 9
                </label>
              </div>
              <div class="block container-block">
                <label class="checkbox">
                  <input type="checkbox">
                  งวดที่ 10
                </label>
              </div>
              <div class="block container-block">
                <label class="checkbox">
                  <input type="checkbox">
                  งวดที่ 11
                </label>
              </div>
              <div class="block container-block">
                <label class="checkbox">
                  <input type="checkbox">
                  งวดที่ 12
                </label>
              </div>
            </div>
          </div>
        </div>
        <div class="container-block footer-panel">
          <button class="button" v-if="local.item.contract.status == 'wait'">เริ่มดำเนินงาน</button>
          <button class="button">ปิดงาน (เสร็จสิ้น)</button>
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
    dataTable
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
          {title: 'ทั้งหมด', name: ''},
          {title: 'เสร็จสิ้น', name: 'done'},
          {title: 'รออนุมัติ', name: 'wait'},
          {title: 'ดำเนินการ', name: 'ip'}
        ],
        idSelected: null,
        item: {}
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
      this.local.idSelected = item.id
      let queryString = this.BUILDPARAM({type: 'full'})
      let contractItem = await service.getResource({
        resourceName: `${config.api.contract.index}/${item.id}`,
        queryString
      })
      this.local.item = contractItem.data
      // this.local.inputs.code = item.code
      // this.local.inputs.name = item.name
      // this.local.inputs.address = item.address
      // this.local.inputs.type = item.type
      // this.local.submitMode = 'edit'
    }
  }
}
</script>

<style lang="scss">
</style>
