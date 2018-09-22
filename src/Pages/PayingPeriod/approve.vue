<template>
    <section :class="['section', local.pageObj.template.class]">
      <breadcrumb-bar :dataObj="local.pageObj"></breadcrumb-bar>
      <div class="container-block">
        <div class="detail-panel">
          <div class="container-block  detail-block">
            <div class="container-block block c-header">
              <div class="block">
                <my-auto-complete
                @select="projectSelectedHandle"
                :arrInputs="'project'"
                placeholder="ค้นหาโครงการ"
                label=""
                ></my-auto-complete>
              </div>
            </div>
            <div class="block c-body">
              <table class="table rows-table is-hoverable">
                <thead>
                  <tr>
                    <th class="td order-8">ชื่อช่าง</th>
                    <th class="td order-6">แปลง</th>
                    <th class="td order-5">หมวดงาน</th>
                    <th class="td order-4">งวด/รายการ</th>
                    <th class="td order-3">หน่วย</th>
                    <th class="td order-2">ราคาต่อหน่วย</th>
                    <th class="td order-1">จำนวนเงินรวม</th>
                    <th class="td order-7" width=""></th>
                    <th class="td order-9" width=""></th>
                  </tr>
                </thead>
                <tbody>
                  <tr :key="index" v-for="(lists, index) in local.dataObj"> 
                    <td class="td order-8">
                      <p>{{lists[0].technician_name}}</p>
                    </td>
                    <td class="td order-6">
                      <p :key="`plan_${listIndex}`" v-for="(list, listIndex) in lists">{{list.plan}}</p>
                    </td>
                    <td class="td order-5">
                      <p :key="`group_name_${listIndex}`" v-for="(list, listIndex) in lists">{{list.work_group_name}}</p>
                    </td>
                    <td class="td order-4">
                      <p :key="`name_${listIndex}`" v-for="(list, listIndex) in lists">{{list.time}} / {{list.name}}</p>
                    </td>
                    <td class="td order-3">
                      <p :key="`amount_${listIndex}`" v-for="(list, listIndex) in lists">{{list.amount}} {{list.unit}}</p>
                    </td>
                    <td class="td order-2">
                      <p :key="`price_${listIndex}`" v-for="(list, listIndex) in lists">{{NUMBERWITHCOMMAS(list.price, 2)}} บาท</p>
                    </td>
                    <td class="td order-1">
                      <p :key="`total_price_${listIndex}`" v-for="(list, listIndex) in lists">{{NUMBERWITHCOMMAS(list.total_price, 2)}} บาท</p>
                    </td>
                    <td class="td order-7">
                      <div :key="`action_${listIndex}`" v-for="(list, listIndex) in lists">
                        <template v-if="list.status === '4' || list.status === '5'">
                          <p  v-if="list.status === '4'" class="tag is-danger">ไม่ผ่าน</p>
                          <p  v-if="list.status === '5'" class="tag is-success">จ่ายแล้ว</p>
                        </template>
                        <template v-else>
                          <my-action
                            type="null"
                            :obj="{title: 'จ่ายเงิน', color: 'is-warning', isConfirm: true}"
                            @clickEvent="submit('approve', list, index)"
                          >
                          </my-action>
                          <my-action
                            type="null"
                            :obj="{title: 'ไม่ผ่าน', color: 'is-danger', isConfirm: true}"
                            @clickEvent="submit('reject', list, index)"
                          >
                          </my-action>
                        </template>
                      </div>
                    </td>
                    <td class="td order-9">
                      <p class="tag is-gray" :key="`detail_${listIndex}`" v-for="(list, listIndex) in lists" @click="showDetail(list, index)" >รายละเอียด</p>

                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <model-panel ref="modelPanel">
        <div class="model" v-if="local.modelData != null">
          <div>ชื่อช่าง: <span>{{local.modelData.technician_name}}</span></div>
          <div>แปลง: <span>{{local.modelData.plan}}</span></div>
          <div>หมวดงาน: <span>{{local.modelData.work_group_name}}</span></div>
          <div>งวด: <span>{{local.modelData.time}} / {{local.modelData.name}}</span></div>
          <div>หน่วย: <span>{{local.modelData.amount}} {{local.modelData.unit}}</span></div>
          <div>ราคาต่อหน่วย: <span>{{NUMBERWITHCOMMAS(local.modelData.price, 2)}}</span></div>
          <div>จำนวนเงินรวม: <span>{{NUMBERWITHCOMMAS(local.modelData.total_price, 2)}}</span></div>
          <br/>
          <div class="update-status">
            <my-action
              type="null"
              :obj="{title: 'จ่ายเงิน', color: 'is-warning', isConfirm: true}"
              @clickEvent="submit('approve', local.modelData, local.modelData.index)"
            >
            </my-action>
            <my-action
              type="null"
              :obj="{title: 'ไม่ผ่าน', color: 'is-danger', isConfirm: true}"
              @clickEvent="submit('reject', local.modelData, local.modelData.index)"
            >
            </my-action>
          </div>
        </div>
      </model-panel>
    </section>
