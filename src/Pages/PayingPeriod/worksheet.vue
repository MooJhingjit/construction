<template>
    <section :class="['section', local.pageObj.template.class]">
      <breadcrumb-bar :dataObj="local.pageObj"></breadcrumb-bar>
      <div class="container-block">
        <div class="detail-panel">
          <div class="container-block  detail-block">
            <div class="container-block block c-header">
              <div class="block">
                <my-auto-complete
                @select="val => {local.technicians.selected = val}"
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
                    <th width="250">หมวด</th>
                    <th>งวด/รายการ</th>
                    <th width="80">หน่วย</th>
                    <th>ราคา</th>
                    <!-- <th width="80">ตรวจสอบ</th> -->
                    <th width="80">สถานะ</th>
                  </tr>
                </thead>
                <tbody>
                  <!-- {{local.inputs}} -->
                  <tr :key="index" v-for="(group, index) in local.inputs">
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
                      <template v-if="!isSaved(index)">
                        <p :key="indexList" v-for="(item, indexList) in currentGroup(index)">
                          <label class="checkbox">
                            <input type="checkbox" @change="setListsSelected('top', item.status, index, indexList)" v-model="item.status">
                            {{item.name}}
                          </label>
                        </p>
                      </template>
                      <template v-else> <!-- saved -->
                        <p :key="indexList" v-for="(item, indexList) in currentGroup(index)">
                          <template v-if="parseInt(item.status)">{{item.name}}</template>
                          <label v-else  class="checkbox">
                            <input type="checkbox" @change="setListsSelected('bottom', item.status, index, indexList)" v-model="item.status">
                            {{item.name}}
                          </label>
                        </p>
                      </template>
                    </td>
                    <td>
                      <template v-if="!isSaved(index)">
                        <my-input
                          :key="indexList" v-for="(item, indexList) in currentGroup(index)"
                          :value="item.unit"
                          :inputObj="{type: 'text', name: `unit${indexList}`, placeholder: '', validate: ''}"
                          @input="value => { item.unit = value }"
                        ></my-input>
                      </template>
                      <template v-else>
                        <p v-if="parseInt(item.status)" :key="indexList" v-for="(item, indexList) in currentGroup(index)">
                          <template >{{item.unit}}</template>
                        </p>
                         <my-input
                          v-else
                          :value="item.unit"
                          :inputObj="{type: 'text', name: `unit${indexList}`, placeholder: '', validate: ''}"
                          @input="value => { item.unit = value }"
                        ></my-input>
                      </template>
                    </td>
                    <td>
                      <p :key="indexList" v-for="(item, indexList) in currentGroup(index)">{{item.price}}</p>
                    </td>
                    <td> <!-- ACTION -->
                        <template v-if="isSaved(index)"> <!-- TAG -->
                          <p
                            :class="getListStatus(index, list, 'class')"
                            :key="listIndex" v-for="(list, listIndex) in currentGroup(index)"
                            >
                            {{list.status}}
                           {{getListStatus(index, list, 'text')}}
                          </p>
                        </template>
                        <template v-else> <!-- BTN -->
                          <my-action
                              v-if="currentGroup(index).length"
                              type=""
                              :obj="{title: 'บันทึก', color: 'is-light', isConfirm: true}"
                              @clickEvent="submitForm(index)"
                            >
                          </my-action>
                        </template>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="container-block block right" v-if="local.project.selected !== null && local.plan.selected !== null">
              <button class="button" @click="editRow('minus')"><i class="fa fa-minus" aria-hidden="true"></i></button>
              <button class="button" @click="editRow('add')"><i class="fa fa-plus" aria-hidden="true"></i></button>
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
        inputs: []
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
        let newObj = JSON.parse(JSON.stringify(this.local.inputsTemplate))
        this.local.inputs.push(newObj)
      } else {
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
        this.setDataAfterUpdateing(index)
        this.NOTIFY('success')
        this.editRow('add')
        return
      }
      this.NOTIFY('error')
    },
    // filterWorkGroup (obj) {
    //   return obj.lists.filter((item) => {
    //     return obj.listSelected.indexOf(item.id) >= 0
    //   })
    // },
    getListStatus (index, item, type) {
      let obj = {
        class: 'tag is-white',
        text: ''
      }
      switch (parseInt(item.status)) {
        case 1:
          obj.class = 'tag is-light'
          obj.text = 'รอการตรวจสอบ'
          break
        case 2:
          obj.class = 'tag is-warning'
          obj.text = 'ไมผ่านการตรวจสอบ'
          break
        case 3:
          obj.class = 'tag is-link'
          obj.text = 'รออนุมัติ'
          break
        case 4:
          obj.class = 'tag is-danger'
          obj.text = 'ไม่ผ่านการอนุมัติ'
          break
        case 5:
          obj.class = 'tag is-success'
          obj.text = 'จ่ายเงินแล้ว'
          break
      }
      return obj[type]
    },
    setDataAfterUpdateing (index) {
      // this.local.inputs[index].workGroup.isSaved = true
      // console.log(this.local.inputs[index].workGroup.obj.status)
      this.local.inputs[index].workGroup.obj.status = 'IP'
      // console.log(this.local.inputs[index])
      // console.log(this.local.inputs[index].workGroup.obj.status)
      // this.setItemStatus(index, 'searchInArr')
    },
    isSaved (index) {
      if (this.local.inputs[index].workGroup.obj.status === 'IP') {
        return true
      }
      return false
    },
    // submitLater (index, listIndex, listId) {
    //   let selected = this.local.inputs[index].workGroup.listSelected
    //   if (selected.indexOf(listId) >= 0) {
    //     this.setItemStatus(index, 'direct', listIndex, 1)
    //   } else {
    //     this.setItemStatus(index, 'direct', listIndex, 0)
    //   }
    // },
    setItemStatus (index, type = 'arr', listIndex = null, status = 0) {
      if (type === 'searchInArr') {
        // let selected = this.local.inputs[index].workGroup.listSelected
        // this.local.inputs[index].workGroup.lists.map((item) => {
        //   if (selected.indexOf(item.id) >= 0) {
        //     item.status = 1
        //   } else {
        //     item.status = 0
        //   }
        // })
      } else { // direct
        this.local.inputs[index].workGroup.lists[listIndex].status = status
        // console.log(this.local.inputs[index].workGroup.lists[listIndex])
      }
    },
    currentGroup (index) {
      // console.log(this.local.inputs[index].workGroup.lists)
      return this.local.inputs[index].workGroup.lists
    },
    setListsSelected (xxm , tf, index, indexList) {
      console.log(xxm, tf)
      this.local.inputs[index].workGroup.lists[indexList].status = (tf) ? 1 : 0
      // console.log(tf)
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
