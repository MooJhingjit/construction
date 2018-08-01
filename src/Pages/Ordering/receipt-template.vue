<template>
  <div ref="receipt" class="receipt">
    <table class="main-table" width="100%" style="border-collapse: collapse;
  font-size: 13px;">
        <thead>
            <tr style="height: 94px;">
                <td style="height: 94px;">
                    <table width="100%" class="header-table">
                    <tbody>
                        <tr>
                          <td style="width:80%;padding:5px;">
                            <img src="../../../static/img/logo.png" width="200" height="80" alt="">
                          </td>
                          <td class="text-right" style="width:20%;text-align:right !important;padding:5px;">ใบสั่งซื้อ</td>
                        </tr>
                        <tr>
                          <td style="width:80%;padding:5px;">บริษัท โชคชนายุทธ จำกัด</td>
                          <td class="text-right" style="width:20%;text-align:right !important;padding:5px;"></td>
                        </tr>
                        <tr>
                          <td style="width:80%;padding:5px;">เลขที่ 75/152 ซอยร่มเกล้า 1 แขวงแสนแสบ</td>
                          <td class="text-right" style="width:20%;text-align:right !important;padding:5px;"></td>
                        </tr>
                        <tr>
                          <td style="width:80%;padding:5px;">เขตมีนบุรี กรุงเทพ๚ โทร 02-0003093 FAX 02-0003093</td>
                          <td class="text-right" style="width:20%;text-align:right !important;padding:5px;"></td>
                        </tr>
                    </tbody>
                    </table>
                </td>
            </tr>
            <tr>
                <td class="no-padding border" style="border:1px solid #ccc;padding:0 !important;">
                    <table width="100%" class="receiver">
                    <tbody>
                        <tr>
                        <td style="width:50%;padding:5px;">เรียน {{local.store.contact}}</td>
                        <td class="text-right" style="width:50%;text-align:right !important;padding:5px;">วันที่ {{today}}</td>
                        </tr>
                        <tr>
                        <td style="width:50%;padding:5px;">บริษัท {{local.store.name}}</td>
                        <td class="text-right" style="width:50%;text-align:right !important;padding:5px;">โครงการ {{local.project.name}}</td>
                        </tr>
                        <tr>
                        <td style="width:50%;padding:5px;">FAX {{local.store.fax}}</td>
                        <td class="text-right" style="width:50%;text-align:right !important;padding:5px;">ประเภทวัสดุ {{local.store.type}}</td>
                        </tr>
                        <tr>
                        <td style="width:50%;padding:5px;">FAX {{local.store.tel}}</td>
                        <td class="text-right" style="width:50%;text-align:right !important;padding:5px;"></td>
                        </tr>
                    </tbody>
                    </table>
                </td>
            </tr>
        </thead>
        <tbody class="border" style="border: 1px solid #ccc;">
            <tr>
            <td class="no-padding" style="padding: 0 !important;">
                <table width="100%" border="1" class="item-lists" style="border-collapse: collapse;">
                <thead>
                    <tr>
                    <td width="5%" style="border:1px solid #ccc;text-align:center;font-weight:500;padding:5px;border-collapse:collapse;">ลำดับ</td>
                    <td width="60%" style="border:1px solid #ccc;text-align:center;font-weight:500;padding:5px;border-collapse:collapse;">รายการ</td>
                    <td width="5%" style="border:1px solid #ccc;text-align:center;font-weight:500;padding:5px;border-collapse:collapse;">ปริมาณ</td>
                    <td width="5%" style="border:1px solid #ccc;text-align:center;font-weight:500;padding:5px;border-collapse:collapse;">หน่วย</td>
                    <td width="10%" style="border:1px solid #ccc;text-align:center;font-weight:500;padding:5px;border-collapse:collapse;">ราคา/หน่วย</td>
                    <td width="5%" style="border:1px solid #ccc;text-align:center;font-weight:500;padding:5px;border-collapse:collapse;">ส่วนลด</td>
                    <td width="10%" style="border:1px solid #ccc;text-align:center;font-weight:500;padding:5px;border-collapse:collapse;">จำนวนเงิน</td>
                    </tr>
                </thead>
                <tbody style="font-size: 13.5px;">
                    <tr :key="index" v-for="(item, index) in local.ordering.orderDetail">
                    <td style="border:1px solid #ccc;padding:5px;border-collapse:collapse;">{{index + 1}}</td>
                    <td style="border:1px solid #ccc;padding:5px;border-collapse:collapse;">{{item.name}}</td>
                    <td class="text-right" style="text-align:right !important;border:1px solid #ccc;padding:5px;border-collapse:collapse;">{{NUMBERWITHCOMMAS(item.amount, 0)}}</td>
                    <td class="text-right" style="text-align:right !important;border:1px solid #ccc;padding:5px;border-collapse:collapse;">{{item.unit_text}}</td>
                    <td class="text-right" style="text-align:right !important;border:1px solid #ccc;padding:5px;border-collapse:collapse;">{{NUMBERWITHCOMMAS(item.unit_price, 2)}}</td>
                    <td class="text-right" style="text-align:right !important;border:1px solid #ccc;padding:5px;border-collapse:collapse;">-</td>
                    <td class="text-right" style="text-align:right !important;border:1px solid #ccc;padding:5px;border-collapse:collapse;">{{NUMBERWITHCOMMAS(item.price, 2)}}</td>
                    </tr>
                    <tr>
                    <td colspan="2" rowspan="3" style="border:1px solid #ccc;padding:5px;border-collapse:collapse;">หมายเหตุ</td>
                    <td colspan="3" style="border:1px solid #ccc;padding:5px;border-collapse:collapse;">ราคารวม</td>
                    <td colspan="2" class="text-right" style="text-align:right !important;border:1px solid #ccc;padding:5px;border-collapse:collapse;">{{NUMBERWITHCOMMAS(local.ordering.total_price, 2)}}</td>
                    </tr>
                    <tr>
                    <td colspan="3" style="border:1px solid #ccc;padding:5px;border-collapse:collapse;">ภาษีมูลค่าเพิ่ม</td>
                    <td colspan="2" class="text-right" style="text-align:right !important;border:1px solid #ccc;padding:5px;border-collapse:collapse;">-</td>
                    </tr>
                    <tr>
                    <td colspan="3" style="border:1px solid #ccc;padding:5px;border-collapse:collapse;">จำนวนเงินสุทธิ</td>
                    <td colspan="2" class="text-right" style="text-align:right !important;border:1px solid #ccc;padding:5px;border-collapse:collapse;">{{NUMBERWITHCOMMAS(local.ordering.total_price, 2)}}</td>
                    </tr>
                </tbody>
                </table>
            </td>
            </tr>
            <tr>
            <td class="no-padding border" style="border:1px solid #ccc;padding:0 !important;">
                <table width="100%" class="condition">
                <tbody>
                    <tr>
                    <td class="text-center" style="width:50%;text-align:center;padding:5px;">เงื่อนไขการชำระเงิน</td>
                    <td class="text-center" style="width:50%;text-align:center;padding:5px;">ติดต่อส่งของ</td>
                    </tr>
                    <tr>
                    <td class="text-center" style="width:50%;text-align:center;padding:5px;">เครดิต 30 วัน</td>
                    <td class="text-center" style="width:50%;text-align:center;padding:5px;">โครงการ {{local.project.name}}</td>
                    </tr>
                    <tr>
                    <td class="text-center" style="width:50%;text-align:center;padding:5px;">ประมาณการกำหนดส่งของ</td>
                    <td class="text-center" style="width:50%;text-align:center;padding:5px;">ติดต่อ</td>
                    </tr>
                </tbody>
                </table>
            </td>
            </tr>
        </tbody>
        <tfoot>
            <tr>
            <td class="no-padding" style="padding: 0 !important;">
                <table width="100%" class="signature" style="margin: 20px 0;">
                <tbody>
                    <tr>
                    <td class="text-center" style="width:50%;text-align:center;padding:5px;">ผู้สั่งซื้อ..........................................</td>
                    <td class="text-center" style="width:50%;text-align:center;padding:5px;">อนุมัติ.....................................</td>
                    </tr>
                    <tr>
                    <td class="text-center" style="width:50%;text-align:center;padding:5px;">(กุลจิตร ทองเมืองน้อย)</td>
                    <td class="text-center" style="width:50%;text-align:center;padding:5px;">(ทรงวุฒิ ทองทวี)</td>
                    </tr>
                    <tr>
                    <td class="text-center" style="width:50%;text-align:center;padding:5px;">087-5070161 (นิ่ม)</td>
                    <td class="text-center" style="width:50%;text-align:center;padding:5px;"></td>
                    </tr>
                </tbody>
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
    dataObj: {
      type: Object,
      required: true
    }
  },
  components: {
  },
  name: 'receiptTemplate',
  data () {
    return {
      local: {}
    }
  },
  computed: {
    today () {
      return Helper.GET_DATETHAI('now')
    }
  },
  created () {
    this.local = this.dataObj
  },
  methods: {
    getHtm () {
      return this.$refs.receipt
    },
    printReceipt () {
      let html = this.getHtm()
      var win = window.open('', 'Title', 'toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=850,height=500,top=0,left=0')
      let style = document.createElement('style')
      style.type = 'text/css'
      let css = '@media print {@page { margin: 0; }body { margin: 1.5cm 1cm; }}'
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
    }
  },
  watch: {
    dataObj () {
      this.local = this.dataObj
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
