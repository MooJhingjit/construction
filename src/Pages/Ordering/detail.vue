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
      <!-- <button class="button is-link" @click="submitForm('add')">เพิ่มข้อมูลใหม่</button> -->
    </template>
    <template v-if="local.idSelected != '' && this.local.inputs != null">
      <template slot="detail">
        <div class="container-block detail-block">
          <div class="block c-header">
            <table class="transparent-table">
              <tr>
                <td>โครงการ:<span class="value">{{project.name}}</span></td>
              </tr>
              <tr>
                <td>เลขที่สัญญา:<span class="value">{{contract.code}}</span></td>
                <td>แปลน:<span class="value">{{contract.contractPlan}}</span></td>
              </tr>
              <tr>
                <td>แบบบ้าน:<span class="value">{{contract.house_id}}</span></td>
                <td>ขั้นตอนการตำเนินงาน:<span class="value">งานพื้นสำเร็จชั้นล่าง</span></td>
              </tr>
              <tr>
                <td>ทั้งหมด:<span class="value">{{ordering.length}} รายการ</span></td>
                <td>จำนวนเงินทั้งหมด<span class="value">1,000 บาท</span></td>
              </tr>
              <!-- <tr>
                <td>คงเหลือ:<span class="value">1 รายการ</span></td>
                <td><span class="value">หนึ่งพันบาทถ้วน</span></td>
              </tr> -->
            </table>
          </div>
          <div class="block c-body">
            <table class="table is-bordered rows-table">
              <thead>
                <tr>
                  <th>ร้านค้า</th>
                  <th>วัสดุ</th>
                  <th>จำนวน</th>
                  <th>ราคา</th>
                </tr>
              </thead>
              <tbody>
                <tr :class="{'active': local.orderIdSelected == item.id}" :key="index" v-for="(item, index) in ordering" @click="selectOrdering(item)">
                  <td width="100">{{item.storeName}}</td>
                  <td>
                      <my-input
                      :key="inputIndex"
                      v-for="(itemDetail, inputIndex) in item.orderDetail"
                      :value="itemDetail.name"
                      :inputObj="{type: 'text', name: `order_name_${itemDetail.id}`, placeholder: '', validate: 'required'}"
                      :validator="$validator"
                      @input="value => { itemDetail.name = value }"
                      ></my-input>
                    <!-- <input class="input" type="text" value="EC-HDFCM8  35X800X2000 MM (เปิดขวา)">
                    <input class="input" type="text" value="HDFCM71  35X700X2000 MM">
                    <input class="input" type="text" value="(HDFCMS54)  3.5x54x90 Cm. ห้องเก็บของ (เปิดขวา)"> -->
                  </td>
                  <td width="20">
                    <my-input
                      :key="inputIndex"
                      v-for="(itemDetail, inputIndex) in item.orderDetail"
                      :value="itemDetail.amount"
                      :inputObj="{type: 'text', name: `order_amount_${itemDetail.id}`, placeholder: '', validate: 'required'}"
                      :validator="$validator"
                      @input="value => { itemDetail.amount = value }"
                      ></my-input>
                  </td>
                  <td width="100">
                    <my-input
                      :key="inputIndex"
                      v-for="(itemDetail, inputIndex) in item.orderDetail"
                      :value="itemDetail.price"
                      :inputObj="{type: 'text', name: `order_price_${itemDetail.id}`, placeholder: '', validate: 'required'}"
                      :validator="$validator"
                      @input="value => { itemDetail.price = value }"
                      ></my-input>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="container-block explain" v-if="local.orderSelected != null">
          <div class="block">
            <table class="transparent-table">
              <tr>
                <td>ร้านค้า: {{getOrderSelected('store')}}</td>
              </tr>
              <tr>
                <td>จำนวน: {{getOrderSelected('amount')}} รายการ</td>
              </tr>
              <tr>
                <td>ราคา: {{getOrderSelected('price')}}</td>
              </tr>
              <tr>
                <td>{{getOrderSelected('priceTxt')}}</td>
              </tr>
              <tr>
                <!-- <td>สถานะ: <span class="tag is-warning">{{getOrderSelected('status')}}</span></td> -->
                <td>สถานะ: {{getOrderSelected('status')}}</td>
              </tr>
              <tr>
                <td>ประเภทการสั่งซื้อ: {{getOrderSelected('orderType')}}</td>
              </tr>
            </table>
          </div>
          <div class="block function container-block">
            <template v-if="this.local.orderSelected.status == 'wait'">
              <button class="button is-outlined">อนุมัติ</button>
            </template>
            <template v-else>
              <button class="button is-outlined">ออกใบสั่งซื้อ</button>
              <button class="button is-outlined">รับของ</button>
            </template>
          </div>
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
  name: 'OrderingDetail',
  data () {
    return {
      local: {
        pageObj: {
          items: [
            {name: 'การสั่งซื้อ', route: 'Ordering', key: '', active: false, icon: 'fa fa-object-group'}
            // {name: 'LH120610029', route: 'OrderingDetail', key: 'LH120610029', active: true, icon: ''}
          ],
          template: {
            class: 'ordering-detail-page'
          }
        },
        statusSearch: [
          {title: 'ปกติ', key: 'normal'},
          {title: 'พิเศษ', key: 'extra'},
          {title: 'รออนุมัติ', key: 'wait'},
          {title: 'รอสินค้า', key: 'confirmed'},
          {title: 'รับสินค้า', key: 'received'}
        ],
        idSelected: '',
        // items: {},
        inputs: null,
        orderSelected: null,
        orderIdSelected: null
      }
    }
  },
  computed: {
    resourceName () {
      return config.api.ordering.index
    },
    project () {
      return this.local.inputs.project
    },
    contract () {
      return this.local.inputs.contract
    },
    ordering () {
      return this.local.inputs.ordering
    },
    
  },
  created () {
  },
  methods: {
    async selectedDataHandle (item) {
      this.local.idSelected = item.contract_code
      let order = await this.getFullOrdering(item)
      this.local.inputs = {}
      this.local.inputs = Object.assign(this.local.inputs, order);
      this.errors.clear()
      // this.local.submitMode = 'update'
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
    async getFullOrdering (item) {
      let resourceName = `${config.api.ordering.index}/${item.contract_code}`
      let queryString = this.BUILDPARAM([])
      let res = await service.getResource({resourceName, queryString})
      return res.data
    },
    // reloadTable () {
    //   this.$refs.dataTable.fetchData()
    // },
    selectOrdering (ordering) {
      this.local.orderIdSelected = ordering.id
      this.local.orderSelected = ordering
    },
    getOrderSelected (type) {
      let res = ''
      switch (type) {
        case 'store':
          res = this.local.orderSelected.storeName
          break
        case 'amount':
          res = this.local.orderSelected.orderDetail.length
          break
        case 'price':
          res = this.local.orderSelected.total_price
          break
        case 'priceTxt':
          res = 'xxxxxxxx'
          break
        case 'status':
          res = this.GET_STATUSNAME(this.local.orderSelected.status)
          break
        case 'orderType':
          res = this.GET_STATUSNAME(this.local.orderSelected.order_type)
          break
      }
      return res
    }
  }
}
</script>

<style lang="scss">
</style>
