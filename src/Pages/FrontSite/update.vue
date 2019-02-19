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
              <th>เสร็จสิ้น</th>
            </thead>
            <tbody>
              <tr :class="{'success' : time.is_success}" :key="timeIndex" v-for="(time, timeIndex) in local.time">
                <td>{{time.time}} <span v-if="time.is_success">(เสร็จสิ้น)</span></td>
                <td class="list">
                  <div :key="taskIndex" v-for="(task, taskIndex) in time.progress">
                    <div class="task">{{task.order}}. {{task.name}} <span @click="showTaskDetail(task)" class="detail">[รายละเอียด]</span> </div>
                  </div>
                </td>
                <td class="status" width="70">
                  <div :key="taskIndex" v-for="(task, taskIndex) in time.progress">
                    <template v-if="task.status === 'done'">
                      <i class="fa fa-check-square-o" aria-hidden="true"></i>
                    </template>
                    <template v-else>
                      <my-action
                      :type="'null'"
                        :obj="{title: 'อัพเดท', color: 'button is-outlined', isConfirm: true}"
                        @clickEvent="updateTask(task)"
                      >
                      </my-action>
                      <!-- <button class="button" @click="updateTask(task)"></button> -->
                    </template>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
       </article>
    </div>
    <model-panel ref="modelPanel">
      <div class="model" v-if="local.modelData != null">
        <div>เลขที่สัญญา: <span>{{local.modelData.contract_code}}</span></div>
        <div>งวด: <span>{{local.modelData.time}}</span></div>
        <div>งาน: <span></span> {{local.modelData.order_all}} <span>{{local.modelData.name}}</span></div>
        <div>กำหนดเริ่ม (ตามสัญญา): <span>{{SET_DATEFORMAT(local.modelData.start_date)}}</span></div>
        <div>กำหนดเสร็จ (ตามสัญญา): <span>{{SET_DATEFORMAT(local.modelData.end_date)}}</span></div>
        <div>เสร็จจริง: <span>{{SET_DATEFORMAT(local.modelData.real_date)}}</span></div>
        <div>ล่าช้า: <span>{{local.modelData.delay}} (วัน)</span> </div>
        <div>สถานะ: <span>{{GET_STATUSNAME(local.modelData.status)}}</span></div>
      </div>
    </model-panel>
  </section>
</template>

<script>
import {bus} from '@/main'
import breadcrumbBar from '@Components/Breadcrumb'
import optionDetailTemplate from '@Components/Template/option-detail'
import service from '@Services/app-service'
import config from '@Config/app.config'
import ModelPanel from '@Components/Model'
import myAction from '@Components/Form/my-action'
export default {
  props: {
    // templateName: {
    //   type: String,
    //   required: true
    // }
  },
  components: {
    myAction,
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
  },
  created () {
    this.fetchData()
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
    async updateTask (task) {
      let resourceName = `${config.api.frontSite.index}/${this.$route.params.key}`
      let data = task
      data.houseId = this.local.contract.house_id
      data.projectTypeId = this.local.project.type
      let res = await service.putResource({data, resourceName})
      // console.log(res.status)
      if (res.status === 200) {
        setTimeout(function () {
          bus.$emit('emitSocket', {
            key: 'UPDATE_ORDERING',
            data: {}
          })
          console.log('dobue')
        }, 2000)
        this.NOTIFY('success')
        this.fetchData()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@Styles/var.scss';
section {
  padding: 0 !important;
  article{
    padding: 0px !important;
  }
  @media (min-width: $computerBreakpoint) {
    padding: 10 !important;
  }
}
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
          cursor: pointer;
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
    background: #d9f1c6;
  }
}
.model{
  padding: 10px;
  span{
    font-weight: bold;
  }
}
.front-site-update-page{
  article{
    font-size: 1em;
    @media (min-width: $computerBreakpoint) {
      font-size: 1.2em;
    }
    .project-name{
      font-size: 1.2em;
      // margin-bottom: 5px;
      padding: 10px;
      text-align: center;
    }
    .todo-lists{
      table{
        font-size: 1em;
        tbody{
          tr td.list{
            .task{
              font-size: 0.95em;
              color: $frist-text-black-color;
            }
            .detail{
              font-size: 0.85em;
              color: $second-text-black-color;
            }
            .date{
              font-size: 0.8em;
              color: $second-text-black-color;
            }
          }
          tr td.status{
            padding: 0;
            margin: 0;
            vertical-align: middle;
            text-align: center;
            i{
              font-size: 1.2em;
              color: $second-text-green-color;
            }
          }
        }
      }
    }
  }
}
</style>
