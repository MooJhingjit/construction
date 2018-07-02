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
                    <spark-line
                    :config="local.sparkLineObj.config"
                    :data="local.sparkLineObj.project"
                    ></spark-line>
                    <div class="value">
                      <span class="num">{{local.sparkLineObj.project.count}}</span>
                      <span class="text">โครงการ</span>
                    </div>
                  </div>
                  <div class="block detail container-block">
                      <button class="button" @click="GOTOPAGE('Project', 'all')">แสดงข้อมูล</button>
                  </div>
                </div>
              </article>
              <article class="tile is-child notification">
                 <div class="container-block stat">
                  <div class="block chart container-block">
                     <spark-line
                    :config="local.sparkLineObj.config"
                    :data="local.sparkLineObj.contract"
                    ></spark-line>
                    <div class="value">
                      <span class="num">{{local.sparkLineObj.contract.count}}</span>
                      <span class="text">สัญญา</span>
                    </div>
                  </div>
                  <div class="block detail container-block">
                    <button class="button" @click="GOTOPAGE('Contract', 'all')">แสดงข้อมูล</button>
                  </div>
                </div>
              </article>
            </div>
            <div class="tile is-parent">
              <article class="tile is-child notification">
                <p class="title">ข้อมูลสูญเสีย</p>
                <div class="content data-loss container-block">
                  <div class="order block">
                    <bar-chart v-if="local.extraOrdering != null" :data="local.extraOrdering"  :height="150" ></bar-chart>
                  </div>
                  <div class="stipend block">
                    <bar-chart :data="local.item5" :height="150"></bar-chart>
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
                      <th>โครงการ</th>
                      <th>เลขที่สัญญา</th>
                      <th>แปลน</th>
                      <th>แบบบ้าน</th>
                      <th>สถานะงาน</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr :key="index" v-for="(item, index) in local.workingProgress" @dblclick="GOTOPAGE('Contract', 'contract-id')">
                      <td>{{item.projectName}}</td>
                      <td>{{item.contractCode}}</td>
                      <td>{{item.plan}}</td>
                      <td>{{item.houseId}}</td>
                      <td>{{item.status}}</td>
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
      local: {
        pageObj: {
          items: [
            {name: 'หน้าหลัก', route: 'Home', key: '', active: true, icon: 'fa fa-home'}
          ]
        },
        sparkLineObj: {
          config: {
            type: 'bar',
            height: '60',
            barWidth: 6,
            barSpacing: 5,
            tooltipFormat: '<span style="color: {{color}}">&#9679;</span>{{offset:offset}} <br/>{{value:value}} รายการ'
          },
          project: {},
          contract: {}
        },
        workingProgress: [],
        extraOrdering: null,
        // item3: {
        //   count: 120,
        //   class: 'success',
        //   name: 'Success',
        //   detail: '',
        //   dataSets: {
        //     label: ['xx-xx-xxxx', 'xx-xx-xxxx', 'xx-xx-xxxx', 'xx-xx-xxxx', 'xx-xx-xxxx', 'xx-xx-xxxx', 'xx-xx-xxxx', 'xx-xx-xxxx', 'xx-xx-xxxx', 'xx-xx-xxxx', 'xx-xx-xxxx', 'xx-xx-xxxx'],
        //     values: [2, 4, 2, 3, 2, 3, 2, 2, 3, 2, 1, 2]
        //   },
        //   barColor: '#7dbe4b'
        // },
        // item4: {
        //   labels: ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'],
        //   datasets: [
        //     {
        //       label: 'การสั่งซื้อ',
        //       backgroundColor: 'rgba(255,146,146,.7)',
        //       data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
        //     }
        //   ]
        // },
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
    }
  },
  computed: {
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      let resourceName = config.api.home.index
      let queryString = []
      service.getResource({resourceName, queryString})
        .then((res) => {
          if (res.status === 200) {
            this.local.sparkLineObj.project = res.data.stat.projectStat
            this.local.sparkLineObj.contract = res.data.stat.contractStat
            this.local.workingProgress = res.data.workingProgress
            this.local.extraOrdering = res.data.extraOrdering
          }
        })
        .catch(() => {
          this.GOTOPAGE('Login', '')
        })
    }
  }
}
</script>

<style lang="scss">
</style>
