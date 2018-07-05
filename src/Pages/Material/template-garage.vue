<template>
  <div class="table-template">
    <table class="table is-hoverable">
      <thead>
        <tr>
          <th>รายการ</th>
          <th width="80">จำนวนเริ่มต้น</th>
          <th width="80">หน่วย</th>
          <th width="80">ราคา/หน่วย</th>
          <!-- <th colspan="4">{{obj.houseTemplate.value}}</th> -->
          <th width="120">โรงรถซ้าย
            <br />
            <div class="select">
              <my-input
              :value="local.colorSelected.leftColor"
              :inputObj="{type: 'select', icon: 'home', inputValue: HOUSECOLOR, name: 'house_stair', placeholder: 'เมนูสี', validate: ''}"
              :validator="$validator"
              @input="value => { local.colorSelected.leftColor = value }"
              @change="setLeftColor"
              ></my-input>
            </div>
          </th>
          <th width="120">โรงรถขวา
            <br />
            <div class="select">
              <my-input
              :value="local.colorSelected.rightColor"
              :inputObj="{type: 'select', icon: 'home', inputValue: HOUSECOLOR, name: 'house_stair', placeholder: 'เมนูสี', validate: ''}"
              :validator="$validator"
              @input="value => { local.colorSelected.rightColor = value}"
              @change="setRightColor"
              ></my-input>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr :key="index" v-for="(item, index) in inputsItem">
          <td>
            <my-input
              :value="item.name"
              :inputObj="{type: 'text', name: `name_${index}`, placeholder: 'รายการ', validate: 'required'}"
              :validator="$validator"
              @input="value => { item.name = value }"
              ></my-input>
          </td>
          <!-- <td>
            <my-input
              :value="item.delay"
              :inputObj="{type: 'text', name: `delay_${index}`, placeholder: '', validate: ''}"
              :validator="$validator"
              @input="value => { item.delay = value }"
              ></my-input>
          </td> -->
          <td>
            <my-input
              :value="item.amount"
              :inputObj="{type: 'text', name: `amount_${index}`, placeholder: 'หน่วย', validate: 'required'}"
              :validator="$validator"
              @input="value => { item.amount = value }"
              ></my-input>
          </td>
          <td>
            <my-input
              :value="item.unit"
              :inputObj="{type: 'text', name: `unit_${index}`, placeholder: '', validate: 'required'}"
              :validator="$validator"
              @input="value => { item.unit = value }"
              ></my-input>
          </td>
          <td>
            <my-input
              :value="item.price"
              :inputObj="{type: 'text', name: `price_${index}`, placeholder: 'ราคา/หน่วย', validate: 'required'}"
              :validator="$validator"
              @input="value => { item.price = value }"
              ></my-input>
          </td>
          <td>
            <my-input
              :value="item.l_default[local.colorSelected.leftColor]"
              :inputObj="{type: 'text', name: `left_${index}`, placeholder: 'ซ้าย', validate: 'required'}"
              :validator="$validator"
              @input="value => { item.l_default[local.colorSelected.leftColor] = value }"
              ></my-input>
          </td>
          <td>
            <my-input
              :value="item.r_default[local.colorSelected.rightColor]"
              :inputObj="{type: 'text', name: `right_${index}`, placeholder: 'ขวา', validate: 'required'}"
              :validator="$validator"
              @input="value => { item.r_default[local.colorSelected.rightColor] = value }"
              ></my-input>
          </td>
          <!-- <td>
             <my-tags-selection
            :objInputs="{label: 'เลือกกลุ่มวัสดุ', placeholder: 'เพิ่มกลุ่มวัสดุ'}"
            :resourceName="materialGroupResource"
            :itemSelected="item.materialGroup"
            @selected="value => { item.materialGroup = value }"
            ></my-tags-selection>
          </td> -->
        </tr>
      </tbody>
    </table>
    <div class="item-footer container-block">
      <div class="container-block block right">
          <my-input
            :value="local.materialDelayAll"
            :inputObj="{type: 'text', name: `order_delay`, placeholder: 'กำหนดของเข้า', validate: 'required'}"
            :validator="$validator"
            @input="addMaterialDelay"
         ></my-input>
         <my-tags-selection
          v-if="this.local.items.length"
          :objInputs="{label: 'เลือกกลุ่มวัสดุ', placeholder: 'เพิ่มกลุ่มวัสดุ'}"
          :resourceName="materialGroupResource"
          :itemSelected="local.materialGroupAll"
          @selected="addMaterialToGroup"
          ></my-tags-selection>
        <button class="button" @click="editRow('remove')"><i class="fa fa-minus" aria-hidden="true"></i></button>
        <button class="button" @click="editRow('add')"><i class="fa fa-plus" aria-hidden="true"></i></button>
      </div>
      <div class="container-block block action" v-if="this.local.items.length">
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
      </div>
    </div>
  </div>
</template>

