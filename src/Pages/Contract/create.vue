<template>
    <section :class="['section', local.pageObj.template.class]">
    <breadcrumb-bar :dataObj="local.pageObj"></breadcrumb-bar>
    <div class="container-block">
      <div class="detail-panel">
        <template v-if="true">
          <div class="container-block  detail-block">
            <div class="c-header container-block block">
              <div class="block name">
                สัญญาว่าจ้างปลูกสร้างอาคาร
                <div class="date">วันที่ {{getCurrentData}} </div>
              </div>
              <div class="block info">
                <table class="transparent-table">
                  <tr>
                    <td>เลขที่สัญญา:</td>
                    <td>
                      <!-- <input class="input" v-model="local.inputs.code" type="text" placeholder="เลขที่สัญญา"> -->
                      <my-input
                      :value="local.inputs.code"
                      :inputObj="{type: 'text', name: 'contract_code', placeholder: 'เลขที่สัญญา', validate: 'required'}"
                      :validator="$validator"
                      @input="value => { local.inputs.code = value }"
                      ></my-input>
                    </td>
                    <td>ที่ตั้ง:</td>
                    <td>
                      <!-- <input class="input" v-model="local.project.address" type="text" placeholder="ที่ตั้ง"> -->
                      <my-input
                      :value="local.project.address"
                      :inputObj="{type: 'text', name: 'project_address', placeholder: 'ที่ตั้ง', validate: ''}"
                      :validator="$validator"
                      @input="value => { local.project.address = value }"
                      ></my-input>
                    </td>
                  <tr>
                    <td>โครงการ:</td>
                    <td>
                      <!-- <input class="input" type="text" v-model="local.project.name" placeholder="โครงการ"> -->
                      <my-input
                      :value="local.project.name"
                      :inputObj="{type: 'text', name: 'project_name', placeholder: 'โครงการ', validate: 'required'}"
                      :validator="$validator"
                      @input="value => { local.project.name = value }"
                      ></my-input>
                    </td>
                    <td>ประเภทสัญญา:</td>
                    <td>
                      <!-- <input class="input" type="text" v-model="local.inputs.contractType" placeholder="ประเภทสัญญา"> -->
                      <my-input
                      :value="local.inputs.contractType"
                      :inputObj="{type: 'text', name: 'contract_type', placeholder: 'ประเภทสัญญา', validate: 'required'}"
                      :validator="$validator"
                      @input="value => { local.inputs.contractType = value }"
                      ></my-input>
                    </td>
                  </tr>
                  <tr>
                    <td>แบบบ้าน:</td>
                    <td>
                      <my-auto-complete
                      @select="houseSelectedHandle"
                      :arrInputs="local.houseTemplate.inputs"
                      placeholder="แบบบ้าน"
                      label=""
                      ></my-auto-complete>
                      <!-- <input class="input" type="text" v-model="local.inputs.houseTemp" placeholder="แบบบ้าน"> -->
                    </td>
                    <td>แปลง:</td>
                    <td>
                      <!-- <input class="input" type="text" v-model="local.inputs.plan" placeholder="แปลง"> -->
                      <my-auto-complete
                      @select="objVal => {local.inputs.plan = objVal.key}"
                      :arrInputs="local.planTemplate.inputs"
                      placeholder="แปลง"
                      label=""
                      ></my-auto-complete>
                    </td>
                  </tr>
                  <tr>
                    <td>ราคา:</td>
                    <td>
                      <!-- <input class="input" type="text"  v-model="local.inputs.price" placeholder="ราคา"> -->
                      <my-input
                      @onBlur="runContractLists()"
                      :value="local.inputs.price"
                      :inputObj="{type: 'text', isBlur: true, name: 'contract_price', placeholder: 'ราคา', validate: 'required'}"
                      :validator="$validator"
                      @input="value => { local.inputs.price = value }"
                      ></my-input>
                    </td>
                    <td></td>
                    <td>
                      <!-- <my-input
                      :value="local.inputs.quarter"
                      :inputObj="{type: 'text', name: 'contract_quarter', placeholder: 'Quarter', validate: 'required'}"
                      :validator="$validator"
                      @input="value => { local.inputs.quarter = value }"
                      ></my-input> -->
                    </td>
                  </tr>
                  <tr>
                    <td>วันที่ออกสัญญา:</td>
                    <td>
                      <!-- <input class="input" type="text" v-model="local.inputs.dateStart" placeholder="วันที่ออกสัญญา"> -->
                      <my-input
                      :value="local.inputs.dateStart || null"
                      :inputObj="{type: 'datepicker', name: 'contract_datestart', placeholder: 'วันที่ออกสัญญา', validate: 'required'}"
                      :validator="$validator"
                      @input="selectedContractDate"
                      ></my-input>
                    </td>
                    <td>เงินเบิกล่วงหน้า:</td>
                    <td>
                      <!-- <input class="input" type="text" v-model="local.inputs.paid" placeholder="เงินเบิกล่วงหน้า"> -->
                      <my-input
                      :value="local.inputs.paid"
                      :inputObj="{type: 'text', name: 'contract_paid', placeholder: 'เงินเบิกล่วงหน้า', validate: ''}"
                      :validator="$validator"
                      @input="value => { local.inputs.paid = value }"
                      ></my-input>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
            <div class="c-body" v-if="this.local.isTimeStart">
              <table class="table is-hoverable">
                <thead>
                  <tr>
                    <th>งวดที่</th>
                    <th>จำนวนเงิน</th>
                    <th>วันที่เริ่ม</th>
                    <th>วันกำหนดเสร็จ</th>
                    <!-- <th>วัสดุนอกสัญญา ( * ยกเว้นค่าของ, ** ยกเว้นค่าของและค่าแรง )</th> -->
                  </tr>
                </thead>
                <tbody>
                  <tr :key="index" v-for="(item, index) in contractTimes">
                    <td width="70"><input type="text" v-model="item.time" class="input"></td>
                    <td width=""><input type="text" v-model="item.price"  class="input"></td>
                    <td width=""><input type="text" v-model="item.dateStart"  class="input"></td>
                    <td><input type="text" v-model="item.dateEnd"  class="input"></td>
                  </tr>
                </tbody>
              </table>
              <!-- <div class="table-options">
                <button class="button"><i class="fa fa-minus" aria-hidden="true"></i></button>
                <button class="button"><i class="fa fa-plus" aria-hidden="true"></i></button>
              </div> -->
            </div>
            <div class="c-footer container-block block" v-if="this.local.isTimeStart">
              <table class="transparent-table">
                <tr>
                  <td>ผู้ว่าจ้าง: บริษัท แลนด์แอนด์เฮ้าส์ จำกัด (มหาชน)</td>
                  <td>วันที่ {{dateStart}} ถึงวันที่ {{dateEnd}}</td>
                </tr>
                <tr>
                  <td>จำนวนงวด {{local.inputs.price}} บาท <br/>(หนึ่งพันบาทถ้วน)</td>
                  <td>เบิกเงินล่วงหน้าจำนวน {{local.inputs.paid}} บาท <br/>(หนึ่งพันบาทถ้วน)</td>
                </tr>
              </table>

            </div>
          </div>
          <div class="container-block footer-panel" v-if="this.local.isTimeStart">
            <my-action
              type="update"
              :obj="{title: 'รออนุมัติ', color: 'is-warning'}"
              @clickEvent="submitForm('save', 'wait')"
            >
            </my-action>
            <my-action
              type="update"
              :obj="{title: 'เริ่มดำเนินงาน', color: 'is-success'}"
              @clickEvent="submitForm('save', 'ip')"
            >
            </my-action>
            <!-- <button class="button is-warning" @click="submitForm('save', 'wait')">รออนุมัติ</button>
            <button class="button is-success" @click="submitForm('save', 'ip')">เริ่มดำเนินงาน</button> -->
          </div>
        </template>
        <template v-else>
          <template slot="detail">
            <div class="container-block empty-panel">
              <div class="block container-block">
                <div class="block no-data">
                    ไม่พบข้อมูลที่ต้องการ
                </div>
                <div class="block select-data">
                  <i class="fa fa-hand-o-left" aria-hidden="true"></i>
                  <span>เลือกข้อมูลทางซ้ายมือเพื่อแสดง</span>
                </div>
                <div class="block or">
                  หรือ
                </div>
                <div class="block add-data">
                  <button class="button">เพิ่มข้อมูลใหม่</button>
                </div>
              </div>
            </div>
          </template>
        </template>
      </div>
    </div>
    </section>
