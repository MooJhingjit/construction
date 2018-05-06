<template>
  <option-detail-template :templateObj="local.template">
    <template slot="title"><breadcrumb-bar :dataObj="local.pageObj"></breadcrumb-bar></template>
    <template slot="data-table">
      <data-table ref="dataTable"
      :resourceName="resourceName"
      :statusSearch="local.statusSearch"
      @selectedData="selectedDataHandle"
      ></data-table>
    </template>
    <template slot="function">
      <button class="button is-link" @click="submitForm('add')">เพิ่มข้อมูลใหม่</button>
    </template>
    <template v-if="local.idSelected != ''">
      <template slot="detail">
        <div class="container-block detail-block">
          <div class="form-detail">
            <div class="name">{{local.inputs.code}}  {{local.inputs.name}}</div>
            <div class="container-block">
              <div class="text-title">รหัสโครงการ</div>
              <div class="value"><input class="input" type="text" v-model="local.inputs.code" placeholder="รหัสโครงการ" required /></div>
            </div>
            <div class="container-block">
              <div class="text-title">ชื่อโครงการ</div>
              <div class="value"><input class="input" type="text" v-model="local.inputs.name" placeholder="ชื่อโครงการ" required /></div>
            </div>
            <div class="container-block">
              <div class="text-title">ประเภท</div>
              <div class="value">
                <div class="select">
                  <select v-model="local.inputs.type">
                    <option name="นันทวัน">นันทวัน</option>
                    <option name="มัณฑนา">มัณฑนา</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="container-block footer-panel">
          <button class="button" @click="submitForm('edit')">บันทึกข้อมูล</button>
          <button v-if="this.local.idSelected != 'new'" class="button is-danger" @click="submitForm('delete')">ลบข้อมูล</button>
          <button v-if="this.local.idSelected != 'new'" class="button" @click="GOTOPAGE('CreateContract', 'project')">สร้างสัญญาใหม่</button>
          <button v-if="this.local.idSelected != 'new'" class="button" @click="GOTOPAGE('Contract', 'project-id')">สัญญาในโครงการนี้ทั้งหมด</button>
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
import noResultTemplate from '@Components/Template/no-result'
import service from '@Services/app-service'
import config from '@Config/app.config'
import dataTable from '@Components/DataTable'
export default {
  props: {
  },
  components: {
    breadcrumbBar,
    optionDetailTemplate,
    noResultTemplate,
    dataTable
  },
  name: 'UserPage',
  data () {
    return {
      local: {
        pageObj: {
          items: [
            {name: 'โครงการ', route: 'Project', key: 'xxx', active: true, icon: 'fa fa-folder-open-o'}
          ]
        },
        template: {
          class: 'project-page'
        },
        statusSearch: [
          {title: 'ทั้งหมด', name: 'all'},
          {title: 'ดำเนินงาน', name: 'inprocess'},
          {title: 'เสร็จสิ้น', name: 'done'}
        ],
        idSelected: '',
        items: {},
        inputs: {}
      }
    }
  },
  computed: {
    resourceName () {
      return config.api.project.index
    }
  },
  created () {
  },
  methods: {
    selectedDataHandle (item) {
      this.local.idSelected = item.id
      this.local.inputs.code = item.code
      this.local.inputs.name = item.name
      this.local.inputs.type = item.type
      this.local.submitMode = 'edit'
    },
    submitForm (type) {
      let data = {}
      let resourceName = config.api.project.index
      if (type === 'edit' && this.local.idSelected === 'new') {
        type = 'save'
      }
      switch (type) {
        case 'add':
          this.local.idSelected = 'new'
          this.cleanInput()
          break
        case 'save':
          data = this.local.inputs
          service.postResource({data, resourceName})
            .then((res) => {
              if (res.status === 200) {
                this.reloadTable()
                this.local.idSelected = ''
                this.cleanInput()
              }
            })
            .catch((err) => {
              console.log(err)
            })
          break
        case 'delete':
          resourceName = `${resourceName}/${this.local.idSelected}`
          let queryString = []
          service.deleteResource({resourceName, queryString})
            .then((res) => {
              if (res.status === 200) {
                this.reloadTable()
                this.local.idSelected = ''
              }
            })
            .catch((err) => {
              console.log(err)
            })
          break
        case 'edit':
          data = this.local.inputs
          resourceName = `${resourceName}/${this.local.idSelected}`
          service.putResource({data, resourceName})
            .then((res) => {
              if (res.status === 200) {
                this.reloadTable()
                this.local.idSelected = ''
                this.cleanInput()
              }
            })
            .catch((err) => {
              console.log(err)
            })
          break
        case 'cancel':
          this.local.idSelected = ''
          this.local.isOptionMinimize = false
          break
      }
    },
    reloadTable () {
      this.$refs.dataTable.fetchData()
    },
    cleanInput () {
      this.local.inputs.code = ''
      this.local.inputs.name = ''
      this.local.inputs.type = ''
    }
  }
}
</script>

<style lang="scss">
</style>
