<template>
  <option-detail-template ref="template"
  :templateObj="local.pageObj.template"
  :isSelected="local.idSelected"
  @cancleForm="submitForm('cancel')"
  >
    <template slot="title"><breadcrumb-bar :dataObj="local.pageObj"></breadcrumb-bar></template>
    <template slot="data-table">
      <!-- <data-table ref="dataTable"
      tableType="normal"
      :resourceName="resourceName"
      :statusSearch="local.statusSearch"
      @selectedData="contractSelectedHandle"
      ></data-table> -->
      <contract-serach @select="contractSelectedHandle"></contract-serach>
    </template>
    <template slot="function">
      <!-- <button class="button is-link" @click="submitForm('add')">เพิ่มข้อมูลใหม่</button> -->
    </template>
    <template v-if="local.idSelected != null && this.local.inputs != null">
      <template slot="detail">
        <div class="container-block detail-block">
          <div class="block c-header">
            <table class="transparent-table">
              <tr>
                <td>โครงการ:<span class="value is-linkpage" @click="GOTOPAGE('Project', project.name)">{{project.name}}</span></td>
              </tr>
              <tr>
                <td>เลขที่สัญญา:<span class="value is-linkpage" @click="GOTOPAGE('Contract', contract.code)">{{contract.code}}</span></td>
                <td>แปลง:<span class="value">{{contract.contractPlan}}</span></td>
              </tr>
              <tr>
                <td>แบบบ้าน:<span class="value">{{contract.house_id}}</span></td>
                <td>ทั้งหมด:<span class="value">{{ordering.length}} รายการ</span></td>
              </tr>
              <tr>
                <td>จำนวนเงินที่ชำระแล้ว:<span class="value">{{getPrice('confirmed')}} บาท</span></td>
                <td>จำนวนเงินที่รอชำระ:<span class="value">{{getPrice('wait')}} บาท</span></td>
              </tr>
            </table>
          </div>
          <div class="block c-body">
            <div class="filter">
              <div class="search-status">
                <div class="tags">
                  <span :class="['tag', {'is-warning': local.filterKey === item.key}]" @click="filterItems(item.key)" :key="index" v-for="(item, index) in local.filterItem">{{item.title}}</span>
                </div>
              </div>
            </div>
            <table class="table is-bordered rows-table">
              <thead>
                <tr>
                  <th>ร้านค้า</th>
                  <th>วัสดุ</th>
                  <th>จำนวน</th>
                  <th>ราคารวม</th>
                  <th>สถานะ</th>
                </tr>
              </thead>
              <tbody>
                <tr :class="{'active': local.orderIdSelected == item.id, 'extra': item.order_type == 'extra'}" :key="index" v-for="(item, index) in ordering" @click="selectOrdering(item)">
                  <td width="100">{{item.storeName}}</td>
                  <td>
                    <template v-if="item.status === 'wait' ">
                      <my-input
                      :key="inputIndex"
                      v-for="(itemDetail, inputIndex) in item.orderDetail"
                      :value="itemDetail.name"
                      :inputObj="{type: 'text', name: `order_name_${itemDetail.id}`, placeholder: '', validate: 'required'}"
                      :validator="$validator"
                      @input="value => { itemDetail.name = value }"
                      ></my-input>
                    </template>
                    <template v-else>
                      <p class="material-name" :key="inputIndex" v-for="(itemDetail, inputIndex) in item.orderDetail">{{itemDetail.name}}</p>
                    </template>
                  </td>
                  <td width="80">
                    <template v-if="item.status === 'wait'">
                      <my-input
                      :key="inputIndex"
                      v-for="(itemDetail, inputIndex) in item.orderDetail"
                      :value="itemDetail.amount"
                      :inputObj="{type: 'number', name: `order_amount_${itemDetail.id}`, placeholder: '', validate: 'required'}"
                      :validator="$validator"
                      @input="value => updateValue(index, inputIndex, value, 'amount')"
                      ></my-input>
                    </template>
                    <template v-else>
                      <p :key="inputIndex" v-for="(itemDetail, inputIndex) in item.orderDetail">{{itemDetail.amount}}</p>
                    </template>
                  </td>
                  <td width="120">
                    <template v-if="item.status === 'wait' ">
                      <my-input
                      :key="inputIndex"
                      v-for="(itemDetail, inputIndex) in item.orderDetail"
                      :value="itemDetail.price"
                      :inputObj="{type: 'number', name: `order_price_${itemDetail.id}`, placeholder: '', validate: 'required'}"
                      :validator="$validator"
                       @input="value => updateValue(index, inputIndex, value, 'price')"
                      ></my-input>
                    </template>
                    <template v-else>
                      <p :key="inputIndex" v-for="(itemDetail, inputIndex) in item.orderDetail">{{NUMBERWITHCOMMAS(itemDetail.price, 2)}}</p>
                    </template>
                  </td>
                  <td width="100">{{GET_STATUSNAME(item.status)}}<br/>{{SET_DATEFORMAT(item.created_at)}}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="container-block explain" v-if="local.orderSelected != null">
          <div class="block">
            <table class="table">
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
                <td>สถานะ: {{getOrderSelected('status')}}</td>
              </tr>
              <tr>
                <td>ประเภทการสั่งซื้อ: {{getOrderSelected('orderType')}}</td>
              </tr>
              <tr v-if="local.orderSelected.status === 'confirmed'">
                <td>วันที่อนุมัติ: {{getOrderSelected('date_start')}}</td>
              </tr>
              <tr v-if="local.orderSelected.status === 'wait'">
                <td>วันที่สั่งซื้อ: {{getOrderSelected('date_start')}}</td>
              </tr>
              <tr v-if="local.orderSelected.order_type === 'extra'">
                <td>หมายเหตุ: {{getOrderSelected('note')}}</td>
              </tr>
            </table>
          </div>
          <div class="block function container-block">
            <my-action
             :type="'null'"
              :obj="{title: 'อนุมัติ', color: 'is-warning', isConfirm: true}"
              @clickEvent="submitForm('confirmed')"
              v-if="this.local.orderSelected.status == 'wait'"
            >
            </my-action>
            <my-action
             :type="'null'"
              :obj="{title: 'ลบ', color: 'is-danger', isConfirm: true}"
              @clickEvent="submitForm('delete')"
              v-if="this.local.orderSelected.status == 'wait'"
            >
            </my-action>
            <my-action
             :type="'null'"
              :obj="{title: 'รับของ', color: 'is-success', isConfirm: true}"
              @clickEvent="submitForm('received')"
              v-if="this.local.orderSelected.status == 'confirmed'"
            >
            </my-action>
             <my-action
              :type="'null'"
              :obj="{title: 'ออกใบสั่งซื้อ', color: 'is-info', isConfirm: false}"
              @clickEvent="doReceipt()"
              v-if="this.local.orderSelected.status != 'wait'"
            >
            </my-action>
            <!-- <button class="button is-outlined" @click="submitForm('confirmed')" v-if="this.local.orderSelected.status == 'wait'">อนุมัติ</button> -->
            <!-- <button class="button is-outlined" @click="submitForm('delete')" v-if="this.local.orderSelected.status == 'wait'">ลบ</button> -->
            <!-- <button class="button is-outlined" @click="doReceipt()" v-if="this.local.orderSelected.status != 'wait'">ออกใบสั่งซื้อ</button> -->
            <!-- <button class="button is-outlined" @click="submitForm('received')" v-if="this.local.orderSelected.status == 'confirmed'">รับของ</button> -->
          </div>
          <receipt-template class="receipt-template" ref="receiptTemplate" :dataObj="local.receiptObj" ></receipt-template>
        </div>
      </template>
    </template>
    <template v-else slot="detail">
      <no-result-template></no-result-template>
    </template>
  </option-detail-template>
