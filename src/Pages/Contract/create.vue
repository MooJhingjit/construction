<template>
    <section :class="['section', local.template.class]">
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
                    <td><input class="input" v-model="local.contractItems.code" type="text" placeholder="เลขที่สัญญา"></td>
                    <td>ที่ตั้ง:</td>
                    <td><input class="input" v-model="local.project.address" style="max-width: 100%;" type="text" placeholder="ที่ตั้ง"></td>
                  <tr>
                    <td>โครงการ:</td>
                    <td><input class="input" type="text" v-model="local.project.name" placeholder="โครงการ"></td>
                    <td>ประเภทสัญญา:</td>
                    <td><input class="input" type="text" v-model="local.contractItems.contractType" placeholder="ประเภทสัญญา"></td>
                  </tr>
                  <tr>
                    <td>แปลง:</td>
                    <td><input class="input" type="text" v-model="local.contractItems.plan" placeholder="แปลง"></td>
                    <td>แบบบ้าน:</td>
                    <td><input class="input" type="text" v-model="local.contractItems.houseTemp" placeholder="แบบบ้าน"></td>
                  </tr>
                  <tr>
                    <td>ราคา:</td>
                    <td><input class="input" type="text" @blur="runContractLists()" v-model="local.contractItems.price" placeholder="ราคา"></td>
                    <td>Quarter:</td>
                    <td><input class="input" type="text" v-model="local.contractItems.quarter"  placeholder="Quarter"></td>
                  </tr>
                  <tr>
                    <td>วันที่ออกสัญญา:</td>
                    <td><input class="input" type="text" v-model="local.contractItems.dateStart" placeholder="วันที่ออกสัญญา"></td>
                    <td>เงินเบิกล่วงหน้า:</td>
                    <td><input class="input" type="text" v-model="local.contractItems.paid" placeholder="เงินเบิกล่วงหน้า"></td>
                  </tr>
                </table>
              </div>
            </div>
            <div class="c-body">
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
              <div class="table-options">
                <button class="button"><i class="fa fa-minus" aria-hidden="true"></i></button>
                <button class="button"><i class="fa fa-plus" aria-hidden="true"></i></button>
              </div>
            </div>
            <div class="c-footer container-block block">
              <table class="transparent-table">
                <tr>
                  <td>ผู้ว่าจ้าง: บริษัท แลนด์แอนด์เฮ้าส์ จำกัด (มหาชน)</td>
                  <td>วันที่ 21 มีนาคม 2561 ถึงวันที่ 10 ธันวาคม 2561</td>
                </tr>
                <tr>
                  <td>จำนวนงวด 10 งวด</td>
                  <td></td>
                </tr>
                <tr>
                  <td>จำนวนเงินทั้งหมด 1,000 บาท <br/>(หนึ่งพันบาทถ้วน)</td>
                  <td>เบิกเงินล่วงหน้าจำนวน 1,000 บาท <br/>(หนึ่งพันบาทถ้วน)</td>
                </tr>
              </table>
            </div>
          </div>
          <div class="container-block footer-panel">
            <button class="button is-warning" @click="submitForm('wait')">รออนุมัติ</button>
            <button class="button is-success" @click="submitForm('ip')">เริ่มดำเนินงาน</button>
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
export default {
  props: {
    // templateName: {
    //   type: String,
    //   required: true
    // }
  },
  components: {
    breadcrumbBar
  },
  name: 'CreateContractPage',
  data () {
    return {
      local: {
        pageObj: {
          items: [
            {name: 'โครงการ', route: 'Project', key: '', active: true, icon: 'fa fa-file-text'},
            {name: 'สร้างสัญญาใหม่', route: 'CreateContract', key: 'project', active: true, icon: ''}
          ]
        },
        template: {
          class: 'create-contract-page'
        },
        isTimeStart: false,
        contractItems: {
          code: '',
          projectId: this.$route.params.key,
          contractType: '10 งวด',
          plan: '',
          houseTemp: '',
          price: '',
          quarter: '',
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
        project: {}
      }
    }
  },
  computed: {
    contractTimes () {
      if (this.local.isTimeStart) {
        return this.local.contractItems.times
      }
      return []
    },
    getCurrentData () {
      return Helper.GET_DATETHAI('now')
    }
  },
  created () {
    this.fetchData()
    // console.log('created')
    // this.property = 'Example property update.'
    // console.log('propertyComputed will update, as this.property is now reactive.')
  },
  methods: {
    fetchData () {
      let resourceName = `${config.api.project.index}/${this.$route.params.key}`
      let queryString = this.BUILDPARAM()
      service.getResource({resourceName, queryString})
        .then((res) => {
          if (res.status === 200) {
            this.local.project = res.data
          }
        })
        .catch(() => {
        })
    },
    submitForm (status) {
      this.local.contractItems.status = status
      let data = {}
      let resourceName = config.api.contract.index
      data = this.local.contractItems
      service.postResource({data, resourceName})
        .then((res) => {
          if (res.status === 200) {
            console.log('success')
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    runContractLists () {
      if (this.local.contractItems.price !== '') {
        this.local.contractItems.times.map(item => {
          item.price = this.calculatePrice(item.priceRate)
        })
        this.local.isTimeStart = true
      }
    },
    calculatePrice (priceRate) {
      let totalPrice = this.local.contractItems.price
      return priceRate * totalPrice / 100
    }
  }
}
</script>

<style lang="scss">
</style>
