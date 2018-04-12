<template>
  <option-detail-template :templateObj="local.template">
    <template slot="title"><breadcrumb-bar :dataObj="local.pageObj"></breadcrumb-bar></template>
    <template slot="search-status">
      <div class="tags">
        <span class="tag">ดำเนินงาน</span>
        <span class="tag">เสร็จสิ้น</span>
      </div>
    </template>
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
              <th>รหัส</th>
              <th>ชื่อโครงการ</th>
              <th>ประเภท</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>LH011</td>
              <td>นันทวัน-ศรีนครินทร์</td>
              <td>นันทวัน</td>
            </tr>
            <tr>
              <td>LH120</td>
              <td>รามอินทรา พหลโยธิน 50</td>
              <td>นันทวัน</td>
            </tr>
            <tr>
              <td>LH171</td>
              <td>วงแหวน เทพารักษ์</td>
              <td>มัณฑนา</td>
            </tr>
            <tr>
              <td>LH179</td>
              <td>อ่อนนุช วงแหวน 2</td>
              <td>มัณฑนา</td>
            </tr>
            <tr>
              <td>LT007</td>
              <td>รามคำแหง</td>
              <td>นันทวัน</td>
            </tr>
            <tr>
              <td>LH322</td>
              <td>ศรีนครินทร์-ร่มเกล้า</td>
              <td>มัณฑนา</td>
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
          <div class="form-detail">
            <div class="name">LH011  นันทวัน-ศรีนครินทร์</div>
            <div class="container-block">
              <div class="text-title">รหัสโครงการ</div>
              <div class="value">
                <input type="text" value="LH011" placeholder="Primary input" class="input">
              </div>
            </div>
            <div class="container-block">
              <div class="text-title">ชื่อโครงการ</div>
              <div class="value">
                <input type="text" value="นันทวัน-ศรีนครินทร์" placeholder="Primary input" class="input">
              </div>
            </div>
            <div class="container-block">
              <div class="text-title">ประเภท</div>
              <div class="value">
                <div class="select">
                  <select>
                    <option>นันทวัน</option>
                    <option>มัณฑนา</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="container-block footer-panel">
          <button class="button">บันทึกข้อมูล</button>
          <button class="button" @click="GOTOPAGE('CreateContract', 'project')">สร้างสัญญาใหม่</button>
          <button class="button" @click="GOTOPAGE('Contract', 'project-id')">สัญญาในโครงการนี้ทั้งหมด</button>
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
            {name: 'โครงการ', route: 'Project', key: 'xxx', active: true, icon: 'fa fa-folder-open-o'}
          ]
        },
        template: {
          class: 'project-page'
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
