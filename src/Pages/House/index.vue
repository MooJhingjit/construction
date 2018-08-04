<template>
  <option-detail-template ref="template" :templateObj="local.pageObj.template" :isSelected="local.idSelected"  @cancleForm="submitForm('cancel')">
    <template slot="title"><breadcrumb-bar :dataObj="local.pageObj"></breadcrumb-bar></template>
    <template slot="data-table">
      <data-table ref="dataTable"
      tableType="normal"
      :resourceName="resourceName"
      :statusSearch="statusSearch"
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
            <div class="name">{{local.inputs.plan}}  {{local.inputs.name}}</div>
              <div class="container-block">
                <div class="text-title">แปลง</div>
                <div class="value">
                   <my-input
                    :value="local.inputs.plan"
                    :inputObj="{type: 'text', name: 'house_plan', placeholder: 'แปลง', validate: ''}"
                    :validator="$validator"
                    @input="value => { local.inputs.plan = value }"
                    ></my-input>
                  <!-- <input type="text" value="G03" placeholder="Primary input" class="input"> -->
                </div>
              </div>
              <div class="container-block">
                <div class="text-title">แบบบ้าน</div>
                <div class="value">
                  <!-- <input type="text" value="098SW319I" placeholder="Primary input" class="input"> -->
                  <my-input
                    :value="local.inputs.name"
                    :inputObj="{type: 'text', name: 'house_name', placeholder: 'แบบบ้าน', validate: 'required'}"
                    :validator="$validator"
                    @input="value => { local.inputs.name = value }"
                    ></my-input>
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
              <div class="container-block">
                <div class="text-title">เมนูกระเบื้อง</div>
                <div class="value">
                  <!-- <input type="text" value="098SW-8SR2" placeholder="Primary input" class="input"> -->
                  <my-input
                    :value="local.inputs.tile"
                    :inputObj="{type: 'text', name: 'house_tile', placeholder: 'เมนูกระเบื้อง', validate: 'required'}"
                    :validator="$validator"
                    @input="value => { local.inputs.tile = value }"
                    ></my-input>
                </div>
              </div>
              <div class="container-block">
                <div class="text-title">โรงจอดรถ</div>
                <div class="value">
                   <my-input
                    :value="local.inputs.garage"
                    :inputObj="{type: 'select', icon: 'home', inputValue: LEFTRIGHT, name: 'house_garage', placeholder: 'โรงจอดรถ', validate: 'required'}"
                    :validator="$validator"
                    @input="value => { local.inputs.garage = value }"
                    ></my-input>
                </div>
              </div>
              <div class="container-block">
                <div class="text-title">บันไดวน</div>
                <div class="value">
                  <my-input
                    :value="local.inputs.stair"
                    :inputObj="{type: 'select', icon: 'home', inputValue: LEFTRIGHT, name: 'house_stair', placeholder: 'บันไดวน', validate: 'required'}"
                    :validator="$validator"
                    @input="value => { local.inputs.stair = value }"
                    ></my-input>
                </div>
              </div>
              <div class="container-block">
                <div class="text-title">เมนูสี</div>
                <div class="value">
                  <my-input
                    :value="local.inputs.color"
                    :inputObj="{type: 'select', icon: 'home', inputValue: HOUSECOLOR, name: 'house_stair', placeholder: 'เมนูสี', validate: 'required'}"
                    :validator="$validator"
                    @input="value => { local.inputs.color = value }"
                    ></my-input>
                </div>
                <!-- <div class="select">
                  <select>
                    <option>B3PW-1</option>
                    <option>B3PW-2</option>
                    <option>B3PW-3</option>
                  </select>
                </div> -->
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
            type="delete"
            :obj="{title: 'ลบข้อมูล'}"
             @clickEvent="submitForm('delete')"
             v-if="this.local.idSelected != 'new'"
          >
          </my-action>
          <!-- <button class="button" @click="submitForm('editupdate')">บันทึกข้อมูล</button> -->
          <!-- <button v-if="this.local.idSelected != 'new'" class="button is-danger" @click="submitForm('delete')">ลบข้อมูล</button> -->
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
            {name: 'แบบบ้าน', route: 'Project', key: '', active: true, icon: 'fa fa-home'}
          ],
          template: {
            class: 'house-template-page'
          }
        },
        // statusSearch: this.statusSearch,
        idSelected: '',
        items: {},
        inputs: {}
      }
    }
  },
  computed: {
    resourceName () {
      return config.api.house.index
    },
    statusSearch () {
      let obj = config.variable.projectType.map(item => {
        return {
          title: item.name,
          key: item.key
        }
      })
      return obj
    }
  },
  created () {
    // console.log(this.statusSearch)
  },
  methods: {
    selectedDataHandle (item) {
      this.errors.clear()
      this.local.idSelected = item.id
      this.local.inputs.plan = item.plan
      this.local.inputs.name = item.name
      this.local.inputs.type = item.type
      this.local.inputs.tile = item.tile
      this.local.inputs.garage = item.garage
      this.local.inputs.stair = item.stair
      this.local.inputs.color = item.color
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
    //       let resourceName = config.api.house.index
    //       if (type === 'update' && this.local.idSelected === 'new') {
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
    //                 this.$refs.dataTable.fetchData()
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
    //                 this.$refs.dataTable.fetchData()
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
    //         case 'editupdate':
    //           data = this.local.inputs
    //           resourceName = `${resourceName}/${this.local.idSelected}`
    //           service.putResource({data, resourceName})
    //             .then((res) => {
    //               if (res.status === 200) {
    //                 this.$refs.dataTable.fetchData()
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
      this.local.inputs.plan = ''
      this.local.inputs.name = ''
      this.local.inputs.type = ''
      this.local.inputs.tile = ''
      this.local.inputs.garage = ''
      this.local.inputs.stair = ''
      this.local.inputs.color = ''
    }
  }
}
</script>

<style lang="scss">
</style>
