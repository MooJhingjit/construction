<template>
  <option-detail-template
  :templateObj="local.pageObj.template"
  :isSelected="local.idSelected"
  @cancleForm="submitForm('cancel')"
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
      <button class="button is-link" @click="submitForm('add')">เพิ่มข้อมูลใหม่</button>
    </template>
    <template v-if="local.idSelected != ''">
    <!-- <template v-if="true"> -->
      <template slot="detail">
        <div class="container-block  detail-block">
          <div class="form-detail">
            <!-- <div class="name">ช่าง1 ทดสอบ</div> -->
            <div class="container-block">
              <div class="text-title">ชื่อ-นามสกุล</div>
              <div class="value">
                 <my-input
                  :value="local.inputs.name"
                  :inputObj="{type: 'text', name: 'user_name', placeholder: 'ชื่อ-นามสกุล', validate: 'required'}"
                  :validator="$validator"
                  @input="value => { local.inputs.name = value }"
                  ></my-input>
              </div>
            </div>
            <div class="container-block">
              <div class="text-title">ประเภทงาน</div>
              <div class="value">
                  <my-input
                  :value="local.inputs.job_type"
                  :inputObj="{type: 'select', icon: 'home', inputValue: TECHNICIANJOBTYPE, name: 'user_jobType', placeholder: 'ประเภทงาน', validate: 'required'}"
                  :validator="$validator"
                  @input="value => { local.inputs.jobType = value }"
                  ></my-input>
              </div>
            </div>
            <div class="container-block">
              <div class="text-title">เบอร์โทรศัพท์</div>
              <div class="value">
                <my-input
                  :value="local.inputs.phone"
                  :inputObj="{type: 'text', name: 'user_phone', placeholder: 'เบอร์โทรศัพท์', validate: 'required'}"
                  :validator="$validator"
                  @input="value => { local.inputs.phone = value }"
                  ></my-input>
              </div>
            </div>
          </div>
        </div>
        <div class="container-block footer-panel">
          <!-- <my-action
            type="print"
            :obj="{title: 'ใบปะหน้า', isComfirm: false}"
            @clickEvent="printWorkSheet('print')"
          >
          </my-action>
          <my-action
            type="print"
            :obj="{title: 'รายการจ่าย', isComfirm: false}"
            @clickEvent="printWorkSheet('print')"
          >
          </my-action> -->
          <my-action
            type="update"
            :obj="{title: 'บันทึกข้อมูล'}"
             @clickEvent="submitForm('update')"
          >
          </my-action>
          <my-action
            type="delete"
            :obj="{title: 'ลบข้อมูล'}"
            @clickEvent="submitForm('delete')"
            v-if="local.idSelected != 'new'"
          >
          </my-action>
        </div>
      </template>
    </template>
    <template v-else slot="detail">
    </template>
  </option-detail-template>
</template>

<script>
import breadcrumbBar from '@Components/Breadcrumb'
import optionDetailTemplate from '@Components/Template/option-detail'
import service from '@Services/app-service'
import config from '@Config/app.config'
import dataTable from '@Components/DataTable'
import myInput from '@Components/Form/my-input'
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
    myInput,
    myAction
  },
  name: 'UserPage',
  data () {
    return {
      local: {
        pageObj: {
          items: [
            {name: 'จ่ายค่างวด', route: 'PayingPeriod', key: '', active: false, icon: 'fa fa-exchange'},
            {name: 'รายชื่อช่าง', route: 'Technician', key: '', active: true, icon: ''}
          ],
          template: {
            class: 'technician-page'
          }
        },
        isOptionMinimize: false,
        idSelected: '',
        inputs: {}
      },
      server: {
      }
    }
  },
  computed: {
    resourceName () {
      return config.api.technician.index
    }
  },
  created () {
  },
  methods: {
    selectedDataHandle (item) {
      this.errors.clear()
      this.local.idSelected = item.id
      this.local.inputs = Object.assign({}, item)
      this.local.submitMode = 'update'
    },
    async submitForm (type) {
      let isValid = await this.$validator.validateAll()
      let resourceName = this.resourceName
      if (type === 'update' && this.local.idSelected === 'new') type = 'save'
      let data = {}
      let res = null
      switch (type) {
        case 'add':
          // console.log('add')
          this.local.idSelected = 'new'
          this.cleanInput()
          return
        case 'cancel':
          this.local.idSelected = null
          return
        case 'update':
          if (!isValid || this.local.isDuplicate) return
          data = this.local.inputs
          // console.log(data)
          resourceName = `${resourceName}/${this.local.idSelected}`
          res = await service.putResource({data, resourceName})
          break
        case 'delete':
          resourceName = `${resourceName}/${this.local.idSelected}`
          let queryString = []
          res = await service.deleteResource({resourceName, queryString})
          break
        case 'save':
          if (!isValid || this.local.isDuplicate) return
          data = this.local.inputs
          res = await service.postResource({data, resourceName})
          break
      }
      if (res.status === 200) {
        this.$refs.dataTable.fetchData()
        this.cleanInput()
        this.local.idSelected = ''
        this.NOTIFY('success')
        return
      }
      this.NOTIFY('error')
    },
    cleanInput () {
      for (let key in this.local.inputs) {
        this.local.inputs[key] = ''
      }
      // this.local.inputs.name = ''
      // this.local.inputs.jobId = ''
      // this.local.inputs.phone = ''
    },
    printWorkSheet (items) {
      // this.local.worksheet.header = {
      //   project: this.local.project.value
      // }
      // this.local.worksheet.data = items
      // if (this.$refs.worksheetTemplate.local.dataObj.length > 0) {
      //   this.$refs.worksheetTemplate.printWorkSheet()
      // }
    }
  }
}
</script>

<style lang="scss">
</style>
