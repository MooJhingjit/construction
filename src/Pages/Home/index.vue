<template>
  <section class="section home-page">
      <div class="container">
        <h1 class="title">หน้าหลัก</h1>
        <div class="tile is-ancestor">
          <div class="tile is-vertical is-9">
            <div class="tile">
              <div class="tile is-parent is-vertical">
                <article class="tile is-child notification">
                  <p class="title">โปรเจค</p>
                  <div class="subtitle">
                    <div class="tags">
                      <span class="tag is-transparent">จากข้อมูลโปรเจค </span>
                      <span class="tag is-success">ทั้งหมด 20 </span>
                      <span class="tag is-warning">รออนุมัติ 2</span>
                    </div>
                  </div>
                  <div class="content">
                    <ul>
                      <li class="item">สร้างโปรเจคใหม่</li>
                      <li class="item">รายการโปรเจค</li>
                    </ul>
                  </div>
                </article>
                <article class="tile is-child notification">
                  <p class="title">สัญญา</p>
                  <div class="subtitle">
                    <div class="tags">
                      <span class="tag is-transparent">จากข้อมูลสัญญา </span>
                      <span class="tag is-success">ทั้งหมด 120 </span>
                      <span class="tag is-warning">รออนุมัติ 20</span>
                    </div>
                  </div>
                  <div class="content">
                    <ul>
                      <li class="item">เปิดสัญญาใหม่</li>
                      <li class="item">รายการสัญญา</li>
                    </ul>
                  </div>
                </article>
              </div>
              <div class="tile is-parent">
                <article class="tile is-child notification">
                  <p class="title">ข้อมูลสูญเสีย</p>
                  <!-- <div class="subtitle">With even more content</div> -->
                  <div class="content data-loss container-block">
                    <div class="order block">
                      <bar-chart :height="200"></bar-chart>
                    </div>
                    <div class="stipend block">
                      <bar-chart :height="200"></bar-chart>
                    </div>
                  </div>
                </article>
              </div>
            </div>
            <div class="tile is-parent">
              <article class="tile is-child notification">
                <p class="title">สถานะงานล่าสุด</p>
                <div class="content">
                  <table class="table is-bordered">
                    <thead>
                      <tr>
                        <th>โครงการ</th>
                        <th>เลขที่สัญญา</th>
                        <th>สถานะงาน</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>xxxxxx</td>
                        <td>xxxxxx</td>
                        <td>xxxxxx</td>
                      </tr>
                      <tr>
                        <td>xxxxxx</td>
                        <td>xxxxxx</td>
                        <td>xxxxxx</td>
                      </tr>
                      <tr>
                        <td>xxxxxx</td>
                        <td>xxxxxx</td>
                        <td>xxxxxx</td>
                      </tr>
                      <tr>
                        <td>xxxxxx</td>
                        <td>xxxxxx</td>
                        <td>xxxxxx</td>
                      </tr>
                      <tr>
                        <td>xxxxxx</td>
                        <td>xxxxxx</td>
                        <td>xxxxxx</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </article>
            </div>
          </div>
          <div class="tile is-parent">
            <article class="tile is-child notification">
              <div class="content">
                <p class="title">xxxxxxxx</p>
                  <div class="subtitle">
                  </div>
                <div class="content">
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
</template>

<script>
import barChart from '@Components/Chart/bar'
export default {
  props: {
    // templateName: {
    //   type: String,
    //   required: true
    // }
  },
  components: {
    barChart
  },
  name: 'HomePage',
  data () {
    return {
      property: 'Blank'
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
