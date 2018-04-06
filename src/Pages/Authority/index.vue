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
            <th>ตำแหน่ง</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>ผู้ดูแลระบบ</td>
          </tr>
          <tr>
            <td>ผู้บริหาร</td>
          </tr>
          <tr>
            <td>ฝ่ายบัญชี</td>
          </tr>
          <tr>
            <td>หัวหน้างาน</td>
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
        <div class="container-block detail-block">
          <div class="c-header">
            <p class="name">ผู้ดูแลระบบ</p>
          </div>
          <div class="c-body container-block">
            <div class="block container-block">
              <div class="name">
                การสั่งซื้อ
              </div>
              <div class="task">
                <ul>
                  <li>
                    <label class="checkbox">
                      <input type="checkbox">
                      xxxxxx
                    </label>
                  </li>
                  <li>
                    <label class="checkbox">
                      <input type="checkbox">
                      xxxxxx
                    </label>
                  </li>
                  <li>
                    <label class="checkbox">
                      <input type="checkbox">
                      xxxxxx
                    </label>
                  </li>
                </ul>
              </div>
            </div>
            <div class="block container-block">
              <div class="name">
                ข้อมูลสูญเสีย
              </div>
              <div class="task">
                <ul>
                  <li>
                    <label class="checkbox">
                      <input type="checkbox">
                      xxxxxx
                    </label>
                  </li>
                  <li>
                    <label class="checkbox">
                      <input type="checkbox">
                      xxxxxx
                    </label>
                  </li>
                  <li>
                    <label class="checkbox">
                      <input type="checkbox">
                      xxxxxx
                    </label>
                  </li>
                </ul>
              </div>
            </div>
            <div class="block container-block">
              <div class="name">
                การจ่ายค่างวด
              </div>
              <div class="task">
                <ul>
                  <li>
                    <label class="checkbox">
                      <input type="checkbox">
                      xxxxxx
                    </label>
                  </li>
                  <li>
                    <label class="checkbox">
                      <input type="checkbox">
                      xxxxxx
                    </label>
                  </li>
                  <li>
                    <label class="checkbox">
                      <input type="checkbox">
                      xxxxxx
                    </label>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
        </div>
        <div class="container-block footer-panel">
            <button class="button">บันทึกข้อมูล</button>
        </div>
      </template>
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
  </option-detail-template>
</template>

<script>
import breadcrumbBar from '@Components/Breadcrumb'
import optionDetailTemplate from '@Components/Template/option-detail'
export default {
  props: {
    // templateName: {
    //   type: String,
    //   required: true
    // }
  },
  components: {
    breadcrumbBar,
    optionDetailTemplate
  },
  name: 'AuthorityPage',
  data () {
    return {
      local: {
        pageObj: {
          items: [
            {name: 'สิทธิ์การใช้งาน', route: 'Authority', key: '', active: true, icon: 'fa fa-check-square-o'}
          ]
        },
        template: {
          class: 'authority-page'
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
