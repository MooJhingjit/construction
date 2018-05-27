<template>
  <option-detail-template ref="template" :isSelected="local.inputs.id" :templateObj="local.pageObj.template" @cancleForm="submitForm('cancel')">
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
    <template v-if="local.inputs.id">
      <template slot="detail">
        <div class="container-block detail-block">
          <div class="block result">
            <div class="title-name">กลุ่มวัสดุ</div>
            <div class="name">
              <my-input
                :value="local.inputs.name"
                :inputObj="{type: 'text', name: 'order_group', placeholder: 'ชื่อกลุ่มวัสดุ', validate: 'required'}"
                :validator="$validator"
                @input="value => { local.inputs.name = value }"
                ></my-input>
              <!-- <input type="text" class="input" v-model="local.inputs.name"/> -->
            </div>
            <div class="items">
              <table class="transparent-table">
                <thead>
                  <tr>
                    <td>รายการ</td>
                    <td width="40">จำนวน</td>
                    <td></td>
                  </tr>
                </thead>
                <tbody>
                  <tr :key="index" v-for="(item, index) in local.inputs.lists">
                    <td>{{item.materialId}}</td>
                    <td><input type="number" size="2" v-model="item.amount" class="input"></td>
                    <td><i class="fa fa-times" aria-hidden="true" @click="deleteListsItem(index)"></i></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="block search-material">
            <div class="title-name">ค้นหารายการวัสดุ</div>
            <div class="control has-icons-right">
              <input class="input" type="text" placeholder="">
              <span class="icon is-right">
                <i class="fa fa-search" aria-hidden="true"></i>
              </span>
            </div>
            <div class="items container-block">
              <table>
                <tr @click="addItemsList()">
                  <td>แผ่นพื้นสำเร็จรูป ชนิด3ขา(LLไม่น้อยกว่า450kg/m²) ขนาด 0.35 x 2.83m.(SHEAE KEY 1จุด)</td>
                </tr>
                <tr>
                  <td>แผ่นพื้นสำเร็จรูป ชนิด3ขา(LLไม่น้อยกว่า450kg/m²)  ขนาด 0.35 x 1.94 m.</td>
                </tr>
                <tr>
                  <td>แผ่นพื้นสำเร็จรูป ชนิด3ขา(LLไม่น้อยกว่า200kg/m²) ขนาด 0.35 x 4.03 m.</td>
                </tr>
                <tr>
                  <td>แผ่นพื้นสำเร็จรูป ชนิด3ขา(LLไม่น้อยกว่า200kg/m²) ขนาด 0.35 x 3.35 m.</td>
                </tr>
                <tr>
                  <td>แผ่นพื้นสำเร็จรูป ชนิด3ขา(LLไม่น้อยกว่า200kg/m²) ขนาด 0.35 x 2.40 m.</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
        <div class="container-block footer-panel">
          <button class="button" @click="submitForm('update')">บันทึกข้อมูล</button>
          <button class="button is-danger" @click="submitForm('delete')">ลบข้อมูล</button>
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
    myInput
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
        inputs: {
          id: null,
          name: null,
          lists: []
        }
      }
    }
  },
  computed: {
    resourceName () {
      return config.api.materialGroup.index
    }
  },
  created () {
    // console.log('created')
    // this.property = 'Example property update.'
    // console.log('propertyComputed will update, as this.property is now reactive.')
  },
  updated () {
  },
  methods: {
    selectedDataHandle (item) {
      this.local.inputs.id = item.id
      this.local.inputs.name = item.name
      this.local.inputs.lists = item.detail.map(itemDetail => {
        return {
          materialId: itemDetail.material_id,
          amount: itemDetail.amount
        }
      })
      // this.local.inputs.lists.materialId = item.detail.material_id
      // this.local.inputs.lists.amount = item.detail.amount
    },
    deleteListsItem (index) {
      this.local.inputs.lists.splice(index, 1)
    },
    cleanInput () {
      this.local.inputs.id = null
      this.local.inputs.name = null
      this.local.inputs.lists = []
    },
    submitForm (type) {
      this.$validator.validateAll().then((tf) => {
        if (tf) {
          if (type === 'cancel') {
            this.cleanInput()
            return
          }
          let data = {}
          let resourceName = this.resourceName
          if (type === 'update' && this.local.inputs.id === 'new') {
            type = 'save'
          }
          switch (type) {
            case 'add':
              this.cleanInput()
              this.local.inputs.id = 'new'
              break
            case 'save':
              data = this.local.inputs
              service.postResource({data, resourceName})
                .then((res) => {
                  if (res.status === 200) {
                    this.cleanInput()
                    this.$refs.dataTable.fetchData()
                    this.NOTIFY('success')
                  } else {
                    this.NOTIFY('error')
                  }
                })
                .catch((err) => {
                  console.log(err)
                })
              break
            case 'delete':
              resourceName = `${resourceName}/${this.local.inputs.id}`
              let queryString = null
              service.deleteResource({resourceName, queryString})
                .then((res) => {
                  if (res.status === 200) {
                    this.cleanInput()
                    this.$refs.dataTable.fetchData()
                    this.NOTIFY('success')
                  } else {
                    this.NOTIFY('error')
                  }
                })
                .catch((err) => {
                  console.log(err)
                })
              break
            case 'update':
              data = this.local.inputs
              resourceName = `${resourceName}/${this.local.inputs.id}`
              service.putResource({data, resourceName})
                .then((res) => {
                  if (res.status === 200) {
                    this.$refs.dataTable.fetchData()
                    this.NOTIFY('success')
                  } else {
                    this.NOTIFY('error')
                  }
                })
                .catch((err) => {
                  console.log(err)
                })
              break
          }
        }
      })
    },
    addItemsList () {
      this.local.inputs.lists.push({
        amount: 8,
        materialId: 3
      })
    }
  }
}
</script>

<style lang="scss">
</style>
