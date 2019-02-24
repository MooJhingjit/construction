<template>
  <section class="section-modal ordering-extra">
    <h4>สั่งซื้อ (ปกติ)</h4>
    <div class="content">
      <div class="field">
        <label class="label">ระบุโครงการ</label>
        <div class="control">
           <my-auto-complete
            @select="projectSelectedHandle"
            :arrInputs="local.project.inputs"
            :config="{getNullVal: false}"
            :validator="$validator"
            placeholder="โครงการ"
            label=""
            ></my-auto-complete>
        </div>
      </div>
      <div class="field" v-if="local.project.selected != null">
        <label class="label">ระบุแบบบ้าน</label>
        <div class="control">
           <my-auto-complete
            @select="houseSelectedHandle"
            :arrInputs="local.house.inputs"
            :config="{getNullVal: false}"
            :validator="$validator"
            placeholder="แบบบ้าน"
            label=""
            ></my-auto-complete>
        </div>
      </div>
      <div class="field" v-if="local.project.selected != null && local.house.selected != null">
        <label class="label">ค้นหาประเภท</label>
        <div class="control">
           <my-auto-complete
            @select="storeSelectedHandle"
            :arrInputs="local.store.inputs"
            :config="{getNullVal: false}"
            :validator="$validator"
            placeholder="ประเภทวัสดุ"
            label=""
            ></my-auto-complete>
        </div>
      </div>
      <div class="field" v-if="local.store.selected != null">
        <label class="label">ค้นหาวัสดุ</label>
        <div class="control">
         <table class="table is-bordered rows-table">
           <thead>
             <tr>
              <th>ชื่อวัสดุ</th>
              <th width="80">จำนวน</th>
              <th width="80">ราคาต่อหน่วย</th>
             </tr>
           </thead>
           <tbody>
             <tr :key="index" v-for="(item, index) in local.materialSelected">
               <td>
                  {{item.name}}
               </td>
               <td>
                 {{item.amount}} {{item.unit}}
               </td>
               <td>{{item.price}}</td>
            </tr>
           </tbody>
         </table>
        </div>
      </div>
    </div>
    <div class="footer" v-if="this.local.store.selected != null && this.local.materialSelected.length">
      <my-action
        type="update"
        :obj="{title: 'ออกใบสั่งซื้อ'}"
        @clickEvent="doReceipt()"
      >
      </my-action>
    </div>
    <receipt-template v-if="local.receiptObj !== null" class="receipt-template" ref="receiptTemplate" :dataObj="local.receiptObj" ></receipt-template>
  </section>
</template>

<script>
// import {bus} from '@/main'
// import contractSerach from '@Components/Form/ContractSearch'
import myAction from '@Components/Form/my-action'
import myAutoComplete from '@Components/Form/my-autocomp'
import config from '@Config/app.config'
import service from '@Services/app-service'
import myInput from '@Components/Form/my-input'
import receiptTemplate from './receipt-template'
export default {
  props: {
  },
  components: {
    // contractSerach,
    myAction,
    myInput,
    myAutoComplete,
    receiptTemplate
  },
  name: 'OrderingExtra',
  data () {
    return {
      local: {
        store: {
          inputs: [],
          selected: null
        },
        project: {
          inputs: [],
          selected: null,
          nameSelected: null
        },
        house: {
          inputs: [],
          selected: null
        },
        materialSelected: [],
        receiptObj: null
      }
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    async fetchData () {
      await this.getProjectData()
      await this.getStoreItems()
    },
    async getProjectData () {
      let queryString = this.BUILDPARAM({})
      let project = await service.getResource({resourceName: config.api.project.dropdown, queryString})
      this.local.project.inputs = project.data
    },
    async getHouseData (projectTypeId) {
      let queryString = this.BUILDPARAM({projectTypeId})
      let house = await service.getResource({resourceName: config.api.house.dropdown, queryString})
      this.local.house.inputs = house.data
    },
    async getStoreItems () {
      let queryString = this.BUILDPARAM({type: 'normal'})
      let store = await service.getResource({resourceName: config.api.store.dropdown, queryString})
      this.local.store.inputs = store.data
    },
    async projectSelectedHandle (obj) {
      if (obj === null) {
        this.local.project.selected = null
        this.local.house.selected = null
        return
      }
      this.local.project.selected = obj.key
      this.local.project.nameSelected = obj.value
      await this.getHouseData(obj.type)
    },
    houseSelectedHandle (obj) {
      if (obj === null) {
        this.local.house.selected = null
        this.local.store.selected = null
        return
      }
      this.local.house.selected = obj.key
    },
    storeSelectedHandle (obj) {
      this.local.materialSelected = []
      if (obj === null) {
        this.local.store.selected = null
        return
      }
      this.local.store.selected = obj.key
      this.orderMaterials()
    },
    async orderMaterials () {
      let queryString = this.BUILDPARAM({
        houseId: this.local.house.selected,
        store: this.local.store.selected,
        project: this.local.project.selected
      })
      let result = await service.getResource({resourceName: config.api.ordering.forward, queryString})
      this.local.materialSelected = result.data.orderDetail
      let ordering = {}
      let totalPrice = 0
      let itemPrice = 0
      ordering.orderDetail = this.local.materialSelected.map((item) => {
        let price = parseFloat(item.price)
        let amount = parseFloat(item.amount)
        itemPrice = price * amount
        totalPrice = itemPrice + totalPrice
        return {
          name: item.name,
          amount: item.amount,
          unit_text: item.unit,
          unit_price: item.price,
          price: itemPrice
        }
      })
      ordering.total_price = totalPrice
      this.local.receiptObj = {
        project: result.data.project,
        store: result.data.store,
        ordering
      }
      // console.log(this.local.receiptObj)
    },
    editRow (type) {
      if (type === 'add') {
        this.local.materialSelected.push({
          obj: null,
          amount: 1
        })
      }
    },
    deleteTime (index) {
      this.local.materialSelected.splice(index, 1)
    },
    cleanData () {
      this.local.materialSelected = this.local.materialSelected.filter((item) => {
        return item.obj != null
      })
    },
    doReceipt () {
      this.$refs.receiptTemplate.printReceipt()
    }
  }
}
</script>

<style lang="scss" scoped>
.ordering-extra{
  min-height: 200px;
}
.receipt-template{
  display: none;
}
</style>
