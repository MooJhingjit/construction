<template>
  <option-detail-template ref="template" :isSelected="local.idSelected" :templateObj="local.pageObj.template" @cancleForm="submitForm('cancel')">
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
    <template v-if="local.idSelected">
      <template slot="detail">
        <div class="container-block detail-block">
          <div class="block result">
            <div class="title-name">
              <div class="label">กลุ่มวัสดุ</div>
              <my-input
                :value="local.inputs.name"
                :inputObj="{type: 'text', name: 'order_group', placeholder: 'ชื่อกลุ่มวัสดุ', validate: 'required'}"
                :validator="$validator"
                @input="value => { local.inputs.name = value }"
                ></my-input>
            </div>
            <div class="items" >
              <table class="transparent-table">
                <thead>
                  <tr>
                    <td width="200">
                      <my-auto-complete
                      @select="houseSelectedHandle"
                      :arrInputs="local.houseTemplate.inputs"
                      :config="{getNullVal: false}"
                      placeholder="ค้นหาแบบบ้าน"
                      label=""
                      ></my-auto-complete>
                    </td>
                    <td>รายการ</td>
                    <td width="40">จำนวน</td>
                    <td></td>
                  </tr>
                </thead>
                <tbody v-if="local.inputs.lists.length">
                  <tr :key="index" v-for="(item, index) in local.inputs.lists">
                    <td>{{item.houseId}}</td>
                    <td>{{item.materialName}}</td>
                    <td><input type="number" size="2" v-model="item.amount" class="input"></td>
                    <!-- <td><i class="fa fa-times" aria-hidden="true" @click="deleteListsItem(index)"></i></td> -->
                  </tr>
                </tbody>
              </table>
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
          >
          </my-action>
          <!-- <button class="button" @click="submitForm('update')">บันทึกข้อมูล</button>
          <button class="button is-danger" @click="submitForm('delete')">ลบข้อมูล</button> -->
          <!-- {{this.local.inputs}} -->
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
    dataTable,
    myInput,
    myAction,
    myAutoComplete
  },
  name: 'OrderingGroup',
  data () {
    return {
      local: {
        pageObj: {
          items: [
            {name: 'กลุ่มวัสดุ', route: 'OrderingGroup', key: 'xxx', active: true, icon: 'fa fa-folder-open-o'}
          ],
          template: {
            class: 'ordering-group-page'
          }
        },
        statusSearch: [],
        idSelected: '',
        inputs: {
          id: null,
          name: null,
          houseId: null,
          lists: []
        },
        lists: [],
        materials: {},
        materialMainSearch: '',
        materialStatusSelected: '',
        houseTemplate: {
          inputs: [],
          selected: null
        }
      }
    }
  },
  computed: {
    resourceName () {
      return config.api.materialGroup.index
    }
  },
  updated () {
  },
  created () {
    this.fetchData()
  },
  methods: {
    // async getMaterialItems () {
    //   let params = []
    //   params['main_search'] = this.local.materialMainSearch
    //   let queryString = this.BUILDPARAM(params)
    //   let materials = await service.getResource({resourceName: config.api.material.dropdown, queryString})
    //   this.local.materials = materials.data
    // },
    async fetchData () {
      let queryString = this.BUILDPARAM()
      let houseTemplate = await service.getResource({resourceName: config.api.house.dropdown, queryString})
      this.local.houseTemplate.inputs = houseTemplate.data
    },
    houseSelectedHandle (objVal) {
      if (objVal === null) {
        this.local.inputs.lists = this.local.lists
        return
      }
      this.local.houseTemplate.selected = objVal
      this.local.inputs.houseId = objVal.key
      this.local.inputs.lists = this.local.lists.filter(item => {
        return item.houseId === objVal.key
      })
      // console.log(this.local.inputs.lists)
    },
    selectedDataHandle (item) {
      this.local.idSelected = item.id
      this.local.inputs.id = item.id
      this.local.inputs.name = item.name
      this.local.inputs.lists = item.detail.map(itemDetail => {
        return {
          materialId: itemDetail.material_id,
          amount: itemDetail.amount,
          houseId: itemDetail.house_id,
          materialName: itemDetail.name
        }
      })
      this.local.lists = this.local.inputs.lists
    },
    deleteListsItem (index) {
      this.local.inputs.lists.splice(index, 1)
    },
    cleanInput () {
      this.local.idSelected = null
      this.local.inputs.id = null
      this.local.inputs.name = null
      this.local.inputs.lists = []
    },
    async submitForm (type) {
      let isValid = await this.$validator.validateAll()
      let resourceName = this.resourceName
      if (type === 'update' && this.local.idSelected === 'new') type = 'save'
      let data = {}
      let res = null
      switch (type) {
        case 'add':
          this.cleanInput()
          this.local.idSelected = 'new'
          return
        case 'cancel':
          this.cleanInput()
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
    // addItemsList () {
    //   this.local.inputs.lists.push({
    //     amount: 8,
    //     materialId: 3
    //   })
    // },
    reloadTable () {
      this.$refs.dataTable.fetchData()
    },
    itemSelectedHandle () {
      //
    }
    // searchValueHandle (val) {
    //   this.local.materialMainSearch = val
    //   this.getMaterialItems()
    // }
    // filterByStatus (key) {
    //   this.local.materialStatusSelected = key
    //   this.getMaterialItems()
    // }
  }
}
</script>

<style lang="scss">
</style>
