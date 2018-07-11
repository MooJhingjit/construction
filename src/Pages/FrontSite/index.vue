<template>
  <section class="section front-site-page">
    <breadcrumb-bar :dataObj="local.pageObj"></breadcrumb-bar>
    <div class="container-block">
       <article class="tile is-child notification" :key="index" v-for="(item, index) in local.contracts">
        <div class="project-name">{{item.project.name}}</div>
        <div class="project-detail container-block">
          <div class="block">เลขที่สัญญา: {{item.code}}</div>
          <div class="block">แบบบ้าน: {{item.house_id}}({{item.plan}})</div>
        </div>
        <!-- <div class="current-task">งานปัจจุบัน: วางกระเบื้อง</div> -->
        <div class="next-task">
          <!-- <div class="name">งานถัดไป: xxxxxxx</div>
          <div class="date">วันที่อัพเดท: xx-xx-xxxx</div> -->
          <table class="table is-narrow">
            <thead>
              <th>รายการสั่งซื้อ</th>
              <th>จำนวน</th>
              <th>สถานะ</th>
            </thead>
            <tbody>
              <tr :key="orderIndex" v-for="(orderItem, orderIndex) in item.ordering">
                <td>{{orderItem.storeType}}</td>
                <td>{{orderItem.amount}}</td>
                <td><span :class="getStatusClass(orderItem.status)">{{GET_STATUSNAME(orderItem.status)}}</span></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="actions container-block">
          <button class="button block" @click="GOTOPAGE('FrontSiteUpdate', item.code)">สถานะงาน</button>
        </div>
       </article>
       <!-- <article class="tile is-child notification">
        <div class="project-name">Project name</div>
        <div class="current-task">งานปัจจุบัน: วางกระเบื้อง</div>
        <div class="next-task">
          <div class="name">งานถัดไป: xxxxxxx</div>
          <div class="date">วันที่อัพเดท: xx-xx-xxxx</div>
          <table class="table is-narrow">
            <thead>
              <th>รายการสั่งซื้อ</th>
              <th>จำนวน</th>
              <th>สถานะ</th>
            </thead>
            <tbody>
              <tr>
                <td>xxxxxxx</td>
                <td>xxxxxxx</td>
                <td><span class="tag is-warning">รอสินค้า</span></td>
              </tr>
              <tr>
                <td>xxxxxxx</td>
                <td>xxxxxxx</td>
                <td><span class="tag is-warning">รอสินค้า</span></td>
              </tr>
              <tr>
                <td>xxxxxxx</td>
                <td>xxxxxxx</td>
                <td><span class="tag is-warning">รอสินค้า</span></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="actions container-block">
          <button class="button block" @click="GOTOPAGE('FrontSiteUpdate', 'abc')">สถานะงาน</button>
        </div>
       </article> -->
    </div>
  </section>
</template>

<script>
import breadcrumbBar from '@Components/Breadcrumb'
import optionDetailTemplate from '@Components/Template/option-detail'
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
    breadcrumbBar,
    optionDetailTemplate
  },
  name: 'FrontSitePage',
  data () {
    return {
      local: {
        pageObj: {
          items: [
            {name: 'ไชต์งานหลัก', route: 'FrontSite', key: '', active: true, icon: 'fa fa-home'}
          ]
        },
        contracts: []
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
      let resourceName = config.api.frontSite.index
      let queryString = []
      service.getResource({resourceName, queryString})
        .then((res) => {
          if (res.status === 200) {
            this.local.contracts = res.data
            // 
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getStatusClass (status) {
      return [
        'tag',
        {'is-warning': status === 'wait'},
        {'is-info': status === 'confirmed'},
        {'is-success': status === 'received'}
      ]
    }
  }
}
</script>

<style lang="scss">
</style>
