<template>
    <section :class="['section', local.pageObj.template.class]">
      <breadcrumb-bar :dataObj="local.pageObj"></breadcrumb-bar>
      <div class="container-block">
        <div class="detail-panel">
          <div class="container-block  detail-block">
            <div class="container-block block c-header">
              <div class="block">
                <my-auto-complete
                @select="technicianSelectedHandle"
                :arrInputs="local.technicians.inputs"
                placeholder="ค้นหาช่าง"
                label=""
                ></my-auto-complete>
              </div>
              <div class="block">
                <my-auto-complete
                v-if="local.technicians.selected !== null"
                @select="projectSelectedHandle"
                :arrInputs="'project'"
                placeholder="ค้นหาโครงการ"
                label=""
                ></my-auto-complete>
              </div>
              <div class="block">
                <my-auto-complete
                v-if="local.technicians.selected !== null && local.project.selected !== null"
                :arrInputs="local.plan.inputs"
                @select="planSelectedHandle"
                placeholder="ค้นหาแปลง"
                label=""
                ></my-auto-complete>
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
                    <th width="200">หมวด</th>
                    <th>งวด/รายการ</th>
                    <th width="80">จำนวน</th>
                    <th width="80">หน่วย</th>
                    <th>ราคา</th>
                    <!-- <th width="80">ตรวจสอบ</th> -->
                    <th width="80">สถานะ</th>
                  </tr>
                </thead>
                <tbody>
                  <!-- {{local.inputs}} -->
                  <tr :key="index" v-for="(group, index) in local.inputs">
                    <td>{{index + 1}}</td>
                    <td>
                      <p v-if="isSaved(index)">{{group.workGroup.obj.value}}</p>
                      <my-auto-complete
                      v-else
                      @select="val => workGroupSelectedHandle(val, index)"
                      :arrInputs="'workGroup'"
                      placeholder="เลือกหมวดงาน"
                      label=""
                      ></my-auto-complete>
                    </td>
                    <td> <!-- CHECKBOX BTN -->
                        <p :key="indexList" v-for="(item, indexList) in currentGroup(index)">
                          <template v-if="parseInt(item.status) && isSaved(index)">{{item.name}}</template>
                          <label v-else  class="checkbox">
                            <input v-if="isSaved(index)" type="checkbox" @change="setListsSelected(item.status, index, indexList)" v-model="item.status">
                            <input v-else type="checkbox" @change="setListsSelected(item.id, index, indexList)" v-model="item.id">
                            {{item.name}}
                          </label>
                        </p>
                    </td>
                    <td>
                        <p v-if="parseInt(item.status) && isSaved(index)" :key="indexList" v-for="(item, indexList) in currentGroup(index)">
                          <template >{{item.amount}}</template>
                        </p>
                         <my-input
                          v-else
                          :value="item.amount"
                          :inputObj="{type: 'text', name: `amount${indexList}`, placeholder: '', validate: ''}"
                          @input="value => { item.amount = value }"
                        ></my-input>
                    </td>
                    <td>
                        <p :key="indexList" v-for="(item, indexList) in currentGroup(index)">{{item.unit}}</p>
                    </td>
                    <td>
                      <p :key="indexList" v-for="(item, indexList) in currentGroup(index)">{{NUMBERWITHCOMMAS(item.price, 2)}}</p>
                    </td>
                    <td> <!-- ACTION -->
                        <my-action
                          v-if="currentGroup(index).length && !isSaved(index)"
                          type=""
                          :obj="{title: 'บันทึก', color: 'is-light', isConfirm: true}"
                          @clickEvent="submitForm(index)"
                        >
                        </my-action>
                        <p
                          v-else-if="isSaved(index)"
                          :class="`tag ${getListStatus(index, list, 'class')}`"
                          :key="listIndex" v-for="(list, listIndex) in currentGroup(index)"
                          >
                          {{getListStatus(index, list, 'name')}}
                        </p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="container-block block right" v-if="local.project.selected !== null && local.plan.selected !== null">
              <button v-if="local.count == 1" class="button" @click="editRow('minus')"><i class="fa fa-minus" aria-hidden="true"></i></button>
              <button v-if="local.count == 0" class="button" @click="editRow('add')"><i class="fa fa-plus" aria-hidden="true"></i></button>
            </div>
          </div>
        </div>
      </div>
    </section>
</template>

<script>
import breadcrumbBar from '@Components/Breadcrumb'
import service from '@Services/app-service'
import config from '@Config/app.config'
import myAutoComplete from '@Components/Form/my-autocomp'
import myAction from '@Components/Form/my-action'
import myInput from '@Components/Form/my-input'
export default {
  props: {
  },
  components: {
    breadcrumbBar,
    myAutoComplete,
    myAction,
    myInput
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
          selected: null
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
          workGroup: {
            obj: {},
            lists: []
            // listSelected: [],
            // isSaved: false
          }
        },
        inputs: [],
        count: 0
      }
    }
  },
  computed: {
    houseId () {
      return this.local.contract.selected.house_id
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
      if (obj.data.length > 0) {
        obj.data.map((item) => {
          this.local.inputs.push({
            workGroup: {
              obj: {
                key: item.work_group_id,
                value: item.work_group_name,
                status: item.status
              },
              lists: item.lists
            }
          })
          // console.log(this.local.inputs)
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
      this.local.plan.selected = null
      this.setPlanData()
    },
    async workGroupSelectedHandle (obj, index) { // <-----
      obj.status = null
      this.local.inputs[index].workGroup.obj = obj
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
      this.local.plan.inputs = planObj.map(item => {
        return {
          key: item.plan,
          value: item.plan
        }
      })
    },
    planSelectedHandle (obj) {
      this.local.plan.selected = obj.key
      this.setContract()
      this.fetchData()
    },
    setContract () {
      let contract = this.local.contract.temp.filter((item) => {
        return item.project_id === this.local.project.selected &&
        item.plan === this.local.plan.selected
      })
      this.local.contract.selected = contract[0]
    },
    editRow (type) {
      if (type === 'add') {
        this.local.count += 1
        let newObj = JSON.parse(JSON.stringify(this.local.inputsTemplate))
        this.local.inputs.push(newObj)
      } else {
        this.local.count -= 1
        this.local.inputs.pop()
      }
    },
    async submitForm (index) {
      let data = {
        technician: this.local.technicians.selected,
        contract: this.local.contract.selected,
        workGroup: this.local.inputs[index].workGroup.obj,
        itemLists: this.local.inputs[index].workGroup.lists
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
      if (this.isSaved(index)) {
        let itemListId = this.local.inputs[index].workGroup.lists[indexList].id
        let amount = this.local.inputs[index].workGroup.lists[indexList].amount
        let resourceName = `${config.api.workSheetDetail.index}/${itemListId}`
        let result = await service.putResource({data: {amount, status: '1'}, resourceName})
        if (result.data !== 1) return
        this.NOTIFY('success')
      }
      this.local.inputs[index].workGroup.lists[indexList].status = (tf) ? '1' : '0'
      console.log(typeof this.local.inputs[index].workGroup.lists[indexList].status)
    }
  }
}
</script>

<style lang="scss" scoped>
.block.c-header{
  flex-direction: row !important;
  .block{
    padding: 5px;
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
</style>
