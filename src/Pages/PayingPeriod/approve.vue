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
                :config="{getNullVal: false}"
                placeholder="ค้นหาโครงการ"
                label=""
                ></my-auto-complete>
              </div>
              <div class="block">
                  <my-auto-complete
                  v-if="local.project.selected !== null"
                  :arrInputs="local.yearSelection.inputs"
                  @select="filterYear"
                  :config="{getNullVal: true}"
                  placeholder="ระบุปี"
                  label=""
                  ></my-auto-complete>
                </div>
                <div class="block">
                  <my-auto-complete
                  v-if="local.yearSelection.selected !== null && local.project.selected !== null"
                  :arrInputs="local.monthSelection.inputs"
                  @select="filterMonth"
                  :config="{getNullVal: true}"
                  placeholder="ระบุเดือน"
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
                    <th class="td order-3" width="50">หน่วย</th>
                    <th class="td order-2" width="100">ราคาต่อหน่วย</th>
                    <th class="td order-1" width="100">จำนวนเงินรวม</th>
                    <th class="td order-7" width="">อัพเดทล่าสุด</th>
                    <th class="td order-7" width=""></th>
                    <th class="td order-9" width=""></th>
                  </tr>
                </thead>
                <tbody>
                  <tr :key="index" v-for="(lists, index) in itemLists">
                    <td class="td order-8">
                      <p>{{lists[0].technician_name}}</p>
                      <i class="fa fa-print" @click="printWorkSheet(lists)" aria-hidden="true"></i>
                    </td>
                    <td class="td order-6">
                      <div :class="[{'item-list': true, 'has-input': list.is_extra}]" :key="`plan_${listIndex}`" v-for="(list, listIndex) in lists">
                        <p :class="getClass(list)">{{list.plan}}</p>
                      </div>
                    </td>
                    <td class="td order-5">
                      <div :class="[{'item-list': true, 'has-input': list.is_extra}]" :key="`group_name_${listIndex}`" v-for="(list, listIndex) in lists">
                        <p :class="getClass(list)">{{list.work_group_name}}</p>
                      </div>
                    </td>
                    <td class="td order-4">
                      <div :class="[{'item-list': true, 'has-input': list.is_extra}]" :key="`name_${listIndex}`" v-for="(list, listIndex) in lists">
                        <p :class="getClass(list)" >{{list.time}} / {{list.name}}</p>
                      </div>
                    </td>
                    <td class="td order-3">
                      <div :class="[{'item-list': true, 'has-input': list.is_extra}]" :key="`amount_${listIndex}`" v-for="(list, listIndex) in lists">
                        <template  v-if="list.is_extra && list.status === '3'">
                          <my-input
                            :value="list.amount"
                            :validator="$validator"
                            :inputObj="{type: 'text', name: `amount${listIndex}`, placeholder: '', validate: 'required'}"
                            @input="value =>  updateData(value, 'amount', index, listIndex)"
                          ></my-input>
                        </template>
                        <p
                        :class="getClass(list)"
                        v-else>{{list.amount}} {{list.unit}}</p>
                      </div>
                    </td>
                    <td class="td order-2">
                      <div :class="[{'item-list': true, 'has-input': list.is_extra}]" :key="`price_${listIndex}`" v-for="(list, listIndex) in lists">
                        <template  v-if="list.is_extra && list.status === '3'">
                          <my-input
                            :value="list.price"
                            :validator="$validator"
                            :inputObj="{type: 'text', name: `price${listIndex}`, placeholder: '', validate: 'required'}"
                            @input="value => updateData(value, 'price', index, listIndex)"
                          ></my-input>
                        </template>
                        <p
                        v-else
                        :class="getClass(list)"
                        >{{NUMBERWITHCOMMAS(list.price, 2)}} บาท</p>
                      </div>
                    </td>
                    <td class="td order-1">
                      <div :class="[{'item-list': true, 'has-input': list.is_extra}]" :key="`total_price_${listIndex}`" v-for="(list, listIndex) in lists">
                        <template  v-if="list.is_extra && list.status === '3'">
                          <my-input
                            :value="list.total_price"
                            :validator="$validator"
                            :inputObj="{type: 'text', name: `total_price${listIndex}`, placeholder: '', validate: 'required'}"
                            @input="value => updateData(value, 'total_price', index, listIndex)"
                          ></my-input>
                        </template>
                        <p
                        v-else
                        :class="getClass(list)"
                        :key="`total_price_${listIndex}`"
                       >{{NUMBERWITHCOMMAS(list.total_price, 2)}} บาท</p>
                      </div>

                    </td>
                    <td class="td order-7">
                      <div :class="[{'item-list': true, 'has-input': list.is_extra}]" :key="`created_at_${listIndex}`" v-for="(list, listIndex) in lists">
                        <p  :class="getClass(list)">{{SET_DATEFORMAT(list.updated_at)}}</p>
                      </div>
                    </td>
                    <td class="td order-7">
                      <div :class="[{'item-list': true, 'has-input': list.is_extra}]" :key="`action_${listIndex}`" v-for="(list, listIndex) in lists">
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
                      <p class="tag is-gray" :key="`detail_${listIndex}`" v-for="(list, listIndex) in lists" @click="showDetail(list, index, listIndex)" >รายละเอียด</p>
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
          <div>หน่วย:
            <my-input
              v-if="local.modelData.is_extra && local.modelData.status === '3'"
              :value="local.modelData.amount"
              :validator="$validator"
              :inputObj="{type: 'text', name: `amount${local.modelData.listIndex}`, placeholder: '', validate: 'required'}"
              @input="value => updateData(value, 'amount', local.modelData.index, local.modelData.listIndex)"
            ></my-input>
            <span v-else>{{local.modelData.amount}} {{local.modelData.unit}}</span>
          </div>
          <div>ราคาต่อหน่วย:
            <my-input
              v-if="local.modelData.is_extra && local.modelData.status === '3'"
              :value="local.modelData.price"
              :validator="$validator"
              :inputObj="{type: 'text', name: `price${local.modelData.listIndex}`, placeholder: '', validate: 'required'}"
              @input="value => updateData(value, 'price', local.modelData.index, local.modelData.listIndex)"
            ></my-input>
            <span v-else>{{NUMBERWITHCOMMAS(local.modelData.price, 2)}}</span>
          </div>
          <div>จำนวนเงินรวม:
            <my-input
              v-if="local.modelData.is_extra && local.modelData.status === '3'"
              :value="local.modelData.total_price"
              :validator="$validator"
              :inputObj="{type: 'text', name: `total_price${local.modelData.listIndex}`, placeholder: '', validate: 'required'}"
              @input="value => updateData(value, 'total_price', local.modelData.index, local.modelData.listIndex)"
            ></my-input>
            <span v-else>{{NUMBERWITHCOMMAS(local.modelData.total_price, 2)}}</span>
          </div>
          <div>
            อัพเดทล่าสุด:
            {{SET_DATEFORMAT(local.modelData.updated_at)}}
          </div>
          <br/>
          <div class="update-status">
            <template v-if="local.modelData.status === '3'">
              <my-action
                type="null"
                :obj="{title: 'จ่ายเงิน', color: 'is-warning', isConfirm: true}"
                @clickEvent="submit('approve', local.modelData, local.modelData.index, true)"
              >
              </my-action>
              <my-action
                type="null"
                :obj="{title: 'ไม่ผ่าน', color: 'is-danger', isConfirm: true}"
                @clickEvent="submit('reject', local.modelData, local.modelData.index, true)"
              >
              </my-action>
            </template>
            <template v-if="local.modelData.status === '4' || local.modelData.status === '5'">
              <p  v-if="local.modelData.status === '4'" class="tag is-danger">ไม่ผ่าน ( {{SET_DATEFORMAT(local.modelData.updated_at)}} )</p>
              <p  v-if="local.modelData.status === '5'" class="tag is-success">จ่ายแล้ว ( {{SET_DATEFORMAT(local.modelData.updated_at)}} )</p>
            </template>
          </div>
        </div>
      </model-panel>
      <worksheet-template
      class="worksheet-template"
      ref="worksheetTemplate"
      :headerObj="local.worksheet.header"
      :dataObj="local.worksheet.data"
      ></worksheet-template>
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
import worksheetTemplate from './worksheet-template'
export default {
  props: {
  },
  components: {
    breadcrumbBar,
    myAutoComplete,
    myAction,
    myInput,
    ModelPanel,
    worksheetTemplate
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
          selected: null,
          value: null
        },
        dataObj: [],
        worksheet: {
          header: {},
          data: []
        },
        yearSelection: {
          inputs: [],
          selected: null
        },
        monthSelection: {
          inputs: [],
          selected: null
        }
      }
    }
  },
  computed: {
    itemLists () {
      let group = JSON.parse(JSON.stringify(this.local.dataObj))
      if (this.yearSelected !== null) {
        group = group.map((lists) => {
          return lists.filter((item) => {
            return item.dateSelection.year === this.yearSelected
          })
        })
      }
      if (this.monthSelection !== null) {
        group = group.map((lists) => {
          return lists.filter((item) => {
            return item.dateSelection.month === this.monthSelection
          })
        })
      }
      group = group.filter((itemArr) => {
        return itemArr.length
      })
      return group
    },
    yearSelected () {
      return this.local.yearSelection.selected
    },
    monthSelection () {
      return this.local.monthSelection.selected
    }
  },
  created () {
  },
  methods: {
    async fetchData () {
      let queryString = this.BUILDPARAM({project: this.local.project.selected})
      let obj = await service.getResource({resourceName: `${config.api.workSheet.index}/approval`, queryString})
      this.local.dataObj = obj.data
      let yearSelection = []
      let monthSelection = []
      // start setting filter
      this.local.dataObj.map((group) => {
        group.map((list, index) => {
          list.realOrder = index
          let year = this.EXTRACT_DATE(list.updated_at, 'Y')
          let month = this.EXTRACT_DATE(list.updated_at, 'M')
          list.dateSelection = {year, month}
          yearSelection.push({
            key: year,
            value: year
          })
          monthSelection.push({
            key: month,
            value: month
          })
          this.local.yearSelection.inputs = this.REMOVEDUPLICATES(yearSelection, 'key')
          this.local.monthSelection.inputs = this.REMOVEDUPLICATES(monthSelection, 'key')
        })
      })
      // console.log(this.local.dataObj)
      // console.log(obj)
    },
    projectSelectedHandle (obj) {
      this.local.project.selected = obj.key
      this.local.project.value = obj.value
      this.fetchData()
    },
    showDetail (obj, index, listIndex) {
      this.$refs.modelPanel.isActive = true
      this.local.modelData = obj
      this.local.modelData.index = index
      this.local.modelData.listIndex = listIndex
    },
    async submit (res, item, index, isFromModel = false) {
      item.status = '5'
      if (res === 'reject') {
        item.status = '4'
      }
      let data = {
        item,
        updateType: 'update-status'
      }
      let resourceName = `${config.api.workSheet.index}/${item.id}`
      await service.putResource({data, resourceName})
      // if (result.data !== 1) return
      this.setItemAfterUpdated(item, index, item.status, isFromModel)
      this.NOTIFY('success')
    },
    setItemAfterUpdated (obj, index, status, isFromModel) {
      // console.log(index)
      // console.log(this.local.dataObj)
      this.local.dataObj[index].map((item) => {
        if (obj.id === item.id) {
          item.status = status
        }
      })
      if (isFromModel) {
        this.local.modelData.status = status
      }
    },
    getClass (item) {
      let isExtra = item.is_extra
      return [
        {'extra': isExtra}
      ]
    },
    updateData (value, inputType, index, listIndex) {
      let totalPrice = 0
      let obj = this.local.dataObj[index][listIndex]
      switch (inputType) {
        case 'amount':
          totalPrice = obj.price * value
          this.local.dataObj[index][listIndex].total_price = totalPrice
          break
        case 'price':
          totalPrice = value * obj.amount
          this.local.dataObj[index][listIndex].total_price = totalPrice
          break
        case 'total_price':
          break
      }
      this.local.dataObj[index][listIndex][inputType] = value
      // console.log(this.local.dataObj[index][listIndex])
    },
    printWorkSheet (items) {
      this.local.worksheet.header = {
        project: this.local.project.value
      }
      this.local.worksheet.data = items
      if (this.$refs.worksheetTemplate.local.dataObj.length > 0) {
        this.$refs.worksheetTemplate.printWorkSheet()
      }
    },
    filterYear (obj) {
      this.local.yearSelection.selected = obj.key
    },
    filterMonth (obj) {
      this.local.monthSelection.selected = obj.key
    }
  },
  watch: {
    yearSelected: function () {
      this.local.monthSelection.selected = null
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
        p{
          white-space: nowrap;
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
.extra{
  color: #fb8606;
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
.item-list:not(:last-child){
  margin-bottom: 1em;
}
.has-input{
  height: 25px;
  p{
    line-height: 25px;
  }
}
.fa-print{
  font-size: 1.1em;
  cursor: pointer;
  &:hover{
    font-size: 1.15em;
    font-weight: bold;
  }
}
.worksheet-template{
  display: none;
}
</style>
