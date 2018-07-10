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
                <td>แปลน: <span class="value">{{local.inputs.contract.contractPlan}}</span></td>
                <td></td>
              </tr>
              <tr>
                <td>วันที่งวด 9 ตามส/ญ:<span class="value">{{getDateFromContract(9)}}</span></td>
                <td>วันที่งวด 9 ตามปมก.:<span class="value">{{getDateFromContract(9)}}</span></td>
              </tr>
              <tr>
                <td>วันที่ End Prod.ตามส/ญ:<span class="value">{{getDateFromContract(10)}}</span></td>
                <td>วันที่ทำสัญญา:<span class="value">{{SET_DATEFORMAT(local.inputs.contract.date_start)}}</span></td>
              </tr>
            </table>
          </div>
          <div class="block c-body" v-if="local.inputs.contract.status == 'ip'">
            <table class="table rows-table is-hoverable">
              <thead>
                <tr>
                  <th>#</th>
                  <th>รายละเอียดงาน</th>
                  <th width="150">กำหนดเริ่มงาน</th>
                  <th width="150">กำหนดเสร็จงาน</th>
                  <th width="150">วันที่เสร็จจริง</th>
                  <th width="80">delay</th>
                  <th>สถานะ</th>
                  <!-- <th>งวด</th> -->
                </tr>
              </thead>
              <tbody>
                <tr :key="index" v-for="(item, index) in local.inputs.progress">
                  <td>{{item.order}}</td>
                  <td>{{item.name}}</td>
                  <td>
                    {{SET_DATEFORMAT(item.start_date)}}
                  </td>
                  <td>{{SET_DATEFORMAT(item.end_date)}}</td>
                  <td>
                    <!-- {{SET_DATEFORMAT(item.real_date)}} -->
                    <my-input
                    :value="SET_DATEFORMAT(item.real_date)"
                    :inputObj="{type: 'text', name: 'contract_datestart', placeholder: 'วันที่เสร็จจริง', validate: ''}"
                    :validator="$validator"
                    @input="value => setRealDate(value, index)"
                    ></my-input>
                  </td>
                  <td>
                    {{item.delay}}
                    <!-- <my-input
                      :value="item.delay"
                      :inputObj="{type: 'text', name: 'contract_type', placeholder: 'delay', validate: ''}"
                      :validator="$validator"
                      @input="value => { item.delay = value }"
                      ></my-input> -->
                  </td>
                  <td>{{getWorkingStatus(item.status)}}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="block c-extend" v-if="local.inputs.contract.status == 'ip'">
            <div class="container-block period">
              <div class="block container-block" :key="index" v-for="(item, index) in local.inputs.contractTime">
                <label class="checkbox" >
                  <input type="checkbox" @change="updateContractTime(item.id, item.time)" :ref="`time_${item.time}`" :checked="item.is_success">
                  งวดที่ {{item.time}}
                </label>
              </div>
            </div>
          </div>
        </div>
        <div class="container-block footer-panel">
          <my-action
              type="updateStatus"
              :obj="{title: 'เริ่มดำเนินงาน', color: 'is-warning', isConfirm: true}"
              @clickEvent="submitForm('updateStatus', 'ip')"
              v-if="local.inputs.contract.status == 'wait'"
            >
            </my-action>
          <my-action
            type="update"
            :obj="{title: 'ปิดงาน (เสร็จสิ้น)', color: 'is-success', isConfirm: true}"
            @clickEvent="submitForm('updateStatus', 'done')"
            v-if="local.inputs.contract.status == 'ip'"
          >
          </my-action>
          <my-action
            type="update"
            :obj="{title: 'บันทึกข้อมูล', color: 'is-info', isConfirm: true}"
            @clickEvent="submitForm('updateProgress')"
            v-if="local.inputs.contract.status == 'ip'"
          >
          </my-action>
        </div>
      </template>
    </template>
  </option-detail-template>
</template>

<script>
import {bus} from '@/main'
import breadcrumbBar from '@Components/Breadcrumb'
import optionDetailTemplate from '@Components/Template/option-detail'
import config from '@Config/app.config'
import service from '@Services/app-service'
import dataTable from '@Components/DataTable'
import myAction from '@Components/Form/my-action'
import myInput from '@Components/Form/my-input'
export default {
  props: {
  },
  components: {
    breadcrumbBar,
    optionDetailTemplate,
    dataTable,
    myAction,
    myInput
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
          contract: {},
          progress: null
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
  },
  mounted () {
    if (this.$route.params.key !== undefined && this.$route.params.key !== 'all') {
      this.$refs.dataTable.searchByText({value: this.$route.params.key})
    }
    // this.$refs.dataTable[0].searchByText({value: this.$route.params.key})
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
      this.local.inputs.progress = contractItem.data.progress
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
    async submitForm (type, value = '') {
      let isValid = await this.$validator.validateAll()
      let resourceName = this.resourceName
      // if (type === 'update' && this.local.idSelected === 'new') type = 'save'
      let data = {}
      let res = null
      switch (type) {
        case 'add':
          // this.local.idSelected = 'new'
          // this.cleanInput()
          return
        case 'cancel':
          this.local.idSelected = null
          return
        case 'updateStatus':
          if (!isValid) return
          data.status = value
          data.houseId = this.local.inputs.contract.house_id
          resourceName = `${config.api.contract.status}/${this.local.idSelected}`
          res = await service.putResource({data, resourceName})
          let obj = res.data.orderingData
          bus.$emit('setNotification', {type: 'ordering', value: obj})
          break
        // case 'update':
        //   if (!isValid) return
        //   resourceName = `${config.api.contract.index}/${this.local.idSelected}`
        //   data = this.local.inputs.progress
        //   res = await service.putResource({data, resourceName})
        //   break
        case 'updateProgress':
          resourceName = `${config.api.contract.progress}/${this.local.idSelected}`
          data = this.local.inputs.progress
          res = await service.putResource({data, resourceName})
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
    },
    getWorkingStatus (code) {
      return config.variable.workingStatus[code]
    },
    getDateFromContract (time) {
      if (this.local.inputs.contractTime[0] !== undefined) {
        return this.SET_DATEFORMAT(this.local.inputs.contractTime[time-1].date_start)
      }
      return null
    },
    setRealDate (value, index) {
      let newFormat = this.SET_DATEFORMAT(value)
      let dateDiff = this.GET_DATEDIFF(this.local.inputs.progress[index].end_date, newFormat)
      this.local.inputs.progress[index].delay = Math.ceil(dateDiff)
      this.local.inputs.progress[index].real_date = value
    }
  }
}
</script>

<style lang="scss">
</style>
