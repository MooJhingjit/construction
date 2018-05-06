<template>
  <option-detail-template :templateObj="local.template">
    <template slot="title"><breadcrumb-bar :dataObj="local.pageObj"></breadcrumb-bar></template>
    <template slot="search-status">
      <!-- <div class="tags">
        <span class="tag">ดำเนินงาน</span>
        <span class="tag">เสร็จสิ้น</span>
      </div> -->
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
              <th>รายการ</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>วัสดุเริ่มต้น</td>
            </tr>
          </tbody>
      </table>
      <nav class="pagination" role="navigation" aria-label="pagination">
        <button class="pagination-previous" title="This is the first page" disabled>ก่อนหน้า</button>
        <button class="pagination-next">หน้าถัดไป</button>
      </nav>
    </template>
    <template slot="function">
      <button class="button is-link" @click="submitForm('add')">เพิ่มข้อมูลใหม่</button>
    </template>
    <template v-if="true">
      <template slot="detail">
        <div class="container-block detail-block">
          <div class="block result">
            <div class="title-name">กลุ่มวัสดุ</div>
            <div class="name">
              <input type="text" class="input" value="วัสดุเริ่มต้น"/>
            </div>
            <div class="items">
              <table class="transparent-table">
                <thead>
                  <tr>
                    <td>รายการ</td>
                    <td>จำนวน</td>
                    <td></td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>แผ่นพื้นสำเร็จรูป ชนิด3ขา(LLไม่น้อยกว่า450kg/m²) ขนาด 0.35 x 2.83m.(SHEAE KEY 1จุด)</td>
                    <td><input type="text" size="2" class="input"></td>
                    <td><i class="fa fa-times" aria-hidden="true"></i></td>
                  </tr>
                  <tr>
                    <td>เสาเข็ม I 12x12x2.00 m(.งานถังบำบัด)</td>
                    <td><input type="text" size="2" class="input"></td>
                    <td><i class="fa fa-times" aria-hidden="true"></i></td>
                  </tr>
                  <tr>
                    <td>อิฐ Q-CON 7.5 Cm.</td>
                    <td><input type="text" size="2" class="input"></td>
                    <td><i class="fa fa-times" aria-hidden="true"></i></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="block search-material">
            <div class="title-name">ค้นหารายการวัสดุ</div>
            <div class="control has-icons-right">
              <input class="input" type="text" placeholder="">
              <span class="icon is-right">
                <i class="fa fa-search" aria-hidden="true"></i>
              </span>
            </div>
            <div class="items container-block">
              <table>
                <tr>
                  <td>แผ่นพื้นสำเร็จรูป ชนิด3ขา(LLไม่น้อยกว่า450kg/m²) ขนาด 0.35 x 2.83m.(SHEAE KEY 1จุด)</td>
                </tr>
                <tr>
                  <td>แผ่นพื้นสำเร็จรูป ชนิด3ขา(LLไม่น้อยกว่า450kg/m²)  ขนาด 0.35 x 1.94 m.</td>
                </tr>
                <tr>
                  <td>แผ่นพื้นสำเร็จรูป ชนิด3ขา(LLไม่น้อยกว่า200kg/m²) ขนาด 0.35 x 4.03 m.</td>
                </tr>
                <tr>
                  <td>แผ่นพื้นสำเร็จรูป ชนิด3ขา(LLไม่น้อยกว่า200kg/m²) ขนาด 0.35 x 3.35 m.</td>
                </tr>
                <tr>
                  <td>แผ่นพื้นสำเร็จรูป ชนิด3ขา(LLไม่น้อยกว่า200kg/m²) ขนาด 0.35 x 2.40 m.</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
        <div class="container-block footer-panel">
          <button class="button">บันทึกข้อมูล</button>
          <button class="button is-danger" >ลบข้อมูล</button>
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
  name: 'OrderingGroup',
  data () {
    return {
      local: {
        pageObj: {
          items: [
            {name: 'กลุ่มวัสดุ', route: 'OrderingGroup', key: 'xxx', active: true, icon: 'fa fa-folder-open-o'}
          ]
        },
        template: {
          class: 'ordering-group-page'
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