</template>

<script>
import {bus} from '@/main'
import breadcrumbBar from '@Components/Breadcrumb'
import optionDetailTemplate from '@Components/Template/option-detail'
import noResultTemplate from '@Components/Template/no-result'
import service from '@Services/app-service'
import config from '@Config/app.config'
// import dataTable from '@Components/DataTable'
import myInput from '@Components/Form/my-input'
import myAction from '@Components/Form/my-action'
// import myPdf from '@Libraries/pdf'
import receiptTemplate from './receipt-template'
import contractSerach from '@Components/Form/AutoSearch/contract'
export default {
  props: {
  },
  components: {
    breadcrumbBar,
    optionDetailTemplate,
    noResultTemplate,
    // dataTable,
    myInput,
    myAction,
    receiptTemplate,
    contractSerach
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
        statusSearch: [],
        filterItem: [
          {title: 'รออนุมัติ', key: 'wait'},
          {title: 'รอสินค้า', key: 'confirmed'},
          {title: 'รับสินค้า', key: 'received'},
          {title: 'ปกติ', key: 'normal'},
          {title: 'พิเศษ', key: 'extra'},
          {title: 'ทั้งหมด', key: 'all'}
        ],
        idSelected: null,
        inputs: null,
        orderingForShowing: [],
        filterKey: 'all',
        orderSelected: null,
        orderIdSelected: null,
        orderConfirmDate: null,
        receiptObj: {}
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
      return this.local.orderingForShowing
    }
  },
  mounted () {
    if (this.$route.params.key && this.$route.params.key !== 'all') {
      // this.$refs.dataTable.setSearch('ordering', this.$route.params.key)
    }
  },
  methods: {
    async contractSelectedHandle (item) {
      if (item === null) {
        this.cleanInput()
      }
      this.local.idSelected = item.code
      let order = await this.getFullOrdering(item)
      this.local.inputs = {}
      this.local.inputs = Object.assign(this.local.inputs, order)
      this.filterItems('wait')
      this.errors.clear()
    },
    cleanInput () {
      this.local.idSelected = null
      this.local.inputs = null
      this.local.orderingForShowing = []
      this.local.orderSelected = null
      this.local.orderIdSelected = null
      this.local.orderConfirmDate = null
      this.local.receiptObj = {}
    },
    async submitForm (type) {
      let isValid = await this.$validator.validateAll()
      let resourceName = this.resourceName
      if (type === 'update' && this.local.idSelected === 'new') type = 'save'
      let data = {}
      let res = null
      switch (type) {
        case 'confirmed':
        case 'received':
          if (type === 'confirmed') {
            this.local.orderConfirmDate = this.GET_CURRENTDATE()
          }
          if (!isValid) return
          await this.updateOrderingStatus(type)
          resourceName = `${resourceName}/${this.local.orderIdSelected}`
          data = this.local.inputs.ordering.filter((item) => {
            return item.id === this.local.orderIdSelected
          })
          res = await service.putResource({data, resourceName})
          // bus.$emit('setNotification', {type: 'ordering', value: res.data.orderingData})
          break
        case 'cancel':
          this.local.idSelected = null
          return
        case 'delete':
          if (!isValid) return
          await this.updateOrderingStatus(type)
          resourceName = `${resourceName}/${this.local.orderIdSelected}`
          let queryString = []
          res = await service.deleteResource({resourceName, queryString})
          // bus.$emit('setNotification', {type: 'ordering', value: res.data.orderingData})
          break
      }
      if (res.status === 200) {
        bus.$emit('emitSocket', {
          key: 'UPDATE_ORDERING',
          data: {}
        })
        bus.$emit('emitSocket', {
          key: 'UPDATE_ORDERING_STATUS',
          data: {}
        })
        this.reloadTable()
        // this.cleanInput()
        // this.local.idSelected = ''
        this.NOTIFY('success')
        return
      }
      this.NOTIFY('error')
    },
    doReceipt () {
      this.$refs.receiptTemplate.printReceipt()
      // let html = this.$refs.receiptTemplate.getHtm()
      // var win = window.open('', 'Title', 'toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=850,height=500,top=0,left=0')
      // let style = document.createElement('style')
      // style.type = 'text/css'
      // let css = '@media print {@page { margin: 0; }body { margin: 1.5cm 1cm; }}'
      // // let css = ''
      // if (style.styleSheet) {
      //   // This is required for IE8 and below.
      //   style.styleSheet.cssText = css
      // } else {
      //   style.appendChild(document.createTextNode(css))
      // }
      // win.document.getElementsByTagName('head')[0].appendChild(style)
      // win.document.body.innerHTML = html.innerHTML
      // win.focus()
      // win.print()
    },
    async getFullOrdering (item) {
      let resourceName = `${config.api.ordering.index}/${item.code}`
      let queryString = this.BUILDPARAM([])
      let res = await service.getResource({resourceName, queryString})
      return res.data
    },
    unSelectOrdering () {
      this.local.orderSelected = null
      this.local.orderIdSelected = null
      this.local.orderConfirmDate = null
      this.local.receiptObj = {}
    },
    selectOrdering (ordering) {
      this.local.orderIdSelected = ordering.id
      this.local.orderSelected = ordering
      this.local.orderConfirmDate = null
      let store = {
        contact: ordering.storeContact,
        fax: ordering.storeFax,
        name: ordering.storeName,
        tel: ordering.storeTel,
        type: ordering.storeType,
        id: ordering.storeId
      }
      this.local.receiptObj = {
        project: this.local.inputs.project,
        contract: this.local.inputs.contract,
        ordering,
        store
      }
      // console.log(this.local.receiptObj)
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
          res = this.NUMBERWITHCOMMAS(this.local.orderSelected.total_price, 2)
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
        case 'date_start':
        // case 'created_at':
          let date = this.local.orderSelected[type]
          if (this.local.orderConfirmDate !== null) {
            date = this.local.orderConfirmDate
          }
          res = this.SET_DATEFORMAT(date)
          break
        case 'note':
          res = this.local.orderSelected.note
          break
      }
      return res
    },
    async updateOrderingStatus (status) {
      this.local.inputs.ordering.map((item) => {
        if (item.id === this.local.orderIdSelected) {
          item.status = status
        }
      })
    },
    reloadTable () {
      // this.$refs.dataTable.fetchData()
    },
    updateValue (orderingIndex, valueIndex, value, type) {
      switch (type) {
        case 'amount':
          let unitPrice = this.ordering[orderingIndex].orderDetail[valueIndex].unit_price
          this.ordering[orderingIndex].orderDetail[valueIndex][type] = value
          this.ordering[orderingIndex].orderDetail[valueIndex].price = (value * unitPrice).toFixed(2)
          break
        case 'price':
          this.ordering[orderingIndex].orderDetail[valueIndex].price = value
          break
      }
      // console.log('orderingIndex => ' + orderingIndex)
      // console.log('valueIndex => ' + valueIndex)
      // console.log('value => ' + value)
      // console.log('type => ' + type)
      let totalPrice = 0
      this.ordering[orderingIndex].orderDetail.map((item) => {
        totalPrice += parseFloat(item.price)
      })
      this.ordering[orderingIndex].total_price = totalPrice
    },
    filterItems (key) {
      this.unSelectOrdering()
      this.local.filterKey = key
      if (key === 'all') {
        this.local.orderingForShowing = this.local.inputs.ordering
        return
      }
      if (key === 'normal' || key === 'extra') {
        this.local.orderingForShowing = this.local.inputs.ordering.filter((item) => {
          return item.order_type === key
        })
      } else {
        this.local.orderingForShowing = this.local.inputs.ordering.filter((item) => {
          return item.status === key
        })
      }
    },
    getPrice (type) {
      let ordering = this.local.inputs.ordering.filter((item) => {
        return item.status === type
      }).map((item) => {
        return item.orderDetail
      })
      let totalPrice = 0
      ordering.forEach(store => {
        store.map((item) => {
          totalPrice += parseFloat(item.price)
        })
      })
      return this.NUMBERWITHCOMMAS(totalPrice, 2)
    }
  }
}
</script>

<style lang="scss" scoped>
table tbody tr td p.material-name {
  text-overflow: ellipsis;
  overflow: hidden;
  width: 100%;
  white-space: nowrap;
}
.receipt-template{
  display: none;
}
table tr.extra {
  color: red;
}
.filter{
  margin-bottom: 5px;
  .search-status{
    text-align: center;
    .tags{
      justify-content: flex-end;
      .tag{
        cursor: pointer;
        &:hover{
          background: #ffe500;
          color: #000;
        }
      }
    }
  }
}

</style>
