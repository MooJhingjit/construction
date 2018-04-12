<template>
  <section class="section losing-page">
    <breadcrumb-bar :dataObj="local.pageObj"></breadcrumb-bar>
    <div class="container-block">
      <div class="tile is-ancestor">
        <div class="tile is-vertical is-12">
          <div class="tile">
            <div class="tile is-parent is-vertical is-6">
              <article class="tile is-child notification">
                <div class="tile">
                  <div class="tile is-parent is-vertical is-12">
                    <bar-chart :data="item6"  :height="150" ></bar-chart>
                  </div>
                </div>
              </article>
              <article class="tile is-child notification">
                <div class="tile">
                  <div class="tile is-parent is-vertical is-12">
                    <bar-chart :data="item4"  :height="150" ></bar-chart>
                  </div>
                </div>
              </article>
            </div>
            <div class="tile is-parent is-vertical ">
              <article class="tile is-child notification">
                <div class="container-block search-all">
                  <div class="block">
                    <div class="title">ปี</div>
                    <div class="select">
                      <select>
                        <option>ทั้งหมด</option>
                        <option>2018</option>
                        <option>2018</option>
                      </select>
                    </div>
                  </div>
                  <div class="block">
                    <div class="title">เดือน</div>
                    <div class="select">
                      <select>
                        <option>ทั้งหมด</option>
                        <option>2018</option>
                        <option>2018</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="container-block search-project">
                  <div class="block">
                    <div class="title"></div>
                    <button class="button is-link">ค้นหาโดยโครงการ</button>
                  </div>
                </div>
              </article>
              <article class="tile is-child notification">
                <div class="tile">
                  <div class="tile is-parent is-vertical is-12">
                    <bar-chart :data="item5"  :height="150" ></bar-chart>
                  </div>
                </div>
              </article>
            </div>
          </div>
           <div class="tile function">
            <div class="tile is-parent is-vertical is-4">
              <article class="tile is-child notification container-block">
                <span class="block title"><i class="fa fa-print" aria-hidden="true"></i> ออกรายงาน</span>
              </article>
            </div>
            <div class="tile is-parent is-vertical is-4">
              <article class="tile is-child notification container-block">
                <span class="block title"><i class="fa fa-print" aria-hidden="true"></i> ออกรายงาน</span>
              </article>
            </div>
            <div class="tile is-parent is-vertical is-4">
              <article class="tile is-child notification container-block">
                <span class="block title"><i class="fa fa-print" aria-hidden="true"></i> ออกรายงาน</span>
              </article>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import barChart from '@Components/Chart/bar'
import breadcrumbBar from '@Components/Breadcrumb'
export default {
  props: {
    // templateName: {
    //   type: String,
    //   required: true
    // }
  },
  components: {
    barChart,
    breadcrumbBar
  },
  name: 'OrderingPage',
  data () {
    return {
      local: {
        pageObj: {
          items: [
            {name: 'ข้อมูลสูญเสีย', route: 'Losing', key: '', active: true, icon: 'fa fa-thumbs-o-down'}
          ]
        }
      },
      config: {
        type: 'bar',
        height: '60',
        barWidth: 6,
        barSpacing: 5,
        tooltipFormat: '<span style="color: {{color}}">&#9679;</span>{{offset:offset}} <br/>{{value:value}} รายการ'
      },
      item4: {
        labels: ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'],
        datasets: [
          {
            label: 'การสั่งซื้อ',
            backgroundColor: '#ff903f',
            data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
          }
        ]
      },
      item5: {
        labels: ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'],
        datasets: [
          {
            label: 'การจ่ายค่างวด',
            backgroundColor: '#E3E3E3',
            data: [20, 50, 12, 26, 13, 20, 54, 24, 42, 45, 23, 31]
          }
        ]
      },
      item6: {
        labels: ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'],
        datasets: [
          {
            label: 'ความสูญเสียรวม',
            backgroundColor: '#E3E3E3',
            data: [20, 50, 12, 26, 13, 20, 54, 24, 42, 45, 23, 31]
          }
        ]
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
