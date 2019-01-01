<template>
    <section :class="['section', local.pageObj.template.class]">
      <breadcrumb-bar :dataObj="local.pageObj"></breadcrumb-bar>
      <div class="container-block">
        <div class="detail-panel">
          <div class="container-block  detail-block">
            <div class="block c-header">
              <div class="container-block">
                <div class="block">
                  <my-auto-complete
                  @select="technicianSelectedHandle"
                  :arrInputs="local.technicians.inputs"
                  :config="{getNullVal: false}"
                  placeholder="ค้นหาช่าง"
                  label=""
                  ></my-auto-complete>
                </div>
                <div class="block">
                  <my-auto-complete
                  v-if="local.technicians.selected !== null"
                  @select="projectSelectedHandle"
                  :arrInputs="'project'"
                  :config="{getNullVal: false}"
                  placeholder="ค้นหาโครงการ"
                  label=""
                  ></my-auto-complete>
                </div>
                <div class="block">
                  <my-auto-complete
                  v-if="local.technicians.selected !== null && local.project.selected !== null"
                  :arrInputs="local.plan.inputs"
                  @select="planSelectedHandle"
                  :config="{getNullVal: false}"
                  placeholder="ค้นหาแปลง"
                  label=""
                  ></my-auto-complete>
                </div>
              </div>
              <div class="container-block filter-menu">
                <div class="block">
                  <my-auto-complete
                  v-if="local.plan.selected !== null"
                  :arrInputs="local.yearSelection.inputs"
                  @select="filterYear"
                  :config="{getNullVal: true}"
                  placeholder="ระบุปี"
                  label=""
                  ></my-auto-complete>
                </div>
                <div class="block">
                  <my-auto-complete
                  v-if="local.yearSelection.selected !== null && local.plan.selected !== null"
                  :arrInputs="local.monthSelection.inputs"
                  @select="filterMonth"
                  :config="{getNullVal: true}"
                  placeholder="ระบุเดือน"
                  label=""
                  ></my-auto-complete>
                </div>
                <div class="block"></div>
                <div class="block"></div>
                <div class="block"></div>
              </div>
            </div>
            <div class="block c-body" v-if="local.project.selected !== null && local.plan.selected !== null"> <!--  -->
              <div class="container-block result">
                <div class="block">แบบบ้าน {{houseId}}</div>
                <div class="block"></div>
                <div class="block"></div>
              </div>
              <table class="table rows-table is-hoverable">
                <thead>
                  <tr>
                    <th width="5">#</th>
                    <th width="100">หมวด</th>
                    <th width="120">งวด/รายการ</th>
                    <th width="100">ช่าง</th>
                    <th width="50">จำนวน</th>
                    <th width="50">หน่วย</th>
                    <th width="80">ราคา/หน่วย</th>
                    <th width="150">หมายเหตุ</th>
                    <th width="50">อัพเดทล่าสุด</th>
                    <th width="50">สถานะ</th>
                  </tr>
                </thead>
                <tbody>
                  <!-- {{local.inputs}} -->
                  <tr :class="getClassGroup(group.workGroup.realOrder)" :key="group.workGroup.realOrder" v-for="(group, index) in itemLists">
                    <td><p> {{index + 1}}</p></td>
                    <!-- <td><p> {{index + 1}} <i class="fa fa-print" @click="printWorkSheet(index)" aria-hidden="true"></i></p></td> -->
                    <td>
                      <p v-if="isSaved(group.workGroup.realOrder)">{{group.workGroup.obj.value}}</p>
                      <my-auto-complete
                      v-else
                      @select="val => workGroupSelectedHandle(val, group.workGroup.realOrder)"
                      :arrInputs="'workGroup'"
                      placeholder="เลือกหมวดงาน"
                      :config="{getNullVal: false}"
                      label=""
                      ></my-auto-complete>
                      <div class="list-btn" v-if="group.isExtra">
                        <button v-if="group.workGroup.lists.length > 0" class="button" @click="editExtraRow('add', group.workGroup.realOrder)"><i class="fa fa-plus" aria-hidden="true"></i></button>
                        <button v-if="group.workGroup.lists.length > 0" class="button" @click="editExtraRow('minus', group.workGroup.realOrder)"><i class="fa fa-minus" aria-hidden="true"></i></button>
                      </div>
                    </td>
                    <td class="list-name"> <!-- CHECKBOX BTN -->
                        <template v-if="group.isExtra">
                          <my-input
                            :key="indexList" v-for="(item, indexList) in currentGroup(group.workGroup.realOrder)"
                            :value="item.name"
                             :validator="$validator"
                            :inputObj="{type: 'text', name: `name${indexList}`, placeholder: '', validate: 'required'}"
                            @input="value => { item.name = value }"
                          ></my-input>
                        </template>
                        <template v-else>
                          <p :key="indexList" v-for="(item, indexList) in currentGroup(group.workGroup.realOrder)">
                            <template v-if="parseInt(item.status) && isSaved(group.workGroup.realOrder)">{{item.name}}</template>
                            <label v-else  class="checkbox">
                              <input v-if="isSaved(group.workGroup.realOrder)" type="checkbox" @change="setListsSelected(item.status, group.workGroup.realOrder, indexList)" v-model="item.status">
                              <input v-else type="checkbox" @change="setListsSelected(item.id, group.workGroup.realOrder, indexList)" v-model="item.id">
                              {{item.name}}
                            </label>
                          </p>
                        </template>
                    </td>
                    <td>
                       <p :key="indexList" v-for="(item, indexList) in currentGroup(group.workGroup.realOrder)">
                         <template v-if="parseInt(item.status) && isSaved(group.workGroup.realOrder)">{{item.technicianName}}</template>
                       </p>
                    </td>
                    <td>
                        <p v-if="parseInt(item.status) && isSaved(group.workGroup.realOrder)" :key="indexList" v-for="(item, indexList) in currentGroup(group.workGroup.realOrder)">
                          <template >{{item.amount}}</template>
                        </p>
                         <my-input
                          v-else
                          :value="item.amount"
                           :validator="$validator"
                          :inputObj="{type: 'text', name: `amount${indexList}`, placeholder: '', validate: 'required'}"
                          @input="value => { item.amount = value }"
                        ></my-input>
                    </td>
                    <td>
                      <template v-if="group.isExtra">
                        <my-input
                          :key="indexList" v-for="(item, indexList) in currentGroup(group.workGroup.realOrder)"
                          :value="item.unit"
                           :validator="$validator"
                          :inputObj="{type: 'text', name: `unit${indexList}`, placeholder: '', validate: 'required'}"
                          @input="value => { item.unit = value }"
                        ></my-input>
                      </template>
                      <template v-else>
                        <p :key="indexList" v-for="(item, indexList) in currentGroup(group.workGroup.realOrder)">{{item.unit}}</p>
                      </template>
                    </td>
                    <td>
                      <template v-if="group.isExtra">
                        <my-input
                          :key="indexList" v-for="(item, indexList) in currentGroup(group.workGroup.realOrder)"
                          :value="item.price"
                           :validator="$validator"
                          :inputObj="{type: 'text', name: `price${indexList}`, placeholder: '', validate: 'required'}"
                          @input="value => { item.price = value }"
                        ></my-input>
                      </template>
                      <template v-else>
                        <p :key="indexList" v-for="(item, indexList) in currentGroup(group.workGroup.realOrder)">{{NUMBERWITHCOMMAS(item.price, 2)}}</p>
                      </template>
                    </td>
                    <td>
                      <p v-if="parseInt(item.status) && isSaved(group.workGroup.realOrder)" :key="indexList" v-for="(item, indexList) in currentGroup(group.workGroup.realOrder)">
                          <template >{{item.note}}</template>
                        </p>
                         <my-input
                          v-else
                          :value="item.note"
                           :validator="$validator"
                          :inputObj="{type: 'text', name: `note${indexList}`, placeholder: '', validate: ''}"
                          @input="value => { item.note = value }"
                        ></my-input>
                    </td>
                    <td>
                      <p :key="indexList" v-for="(item, indexList) in currentGroup(group.workGroup.realOrder)">{{SET_DATEFORMAT(item.updated_at)}}</p>
                    </td>
                    <td> <!-- ACTION -->
                        <my-action
                          v-if="currentGroup(group.workGroup.realOrder).length && !isSaved(group.workGroup.realOrder)"
                          type=""
                          :obj="{title: 'บันทึก', color: 'is-light', isConfirm: true}"
                          @clickEvent="submitForm(group.workGroup.realOrder)"
                        >
                        </my-action>
                        <p
                          v-else-if="isSaved(group.workGroup.realOrder)"
                          :class="`tag ${getListStatus(group.workGroup.realOrder, list, 'class')}`"
                          :key="listIndex" v-for="(list, listIndex) in currentGroup(group.workGroup.realOrder)"
                          >
                          {{getListStatus(group.workGroup.realOrder, list, 'name')}}
                        </p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="container-block block right" v-if="local.project.selected !== null && local.plan.selected !== null">
              <button v-if="local.count == 1" class="button" @click="editRow('minus')"><i class="fa fa-minus" aria-hidden="true"></i></button>
              <button v-if="local.count == 0" class="button" @click="editRow('add', true)"><i class="fa fa-plus" aria-hidden="true"></i> <span>(พิเศษ)</span></button>
              <button v-if="local.count == 0" class="button" @click="editRow('add')"><i class="fa fa-plus" aria-hidden="true"></i></button>
            </div>
          </div>
        </div>
      </div>
      <worksheet-template
      class="worksheet-template"
      ref="worksheetTemplate"
      :headerObj="local.headerTemplate"
      :dataObj="local.worksheetTemplate"
      ></worksheet-template>
    </section>
