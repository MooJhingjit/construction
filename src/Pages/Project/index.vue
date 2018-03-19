<template>
  <option-detail-template :templateObj="local.template">
    <template slot="title">ข้อมูลโปรเจค</template>
    <template slot="options">
      <div class="container-block">
        <div class="control has-icons-left">
          <input class="input" type="text" placeholder="ค้นหา">
          <span class="icon is-small is-left">
            <i class="fa fa-search" aria-hidden="true"></i>
          </span>
        </div>
        <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
          <thead>
            <tr>
              <th>รหัส</th>
              <th>ชื่อโปรเจค</th>
              <th>วันที่สร้าง</th>
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
      </div>
    </template>
    <template v-if="true">
      <template slot="detail">
        <div class="container-block  detail-block">
          <div class="form-detail">
            <div class="name">LH-011  นันทวัน-ศรีนครินทร์</div> 
            <div class="container-block">
              <div class="text-title">รหัสปรเจค</div> 
              <div class="value">
                <input type="text" value="LH-011" placeholder="Primary input" class="input">
              </div>
            </div>
            <div class="container-block">
              <div class="text-title">ชื่อโปรเจค</div> 
              <div class="value">
                <input type="text" value="นันทวัน-ศรีนครินทร์" placeholder="Primary input" class="input">
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
import optionDetailTemplate from '@Components/Template/option-detail'
export default {
  props: {
    // templateName: {
    //   type: String,
    //   required: true
    // }
  },
  components: {
    optionDetailTemplate
  },
  name: 'UserPage',
  data () {
    return {
      local: {
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
