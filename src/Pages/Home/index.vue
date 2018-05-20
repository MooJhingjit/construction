<template>
  <section class="section home-page">
    <breadcrumb-bar :dataObj="local.pageObj"></breadcrumb-bar>
    <div class="container-block">
      <div class="tile is-ancestor">
        <div class="tile is-vertical is-12">
          <div class="tile">
            <div class="tile is-parent is-vertical is-4">
              <article class="tile is-child notification">
                <div class="container-block stat">
                  <div class="block chart container-block">
                    <spark-line :config="config" :data="item1"></spark-line>
                    <div class="value">
                      <span class="num">4</span>
                      <span class="text">โครงการ</span>
                    </div>
                  </div>
                  <div class="block detail container-block">
                    <!-- <button class="button" @click="goToPage('Project')">สร้างโครงการใหม่</button> -->
                      <button class="button" @click="GOTOPAGE('Project', 'all')">แสดงข้อมูล</button>
                  </div>
                </div>
              </article>
              <article class="tile is-child notification">
                 <div class="container-block stat">
                  <div class="block chart container-block">
                    <spark-line :config="config" :data="item2"></spark-line>
                    <div class="value">
                      <span class="num">26</span>
                      <span class="text">สัญญา</span>
                    </div>
                  </div>
                  <div class="block detail container-block">
                    <!-- <button class="button" @click="goToPage('Contract')">สร้างสัญญาใหม่</button> -->
                    <button class="button" @click="GOTOPAGE('Contract', 'all')">แสดงข้อมูล</button>
                    <!-- <div class="block alert">
                      <span class="tag is-warning">รออนุมัติ 5</span>
                      <span class="tag is-info">ดำเนินงาน 10</span>
                    </div> -->
                  </div>
                </div>
              </article>
              <!-- <article class="tile is-child notification">
                <div class="container-block stat">
                  <div class="block chart container-block">
                    <spark-line :config="config" :data="item3"></spark-line>
                    <div class="value">
                      <span class="num">42</span>
                      <span class="text">เสร็จสิ้น</span>
                    </div>
                  </div>
                  <div class="block detail container-block">
                    <button class="button" @click="GOTOPAGE('Contract', 'all-success')">แสดงข้อมูล</button>
                  </div>
                </div>
              </article> -->
            </div>
            <div class="tile is-parent">
              <article class="tile is-child notification">
                <p class="title">ข้อมูลสูญเสีย</p>
                <div class="content data-loss container-block">
                  <div class="order block">
                    <bar-chart :data="item4"  :height="150" ></bar-chart>
                  </div>
                  <div class="stipend block">
                    <bar-chart :data="item5" :height="150"></bar-chart>
                  </div>
                </div>
              </article>
            </div>
          </div>
          <div class="tile is-parent">
            <article class="tile is-child notification">
              <p class="title">สถานะงานล่าสุด</p>
              <div class="content">
                <table class="table is-bordered rows-table">
                  <thead>
                    <tr>
                      <th>แปลน</th>
                      <th>โครงการ</th>
                      <th>เลขที่สัญญา</th>
                      <th>สถานะงาน</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr @dblclick="GOTOPAGE('Contract', 'contract-id')">
                      <td>00B01</td>
                      <td>นันทวัน-ศรีนครินทร์</td>
                      <td>LH120610015</td>
                      <td>ทำสัญญาก่อสร้าง</td>
                    </tr>
                    <tr>
                      <td>00D03</td>
                      <td>นันทวัน-ศรีนครินทร์</td>
                      <td>199CA238C</td>
                      <td>งานพื้นสำเร็จชั้นล่าง</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </article>
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
import sparkLine from '@Components/Chart/spark-line'
import breadcrumbBar from '@Components/Breadcrumb'
import service from '@Services/app-service'
import config from '@Config/app.config'
export default {
  props: {
    // templateName: {
    //   type: String,
    //   required: true
    // }
  },
  components: {
    barChart,
    sparkLine,
    breadcrumbBar
  },
  name: 'HomePage',
  data () {
    return {
      server: {
      },
      local: {
        pageObj: {
          items: [
            {name: 'หน้าหลัก', route: 'Home', key: '', active: true, icon: 'fa fa-home'}
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
      item1: {
        count: 120,
        class: 'project',
        name: 'Project',
        detail: '',
        dataSets: {
          label: ['xx-xx-xxxx', 'xx-xx-xxxx', 'xx-xx-xxxx', 'xx-xx-xxxx', 'xx-xx-xxxx', 'xx-xx-xxxx', 'xx-xx-xxxx', 'xx-xx-xxxx', 'xx-xx-xxxx', 'xx-xx-xxxx', 'xx-xx-xxxx', 'xx-xx-xxxx'],
          values: [1, 5, 6, 8, 7, 4, 5, 9, 2, 7, 2, 5]
        },
        barColor: '#4571BB'
      },
      item2: {
        count: 120,
        class: 'contract',
        name: 'Contract',
        detail: '',
        dataSets: {
          label: ['xx-xx-xxxx', 'xx-xx-xxxx', 'xx-xx-xxxx', 'xx-xx-xxxx', 'xx-xx-xxxx', 'xx-xx-xxxx', 'xx-xx-xxxx', 'xx-xx-xxxx', 'xx-xx-xxxx', 'xx-xx-xxxx', 'xx-xx-xxxx', 'xx-xx-xxxx'],
          values: [4, 3, 3, 2, 5, 4, 2, 9, 2, 2, 1, 3]
        },
        barColor: '#fa6854'
      },
      item3: {
        count: 120,
        class: 'success',
        name: 'Success',
        detail: '',
        dataSets: {
          label: ['xx-xx-xxxx', 'xx-xx-xxxx', 'xx-xx-xxxx', 'xx-xx-xxxx', 'xx-xx-xxxx', 'xx-xx-xxxx', 'xx-xx-xxxx', 'xx-xx-xxxx', 'xx-xx-xxxx', 'xx-xx-xxxx', 'xx-xx-xxxx', 'xx-xx-xxxx'],
          values: [2, 4, 2, 3, 2, 3, 2, 2, 3, 2, 1, 2]
        },
        barColor: '#7dbe4b'
      },
      item4: {
        labels: ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'],
        datasets: [
          {
            label: 'การสั่งซื้อ',
            backgroundColor: 'rgba(255,146,146,.7)',
            data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
          }
        ]
      },
      item5: {
        labels: ['มกราคม', 'กุมภาพันธ์', 'March', 'เมษายน', 'พฤษภาคม', 'June', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'],
        datasets: [
          {
            label: 'การจ่ายค่างวด',
            backgroundColor: 'rgba(250,157,50,.7)',
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
    this.fetchData()
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
    fetchData () {
      let resourceName = config.api.home.index
      let queryString = {}
      service.getResource({resourceName, queryString})
        .then((res) => {
          if (res.status === 200) {
            this.server = res.data
          }
        })
        .catch(() => {
          console.log()
          this.GOTOPAGE('Login', '')
        })
    }
  }
}
</script>

<style lang="scss">
</style>