<script>
import myInput from '@Components/Form/my-input'
import config from '@Config/app.config'
import service from '@Services/app-service'
import myAction from '@Components/Form/my-action'
import myTagsSelection from '@Components/Form/my-tags-selection'
export default {
  name: 'materialTempalte',
  components: {
    myInput,
    myAction,
    myTagsSelection
  },
  props: {
    obj: {
      type: Object,
      required: true
    }
  },
  computed: {
    inputsItem () {
      if (!this.local.items.length) {
        // this.local.items.push(this.local.workOrderTemplate)
      }
      return this.local.items
    },
    materialGroupResource () {
      return config.api.materialGroup.index
    }
  },
  data () {
    return {
      local: {
        items: [],
        colorSelected: {
          leftColor: '',
          rightColor: ''
        },
        itemsTemplate: {
          id: null,
          name: '',
          delay: '',
          unit: '',
          amount: 1,
          price: '',
          materialGroup: [],
          l_default: {},
          r_default: {}
        },
        materialGroupAll: [],
        materialDelayAll: ''
      }
    }
  },
  created () {
    this.fetchData()
    this.local.colorSelected.leftColor = this.HOUSECOLOR[0].key
    this.local.colorSelected.rightColor = this.HOUSECOLOR[0].key
  },
  updated () {
  },
  methods: {
    async fetchData () {
      let queryString = this.BUILDPARAM({house: this.obj.houseTemplate.key})
      let resourceName = `${config.api.material.index}/${this.obj.storeId}`
      let items = await service.getResource({resourceName, queryString})
      this.local.items = items.data
      this.setMaterialGroup()
      this.setMaterialDelay()
    },
    editRow (type) {
      if (type === 'add') {
        let leftObj = {}
        for (let key in this.local.itemsTemplate.l_default) {
          leftObj[key] = ''
        }
        let rightObj = {}
        for (let key in this.local.itemsTemplate.r_default) {
          rightObj[key] = ''
        }
        this.local.items.push({
          id: '',
          name: '',
          delay: '',
          unit: '',
          amount: 1,
          price: '',
          materialGroup: [],
          l_default: leftObj,
          r_default: rightObj
        })
        this.addMaterialToGroup(this.local.materialGroupAll)
        this.addMaterialDelay(this.local.materialDelayAll)
      } else {
        this.local.items.pop()
      }
    },
    async submitForm (type) {
      let resourceName = `${config.api.material.index}`
      let isValid = await this.$validator.validateAll()
      let res = null
      switch (type) {
        case 'delete':
          let queryString = this.BUILDPARAM({
            storeId: this.obj.storeId,
            houseId: this.obj.houseTemplate.key
          })
          res = await service.deleteResource({resourceName, queryString})
          this.local.items = []
          this.local.materialGroupAll = []
          break
        case 'update':
          if (!isValid || !this.local.items.length) return
          let data = this.setDataFormat()
          res = await service.postResource({data, resourceName})
          break
      }
      if (res.status === 200) {
        this.NOTIFY('success')
        this.fetchData()
        return
      }
      this.NOTIFY('error')
    },
    setDataFormat () {
      let detail = this.local.items.map(item => {
        return {
          id: item.id,
          name: item.name,
          delay: item.delay,
          unit: item.unit,
          storeId: this.obj.storeId,
          houseId: this.obj.houseTemplate.key,
          amount: item.amount,
          price: item.price,
          materialGroup: item.materialGroup,
          priceDetail: {
            l_default: item.l_default,
            r_default: item.r_default
          }
        }
      })
      return {
        houseId: this.obj.houseTemplate.key,
        storeId: this.obj.storeId,
        detail
      }
    },
    setRightColor () {
      let key = this.local.colorSelected.rightColor
      if (!this.local.itemsTemplate.r_default.hasOwnProperty(key)) {
        this.local.itemsTemplate.r_default[key] = ''
        this.local.items.map(item => {
          if (!item.r_default.hasOwnProperty(key)) {
            item.r_default[key] = ''
          }
        })
      }
    },
    setLeftColor () {
      let key = this.local.colorSelected.leftColor
      if (!this.local.itemsTemplate.l_default.hasOwnProperty(key)) {
        this.local.itemsTemplate.l_default[key] = ''
        this.local.items.map(item => {
          if (!item.l_default.hasOwnProperty(key)) {
            item.l_default[key] = ''
          }
        })
      }
    },
    setMaterialGroup () {
      if (this.local.items.length) {
        this.local.materialGroupAll = this.local.items[0].materialGroup
        // this.$refs.materialGroup.getFilterResult()
      }
    },
    setMaterialDelay () {
      if (this.local.items.length) {
        this.local.materialDelayAll = this.local.items[0].delay
      }
    },
    addMaterialToGroup (value) {
      this.local.materialGroupAll = value
      this.local.items.map((item) => {
        item.materialGroup = value
      })
    },
    addMaterialDelay (value) {
      this.local.materialDelayAll = value
      this.local.items.map((item) => {
        item.delay = value
      })
    }
  }
}
</script>
