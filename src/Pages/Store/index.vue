<template>
  <option-detail-template :templateObj="local.template">
    <template slot="title"><breadcrumb-bar :dataObj="local.pageObj"></breadcrumb-bar></template>
    <template slot="search-status"></template>
    <template slot="search-input">
      <div class="search-input control has-icons-left">
        <input class="input" type="text" placeholder="ค้นหา">
        <span class="icon is-small is-left">
          <i class="fa fa-search" aria-hidden="true"></i>
        </span>
      </div>
    </template>
    <template slot="search-results">
      <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
        <thead>
            <tr>
              <th>ชื่อร้านค้า</th>
              <th>ประเภทวัสดุ</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Three</td>
              <td>Three</td>
            </tr>
             <tr>
              <td>Three</td>
              <td>Three</td>
            </tr>
             <tr>
              <td>Three</td>
              <td>Three</td>
            </tr>
             <tr>
              <td>Three</td>
              <td>Three</td>
            </tr>
             <tr>
              <td>Three</td>
              <td>Three</td>
            </tr>
             <tr>
              <td>Three</td>
              <td>Three</td>
            </tr>
          </tbody>
      </table>
      <nav class="pagination" role="navigation" aria-label="pagination">
        <button class="pagination-previous" title="This is the first page" disabled>ก่อนหน้า</button>
        <button class="pagination-next">หน้าถัดไป</button>
      </nav>
    </template>
    <template v-if="true">
      <template slot="detail">
        <div class="container-block  detail-block">
          <div class="form-detail">
            <div class="name">ฟายด์เวิร์คกรุ๊ป : บ่อดักกลิ่น/บ่อไฟ</div>
            <div class="container-block">
              <div class="text-title">ชื่อร้านค้า</div>
              <div class="value">
                <input type="text" value="ฟายด์เวิร์คกรุ๊ป" placeholder="Primary input" class="input">
              </div>
            </div>
            <div class="container-block">
              <div class="text-title">ประเภทวัสดุ</div>
              <div class="value">
                <input type="text" value="บ่อดักกลิ่น/บ่อไฟ" placeholder="Primary input" class="input">
              </div>
            </div>
            <div class="container-block">
              <div class="text-title">ติดต่อ</div>
              <div class="value">
                <input type="text" value="คุณ ริน" placeholder="Primary input" class="input">
              </div>
            </div>
            <div class="container-block">
              <div class="text-title">FEX</div>
              <div class="value">
                <input type="text" value="02-1383610" placeholder="Primary input" class="input">
              </div>
            </div>
            <div class="container-block">
              <div class="text-title">TEL</div>
              <div class="value">
                <input type="text" value="0983749584" placeholder="Primary input" class="input">
              </div>
            </div>
          </div>
        </div>
        <div class="container-block footer-panel">
          <button class="button">บันทึกข้อมูล</button>
          <button class="button" @click="GOTOPAGE('AddMaterial', 'store-id')">เพิ่มรายการสินค้า</button>
          <button class="button" @click="GOTOPAGE('Material', 'store-id')">ดูรายการสินค้า</button>
        </div>
      </template>
    </template>
    <template v-else slot="detail">
      <no-result-template>
        <template slot="options">
          <button class="button">เพิ่มข้อมูลใหม่</button>
        </template>
      </no-result-template>
    </template>
  </option-detail-template>
</template>

<script>
import breadcrumbBar from '@Components/Breadcrumb'
import optionDetailTemplate from '@Components/Template/option-detail'
import noResultTemplate from '@Components/Template/no-result'
export default {
  props: {
    // templateName: {
    //   type: String,
    //   required: true
    // }
  },
  components: {
    breadcrumbBar,
    optionDetailTemplate,
    noResultTemplate
  },
  name: 'UserPage',
  data () {
    return {
      local: {
        pageObj: {
          items: [
            {name: 'ข้อมูลร้านค้า', route: 'Store', key: '', active: true, icon: 'fa fa-address-book-o'}
          ]
        },
        template: {
          class: 'store-page'
        }
      }
    }
  },
  computed: {
    // propertyComputed() {
    //   console.log('I change when this.property changes.')
    //   return this.property
    // }
  },
  created () {
    // console.log('created')
    // this.property = 'Example property update.'
    // console.log('propertyComputed will update, as this.property is now reactive.')
  },
  beforeMount () {
    // console.log('beforeMount')
    // console.log(`this.$el doesn't exist yet, but it will soon!`)
  },
  mounted () {
    // console.log('mounted')
    // console.log(this.$el.textContent) // I'm text inside the component.
  },
  beforeUpdate () {
    // console.log('beforeUpdate')
    // console.log(this.counter) // Logs the counter value every second, before the DOM updates.
  },
  updated () {
    // console.log('updated')
    // Fired every second, should always be true
    // console.log(+this.$refs['dom-element'].textContent === this.counter)
  },
  beforeDestroy () {
    // console.log('beforeDestroy')
    // Perform the teardown procedure for someLeakyProperty.
    // (In this case, effectively nothing)
    // this.someLeakyProperty = null
    // delete this.someLeakyProperty
  },
  destroyed () {
    // console.log('destroyed')
    // console.log(this) // There's practically nothing here!
    // MyCreepyAnalyticsService.informService('Component destroyed. All assets move in on target on my mark.')
  },
  methods: {
  }
}
</script>

<style lang="scss">
</style>
