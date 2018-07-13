<template>
  <section class="section front-site-update-page">
    <breadcrumb-bar :dataObj="local.pageObj"></breadcrumb-bar>
    <div class="container-block" v-if="local.project != null">
       <article class="tile is-child notification">
        <div class="project-name">{{local.project.name}} ({{local.contract.code}})</div>
        <!-- <div class="current-task">งานปัจจุบัน: วางกระเบื้อง</div>-->
        <div class="todo-lists">
          <table class="table is-bordered">
            <thead>
              <th>งวด</th>
              <th>งาน</th>
              <!-- <th>เริ่ม</th> -->
              <th>เสร็จสิ้น</th>
            </thead>
            <tbody>
              <tr :class="{'success' : time.is_success}" :key="timeIndex" v-for="(time, timeIndex) in local.time">
                <td>{{time.time}}</td>
                <td class="list">
                  <div :key="taskIndex" v-for="(task, taskIndex) in time.progress">
                    <div class="task">{{task.order}}. {{task.name}} <span @click="showTaskDetail(task)" class="detail">[รายละเอียด]</span> </div>
                    <!-- <div class="detail">detail</div> -->
                    <!-- <div class="date">xx-xx-xxxx นายxxxxx xxxxxx</div> -->
                  </div>
                </td>
                <!-- <td class="status" width="70"><i class="fa fa-check-square-o" aria-hidden="true"></i></td> -->
                <td class="status" width="70">
                  <!-- <i class="fa fa-check-square-o" aria-hidden="true"></i> -->
                  
                  <div :key="taskIndex" v-for="(task, taskIndex) in time.progress">
                    <template v-if="task.status === 'done'">
                      <i class="fa fa-check-square-o" aria-hidden="true"></i>
                    </template>
                    <template v-else>
                      <button class="button" @click="updateTask(task)">อัพเดท</button>
                    </template>
                    
                    <!-- <div class="detail">detail</div> -->
                    <!-- <div class="date">xx-xx-xxxx นายxxxxx xxxxxx</div> -->
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
       <!-- <div class="actions container-block">
          <button class="button block">อัพเดทสถานะ</button>
        </div> -->
       </article>
    </div>
    <model-panel ref="modelPanel">
      <div class="model" v-if="local.modelData != null">
        <div>เลขที่สัญญา: <span>{{local.modelData.contract_code}}</span></div>
        <div>งวด: <span>{{local.modelData.time}}</span></div>
        <div>งาน: <span></span> {{local.modelData.order_all}} <span>{{local.modelData.name}}</span></div>
        <div>กำหนดเริ่ม (ตามสัญญา): <span>{{SET_DATEFORMAT(local.modelData.start_date)}}</span></div>
        <div>กำหนดเสร็จ (ตามสัญญา): <span>{{SET_DATEFORMAT(local.modelData.end_date)}}</span></div>
        <div>เสร็จจริง: <span>{{local.modelData.real_date}}</span></div>
        <div>ล่าช้า: <span>{{local.modelData.delay}} (วัน)</span> </div>
        <div>สถานะ: <span>{{GET_STATUSNAME(local.modelData.status)}}</span></div>
      </div>
    </model-panel>
  </section>
</template>

<script>
import breadcrumbBar from '@Components/Breadcrumb'
import optionDetailTemplate from '@Components/Template/option-detail'
import service from '@Services/app-service'
import config from '@Config/app.config'
import ModelPanel from '@Components/Model'
export default {
  props: {
    // templateName: {
    //   type: String,
    //   required: true
    // }
  },
  components: {
    ModelPanel,
    breadcrumbBar,
    optionDetailTemplate
  },
  name: 'FrontSiteUpdatePage',
  data () {
    return {
      local: {
        pageObj: {
          items: [
            {name: 'ไชต์งานหลัก', route: 'FrontSite', key: '', active: false, icon: 'fa fa-home'},
            {name: 'อัพเดทสถานะ', route: 'FrontSiteUpdate', key: this.$route.params.key, active: true, icon: ''}
          ]
        },
        project: null,
        contract: null,
        progress: null,
        modelData: null
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
    // console.log(this.$route.params.key)
    this.fetchData()
    // console.log('created')
    // this.property = 'Example property update.'
    // console.log('propertyComputed will update, as this.property is now reactive.')
  },
  methods: {
    async fetchData () {
      let resourceName = `${config.api.frontSite.index}/${this.$route.params.key}`
      let queryString = []
      let itemObj = await service.getResource({resourceName, queryString})
      this.local.project = itemObj.data.project
      this.local.contract = itemObj.data.contract
      this.local.time = itemObj.data.time
    },
    showTaskDetail (task) {
      this.$refs.modelPanel.isActive = true
      this.local.modelData = task
    },
    updateTask (task) {
      let resourceName = `${config.api.frontSite.index}/${this.$route.params.key}`
      let data = task
      res = await service.putResource({data, resourceName})
      if (res.status === 200) {
        this.NOTIFY('success')
        this.fetchData()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.table tbody {
  // display: flex;
  // flex-direction: row;
  tr {
    .list, .status {
      // flex: 1;
      // display: flex;
      // flex-direction: column;
      padding: 5px !important;
      &>div{
        height: 50px;
        display: flex;
        align-items: center;
      }
      &>div+div{
        margin-top: 5px;
      }
    }
    .list{
      text-align: left !important;
      .task{
        .detail{
          color: #666;
        }
      }
    }
    .status{
      &>div{
        justify-content: center;
      }
      button{
        height: 100%;
      }
    }
  }
  tr.success{
    background: #fffce1;
  }
  
}
.model{
  padding: 10px;
  span{
    font-weight: bold;
  }
}
</style>