</template>

<script>
import breadcrumbBar from '@Components/Breadcrumb'
import service from '@Services/app-service'
import config from '@Config/app.config'
import myAutoComplete from '@Components/Form/my-autocomp'
import myAction from '@Components/Form/my-action'
import myInput from '@Components/Form/my-input'
import worksheetTemplate from './worksheet-template'
export default {
  props: {
  },
  components: {
    breadcrumbBar,
    myAutoComplete,
    myAction,
    myInput,
    worksheetTemplate
  },
  name: 'WorkSheetPage',
  data () {
    return {
      local: {
        pageObj: {
          items: [
            {name: 'จ่ายค่างวด', route: 'PayingPeriod', key: '', active: true, icon: 'fa fa-exchange'},
            {name: 'ใบส่งงาน', route: 'Worksheet', key: '', active: true, icon: ''}
          ],
          template: {
            class: 'work-sheet-page'
          }
        },
        technicians: {
          inputs: [],
          selected: null
        },
        project: {
          selected: null,
          value: null
        },
        plan: {
          inputs: [],
          selected: null,
          temp: []
        },
        contract: {
          temp: [],
          selected: []
        },
        inputsTemplate: {
          isExtra: false,
          workGroup: {
            obj: {
              status: null
            },
            lists: []
          }
        },
        yearSelection: {
          inputs: [],
          selected: null
        },
        monthSelection: {
          inputs: [],
          selected: null
        },
        extraTemplate: {},
        inputs: [],
        count: 0,
        worksheetTemplate: [],
        headerTemplate: {},
        dateSelectionDefault: {
          year: this.EXTRACT_DATE('now', 'Y'),
          month: this.EXTRACT_DATE('now', 'M')
        }
      }
    }
  },
  computed: {
    houseId () {
      return this.local.contract.selected.house_id
    },
    itemLists () {
      let inputs = this.local.inputs
      if (this.yearSelected !== null) {
        inputs = inputs.filter((obj) => {
          return obj.workGroup.obj.dateSelection.year === this.yearSelected || obj.workGroup.obj.status === 'new'
        })
        // console.log(inputs)
      }
      if (this.monthSelection !== null) {
        inputs = inputs.filter((obj) => {
          return obj.workGroup.obj.dateSelection.month === this.monthSelection || obj.workGroup.obj.status === 'new'
        })
        // console.log(inputs)
      }
      return inputs
    },
    yearSelected () {
      return this.local.yearSelection.selected
    },
    monthSelection () {
      return this.local.monthSelection.selected
    }
  },
  async created () {
    // await this.fetchData()
    await this.getTechnician()
    await this.getAllPlans()
  },
  methods: {
    async getAllPlans () {
      let queryString = this.BUILDPARAM({type: 'project-search'})
      let obj = await service.getResource({resourceName: config.api.contract.dropdown, queryString})
      this.local.contract.temp = obj.data
    },
    async getTechnician () {
      let queryString = {}
      let technicians = await service.getResource({resourceName: config.api.technician.dropdown, queryString})
      this.local.technicians.inputs = technicians.data
    },
    async fetchData () {
      // this.editRow('add')
      this.local.inputs = []
      let technician = this.local.technicians.selected.key
      let queryString = this.BUILDPARAM({project: this.local.project.selected, plan: this.local.plan.selected})
      let obj = await service.getResource({resourceName: `${config.api.workSheet.index}/${technician}`, queryString})
      let yearSelection = []
      let monthSelection = []
      if (obj.data.length > 0) {
        obj.data.map((item, index) => {
          this.local.inputs.push({
            workGroup: {
              realOrder: index,
              obj: {
                key: item.work_group_id,
                value: item.work_group_name,
                status: item.status,
                isExtra: item.is_extra,
                dateSelection: {
                  year: this.EXTRACT_DATE(item.created_at, 'Y'),
                  month: this.EXTRACT_DATE(item.created_at, 'M')
                }
              },
              lists: item.lists
            }
          })
          // start setting filter
          let year = this.EXTRACT_DATE(item.created_at, 'Y')
          let month = this.EXTRACT_DATE(item.created_at, 'M')
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
      } else {
        this.editRow('add')
      }
    },
    technicianSelectedHandle (obj) {
      this.local.project.selected = null
      this.local.plan.selected = null
      this.local.technicians.selected = obj
    },
    projectSelectedHandle (obj) {
      if (obj === null) {
        this.local.plan.inputs = []
        return
      }
      this.local.project.selected = obj.key
      this.local.project.value = obj.value
      this.local.plan.selected = null
      this.local.count = 0
      this.setPlanData()
    },
    async workGroupSelectedHandle (obj, index) {
      this.local.inputs[index].workGroup.obj.key = obj.key
      this.local.inputs[index].workGroup.obj.value = obj.value
      if (this.local.inputs[index].isExtra) {
        this.local.inputs[index].workGroup.lists.push({})
        return
      }
      let detailLists = await this.getWorkGroupDetails(obj.key)
      if (detailLists.length) {
        this.local.inputs[index].workGroup.lists = detailLists[0].details
        this.local.inputs[index].workGroup.lists.map((item) => {
          item.status = 1
        })
      }
    },
    async getWorkGroupDetails (workGroupKey) {
      let queryString = this.BUILDPARAM({houseId: this.houseId, type: 'with-detail'})
      let res = await service.getResource({resourceName: `${config.api.workGroup.index}/${workGroupKey}`, queryString})
      return res.data
    },
    setPlanData () {
      let planObj = this.local.contract.temp.filter((item) => {
        return item.project_id === this.local.project.selected
      })
      let planArr = planObj.map(item => {
        return {
          key: item.plan,
          value: item.plan
        }
      })
      this.local.plan.inputs = this.REMOVEDUPLICATES(planArr, 'key')
    },
    planSelectedHandle (obj) {
      this.local.count = 0
      this.local.plan.selected = obj.key
      this.local.plan.value = obj.value
      this.setContract()
      this.fetchData()
      this.setHeaderTemplate()
    },
    setContract () {
      let contract = this.local.contract.temp.filter((item) => {
        return item.project_id === this.local.project.selected &&
        item.plan === this.local.plan.selected
      })
      this.local.contract.selected = contract[0]
    },
    editRow (type, isExtra = false) {
      // this.resetFilter()
      if (type === 'add') {
        this.local.count += 1
        let newObj = JSON.parse(JSON.stringify(this.local.inputsTemplate))
        if (isExtra) {
          newObj.isExtra = true
        }
        newObj.workGroup.realOrder = this.local.inputs.length
        newObj.workGroup.obj = {
          dateSelection: this.local.dateSelectionDefault,
          status: 'new'
        }
        this.local.inputs.push(newObj)
      } else {
        this.local.count -= 1
        this.local.inputs.pop()
      }
    },
    editExtraRow (type, index) {
      if (type === 'add') {
        this.local.inputs[index].workGroup.lists.push({})
      } else {
        this.local.inputs[index].workGroup.lists.pop()
      }
    },
    async submitForm (index) {
      let isValid = await this.$validator.validateAll()
      if (!isValid) return
      let data = {
        technician: this.local.technicians.selected,
        contract: this.local.contract.selected,
        workGroup: this.local.inputs[index].workGroup.obj,
        itemLists: this.local.inputs[index].workGroup.lists
      }
      if (this.local.inputs[index].isExtra) {
        data.workGroup.isExtra = true
      }
      let resourceName = config.api.workSheet.index
      let res = await service.postResource({data, resourceName})
      if (res.status === 200) {
        // this.setDataAfterUpdateing(index)
        this.fetchData()
        this.local.count = 0
        this.NOTIFY('success')
        // this.editRow('add')
        return
      }
      this.NOTIFY('error')
    },
    getListStatus (index, item, type) {
      if (item.status === true) {
        item.status = 1
      }
      // console.log(typeof item.status)
      let obj = this.GETWORKSHEETSTATUS(item.status)[0]
      // console.log(obj)
      return obj[type]
    },
    setDataAfterUpdateing (index) {
      this.local.inputs[index].workGroup.obj.status = 'IP'
      this.local.count = 0
      // console.log(this.local.count)
    },
    isSaved (index) {
      if (this.local.inputs[index].workGroup.obj.status === 'IP') {
        return true
      }
      return false
    },
    setItemStatus (index, type = 'arr', listIndex = null, status = 0) {
      if (type === 'searchInArr') {
      } else { // direct
        this.local.inputs[index].workGroup.lists[listIndex].status = status
      }
    },
    currentGroup (index) {
      return this.local.inputs[index].workGroup.lists
    },
    async setListsSelected (tf, index, indexList) {
      if (this.isSaved(index)) { // update after submit btn
        this.$dialog.confirm({
          message: 'ยืนยันการทำรายการ',
          cancelText: 'ยกเลิก',
          confirmText: 'ยืนยัน',
          type: 'is-success',
          onConfirm: async () => {
            let itemListId = this.local.inputs[index].workGroup.lists[indexList].id
            let amount = this.local.inputs[index].workGroup.lists[indexList].amount
            let price = this.local.inputs[index].workGroup.lists[indexList].price
            let technician = this.local.technicians.selected.key
            let resourceName = `${config.api.workSheetDetail.index}/${itemListId}`
            let result = await service.putResource({data: {price, amount, technician, status: '1'}, resourceName})
            if (result.data !== 1) return
            this.NOTIFY('success')
          },
          onCancel: () => {
            this.local.inputs[index].workGroup.lists[indexList].status = 0
          }
        })
      } else {
        this.local.inputs[index].workGroup.lists[indexList].status = (tf) ? '1' : '0'
        this.local.inputs[index].workGroup.lists[indexList].technicianName = this.local.technicians.selected.value
      }
    },
    getClassGroup (index) {
      return [
        {'extra-row': this.local.inputs[index].workGroup.obj.isExtra}
      ]
    },
    setHeaderTemplate () {
      this.local.headerTemplate = {
        project: this.local.project.value,
        plan: this.local.plan.value,
        house: this.houseId,
        workGroup: 'xxxx',
        technicians: this.local.technicians.selected.value
      }
      // console.log(this.local.headerTemplate)
    },
    printWorkSheet (index) {
      this.local.worksheetTemplate = this.currentGroup(index)
      this.$refs.worksheetTemplate.printWorkSheet()
    },
    filterYear (obj) {
      this.local.yearSelection.selected = obj.key
    },
    filterMonth (obj) {
      this.local.monthSelection.selected = obj.key
    },
    resetFilter () {
      this.yearSelection = {
        inputs: [],
        selected: null
      }
      this.monthSelection = {
        inputs: [],
        selected: null
      }
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
.block.c-header{
  flex-direction: row !important;
  .block{
    padding: 5px;
    margin-bottom: 0;
  }
  .filter-menu{

  }
}
.detail-panel .c-body{
  padding: 0 !important;
}
.container-block.result{
  padding: 0 0 0 5px;
}
.block.right{
  justify-content: flex-end;
}
.tag:not(.is-rounded) {
  display: block;
}
.container-block.block.right {
  button{
    span{
      margin-left: 3px;
    }
  }
  button+button {
    margin-left: 5px;
  }
}
.list-btn {
  margin-top: 3px;
}
.extra-row{
  background: #fff0d9;
}
table tr td p{
  white-space: nowrap;
  min-height: 20px;
  // height: 30px;
  // margin-bottom: 0;
}
.worksheet-template{
  display: none;
}
.fa-print{
  font-size: 1.1em;
  cursor: pointer;
  &:hover{
    font-size: 1.15em;
    font-weight: bold;
  }
}
</style>
