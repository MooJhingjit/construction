<template>
  <section class="section front-site-page">
    <breadcrumb-bar :dataObj="local.pageObj"></breadcrumb-bar>
    <div class="container-block">
      <div class="search">
        <contract-serach :dataObj="local.contractSelection.inputs" @select="contractSelectedHandle"></contract-serach>
        <!-- <my-auto-complete
        @select="contractSelectedHandle"
        :arrInputs="local.contractSelection.inputs"
        placeholder="ค้นหาแปลง"
        label=""
        ></my-auto-complete> -->
      </div>
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
          <button class="button is-info block" @click="GOTOPAGE('FrontSiteUpdate', item.id)">สถานะงาน</button>
          <button class="button is-warning block" @click="GOTOPAGE('FrontSiteVerify', item.id)">ตรวจสอบงวดงาน</button>
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

import {bus} from '@/main'
import breadcrumbBar from '@Components/Breadcrumb'
import optionDetailTemplate from '@Components/Template/option-detail'
import service from '@Services/app-service'
import config from '@Config/app.config'
import myAutoComplete from '@Components/Form/my-autocomp'
import contractSerach from '@Components/Form/AutoSearch/contract'
export default {
  props: {
    // templateName: {
    //   type: String,
    //   required: true
    // }
  },
  components: {
    breadcrumbBar,
    optionDetailTemplate,
    myAutoComplete,
    contractSerach
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
        contracts: [],
        contractsTemp: [],
        contractSelection: {
          inputs: [],
          selected: null
        }
      }
    }
  },
  computed: {
  },
  created () {
    bus.$on('getOrderingStatus', this.getOrderingStatus)
    this.fetchData()
  },
  methods: {
    async fetchData () {
      let resourceName = config.api.frontSite.index
      let queryString = []
      let res = await service.getResource({resourceName, queryString})
      this.local.contractsTemp = res.data
      this.prepareSearch()
    },
    async getOrderingStatus () {
      await this.fetchData()
      this.contractSelectedHandle({code: this.local.contractSelection.selected})
    },
    prepareSearch () {
      this.local.contractSelection.inputs = this.local.contractsTemp.map((item) => {
        return {
          code: item.code,
          project_id: item.project_id,
          project_name: item.project.name,
          plan: item.plan,
          house_id: item.house_id
        }
      })
      // console.log(this.local.contractSelection.inputs)
    },
    contractSelectedHandle (objVal) {
      if (objVal === null) {
        this.local.contracts = []
      } else {
        this.local.contractSelection.selected = objVal.code
        this.local.contracts = this.local.contractsTemp.filter((item) => {
          return item.code === objVal.code
        })
      }
    },
    getStatusClass (status) {
      return [
        'tag',
        {'is-warning': status === 'wait'},
        {'is-info': status === 'confirmed'},
        {'is-success': status === 'received'}
      ]
    }
  },
  beforeDestroy () {
    bus.$off('getOrderingStatus', this.getOrderingStatus)
  }
}
</script>

<style lang="scss" scoped>
@import '~@Styles/var.scss';
.front-site-page{
  .search{
    min-width: 300px;
    margin: 10px 0;
    background: #fff;
    padding: 10px 5px;
  }
  article{
    margin-bottom: 15px !important;
    text-align: center;
    font-size: 1em;
    &>div{
      flex: 1;
      min-height: 40px;
    }
    .project-name{
      font-size: 1.3em;
      color: $frist-text-black-color;
    }
    .project-detail{
      flex-direction: row;
      &>.block:not(:last-child){
        margin-bottom: 5px;
      }
    }
    .current-task{
      span{
        font-size: 1em;
      }
      color: $second-text-black-color;
    }
    .next-task{
      .name, .date{
        color: $frist-text-black-color;
        margin-bottom: 5px;
        text-align: left;
      }
    }
   @media (min-width: $computerBreakpoint) {
      margin: 15px !important;
    }
  }
}
</style>
