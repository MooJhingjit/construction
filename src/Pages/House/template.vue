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
      <table class="table is-bordered rows-table">
        <thead>
            <tr>
              <th>แปลน</th>
              <th>แบบบ้าน</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>G03</td>
              <td>098SW319I</td>
            </tr>
            <tr>
              <td>G04</td>
              <td>098SW319I</td>
            </tr>
            <tr>
              <td>G05</td>
              <td>098SW319I</td>
            </tr>
            <tr>
              <td>G14</td>
              <td>098SW319I</td>
            </tr>
            <tr>
              <td>E01</td>
              <td>198PWY32T</td>
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
            <div class="name">G03  098SW319I</div>
            <div class="container-block">
              <div class="text-title">แปลน</div>
              <div class="value">
                <input type="text" value="G03" placeholder="Primary input" class="input">
              </div>
            </div>
            <div class="container-block">
              <div class="text-title">แบบบ้าน</div>
              <div class="value">
                <input type="text" value="098SW319I" placeholder="Primary input" class="input">
              </div>
            </div>
            <div class="container-block">
              <div class="text-title">เมนูสี</div>
              <div class="value">
                <input type="text" value="B2-2" placeholder="Primary input" class="input">
              </div>
            </div>
            <div class="container-block">
              <div class="text-title">เมนูกระเบื้อง</div>
              <div class="value">
                <input type="text" value="098SW-8SR2" placeholder="Primary input" class="input">
              </div>
            </div>
            <div class="container-block">
              <div class="text-title">โรงจอดรถ</div>
              <div class="value">
                <div class="select">
                  <select>
                    <option>ขวา</option>
                    <option>ซ้าย</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="container-block">
              <div class="text-title">บันไดวน</div>
              <div class="value">
                <div class="select">
                  <select>
                    <option>ขวา</option>
                    <option>ซ้าย</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="container-block footer-panel">
          <button class="button">บันทึกข้อมูล</button>
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
            {name: 'แบบบ้าน', route: 'Project', key: '', active: true, icon: 'fa fa-address-book-o'}
          ]
        },
        template: {
          class: 'house-template-page'
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
