<template>
  <section class="section-modal ordering-extra">
    <h4>สั่งซื้อ (ปกติ)</h4>
    <div class="content">
      <div class="field">
        <label class="label">ค้นหาประเภท</label>
        <div class="control">
           <my-auto-complete
            @select="storeSelectedHandle"
            :arrInputs="local.store.inputs"
            :validator="$validator"
            placeholder="ประเภทวัสดุ"
            label=""
            ></my-auto-complete>
        </div>
      </div>
      <div class="field">
        <label class="label">ค้นหาวัสดุ</label>
        <div class="control">
         <table class="table is-bordered rows-table">
           <thead>
             <tr>
              <th>ชื่อวัสดุ</th>
              <th width="80">จำนวน</th>
              <!-- <th width="80"></th> -->
             </tr>
           </thead>
           <tbody>
             <tr :key="index" v-for="(item, index) in local.materialSelected">
               <td>
                  {{item.obj.value}}
               </td>
               <td>
                  <my-input
                  :value="item.amount"
                  :inputObj="{type: 'text', isBlur: true, name: 'amount', placeholder: 'จำนวน', validate: 'required'}"
                  :validator="$validator"
                  @input="value => { item.amount = value }"
                  ></my-input>
               </td>
               <!-- <td><button disabled="disabled" class="button is-danger" @click="deleteTime(index)"><i class="fa fa-trash"></i></button></td> -->
             </tr>
           </tbody>
         </table>
         <!-- <div class="options">
           <button class="button" @click="editRow('add')"><i aria-hidden="true" class="fa fa-plus"></i></button>
         </div> -->
        </div>
      </div>
      <!-- <div class="field"  v-if="this.local.contract.selected != null && this.local.materialSelected.length">
        <label class="label">หมายเหตุ</label>
        <div class="control">
           <my-input
            :value="local.note"
            :inputObj="{type: 'textarea', isBlur: false, name: 'note', placeholder: 'หมายเหตุ', validate: 'required'}"
            :validator="$validator"
            @input="value => { local.note = value }"
            ></my-input>
        </div>
      </div> -->
    </div>
    <div class="footer" v-if="this.local.store.selected != null && this.local.materialSelected.length">
      <my-action
        type="update"
        :obj="{title: 'ออกใบสั่งซื้อ'}"
        @clickEvent="submitForm()"
      >
      </my-action>
    </div>
  </section>
</template>

<script>
import {bus} from '@/main'
// import contractSerach from '@Components/Form/ContractSearch'
import myAction from '@Components/Form/my-action'
import myAutoComplete from '@Components/Form/my-autocomp'
import config from '@Config/app.config'
import service from '@Services/app-service'
import myInput from '@Components/Form/my-input'
export default {
  props: {
  },
  components: {
    // contractSerach,
    myAction,
    myInput,
    myAutoComplete
  },
  name: 'OrderingExtra',
  data () {
    return {
      local: {
        // contract: {
        //   inputs: [],
        //   selected: null
        // },
        store: {
          inputs: [],
          selected: null
        },
        // materialItems: [],
        materialSelected: [],
        // note: ''
      }
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    async fetchData () {
      this.getStoreItems()
    },
    async getStoreItems () {
      let queryString = this.BUILDPARAM({type: 'normal'})
      let store = await service.getResource({resourceName: config.api.store.dropdown, queryString})
      this.local.store.inputs = store.data
    },
    storeSelectedHandle (obj) {
      this.local.materialSelected = []
      if (obj === null) {
        this.local.store.selected = null
        return
      }
      this.local.store.selected = obj.key
      this.getMaterialItems()
    },
    async getMaterialItems () {
      let queryString = this.BUILDPARAM({
        contractId: 'null',
        store: this.local.store.selected
      })
      let material = await service.getResource({resourceName: config.api.material.dropdown, queryString})
      // this.local.materialItems = material.data
      this.local.materialSelected = material.data.map((item) => {
        return {
          obj: {
            key: item.key,
            value: item.value,
          },
          amount: 1
        }
      })
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
    async submitForm () {
      this.cleanData()
      let isValid = await this.$validator.validateAll()
      if (!isValid) return
      // let resourceName = `${config.api.ordering.extra}`
      // let data = {
      //   contract: 'pre_order',
      //   materials: this.local.materialSelected,
      //   note: 'Pre order'
      // }
      // let res = await service.postResource({data, resourceName})
      // if (res.status === 200) {
      //   let obj = res.data.orderingData
      //   bus.$emit('setNotification', {type: 'ordering', value: obj})
      //   this.NOTIFY('success')
      //   this.GOTOPAGE('OrderingDetail', 'all')
      //   return
      // }
      // this.NOTIFY('error')
    },
    cleanData () {
      this.local.materialSelected = this.local.materialSelected.filter((item) => {
        return item.obj != null
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.ordering-extra{
  min-height: 200px;
}
</style>