</template>

<script>
import breadcrumbBar from '@Components/Breadcrumb'
// import service from '@Services/app-service'
import myAutoComplete from '@Components/Form/my-autocomp'
import myAction from '@Components/Form/my-action'
import myInput from '@Components/Form/my-input'
import ModelPanel from '@Components/Model'
import service from '@Services/app-service'
import config from '@Config/app.config'
export default {
  props: {
  },
  components: {
    breadcrumbBar,
    myAutoComplete,
    myAction,
    myInput,
    ModelPanel
  },
  name: 'ApprovePage',
  data () {
    return {
      local: {
        pageObj: {
          items: [
            {name: 'จ่ายค่างวด', route: 'PayingPeriod', key: '', active: true, icon: 'fa fa-exchange'},
            {name: 'อนุมัติการจ่าย', route: 'Approve', key: '', active: true, icon: ''}
          ],
          template: {
            class: 'work-sheet-page'
          }
        },
        modelData: null,
        project: {
          selected: null
        },
        dataObj: []
      }
    }
  },
  computed: {
    // resourceName () {
    //   return config.api.workOrder.index
    // },
    // materialGroupResource () {
    //   return config.api.materialGroup.index
    // }
  },
  created () {
  },
  methods: {
    async fetchData () {
      let queryString = this.BUILDPARAM({project: this.local.project.selected})
      let obj = await service.getResource({resourceName: `${config.api.workSheet.index}/approval`, queryString})
      this.local.dataObj = obj.data
      // console.log(obj)
    },
    projectSelectedHandle (obj) {
      this.local.project.selected = obj.key
      this.fetchData()
    },
    showDetail (obj, index) {
      this.$refs.modelPanel.isActive = true
      this.local.modelData = obj
      this.local.modelData.index = index
    },
    async submit (res, item, index) {
      let status = '5'
      if (res === 'reject') {
        status = '4'
      }
      let resourceName = `${config.api.workSheetApproval.index}/${item.id}`
      let result = await service.putResource({data: {status, updateType: 'update-status'}, resourceName})
      // if (result.data !== 1) return
      this.setItemAfterUpdated(item, index, status)
      this.NOTIFY('success')
    },
    setItemAfterUpdated (obj, index, status) {
      this.local.dataObj[index].map((item) => {
        if (obj.id === item.id) {
          item.status = status
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@Styles/var.scss';
.block.c-header{
  flex-direction: column;
  @media (min-width: $tabletBreakpoint) {
    flex-direction: row;
  }
  .block{
    padding: 3px;
    margin-bottom: 8px;
  }
}
.detail-panel .c-body{
  padding: 0 !important;
}
p.tag{
  display: block;
}
table{
  min-width: unset !important;
  tr {
    .order-1, .order-2, .order-3, .order-4, .order-5, .order-7{
      display: none;
    }
    .order-9{
      p{
        cursor: pointer;
      }
    }
    td{
      div{
        margin: 5px 0;
        button{
          font-size: 0.9em;
          margin: 0px 3px;
        }
      }
      
    }
    @media (min-width: $tabletBreakpoint) {
      .order-4{
        display: table-cell;
      }
    }
    @media (min-width: $computerBreakpoint) {
      .td{
        display: table-cell;
      }
      .order-9{
        display: none;
      }
    }
    
  }
}
.model{
  padding: 10px;
  &>div{
    margin: 3px 0;
  }
  span{
    font-weight: bold;
  }
  .update-status{
    text-align: center;
    button{
      font-size: 0.9em;
      margin: 0 4px;
    }
  }
}
</style>
