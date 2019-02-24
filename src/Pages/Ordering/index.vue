<template>
  <section class="section ordering-page" v-if="local.ordering != null">
    <breadcrumb-bar :dataObj="local.pageObj"></breadcrumb-bar>
    <div class="container-block">
      <div class="tile is-ancestor">
        <div class="tile is-vertical is-12">
          <div class="tile">
            <div class="tile is-parent is-vertical is-6">
              <article class="tile is-child notification">
                <div class="title">จำนวนการซื้อ</div>
                <bar-chart :data="local.chart.normal" :height="150" ></bar-chart>
              </article>
            </div>
            <div class="tile is-parent">
              <article class="tile is-child notification">
                <div class="title">จำนวนการซื้อ (พิเศษ)</div>
                <bar-chart :data="local.chart.extra" :height="150" ></bar-chart>
              </article>
            </div>
          </div>
           <div class="tile">
            <div class="tile is-parent is-vertical is-6">
              <article class="tile is-child notification">
                <div class="header-title container-block">
                  <div class="title-left">
                    <div class="title">คำขอสั่งซื้อใหม่ {{countOrdering('normal')}} รายการ</div>
                  </div>
                  <div class="title-right">
                    <span class="tag is-light" @click="GOTOPAGE('OrderingDetail', 'all')">ดูข้อมูล</span>
                  </div>
                </div>
                <table class="table is-narrow rows-table">
                  <thead>
                    <tr>
                      <th>ประเภทโครงการ</th>
                      <th>เลขที่สัญญา</th>
                      <th>จำนวนรายการ</th>
                      <th>ราคารวม</th>
                      <!-- <th>วันที่</th> -->
                    </tr>
                  </thead>
                  <tbody>
                    <tr :key="index" v-for="(item, index) in local.ordering.normal" @dblclick="GOTOPAGE('OrderingDetail', item.contractCode)" >
                      <td>{{item.projectTypeName}}</td>
                      <td>{{item.contractCode}}</td>
                      <td>{{item.amount}}</td>
                      <td>{{NUMBERWITHCOMMAS(item.totalPrice)}}</td>
                      <!-- <td>{{SET_DATEFORMAT(item.created_at)}}</td> -->
                    </tr>
                  </tbody>
                </table>
              </article>
            </div>
             <div class="tile is-parent is-vertical is-6">
              <article class="tile is-child notification">
                <div class="header-title container-block">
                  <div class="title-left">
                    <div class="title extar">คำขอสั่งซื้อใหม่ (พิเศษ) {{countOrdering('extra')}} รายการ</div>
                  </div>
                  <div class="title-right">
                    <span class="tag is-light" @click="GOTOPAGE('OrderingDetail', 'all')">ดูข้อมูล</span>
                  </div>
                </div>
                <table class="table is-narrow rows-table">
                  <thead>
                    <tr>
                      <th>ประเภทโครงการ</th>
                      <th>เลขที่สัญญา</th>
                      <th>จำนวนรายการ</th>
                      <th>ราคารวม</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr :key="index" v-for="(item, index) in local.ordering.extra" @dblclick="GOTOPAGE('OrderingDetail', item.contractCode)" >
                      <td>{{item.projectTypeName}}</td>
                      <td>{{item.contractCode}}</td>
                      <td>{{item.amount}}</td>
                      <td>{{NUMBERWITHCOMMAS(item.totalPrice)}}</td>
                    </tr>
                  </tbody>
                </table>
              </article>
            </div>
          </div>
           <div class="tile function">
            <!-- <div class="tile is-parent is-vertical is-4">
              <article class="tile is-child notification container-block">
                <span class="block title"><i class="fa fa-print" aria-hidden="true"></i> ออกรายงาน</span>
              </article>
            </div> -->
            <div class="tile is-parent is-vertical is-6">
              <article class="tile is-child notification container-block" @click="showOrderingForm('normal')">
                <span class="block title"><i class="fa fa-plus-circle" aria-hidden="true"></i> สั่งซื้อปกติ</span>
              </article>
            </div>
            <div class="tile is-parent is-vertical is-6">
              <article class="tile is-child notification container-block"  @click="showOrderingForm('extra')">
                <span class="block title"><i class="fa fa-plus-circle" aria-hidden="true"></i> สั่งซื้อพิเศษ</span>
              </article>
            </div>
          </div>
        </div>
      </div>
    </div>
    <model-panel ref="modelPanel">
      <component ref="ordering" v-bind:is="local.orderingComponent"></component>
      <!-- <extra-comp ref="extraModal"></extra-comp>
      <normal-comp ref="normalModal"></normal-comp> -->
    </model-panel>
  </section>
</template>

<script>
import {bus} from '@/main'
import barChart from '@Components/Chart/line'
import breadcrumbBar from '@Components/Breadcrumb'
import ModelPanel from '@Components/Model'
import extraComp from './extra'
import normalComp from './normal'
import config from '@Config/app.config'
import service from '@Services/app-service'

export default {
  props: {
    // templateName: {
    //   type: String,
    //   required: true
    // }
  },
  components: {
    barChart,
    breadcrumbBar,
    ModelPanel,
    extraComp,
    normalComp
  },
  name: 'OrderingPage',
  data () {
    return {
      local: {
        pageObj: {
          items: [
            {name: 'การสั่งซื้อ', route: 'Ordering', key: '', active: true, icon: 'fa fa-object-group'}
          ]
        },
        ordering: null,
        chart: null,
        orderingComponent: extraComp
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
    bus.$on('updateOrderingPage', this.updateOrderingPage)
    this.fetchData()
  },
  methods: {
    fetchData () {
      let resourceName = `${config.api.ordering.home}`
      let queryString = []
      service.getResource({resourceName, queryString})
        .then((res) => {
          if (res.status === 200) {
            // this.local.server = res.data
            this.local.ordering = res.data.ordering
            this.local.chart = res.data.chart
          }
        })
        .catch(() => {
        })
    },
    updateOrderingPage () {
      this.fetchData()
    },
    showOrderingForm (orderType) {
      this.$refs.modelPanel.isActive = true
      if (orderType === 'normal') {
        this.local.orderingComponent = normalComp
        // this.$refs.ordering.fetchData()
      } else {
        this.local.orderingComponent = extraComp
        // this.$refs.ordering.fetchData()
      }
    },
    countOrdering (orderType) {
      let values = Object.values(this.local.ordering[orderType])
      if (values.length) {
        let sum = values.reduce(function (accumulator, currentValue) {
          return accumulator + currentValue.amount
        }, 0)
        return sum
      }
      return 0
    }
  },
  beforeDestroy () {
    bus.$off('updateOrderingPage', this.updateOrderingPage)
  }
}
</script>

<style lang="scss">
.modal-content{
  min-height: 300px;
}
</style>
