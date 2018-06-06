<template>
  <option-detail-template ref="template"
  :templateObj="local.pageObj.template"
  :isSelected="local.idSelected"
  @cancleForm="submitForm('cancel')"
  >
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
        <!-- <div class="close-panel" @click="submitForm('cancel')"><i class="fa fa-times" aria-hidden="true"></i></div> -->
        <div class="container-block detail-block">
          <div class="c-body">
            <div class="form-detail">
              <div class="name">{{local.inputs.code}}  {{local.inputs.name}}</div>
              <div class="container-block">
                <div class="text-title">รหัสโครงการ</div>
                <div class="value">
                  <!-- required|numeric -->
                  <my-input
                  :value="local.inputs.code"
                  :inputObj="{type: 'text', name: 'project_code', placeholder: 'รหัสโครงการ', validate: 'required'}"
                  :validator="$validator"
                  @input="value => { local.inputs.code = value }"
                  ></my-input>
                </div>
              </div>
              <div class="container-block">
                <div class="text-title">ชื่อโครงการ</div>
                <div class="value">
                  <my-input
                  :value="local.inputs.name"
                  :inputObj="{type: 'text', name: 'project_name', placeholder: 'ชื่อโครงการ', validate: 'required'}"
                  :validator="$validator"
                  @input="value => { local.inputs.name = value }"
                  ></my-input>
                </div>
              </div>
              <div class="container-block">
                <div class="text-title">ที่ตั้ง</div>
                <div class="value">
                  <b-field>
                    <b-input
                        type="text"
                        v-model="local.inputs.address"
                        placeholder="ที่ตั้ง" >
                    </b-input>
                  </b-field>
                </div>
              </div>
              <div class="container-block">
                <div class="text-title">ประเภท</div>
                <div class="value">
                  <my-input
                  :value="local.inputs.type"
                  :inputObj="{type: 'select', icon: 'home', inputValue: PROJECT_TYPE, name: 'project_type', placeholder: '', validate: 'required'}"
                  :validator="$validator"
                  @input="value => { local.inputs.type = value }"
                  ></my-input>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="container-block footer-panel">
          <my-action
            type="update"
            :obj="{title: 'บันทึกข้อมูล'}"
             @clickEvent="submitForm('update')"
          >
          </my-action>
          <my-action
            type="link"
            :obj="{title: 'สร้างสัญญาใหม่'}"
            @clickEvent="GOTOPAGE('CreateContract', local.idSelected)"
            v-if="local.idSelected != 'new'"
          >
          </my-action>
          <my-action
            type="link"
            :obj="{title: 'สัญญาในโครงการนี้ทั้งหมด'}"
            @clickEvent="GOTOPAGE('Contract', 'project-id')"
            v-if="local.idSelected != 'new'"
          >
          </my-action>
          <my-action
            type="delete"
            :obj="{title: 'ลบข้อมูล'}"
            @clickEvent="submitForm('delete')"
            v-if="local.idSelected != 'new'"
          >
          </my-action>
          <!-- <button class="button" @click="submitForm('edit')">บันทึกข้อมูล</button>
          <button v-if="this.local.idSelected != 'new'" class="button" @click="GOTOPAGE('CreateContract', local.idSelected)">สร้างสัญญาใหม่</button>
          <button v-if="this.local.idSelected != 'new'" class="button" @click="GOTOPAGE('Contract', 'project-id')">สัญญาในโครงการนี้ทั้งหมด</button>
          <button v-if="this.local.idSelected != 'new'" class="button is-danger" @click="submitForm('delete')">ลบข้อมูล</button> -->
        </div>
      </template>
    </template>
    <template v-else slot="detail">
      <no-result-template></no-result-template>
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
import myInput from '@Components/Form/my-input'
import myAction from '@Components/Form/my-action'
export default {
  props: {
  },
  components: {
    breadcrumbBar,
    optionDetailTemplate,
    noResultTemplate,
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
            {name: 'โครงการ', route: 'Project', key: 'xxx', active: true, icon: 'fa fa-folder-open-o'}
          ],
          template: {
            class: 'project-page'
          }
        },
        statusSearch: [
          {title: 'ทั้งหมด', key: ''},
          {title: 'ดำเนินงาน', key: 'ip'},
          {title: 'เสร็จสิ้น', key: 'done'}
        ],
        idSelected: '',
        // items: {},
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
      this.errors.clear()
      this.local.idSelected = item.id
      this.local.inputs.code = item.code
      this.local.inputs.name = item.name
      this.local.inputs.address = item.address
      this.local.inputs.type = item.type
      this.local.submitMode = 'update'
    },
    // submitForm (type) {
    //   if (type === 'cancel') {
    //     this.local.idSelected = null
    //     return
    //   }
    //   this.$validator.validateAll().then((tf) => {
    //     if (tf) {
    //       let data = {}
    //       let resourceName = config.api.project.index
    //       if (type === 'edit' && this.local.idSelected === 'new') {
    //         type = 'save'
    //       }
    //       switch (type) {
    //         case 'add':
    //           this.local.idSelected = 'new'
    //           this.cleanInput()
    //           break
    //         case 'save':
    //           data = this.local.inputs
    //           service.postResource({data, resourceName})
    //             .then((res) => {
    //               if (res.status === 200) {
    //                 this.reloadTable()
    //                 this.local.idSelected = ''
    //                 this.cleanInput()
    //                 this.NOTIFY('success')
    //               } else {
    //                 this.NOTIFY('error')
    //               }
    //             })
    //             .catch((err) => {
    //               console.log(err)
    //             })
    //           break
    //         case 'delete':
    //           resourceName = `${resourceName}/${this.local.idSelected}`
    //           let queryString = []
    //           service.deleteResource({resourceName, queryString})
    //             .then((res) => {
    //               if (res.status === 200) {
    //                 this.reloadTable()
    //                 this.local.idSelected = ''
    //                 this.NOTIFY('success')
    //               } else {
    //                 this.NOTIFY('error')
    //               }
    //             })
    //             .catch((err) => {
    //               console.log(err)
    //             })
    //           break
    //         case 'edit':
    //           data = this.local.inputs
    //           resourceName = `${resourceName}/${this.local.idSelected}`
    //           service.putResource({data, resourceName})
    //             .then((res) => {
    //               if (res.status === 200) {
    //                 this.reloadTable()
    //                 this.local.idSelected = ''
    //                 this.cleanInput()
    //                 this.NOTIFY('success')
    //               } else {
    //                 this.NOTIFY('error')
    //               }
    //             })
    //             .catch((err) => {
    //               console.log(err)
    //             })
    //           break
    //       }
    //     }
    //   })
    // },
    async submitForm (type) {
      let isValid = await this.$validator.validateAll()
      let resourceName = this.resourceName
      if (type === 'update' && this.local.idSelected === 'new') type = 'save'
      let data = {}
      let res = null
      switch (type) {
        case 'add':
          this.local.idSelected = 'new'
          this.cleanInput()
          return
        case 'cancel':
          this.local.idSelected = null
          return
        case 'update':
          if (!isValid) return
          data = this.local.inputs
          resourceName = `${resourceName}/${this.local.idSelected}`
          res = await service.putResource({data, resourceName})
          break
        case 'delete':
          resourceName = `${resourceName}/${this.local.idSelected}`
          let queryString = []
          res = await service.deleteResource({resourceName, queryString})
          break
        case 'save':
          if (!isValid) return
          data = this.local.inputs
          res = await service.postResource({data, resourceName})
          break
      }
      if (res.status === 200) {
        this.reloadTable()
        this.cleanInput()
        this.local.idSelected = ''
        this.NOTIFY('success')
        return
      }
      this.NOTIFY('error')
    },
    reloadTable () {
      this.$refs.dataTable.fetchData()
    },
    cleanInput () {
      this.local.inputs.code = ''
      this.local.inputs.name = ''
      this.local.inputs.address = ''
      this.local.inputs.type = ''
    }
  }
}
</script>

<style lang="scss">
</style>
