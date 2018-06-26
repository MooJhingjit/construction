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
    <template v-if="local.idSelected != ''">
      <template slot="detail">
        <div class="container-block detail-block">
          <span class="type tag">ปกติ</span>
          <div class="block c-header">
            <table class="transparent-table">
              <tr>
                <td>โครงการ:<span class="value">รามอินทรา พหลโยธิน 50</span></td>
              </tr>
              <tr>
                <td>เลขที่สัญญา:<span class="value">LH120243216</span></td>
                <td>แปลน:<span class="value">C01</span></td>
              </tr>
              <tr>
                <td>แบบบ้าน:<span class="value">244CA248C</span></td>
                <td>ขั้นตอนการตำเนินงาน:<span class="value">งานพื้นสำเร็จชั้นล่าง</span></td>
              </tr>
              <tr>
                <td>ทั้งหมด:<span class="value">5 รายการ</span></td>
                <td>จำนวนเงินทั้งหมด<span class="value">1,000 บาท</span></td>
              </tr>
              <tr>
                <td>คงเหลือ:<span class="value">1 รายการ</span></td>
                <td><span class="value">หนึ่งพันบาทถ้วน</span></td>
              </tr>
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
                <tr>
                  <td width="100">ฟายด์เวิร์คกรุ๊ป</td>
                  <td>
                    <input class="input" type="text" value="EC-HDFCM8  35X800X2000 MM (เปิดขวา)">
                    <input class="input" type="text" value="HDFCM71  35X700X2000 MM">
                    <input class="input" type="text" value="(HDFCMS54)  3.5x54x90 Cm. ห้องเก็บของ (เปิดขวา)">
                  </td>
                  <td width="20">
                    <input class="input" type="text" value="1">
                    <input class="input" type="text" value="2">
                    <input class="input" type="text" value="1">
                  </td>
                  <td width="100">
                    <input class="input" type="text" value="200">
                    <input class="input" type="text" value="300">
                    <input class="input" type="text" value="500">
                  </td>
                </tr>
                <tr>
                  <td>กิจศิริ</td>
                  <td>
                    <input class="input" type="text" value="แผ่นสมาร์ทวูดหนา10 mm.">
                  </td>
                  <td width="20"><input class="input" type="text" value="1"></td>
                  <td width="100"><input class="input" type="text" value="200"></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="container-block explain">
          <div class="block">
            <table class="transparent-table">
              <tr>
                <td>ร้านค้า: ฟายด์เวิร์คกรุ๊ป</td>
              </tr>
              <tr>
                <td>จำนวน: 3 รายการ</td>
              </tr>
              <tr>
                <td>ราคา: 20,000</td>
              </tr>
              <tr>
                <td>สองหมื่นบาทถ้วน</td>
              </tr>
              <tr>
                <td>สถานะ: <span class="tag is-warning">รออนุมัติ</span></td>
              </tr>
            </table>
          </div>
          <div class="block function container-block">
            <button class="button is-outlined">อนุมัติ</button>
            <button class="button is-outlined">ออกใบสั่งซื้อ</button>
            <button class="button is-outlined">รับของ</button>
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
        inputs: {}
      }
    }
  },
  computed: {
    resourceName () {
      return config.api.ordering.index
    }
  },
  created () {
  },
  methods: {
    selectedDataHandle (item) {
      this.errors.clear()
      this.local.idSelected = item.id
      // this.local.inputs.code = item.code
      // this.local.inputs.name = item.name
      // this.local.inputs.address = item.address
      // this.local.inputs.type = item.type
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
    // reloadTable () {
    //   this.$refs.dataTable.fetchData()
    // },
    cleanInput () {
      // this.local.inputs.code = ''
      // this.local.inputs.name = ''
      // this.local.inputs.address = ''
      // this.local.inputs.type = ''
    }
  }
}
</script>

<style lang="scss">
</style>
