<template>
  <option-detail-template :templateObj="local.template">
    <template slot="title">ข้อมูลผู้ใช้</template>
    <template slot="options">
      <div class="container-block">
        <div class="control has-icons-left">
          <div class="search-input control has-icons-left">
            <input class="input" type="text" placeholder="ค้นหา">
            <span class="icon is-small is-left">
              <i class="fa fa-search" aria-hidden="true"></i>
            </span>
          </div>
        </div>
        <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
          <thead>
            <tr>
              <th>ชื่อ</th>
              <th>ตำแหน่ง</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Three</td>
              <td>Four</td>
            </tr>
            <tr>
              <td>Five</td>
              <td>Six</td>
            </tr>
            <tr>
              <td>Seven</td>
              <td>Eight</td>
            </tr>
            <tr>
              <td>Nine</td>
              <td>Ten</td>
            </tr>
            <tr>
              <td>Eleven</td>
              <td>Twelve</td>
            </tr>
            <tr>
              <td>Eleven</td>
              <td>Twelve</td>
            </tr>
            <tr>
              <td>Eleven</td>
              <td>Twelve</td>
            </tr>
            <tr>
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
          <div class="profile-img container-block">
            <div class="block">
              <div class="img">
                <img src="https://lh3.googleusercontent.com/-vI_vuMTGLhY/AAAAAAAAAAI/AAAAAAAAAAA/AGi4gfyN1ZDACBSjk7nyMF0Dbw9C3mRMHQ/s192-c-mo/photo.jpg" alt="" />
                <span class="upload"><i class="fa fa-camera" aria-hidden="true"></i> เปลี่ยนรูปภาพ</span>
              </div>
              <div class="options"></div>
            </div>
          </div>
          <div class="profile-detail">
            <div class="name">Pokkrong Jhingjit</div>
            <div class="container-block">
              <div class="text-title">ชื่อ-นามสกุล</div>
              <div class="value"><input class="input" type="text" value="Pokkrong Jhingjit" placeholder="Primary input"></div>
            </div>
            <div class="container-block">
              <div class="text-title">ชื่อผู้ใช้</div>
              <div class="value"><input class="input" type="text" placeholder="Primary input"></div>
            </div>
            <div class="container-block">
              <div class="text-title">รหัสผ่าน</div>
              <div class="value"><input class="input" type="text" placeholder="Primary input"></div>
            </div>
            <div class="container-block">
              <div class="text-title">อีเมล์</div>
              <div class="value"><input class="input" type="text" placeholder="Primary input"></div>
            </div>
            <div class="container-block">
              <div class="text-title">เบอร์โทรศัพท์</div>
              <div class="value"><input class="input" type="text" placeholder="Primary input"></div>
            </div>
            <div class="container-block">
              <div class="text-title">ที่อยู่</div>
              <div class="value"><textarea class="textarea" id="" cols="30" rows="4"></textarea></div>
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
          class: 'user-page'
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
