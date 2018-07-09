<template>
  <div ref="receipt" class="receipt">
    <table border="1" class="main-table">
      <tr>
        <td>main-table</td>
      </tr>
    </table>
    <!-- <table class="main-table" border="1" width="100%">
      <thead>
        <tr style="height: 94px;">
          <td style="height: 94px;">
            <table width="100%" class="header-table">
              <tbody>
                <tr>
                  <td style="width:50%;">logo</td>
                  <td class="text-right" style="width:50%;">Orders</td>
                </tr>
                <tr>
                  <td style="width:50%;">xxxxxxxxxxxxxx</td>
                  <td class="text-right" style="width:50%;"></td>
                </tr>
                <tr>
                  <td style="width:50%;">xxxxxxxxxxxxxx</td>
                  <td class="text-right" style="width:50%;"></td>
                </tr>
                <tr>
                  <td style="width:50%;">xxxxxxxxxxxxxx</td>
                  <td class="text-right" style="width:50%;"></td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </thead>
    <tbody class="border">
      <tr>
        <td class="no-padding border">
          <table width="100%" class="receiver">
            <tbody>
              <tr>
                <td style="width: 50%;">xxxxxx</td>
                <td class="text-right" style="width: 50%;">xxxxxx</td>
              </tr>
              <tr>
                <td style="width: 50%;">xxxxxx</td>
                <td class="text-right" style="width: 50%;">xxxxxx</td>
              </tr>
              <tr>
                <td style="width: 50%;">xxxxxx</td>
                <td class="text-right" style="width: 50%;">xxxxxx</td>
              </tr>
              <tr>
                <td style="width: 50%;">xxxxxx</td>
                <td class="text-right" style="width: 50%;"></td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
      <tr>
        <td class="no-padding">
          <table width="100%" class="item-lists">
            <thead>
              <tr>
                <td width="5%">xxxxxx</td>
                <td width="60%">xxxxxx</td>
                <td width="5%">xxxxxx</td>
                <td width="5%">xxxxxx</td>
                <td width="10%">xxxxxx</td>
                <td width="5%">xxxxxx</td>
                <td width="10%">xxxxxx</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>xx</td>
                <td class="text-right">xx</td>
                <td class="text-right">xx</td>
                <td class="text-right">xx</td>
                <td class="text-right">xx</td>
                <td class="text-right">xx</td>
              </tr>
              <tr>
                <td>1</td>
                <td>xx</td>
                <td class="text-right">xx</td>
                <td class="text-right">xx</td>
                <td class="text-right">xx</td>
                <td class="text-right">xx</td>
                <td class="text-right">xx</td>
              </tr>
              <tr>
                <td>1</td>
                <td>xx</td>
                <td class="text-right">xx</td>
                <td class="text-right">xx</td>
                <td class="text-right">xx</td>
                <td class="text-right">xx</td>
                <td class="text-right">xx</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colspan="2" rowspan="3">xxxxxx</td>
                <td colspan="3">xxxxxx</td>
                <td colspan="2" class="text-right">-</td>
              </tr>
              <tr>
                <td colspan="3">xxxxxx</td>
                <td colspan="2" class="text-right">-</td>
              </tr>
              <tr>
                <td colspan="3">xxxxxx</td>
                <td colspan="2" class="text-right">-</td>
              </tr>
            </tfoot>
          </table>
        </td>
      </tr>
      <tr>
        <td class="no-padding border">
          <table width="100%" class="condition">
            <tbody>
              <tr>
                <td class="text-center" style="width: 50%;">xxxxxx</td>
                <td class="text-center" style="width: 50%;">xxxxxx</td>
              </tr>
              <tr>
                <td class="text-center" style="width: 50%;">xxxxxx xxxxxx xxxxxx</td>
                <td class="text-center" style="width: 50%;">xxxxxxxxxxxxxxxxxxxxxxxx</td>
              </tr>
              <tr>
                <td class="text-center" style="width: 50%;">xxxxxxxxxxxxxxxxxxxxxxxx</td>
                <td class="text-center" style="width: 50%;">xxxxxx</td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
      <tfoot>
        <tr>
          <td class="no-padding">
            <table width="100%" class="signature">
              <tbody>
                <tr>
                  <td class="text-center" style="width: 50%;">xxxxxx..........................................  </td>
                  <td class="text-center" style="width: 50%;">xxxxxx.....................................</td>
                </tr>
                <tr>
                  <td class="text-center" style="width: 50%;">xxxxxx  xxxxxx</td>
                  <td class="text-center" style="width: 50%;">(xxxxxx    xxxxxx)</td>
                </tr>
                <tr>
                  <td class="text-center" style="width: 50%;">087-5070161 (xxxxxx)</td>
                  <td class="text-center" style="width: 50%;"></td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tfoot>
    </table> -->
  </div>
</template>

<script>
export default {
  props: {
    dataObj: {
      type: Object,
      required: true
    }
  },
  components: {
  },
  name: 'UserPage',
  data () {
    return {
      local: {}
    }
  },
  computed: {
  },
  created () {
    this.local = this.dataObj
  },
  methods: {
    getHtm () {
      return this.$refs.receipt
    }
  },
  watch: {
    dataObj () {
      this.local = this.dataObj
      console.log(this.local.storeName)
    }
  }
}
</script>

<style lang="scss" scoped>
p{
  color: #ff0000;
}
  .main-table{
    border: 1px solid #ccc;
    border-collapse: collapse;
    font-size: 13px;
  }
  .main-table tr td table tr td{
    padding: 5px;
  }
  .main-table .item-lists{
    border-collapse: collapse;
  }
  .main-table .item-lists tr td{
    border: 1px solid #ccc;
    border-collapse: collapse;
  }
  .item-lists thead tr td {
    text-align: center;
    font-weight: bold;
  }
  .item-lists tfoot tr td {
    text-align: center;
  }
  .signature{
    margin: 20px 0;
  }
  .border{
    border: 1px solid;
  }
  .no-padding{
    padding: 0 !important;
  }
  .text-right{
    text-align: right !important;
  }
  .text-center{
    text-align: center;
  }
</style>