</template>

<script>
import breadcrumbBar from '@Components/Breadcrumb'
import service from '@Services/app-service'
import config from '@Config/app.config'
import Helper from '@Libraries/common.helpers'
import myInput from '@Components/Form/my-input'
import myAction from '@Components/Form/my-action'
import myAutoComplete from '@Components/Form/my-autocomp'
import moment from 'moment'
export default {
  props: {
    // templateName: {
    //   type: String,
    //   required: true
    // }
  },
  components: {
    breadcrumbBar,
    myInput,
    myAction,
    myAutoComplete
  },
  name: 'CreateContractPage',
  data () {
    return {
      local: {
        pageObj: {
          items: [
            {name: 'โครงการ', route: 'Project', key: '', active: true, icon: 'fa fa-file-text'},
            {name: 'สร้างสัญญาใหม่', route: 'CreateContract', key: this.$route.params.key, active: true, icon: ''}
          ],
          template: {
            class: 'create-contract-page'
          }
        },
        isTimeStart: false,
        inputs: {
          code: '',
          projectId: this.$route.params.key,
          contractType: '10 งวด',
          plan: '',
          houseId: '',
          price: '',
          dateStart: '',
          paid: '',
          status: '',
          times: [
            {time: '1', priceRate: 15, price: 0, dateStart: '', dateEnd: ''},
            {time: '2', priceRate: 10, price: 0, dateStart: '', dateEnd: ''},
            {time: '3', priceRate: 5, price: 0, dateStart: '', dateEnd: ''},
            {time: '4', priceRate: 5, price: 0, dateStart: '', dateEnd: ''},
            {time: '5', priceRate: 20, price: 0, dateStart: '', dateEnd: ''},
            {time: '6', priceRate: 5, price: 0, dateStart: '', dateEnd: ''},
            {time: '7', priceRate: 5, price: 0, dateStart: '', dateEnd: ''},
            {time: '8', priceRate: 10, price: 0, dateStart: '', dateEnd: ''},
            {time: '9', priceRate: 10, price: 0, dateStart: '', dateEnd: ''},
            {time: '10', priceRate: 5, price: 0, dateStart: '', dateEnd: ''}
          ]
        },
        project: {},
        houseTemplate: {
          inputs: [],
          selected: null
        },
        planTemplate: {
          inputs: [],
          selected: null
        },
        contractPreiod: []
      }
    }
  },
  computed: {
    contractTimes () {
      if (this.local.isTimeStart) {
        return this.local.inputs.times
      }
      return []
    },
    getCurrentData () {
      return Helper.GET_DATETHAI('now')
    },
    resourceName () {
      return config.api.contract.index
    },
    dateStart () {
      let dateObj = this.local.inputs.times.filter((item) => {
        return item.time === '1'
      })[0]
      return dateObj.dateStart
    },
    dateEnd () {
      let dateObj = this.local.inputs.times.filter((item) => {
        return item.time === '10'
      })[0]
      return dateObj.dateEnd
    }
  },
  created () {
    this.fetchData()
    // console.log('created')
    // this.property = 'Example property update.'
    // console.log('propertyComputed will update, as this.property is now reactive.')
  },
  methods: {
    async fetchData () {
      let resourceName = `${config.api.project.index}/${this.$route.params.key}`
      let queryString = this.BUILDPARAM()
      let project = await service.getResource({resourceName, queryString})
      this.local.project = project.data
      let houseTemplate = await service.getResource({resourceName: config.api.house.dropdown, queryString})
      this.local.houseTemplate.inputs = houseTemplate.data
    },
    async submitForm (type, status) {
      let isValid = await this.$validator.validateAll()
      let resourceName = this.resourceName
      let data = {}
      let res = null
      switch (type) {
        case 'save':
          if (!isValid) return
          this.local.inputs.status = status
          data = this.local.inputs
          res = await service.postResource({data, resourceName})
          break
      }
      if (res.status === 200) {
        this.NOTIFY('success')
        this.GOTOPAGE('Contract', this.local.inputs.code)
        return
      }
      this.NOTIFY('error')
      // this.$validator.validateAll().then((tf) => {
      //   if (tf) {
      //     this.local.inputs.status = status
      //     let data = {}
      //     let resourceName = config.api.contract.index
      //     data = this.local.inputs
      //     service.postResource({data, resourceName})
      //       .then((res) => {
      //         if (res.status === 200) {
      //           this.NOTIFY('success')
      //         } else {
      //           this.NOTIFY('error')
      //         }
      //       })
      //       .catch((err) => {
      //         console.log(err)
      //       })
      //   }
      // })
    },
    houseSelectedHandle (objVal) {
      if (objVal === null) {
        this.local.planTemplate.inputs = []
      } else {
        this.local.inputs.houseId = objVal.key
        this.getPlan()
        this.getContractPreiod()
      }
    },
    async getContractPreiod () {
      let queryString = []
      let resourceName = `${config.api.contract.period}/${this.local.inputs.houseId}`
      let contractPreiod = await service.getResource({resourceName, queryString})
      this.local.contractPreiod = contractPreiod.data || null
      this.setContractPreiod()
    },
    async getPlan () {
      let queryString = this.BUILDPARAM({house: this.local.inputs.houseId})
      let planTemplate = await service.getResource({resourceName: config.api.house.dropdown, queryString})
      // console.log(planTemplate.data)
      this.local.planTemplate.inputs = planTemplate.data
    },
    runContractLists () {
      if (this.local.inputs.price !== '') {
        this.local.inputs.times.map(item => {
          item.price = this.calculatePrice(item.priceRate)
        })
        this.local.isTimeStart = true
      }
    },
    selectedContractDate (value) {
      this.local.inputs.dateStart = value
      this.setContractPreiod()
    },
    setContractPreiod () {
      if (!this.local.inputs.dateStart) {
        return
      }
      let oldDate = ''
      this.local.inputs.times.map(item => {
        if (!this.local.contractPreiod) {
          item.dateStart = ''
          item.dateEnd = ''
        } else {
          if (item.time === '1') {
            item.dateStart = moment(this.local.inputs.dateStart).format('YYYY/MM/DD')
            item.dateEnd = this.calculateContractPreiod(this.local.inputs.dateStart, this.local.contractPreiod[item.time])
            oldDate = item.dateEnd
          } else {
            item.dateStart = this.calculateContractPreiod(oldDate, 1)
            item.dateEnd = this.calculateContractPreiod(item.dateStart, this.local.contractPreiod[item.time])
            oldDate = item.dateEnd
          }
        }
      })
    },
    calculateContractPreiod (start, preiod) {
      return moment(start).add(preiod, 'days').format('YYYY/MM/DD')
    },
    calculatePrice (priceRate) {
      this.local.inputs.paid = (this.local.inputs.price * 10) / 100
      let totalPrice = this.local.inputs.price - this.local.inputs.paid
      return priceRate * totalPrice / 100
    },
    setDateVal (date) {
      this.local.inputs.dateStart = date
    }
  }
}
</script>

<style lang="scss">
</style>
