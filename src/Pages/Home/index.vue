<template>
  <section class="section home-page">
    <breadcrumb-bar :dataObj="local.pageObj"></breadcrumb-bar>
    <div class="container-block">
      <div class="tile is-ancestor">
        <div class="tile is-vertical is-12">
          <div class="tile">
            <div class="tile is-parent is-vertical is-4">
              <article class="tile is-child notification flex-center">
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
              <article class="tile is-child notification flex-center">
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
              <article class="tile is-parent notification">
                <!-- <p class="title">ข้อมูลสูญเสีย</p> -->
                <div class="tile is-parent is-vertical">
                  <div class="tile is-child flex-center">
                    <bar-chart v-if="local.extraOrdering != null && local.extraOrdering.labels.length" :data="local.extraOrdering"  :height="150" ></bar-chart>
                    <template v-else>
                      <!-- <p class="title"></p> -->
                      <p class="subtitle">ไม่มีข้อมูลการสั่งซื้อพิเศษ</p>
                    </template>
                  </div>
                  <div class="tile is-child flex-center">
                    <bar-chart v-if="local.paying != null  && local.paying.labels.length" :data="local.paying" :height="150"></bar-chart>
                    <template v-else>
                      <!-- <p class="title">จ่ายค่างวด</p> -->
                      <p class="subtitle">ไม่มีข้อมูลการจ่ายค่างวด</p>
                    </template>
                  </div>
                </div>
              </article>
            </div>
          </div>
          <div class="tile is-parent">
            <article class="tile is-child notification">
              <p class="title">รายการที่กำลังดำเนินงาน...</p>
              <div class="content">
                <table class="table is-bordered rows-table">
                  <thead>
                    <tr>
                      <th>โครงการ</th>
                      <th>เลขที่สัญญา</th>
                      <th>แปลง</th>
                      <th>แบบบ้าน</th>
                      <!-- <th>กำลังเดินงาน</th> -->
                    </tr>
                  </thead>
                  <tbody>
                    <tr :key="index" v-for="(item, index) in local.workingProgress" @dblclick="GOTOPAGE('Contract', item.contractCode)">
                      <td>{{item.projectName}}</td>
                      <td>{{item.contractCode}}</td>
                      <td>{{item.plan}}</td>
                      <td>{{item.houseId}}</td>
                      <!-- <td>{{item.status}}</td> -->
                    </tr>
                  </tbody>
                </table>
              </div>
            </article>
          </div>
          <!-- <div class="tile function">
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
          </div> -->
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
            this.local.paying = res.data.paying
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
.tile.is-child.flex-center{
  div{
    width: 100%;
  }
}
</style>
