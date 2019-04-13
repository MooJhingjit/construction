<template>
  <div ref="worksheet" class="worksheet">
    <table width="100%" style="border: none;" v-if="local.dataObj.length > 0">
      <thead style="font-size: 13px;">
        <tr>
          <td class="text-center" style="position: relative;font-weight: bold;text-align: center;">
            <h2>บริษัท โชคชนายุทธ จำกัด</h2>
            <p>75/152ซอยร่มเกล้า1 ถนนร่มเกล้า แขวงแสนแสบ เขตมีนบุรี กรุงเทพฯ 10510</p>
            <p>โทร.(02)328-7948 แฟ็กซ์(02)919-5298</p>
            <p class="id" style="position: absolute;top: 0;right: 0;font-size: 10px;"></p>
          </td>
        </tr>
      </thead>
      <tbody class="border">
        <tr>
          <td>
            <table width="100%" style="border: none;">
              <tr>
                <td width="50%" class="text-center" style="text-align: center;">
                  <p style="font-size: 11px;">ผู้ส่งงาน: {{technician}}</p>
                  <!-- <p style="font-size: 11px;">หมวดงาน: SUB121 นายเก่ง</p> -->
                </td>
                <td width="50%" class="text-center" style="text-align: center;">
                  <p style="font-size: 11px;">โครงการ: {{headerObj.project}}</p>
                  <p style="font-size: 11px;">วันที่: {{today}}</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td>
            <table class="main-table" width="100%" style="border: none;font-size: 11px;border-collapse: collapse;">
              <thead style="font-size: 13px;">
                <tr>
                  <td rowspan="2" style="position: relative;font-weight: 500;font-size: 12px;border: 1px solid #ccc;padding: 5px;text-align: center;">ลำดับ</td>
                  <td colspan="5" style="position: relative;font-weight: 500;font-size: 12px;border: 1px solid #ccc;padding: 5px;text-align: center;">รายละเอียด</td>
                  <td colspan="2" style="position: relative;font-weight: 500;font-size: 12px;border: 1px solid #ccc;padding: 5px;text-align: center;">จำนวน</td>
                  <td rowspan="2" style="position: relative;font-weight: 500;font-size: 12px;border: 1px solid #ccc;padding: 5px;text-align: center;">ราคา/หน่วย</td>
                  <td rowspan="2" style="position: relative;font-weight: 500;font-size: 12px;border: 1px solid #ccc;padding: 5px;text-align: center;">รวม</td>
                  <td width="200" rowspan="2" style="position: relative;font-weight: 500;font-size: 12px;border: 1px solid #ccc;padding: 5px;text-align: center;">หมายเหตุ</td>
                </tr>
                <tr>
                  <td style="position: relative;font-weight: 500;font-size: 12px;border: 1px solid #ccc;padding: 5px;text-align: center;">แปลงที่</td>
                  <td style="position: relative;font-weight: 500;font-size: 12px;border: 1px solid #ccc;padding: 5px;text-align: center;">แบบบ้าน</td>
                  <td style="position: relative;font-weight: 500;font-size: 12px;border: 1px solid #ccc;padding: 5px;text-align: center;">หมวดงาน</td>
                  <td style="position: relative;font-weight: 500;font-size: 12px;border: 1px solid #ccc;padding: 5px;text-align: center;">งวดงาน</td>
                  <td style="position: relative;font-weight: 500;font-size: 12px;border: 1px solid #ccc;padding: 5px;text-align: center;">รายการ</td>
                  <td style="position: relative;font-weight: 500;font-size: 12px;border: 1px solid #ccc;padding: 5px;text-align: center;">ปริมาณ</td>
                  <td style="position: relative;font-weight: 500;font-size: 12px;border: 1px solid #ccc;padding: 5px;text-align: center;">หน่วย</td>
                </tr>
              </thead>
              <tbody style="font-size: 12px;">
                <tr :key="index" v-for="(item, index) in local.dataObj">
                  <td style="font-size: 11px;border: 1px solid #ccc;padding: 5px;text-align: center;">{{index + 1}}</td>
                  <td style="font-size: 11px;border: 1px solid #ccc;padding: 5px;text-align: center;">{{item.plan}}</td>
                  <td style="font-size: 11px;border: 1px solid #ccc;padding: 5px;text-align: center;">{{item.house_id}}</td>
                  <td style="font-size: 11px;border: 1px solid #ccc;padding: 5px;text-align: center;">{{item.work_group_name}}</td>
                  <td style="font-size: 11px;border: 1px solid #ccc;padding: 5px;text-align: center;">งวดที่ {{item.time}}</td>
                  <td style="font-size: 11px;border: 1px solid #ccc;padding: 5px;text-align: left;">{{item.name}}</td>
                  <td style="font-size: 11px;border: 1px solid #ccc;padding: 5px;text-align: center;">{{item.amount}}</td>
                  <td style="font-size: 11px;border: 1px solid #ccc;padding: 5px;text-align: center;">{{item.unit}}</td>
                  <td style="font-size: 11px;border: 1px solid #ccc;padding: 5px;text-align: right;">{{NUMBERWITHCOMMAS(item.price, 2)}}</td>
                  <td style="font-size: 11px;border: 1px solid #ccc;padding: 5px;text-align: right;">{{NUMBERWITHCOMMAS(item.total_price, 2)}}</td>
                  <td style="font-size: 11px;border: 1px solid #ccc;padding: 5px;text-align: center;">{{item.note}}</td>
                </tr>
                <tr>
                    <td colspan="8" class="text-center" style="text-align: right;font-size: 11px;border: 1px solid #ccc;padding: 5px;">รวมเงินที่อนุมัติจ่าย</td>
                    <td colspan="2" class="text-right" style="text-align: right;font-weight: bold;font-size: 11px;border: 1px solid #ccc;padding: 5px;">{{NUMBERWITHCOMMAS(summaryData('price'), 2)}}</td>
                    <td style="font-size: 11px;border: 1px solid #ccc;padding: 5px;text-align: center;"></td>
                  </tr>
                  <tr>
                    <td colspan="8" class="text-center" style="text-align: right;font-weight: bold;font-size: 11px;border: 1px solid #ccc;padding: 5px;">หัก 3%</td>
                    <td colspan="2" class="text-right" style="text-align: right;font-weight: bold;font-size: 11px;border: 1px solid #ccc;padding: 5px;">{{NUMBERWITHCOMMAS(summaryData('reducePrice'), 2)}}</td>
                    <td style="font-size: 11px;border: 1px solid #ccc;padding: 5px;text-align: center;"></td>
                  </tr>
                  <tr>
                    <td colspan="8" class="text-center" style="text-align: right;font-weight: bold;font-size: 11px;border: 1px solid #ccc;padding: 5px;">หักเงินเบิกสำรอง</td>
                    <td colspan="2" class="text-right" style="text-align: right;font-weight: bold;font-size: 11px;border: 1px solid #ccc;padding: 5px;">-</td>
                    <td style="font-size: 11px;border: 1px solid #ccc;padding: 5px;text-align: center;"></td>
                  </tr>
                  <tr>
                    <td colspan="8" class="text-center" style="text-align: right;font-weight: bold;font-size: 11px;border: 1px solid #ccc;padding: 5px;">หักค่าใช่จ่ายอื่นๆ</td>
                    <td colspan="2" class="text-right" style="text-align: right;font-weight: bold;font-size: 11px;border: 1px solid #ccc;padding: 5px;">-</td>
                    <td style="font-size: 11px;border: 1px solid #ccc;padding: 5px;text-align: center;"></td>
                  </tr>
                  <tr>
                    <td colspan="8" class="text-center" style="text-align: right;font-weight: bold;font-size: 11px;border: 1px solid #ccc;padding: 5px;">รวมยอดเงินที่ได้รับทั้งหมด</td>
                    <td colspan="2" class="text-right" style="text-align: right;font-weight: bold;font-size: 11px;border: 1px solid #ccc;padding: 5px;">{{NUMBERWITHCOMMAS(summaryData('totalPrice'), 2)}}</td>
                    <td style="font-size: 11px;border: 1px solid #ccc;padding: 5px;text-align: center;"></td>
                  </tr>
                  <!-- <tr>
                    <td colspan="11" class="text-right">xx</td>
                  </tr> -->
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td>
            <table class="main-table signature" width="100%" style="border: none;font-size: 11px;border-collapse: collapse;margin-top: 20px;">
              <tr>
                <!-- <td>
                    <p>...................................</p>
                    <p> </p>
                    <p>วันที่................................</p>
                </td> -->
                <td style="border: none !important;padding: 5px;text-align: center;">
                    <p>......................................................</p>
                    <p>เจ้าหน้าที่ควบคุมงาน</p>
                    <p>วันที่...................................................</p>
                </td>
                <td style="border: none !important;padding: 5px;text-align: center;">
                    <p>......................................................</p>
                    <p>Project Site</p>
                    <p>วันที่...................................................</p>
                </td>
                <td style="border: none !important;padding: 5px;text-align: center;">
                    <p>......................................................</p>
                    <p>การเงิน บัญชี</p>
                    <p>วันที่...................................................</p>
                </td>
                <td style="border: none !important;padding: 5px;text-align: center;">
                    <p>......................................................</p>
                    <p>ผู้อนุมัติจ่าย</p>
                    <p>วันที่ {{approvedData}}</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script>
