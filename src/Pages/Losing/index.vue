<template>
  <section class="section losing-page">
    <breadcrumb-bar :dataObj="local.pageObj"></breadcrumb-bar>
    <div class="container-block">
      <div class="tile is-ancestor">
        <div class="tile is-vertical is-12">
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
                  <div class="block">
                    <input type="text" class="input" placeholder="ปี"/>
                    <br/>
                    <input type="text" class="input" placeholder="เดือน"/>
                  </div>
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
                    <bar-chart v-if="local.extraOrdering != null" :data="local.extraOrdering"  :height="150" ></bar-chart>
                    <!-- <bar-chart :data="item4"  :height="150" ></bar-chart> -->
                  </div>
                </div>
              </article>
            </div>
            <div class="tile is-parent is-vertical is-6">
              <article class="tile is-child notification">
                <div class="tile">
                  <div class="tile is-parent is-vertical is-12">
                    <bar-chart v-if="local.paying != null" :data="local.paying"  :height="150" ></bar-chart>
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
        },
        extraOrdering: null
      },
      config: {
        type: 'bar',
        height: '60',
        barWidth: 6,
        barSpacing: 5,
        tooltipFormat: '<span style="color: {{color}}">&#9679;</span>{{offset:offset}} <br/>{{value:value}} รายการ'
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
  },
  created () {
    this.fetchData()
  },
  methods: {
    async fetchData () {
      let resourceName = config.api.losing.home
      let queryString = []
      let res = await service.getResource({resourceName, queryString})
      this.local.extraOrdering = res.data.extraOrdering
      this.local.paying = res.data.paying
    }
  }
}
</script>

<style lang="scss">
</style>
