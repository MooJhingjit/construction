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
              <th>รายการ</th>
              <th>จำนวน</th>
              <th>ราคารวม</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Three</td>
              <td>Three</td>
              <td>Four</td>
            </tr>
            <tr>
              <td>Three</td>
              <td>Five</td>
              <td>Six</td>
            </tr>
            <tr>
              <td>Three</td>
              <td>Seven</td>
              <td>Eight</td>
            </tr>
            <tr>
              <td>Three</td>
              <td>Nine</td>
              <td>Ten</td>
            </tr>
            <tr>
              <td>Three</td>
              <td>Eleven</td>
              <td>Twelve</td>
            </tr>
            <tr>
              <td>Three</td>
              <td>Eleven</td>
              <td>Twelve</td>
            </tr>
            <tr>
              <td>Three</td>
              <td>Eleven</td>
              <td>Twelve</td>
            </tr>
            <tr>
              <td>Three</td>
              <td>Eleven</td>
              <td>Twelve</td>
            </tr>
          </tbody>
      </table>
      <nav class="pagination" role="navigation" aria-label="pagination">
        <button class="pagination-previous" title="This is the first page" disabled>ก่อนหน้า</button>
        <button class="pagination-next">หน้าถัดไป</button>
      </nav>
    </template>
    <template v-if="true" slot="detail">
      <div class="container-block  detail-block">
        <div class="block">
          <table class="transparent-table">
            <tr>
              <td colspan="2">วัสดุ: xxxxxx</td>
            </tr>
            <tr>
              <td>จำนวน: xxxxxxxx</td>
              <td>ราคารวม: xxxxxxxx</td>
            </tr>
          </table>
        </div>
        <div class="block">
          <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
            <thead>
              <tr>
                <th>#</th>
                <th>โครงการ</th>
                <th>แบบบ้าน</th>
                <th>จำนวน</th>
                <th>ราคารวม</th>
                <th>หมายเหตุ</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>xxxxxxxxxx</td>
                <td>xxxxxxxxxx</td>
                <td>xxxxxxxxxx</td>
                <td>xxxxxxxxxx</td>
                <td>xxxxxxxxxx</td>
              </tr>
              <tr>
                <td>2</td>
                <td>xxxxxxxxxx</td>
                <td>xxxxxxxxxx</td>
                <td>xxxxxxxxxx</td>
                <td>xxxxxxxxxx</td>
                <td>xxxxxxxxxx</td>
              </tr>
              <tr>
                <td>3</td>
                <td>xxxxxxxxxx</td>
                <td>xxxxxxxxxx</td>
                <td>xxxxxxxxxx</td>
                <td>xxxxxxxxxx</td>
                <td>xxxxxxxxxx</td>
              </tr>
              <tr>
                <td>4</td>
                <td>xxxxxxxxxx</td>
                <td>xxxxxxxxxx</td>
                <td>xxxxxxxxxx</td>
                <td>xxxxxxxxxx</td>
                <td>xxxxxxxxxx</td>
              </tr>
              <tr>
                <td>5</td>
                <td>xxxxxxxxxx</td>
                <td>xxxxxxxxxx</td>
                <td>xxxxxxxxxx</td>
                <td>xxxxxxxxxx</td>
                <td>xxxxxxxxxx</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
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
            {name: 'ข้อมูลสูญเสีย', route: 'Losing', key: '', active: true, icon: 'fa fa-address-book-o'},
            {name: 'การสั่งซื้อ', route: 'LosingOrdering', key: '', active: true, icon: 'f'}
          ]
        },
        template: {
          class: 'losing-ordering-page'
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
