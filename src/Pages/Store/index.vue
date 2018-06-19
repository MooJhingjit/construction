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
        <div class="container-block  detail-block">
          <div class="form-detail">
            <div class="name">{{local.inputs.name}} {{local.inputs.type}}</div>
            <div class="container-block">
              <div class="text-title">ชื่อร้านค้า</div>
              <div class="value">
                 <my-input
                  :value="local.inputs.name"
                  :inputObj="{type: 'text', name: 'store_name', placeholder: 'ชื่อร้านค้า', validate: 'required'}"
                  :validator="$validator"
                  @input="value => { local.inputs.name = value }"
                  ></my-input>
              </div>
            </div>
            <div class="container-block">
              <div class="text-title">ประเภทวัสดุ</div>
              <div class="value">
                <my-input
                  :value="local.inputs.type"
                  :inputObj="{type: 'text', name: 'store_type', placeholder: 'ประเภทวัสดุ', validate: ''}"
                  :validator="$validator"
                  @input="value => { local.inputs.type = value }"
                  ></my-input>
              </div>
            </div>
            <div class="container-block">
              <div class="text-title">ติดต่อ</div>
              <div class="value">
                <my-input
                  :value="local.inputs.contact"
                  :inputObj="{type: 'text', name: 'store_contact', placeholder: 'ติดต่อ', validate: ''}"
                  :validator="$validator"
                  @input="value => { local.inputs.contact = value }"
                  ></my-input>
              </div>
            </div>
            <div class="container-block">
              <div class="text-title">แฟกซ์</div>
              <div class="value">
                <my-input
                  :value="local.inputs.fax"
                  :inputObj="{type: 'text', name: 'store_fax', placeholder: 'แฟกซ์', validate: ''}"
                  :validator="$validator"
                  @input="value => { local.inputs.fax = value }"
                  ></my-input>
              </div>
            </div>
            <div class="container-block">
              <div class="text-title">เบอร์โทรศัพท์</div>
              <div class="value">
                <my-input
                  :value="local.inputs.tel"
                  :inputObj="{type: 'text', name: 'store_tel', placeholder: 'เบอร์โทรศัพท์', validate: 'required'}"
                  :validator="$validator"
                  @input="value => { local.inputs.tel = value }"
                  ></my-input>
              </div>
            </div>
            <div class="container-block">
              <div class="text-title">ที่อยู่</div>
              <div class="value">
                <my-input
                  :value="local.inputs.address"
                  :inputObj="{type: 'text', name: 'store_address', placeholder: 'ที่อยู่', validate: ''}"
                  :validator="$validator"
                  @input="value => { local.inputs.address = value }"
                  ></my-input>
              </div>
            </div>
          </div>
        </div>
        <div class="container-block footer-panel">
          <my-action
            type="link"
            :obj="{title: 'รายการสินค้า'}"
            @clickEvent="GOTOPAGE('AddMaterial', local.idSelected)"
            v-if="local.idSelected != 'new'"
          >
          </my-action>
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
            {name: 'ร้านค้า', route: 'Store', key: '', active: true, icon: 'fa fa-th-large'}
          ],
          template: {
            class: 'store-page'
          }
        },
        statusSearch: [],
        idSelected: '',
        inputs: {}
      }
    }
  },
  computed: {
    resourceName () {
      return config.api.store.index
    }
  },
  created () {
  },
  methods: {
    selectedDataHandle (item) {
      this.errors.clear()
      this.local.idSelected = item.id
      this.local.inputs.name = item.name
      this.local.inputs.type = item.type
      this.local.inputs.contact = item.contact
      this.local.inputs.fax = item.fax
      this.local.inputs.tel = item.tel
      this.local.inputs.address = item.address
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
      this.local.inputs.name = ''
      this.local.inputs.type = ''
      this.local.inputs.contact = ''
      this.local.inputs.fax = ''
      this.local.inputs.tel = ''
      this.local.inputs.address = ''
    }
  }
}
</script>

<style lang="scss">
</style>
