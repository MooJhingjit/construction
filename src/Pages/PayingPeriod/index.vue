<template>
  <section class="section home-page" v-if="server !== null">
    <breadcrumb-bar :dataObj="local.pageObj"></breadcrumb-bar>
    <div class="container-block">
      <div class="tile is-ancestor">
        <div class="tile is-vertical is-12">
          <div class="tile">
            <div class="tile is-parent is-vertical is-6">
              <article class="tile is-child notification">
                <div class="container-block stat">
                  <div class="block chart container-block">
                    <spark-line
                    :config="server.stat.submitStat.config"
                    :data="server.stat.submitStat.data"
                    ></spark-line>
                    <div class="value">
                      <span class="num">{{server.stat.submitStat.data.count}}</span>
                      <span class="text">รายการ</span>
                    </div>
                  </div>
                  <div class="block detail container-block">
                      <button class="button" @click="GOTOPAGE('Worksheet', '')"><i class="fa fa-plus-circle" aria-hidden="true"></i> ส่งงานผู้รับเหมา</button>
                  </div>
                </div>
              </article>
            </div>
            <div class="tile is-parent is-vertical is-6">
              <article class="tile is-child notification">
                 <div class="container-block stat">
                  <div class="block chart container-block">
                     <spark-line
                    :config="server.stat.approvedStat.config"
                    :data="server.stat.approvedStat.data"
                    ></spark-line>
                    <div class="value">
                      <span class="num">{{server.stat.approvedStat.data.count}}</span>
                      <span class="text">รายการ</span>
                    </div>
                  </div>
                  <div class="block detail container-block">
                    <button class="button" @click="GOTOPAGE('Approve', '')"><i class="fa fa-plus-circle" aria-hidden="true"></i> อนุมัติการจ่าย</button>
                  </div>
                </div>
              </article>
            </div>
            <!-- <div class="tile is-parent is-vertical is-4">
              <article class="tile is-child notification">
                 <div class="container-block stat">
                  <div class="block chart container-block">
                     <spark-line
                    :config="local.sparkLineObj.config"
                    :data="local.sparkLineObj.extraJobs"
                    ></spark-line>
                    <div class="value">
                      <span class="num">{{local.sparkLineObj.extraJobs.count}}</span>
                      <span class="text">รายการ</span>
                    </div>
                  </div>
                  <div class="block detail container-block">
                    <button class="button" @click="GOTOPAGE('ExtraJob', '')"><i class="fa fa-plus-circle" aria-hidden="true"></i> งานพิเศษ</button>
                  </div>
                </div>
              </article>
            </div> -->
            <div class="tile is-parent">
            </div>
          </div>
          <div class="tile function">
            <div class="tile is-parent is-vertical is-4">
              <article class="tile is-child notification container-block" @click="GOTOPAGE('Technician', '')">
                <span class="block title"><i class="fa fa-users" aria-hidden="true"></i> รายชื่อช่าง</span>
              </article>
            </div>
            <div class="tile is-parent is-vertical is-4">
              <article class="tile is-child notification container-block" @click="GOTOPAGE('WorkGroup', '')">
                <span class="block title"><i class="fa fa-th" aria-hidden="true"></i> หมวดงาน</span>
              </article>
            </div>
            <div class="tile is-parent is-vertical is-4">
              <article class="tile is-child notification container-block" @click="GOTOPAGE('Technician', '')">
                <span class="block title"><i class="fa fa-list" aria-hidden="true"></i> สรุปรายการจ่าย</span>
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
            {name: 'จ่ายค่างวด', route: 'PayingPeriod', key: '', active: true, icon: 'fa fa-exchange'}
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
          submitJobs: {
            name: 'submitJobs',
            barColor: '#4571BB',
            class: 'submit-jobs',
            dataSets: {
              values: [1, 2, 3, 1, 2, 1, 2],
              label: ['xxxx', 'xxxx', 'xxxx', 'xxxx', 'xxxx', 'xxxx', 'xxxx']
            },
            count: 12
          },
          approvePayment: {
            name: 'approvePayment',
            barColor: '#4571BB',
            class: 'approve-payment',
            dataSets: {
              values: [1, 2, 1, 1, 2, 3, 1],
              label: ['xxxx', 'xxxx', 'xxxx', 'xxxx', 'xxxx', 'xxxx', 'xxxx']
            },
            count: 11
          },
          extraJobs: {
            name: 'extraJobs',
            barColor: '#4571BB',
            class: 'extra-jobs',
            dataSets: {
              values: [3, 2, 3, 1, 2, 2, 2],
              label: ['xxxx', 'xxxx', 'xxxx', 'xxxx', 'xxxx', 'xxxx', 'xxxx']
            },
            count: 15
          }
        },
        workingProgress: [],
        extraOrdering: null
      },
      server: null
    }
  },
  computed: {
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      let resourceName = config.api.payingPeriod.home
      let queryString = []
      service.getResource({resourceName, queryString})
        .then((res) => {
          if (res.status === 200) {
            this.server = res.data
          }
        })
        .catch(() => {
          this.GOTOPAGE('Login', '')
        })
    }
  }
}
</script>

<style lang="scss" scoped>
article .block.detail button i{
  margin-right: 4px;
}
</style>
