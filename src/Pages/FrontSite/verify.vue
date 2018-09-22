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
              <th width="150">หมวด</th>
              <th>งวด/รายการ</th>
              <!-- <th>ตรวจสอบ</th> -->
            </thead>
            <tbody>
              <tr :key="index" v-for="(workSheet, index) in local.workSheet">
                <td><p>{{workSheet.work_group_name}}</p></td>
                <td >
                  <div class="list"
                  :key="listIndex"
                  v-for="(item, listIndex) in workSheet.lists"
                  @click="showDetail(item, index, listIndex)"
                  >
                    {{item.time}} {{item.name}} <span :class="`tag ${getListStatus(item.status, 'class')}`">
                      {{getListStatus(item.status, 'name')}}
                    </span>
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
        <div>งวด/รายการ: <span>{{local.modelData.time}} / {{local.modelData.name}}</span></div>
        <div>หน่วย: <span>{{local.modelData.unit}}</span></div>
        <div>ราคาต่อหน่วย: <span>{{NUMBERWITHCOMMAS(local.modelData.price, 2)}}</span></div>
        <div>จำนวนเงิน: <span>{{NUMBERWITHCOMMAS(local.modelData.total_price, 2)}}</span></div>
        <div>สถานะ:
          <span :class="`tag ${getListStatus(local.modelData.status, 'class')}`">
            {{getListStatus(local.modelData.status, 'name')}}
          </span>
        </div>
        <br/>
        <div class="update-status" v-if="local.modelData.status === 1">
          <label class="radio">
            <input type="radio" :value="true" v-model="local.workSheetStatus">
            ผ่านการตรวจสอบ
          </label>
          <label class="radio">
            <input type="radio" :value="false" v-model="local.workSheetStatus">
            ไม่ผ่านการตรวจสอบ
          </label>
        </div>
        <div class="update-status" v-if="local.modelData.status === 1">
          <my-action
            v-if="local.workSheetStatus !== null"
            @clickEvent="updateStatus()"
            type="update"
            :obj="{title: 'บันทึก', color: 'is-success', isConfirm: true}"
          >
          </my-action>
        </div>
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
            {name: 'ตรวจสอบงวดงาน', route: 'FrontSiteVerify', key: this.$route.params.key, active: true, icon: ''}
          ]
        },
        project: null,
        contract: null,
        progress: null,
        modelData: null,
        workSheet: [],
        workSheetSelected: {
          index: null,
          listIndex: null
        },
        workSheetStatus: null
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
      await this.getWorkSheet(this.local.contract.project_id, this.local.contract.plan)
    },
    async getWorkSheet (projectId, plan) {
      let queryString = this.BUILDPARAM({project: projectId, plan})
      let obj = await service.getResource({resourceName: `${config.api.workSheet.index}/all`, queryString})
      this.local.workSheet = obj.data
    },
    showDetail (item, index, listIndex) {
      this.reset()
      this.$refs.modelPanel.isActive = true
      this.local.modelData = item
      this.local.workSheetSelected.index = index
      this.local.workSheetSelected.listIndex = listIndex
    },
    async updateStatus () {
      let realStatus = (this.local.workSheetStatus) ? '3' : '2'
      let resourceName = `${config.api.workSheetDetail.index}/${this.local.modelData.id}`
      let result = await service.putResource({data: {status: realStatus}, resourceName})
      if (result.data !== 1) return
      // update frontsite frist
      let index = this.local.workSheetSelected.index
      let listIndex = this.local.workSheetSelected.listIndex
      this.local.workSheet[index].lists[listIndex].status = realStatus
      this.NOTIFY('success')
      this.reset()
    },
    reset () {
      this.local.workSheetSelected.index = null
      this.local.workSheetSelected.listIndex = null
      this.$refs.modelPanel.isActive = false
      this.local.workSheetStatus = null
    },
    getListStatus (status, type) {
      let res = this.GETWORKSHEETSTATUS(status)[0]
      return res[type]
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
  tr {
    .list, .status {
      padding: 5px !important;
      &>div{
        height: 40px;
        display: flex;
        align-items: center;
      }
      &>div+div{
        margin-top: 5px;
      }
    }
    .list{
      font-size: 0.8em;
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
    background: #fffce1;
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
  .update-status{
    text-align: center;
    padding: 10px;
    &>div+div{
      margin-top: 5px;
    }
  }
}
</style>