import Helper from '@Libraries/common.helpers'
export default {
  props: {
    headerObj: {
      type: Object,
      required: true
    },
    dataObj: {
      type: Array,
      required: true
    }
  },
  components: {
  },
  name: 'worksheetTemplate',
  data () {
    return {
      local: {
        headerObj: {},
        dataObj: null
      }
    }
  },
  computed: {
    today () {
      return Helper.GET_DATETHAI('now')
    },
    technician () {
      return (this.local.dataObj.length) ? this.local.dataObj[0].technician_name : ''
    },
    approvedData () {
      // console.log(this.local.dataObj[0].updated_at)
      return Helper.GET_DATETHAI(this.local.dataObj[0].updated_at)
    }
  },
  created () {
    this.local.dataObj = this.dataObj
    this.summaryData()
  },
  methods: {
    getHtm () {
      return this.$refs.worksheet
    },
    printWorkSheet () {
      let html = this.getHtm()
      var win = window.open('', 'Title', 'toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=1200,height=500,top=0,left=0')
      let style = document.createElement('style')
      style.type = 'text/css'
      let css = '@media print {@page { size: landscape; margin: 0; }body { margin: 0.5cm 0.2cm; }}'
      // let css = ''
      if (style.styleSheet) {
        // This is required for IE8 and below.
        style.styleSheet.cssText = css
      } else {
        style.appendChild(document.createTextNode(css))
      }
      win.document.getElementsByTagName('head')[0].appendChild(style)
      win.document.body.innerHTML = html.innerHTML
      win.focus()
      win.print()
    },
    summaryData (type) {
      let res = {
        price: 0,
        reducePrice: 0,
        totalPrice: 0
      }
      this.local.dataObj.map((item) => {
        res.price += parseFloat(item.total_price)
      })
      res.reducePrice = (parseFloat(res.price) * 3) / 100
      res.totalPrice = parseFloat(res.price) - parseFloat(res.reducePrice)
      return res[type]
    }
  },
  watch: {
    dataObj: {
      handler: function (newValue) {
        this.local.dataObj = this.dataObj
      },
      deep: true
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
