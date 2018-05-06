<template>
  <section class="section losing-page">
    <breadcrumb-bar :dataObj="local.pageObj"></breadcrumb-bar>
    <div class="container-block">
      <div class="tile is-ancestor">
        <div class="tile is-vertical is-12">
          <!-- <div class="tile">
            <div class="tile is-parent is-vertical is-12">
              <article class="tile is-child notification">
                <div class="tile">
                  <div class="tile is-parent is-vertical is-12">
                    <bar-chart :data="item6"  :height="150" ></bar-chart>
                  </div>
                </div>
              </article>
            </div>
          </div> -->
          <div class="tile">
            <div class="tile is-parent is-vertical is-9">
              <article class="tile is-child notification">
                <div class="tile">
                  <div class="tile is-parent is-vertical is-12">
                    <bar-chart :data="item6"  :height="150" ></bar-chart>
                  </div>
                </div>
              </article>
            </div>
            <div class="tile is-parent is-vertical">
              <article class="tile is-child notification">
                <div class="search-box container-block">
                  <!-- <h6>ค้นหา</h6> -->
                  <div class="block">
                    <!-- <span>ปี : </span>  -->
                    <input type="text" class="input" placeholder="ปี"/>
                    <br/>
                    <input type="text" class="input" placeholder="เดือน"/>
                  </div>
                  <!-- <div class="block">
                    <span>เดือน : </span> <input type="text" class="input" />
                  </div> -->
                  <div class="block">
                    <div class="field is-grouped is-grouped-multiline">
                      <div class="control">
                        <div class="tags has-addons">
                          <span class="tag is-light">โครงการ</span>
                          <span class="tag is-info">5</span>
                        </div>
                      </div>
                      <div class="control">
                        <div class="tags has-addons">
                          <span class="tag is-light">สัญญา</span>
                          <span class="tag is-info">25</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="block">
                    <button class="button is-link" @click="GOTOPAGE('LosingDetail', '')">รายละเอียด</button>
                  </div>
                </div>
              </article>
            </div>
          </div>
          <div class="tile">
            <div class="tile is-parent is-vertical is-6">
              <article class="tile is-child notification">
                <div class="tile">
                  <div class="tile is-parent is-vertical is-12">
                    <bar-chart :data="item4"  :height="150" ></bar-chart>
                  </div>
                </div>
              </article>
            </div>
            <div class="tile is-parent is-vertical is-6">
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
import barChart from '@Components/Chart/line'
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
            data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11],
            backgroundColor: 'rgba(255,146,146,.7)'
          }
        ]
      },
      item5: {
        labels: ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'],
        datasets: [
          {
            label: 'การจ่ายค่างวด',
            data: [20, 50, 12, 26, 13, 20, 54, 24, 42, 45, 23, 31],
            backgroundColor: 'rgba(250,157,50,.7)'
          }
        ]
      },
      item6: {
        labels: ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'],
        datasets: [
          {
            label: 'ความสูญเสียรวม',
            data: [20, 50, 12, 26, 13, 20, 54, 24, 42, 45, 23, 31],
            backgroundColor: 'rgba(169,169,169,.7)'
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
