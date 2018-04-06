<template>
  <section class="section ordering-page">
    <breadcrumb-bar :dataObj="local.pageObj"></breadcrumb-bar>
    <div class="container-block">
      <div class="tile is-ancestor">
        <div class="tile is-vertical is-12">
          <div class="tile">
            <div class="tile is-parent is-vertical is-6">
              <!-- <article class="tile is-child notification">
                <p class="title alert">สถานะการสั่งซื้อล่าสุด (ยังไม่ได้รับของ)</p>
                <table class="table is-narrow">
                  <thead>
                    <tr>
                      <th>วันที่สั่ง</th>
                      <th>วัสดุ</th>
                      <th>สถานะ</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Three</td>
                      <td>Four</td>
                      <td>Three</td>
                    </tr>
                    <tr>
                      <td>Five</td>
                      <td>Six</td>
                      <td>Four</td>
                    </tr>
                    <tr>
                      <td>Seven</td>
                      <td>Eight</td>
                      <td>Four</td>
                    </tr>
                    <tr>
                      <td>Nine</td>
                      <td>Ten</td>
                      <td>Four</td>
                    </tr>
                    <tr>
                      <td>Eleven</td>
                      <td>Three</td>
                      <td>Four</td>
                    </tr>
                  </tbody>
                </table>
                <div class="table-options container-block">
                  <button class="button">ดูข้อมูล</button>
                </div>
              </article> -->
              <article class="tile is-child notification">
                <div class="title">จำนวนการซื้อ</div>
                <bar-chart :data="item5" :height="150" ></bar-chart>
              </article>
            </div>
            <div class="tile is-parent">
              <article class="tile is-child notification">
                <div class="title">จำนวนการซื้อ (พิเศษ)</div>
                <bar-chart :data="item6" :height="150" ></bar-chart>
              </article>
            </div>
          </div>
           <div class="tile">
            <div class="tile is-parent is-vertical is-6">
              <article class="tile is-child notification">
                <div class="header-title container-block">
                  <div class="title-left">
                    <div class="title">คำขอสั่งซื้อใหม่ 5 รายการ</div>
                  </div>
                  <div class="title-right">
                    <span class="tag is-light" @click="GOTOPAGE('OrderingDetail', 'order-id')">ดูข้อมูล</span>
                  </div>
                </div>
                <table class="table is-narrow rows-table">
                  <thead>
                    <tr>
                      <th>เลขที่สัญญา</th>
                      <th>จำนวนรายการ</th>
                      <th>ราคารวม</th>
                      <th>วันที่</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr @dblclick="GOTOPAGE('OrderingDetail', 'order-id')" >
                      <td>LH120610029</td>
                      <td>5</td>
                      <td>1,000</td>
                      <td>21/02/2561</td>
                    </tr>
                  </tbody>
                </table>
                <!-- <div class="table-options container-block">
                  <button class="button"></button>
                </div> -->
              </article>
            </div>
             <div class="tile is-parent is-vertical is-6">
              <article class="tile is-child notification">
                <div class="header-title container-block">
                  <div class="title-left">
                    <div class="title extar">คำขอสั่งซื้อใหม่ (พิเศษ) 1 รายการ</div>
                  </div>
                  <div class="title-right">
                    <span class="tag is-light" @click="GOTOPAGE('OrderingDetail', 'order-id')">ดูข้อมูล</span>
                  </div>
                </div>
                <table class="table is-narrow rows-table">
                  <thead>
                    <tr>
                      <th>เลขที่สัญญา</th>
                      <th>จำนวนรายการ</th>
                      <th>ราคารวม</th>
                      <th>วันที่</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr @dblclick="GOTOPAGE('OrderingDetail', 'order-id')" >
                      <td>LH120610029</td>
                      <td>1</td>
                      <td>500</td>
                      <td>21/02/2561</td>
                    </tr>
                  </tbody>
                </table>
                <!-- <div class="table-options container-block">
                  <button class="button"></button>
                </div> -->
              </article>
            </div>
            <!-- <div class="tile is-parent is-vertical is-4 function">
              <article class="tile is-child notification container-block">
                <span class="block title"><i class="fa fa-print" aria-hidden="true"></i> ออกรายงาน</span>
              </article>
            </div> -->
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
              <article class="tile is-child notification container-block"  @click="GOTOPAGE('OrderingExtra', '')">
                <span class="block title"><i class="fa fa-plus-circle" aria-hidden="true"></i> สั่งซื้อพิเศษ</span>
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
            {name: 'การสั่งซื้อ', route: 'Ordering', key: '', active: true, icon: 'fa fa-object-group'}
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
      item5: {
        labels: ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'],
        datasets: [
          {
            label: 'การสั่งซื้อ',
            backgroundColor: '#F7894E',
            data: [20, 50, 12, 26, 13, 20, 54, 24, 42, 45, 23, 31]
          }
        ]
      },
      item6: {
        labels: ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'],
        datasets: [
          {
            label: 'การสั่งซื้อ (พิเศษ)',
            backgroundColor: '#F05858',
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
