<template>
    <section :class="['section', local.pageObj.template.class]">
      <breadcrumb-bar :dataObj="local.pageObj"></breadcrumb-bar>
      <div class="container-block">
        <div class="detail-panel">
          <template v-if="true">
            <div class="container-block detail-block">
              <div class="c-body">
                <div class="items">
                  <div class="item">
                    <div class="item-header container-block">
                      <div class="time block">งวดที่ {{local.time}}</div>
                      <div class="order-name container-block block">
                        <span class="name">แบบบ้าน</span>
                        <my-auto-complete
                        @select="houseSelectedHandle"
                        :config="{getNullVal: false}"
                        :arrInputs="local.houseTemplate.inputs"
                        placeholder="ค้นหาแบบบ้าน"
                        label=""
                        ></my-auto-complete>
                        <!-- <span class="name">รายการสั่งซื้อก่อนหน้างวดที่ {{local.time}} </span>
                        <my-tags-selection
                        v-if="local.itemTime"
                        :objInputs="{label: 'เลือกกลุ่มวัสดุ', placeholder: 'เพิ่มกลุ่มวัสดุ', maxtags: '1'}"
                        :resourceName="materialGroupResource"
                        :itemSelected="local.itemPreOrder"
                        @selected="value => { local.itemPreOrder = value }"
                        ></my-tags-selection> -->
                      </div>
                    </div>
                    <div class="item-body" v-if="local.houseTemplate.selected !== null">
                      <table>
                        <thead>
                          <tr>
                            <td>#</td>
                            <td>รายละเอียดงาน</td>
                            <td width="80">เงื่อนไขการเริ่ม</td>
                            <td width="80">ระยะเวลา (ก่อน)</td>
                            <td width="80">ระยะเวลา (หลัง)</td>
                            <td width="50"></td>
                            <td width="50"></td>
                          </tr>
                        </thead>
                        <tbody>
                          <tr :key="index" v-for="(item, index) in local.itemLists">
                            <td>
                              {{item.order}}
                            </td>
                            <td>
                              <my-input
                                :value="item.taskName"
                                :inputObj="{type: 'text', name: `order_group_${index}`, placeholder: 'ระบุรายละเอียดงาน', validate: 'required'}"
                                :validator="$validator"
                                @input="value => { item.taskName = value }"
                                ></my-input>
                            </td>
                            <td>
                              <my-input
                                :value="getCondition(item.condition, 'condition')"
                                :inputObj="{type: 'text', name: `order_condition_${index}`, placeholder: '', validate: ''}"
                                :validator="$validator"
                                @input="value => setCondition(index, value, 'condition', item)"
                                ></my-input>
                            </td>
                            <td>
                              <my-input
                                :value="getCondition(item.condition, 'preiod')"
                                :inputObj="{type: 'text', name: `order_preiod_${index}`, placeholder: '', validate: 'required'}"
                                :validator="$validator"
                                @input="value => setCondition(index, value, 'preiod', item)"
                                ></my-input>
                            </td>
                            <td>
                              <my-input
                                :value="getCondition(item.condition, 'preiod_end')"
                                :inputObj="{type: 'text', name: `order_preiod_end_${index}`, placeholder: '', validate: 'required'}"
                                :validator="$validator"
                                @input="value => setCondition(index, value, 'preiod_end', item)"
                                ></my-input>
                            </td>
                            <td>
                              <my-tags-selection
                              :objInputs="{label: 'เลือกกลุ่มวัสดุ', placeholder: 'เพิ่มกลุ่มวัสดุ', maxtags: '1'}"
                              :resourceName="materialGroupResource"
                              :itemSelected="item.postOrder"
                              @selected="value => { item.postOrder = value }"
                              ></my-tags-selection>
                            </td>
                            <td>
                              <button @click="deleteTime(index)" class="button is-danger">
                                <i class="fa fa-trash"></i>
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div class="item-footer container-block" v-if="local.houseTemplate.selected !== null">
                      <div class="container-block block right">
                        <!-- <button class="button" @click="editRow('remove')"><i class="fa fa-minus" aria-hidden="true"></i></button> -->
                        <button class="button" @click="editRow('add')"><i class="fa fa-plus" aria-hidden="true"></i></button>
                      </div>
                       <div class="container-block block action">
                        <my-action
                          type="update"
                          :obj="{title: `บันทึกข้อมูลงวดที่ ${local.time}`}"
                          @clickEvent="submitForm('update')"
                        >
                        </my-action>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
          <template v-else>
            <template slot="detail">
              <div class="container-block empty-panel">
                <div class="block container-block">
                  <div class="block no-data">
                      ไม่พบข้อมูลที่ต้องการ
                  </div>
                  <div class="block select-data">
                    <i class="fa fa-hand-o-left" aria-hidden="true"></i>
                    <span>เลือกข้อมูลทางซ้ายมือเพื่อแสดง</span>
                  </div>
                  <div class="block or">
                    หรือ
                  </div>
                  <div class="block add-data">
                    <button class="button">เพิ่มข้อมูลใหม่</button>
                  </div>
                </div>
              </div>
            </template>
          </template>
        </div>
      </div>
    </section>
</template>

<script>
import breadcrumbBar from '@Components/Breadcrumb'
import service from '@Services/app-service'
import config from '@Config/app.config'
// import inputSearchSelect from '@Components/Form/search-select'
import myInput from '@Components/Form/my-input'
import myAction from '@Components/Form/my-action'
import myTagsSelection from '@Components/Form/my-tags-selection'
import myAutoComplete from '@Components/Form/my-autocomp'
export default {
  props: {
  },
  components: {
    breadcrumbBar,
    myInput,
    myAction,
    myTagsSelection,
    myAutoComplete
  },
  name: 'EditWorkOrderPage',
  data () {
    return {
      local: {
        pageObj: {
          items: [
            {name: 'ลำดับการทำงาน', route: 'Workorder', key: '', active: false, icon: 'fa fa-tasks'},
            {name: 'แก้ไข', route: 'EditWorkorder', key: this.$route.params.key, active: true, icon: ''}
          ],
          template: {
            class: 'edit-work-order-page'
          }
        },
        time: this.$route.params.key,
        workOrderTemplate: {
          time: this.time,
          preOrder: [],
          lists: [{
            order: '',
            taskName: '',
            postOrder: []
          }]
          // material_group: []
        },
        itemPreOrder: null,
        itemTime: null,
        itemLists: [],
        materialGroup: {
          mainSearch: ''
        },
        houseTemplate: {
          inputs: [],
          selected: null
        }
      }
    }
  },
  computed: {
    resourceName () {
      return config.api.workOrder.index
    },
    materialGroupResource () {
      return config.api.materialGroup.index
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    async fetchData () {
      let queryString = {}
      let houseTemplate = await service.getResource({resourceName: config.api.house.dropdown, queryString})
      this.local.houseTemplate.inputs = houseTemplate.data
      let resourceName = `${config.api.workOrder.index}/${this.$route.params.key}`
      queryString = this.BUILDPARAM({type: 'full'})
      service.getResource({resourceName, queryString})
        .then((res) => {
          if (res.status === 200) {
            if (res.data) {
              this.local.itemTime = res.data.time
              this.local.itemPreOrder = [res.data.pre_order]
              this.local.itemLists = res.data.lists.map(item => {
                return {
                  order: item.order,
                  taskName: item.name,
                  postOrder: [item.post_order],
                  condition: item.condition
                }
              })
            } else {
              this.local.item.push(this.local.workOrderTemplate)
            }
          }
        })
        .catch(() => {
        })
    },
    editRow (type) {
      if (type === 'add') {
        this.local.itemLists.push({
          order: this.local.itemLists.length + 1,
          taskName: '',
          postOrder: []
        })
      } else {
        this.local.itemLists.pop()
      }
    },
    deleteTime (indexOfOrder) {
      this.local.itemLists.splice(indexOfOrder, 1)
    },
    async submitForm (type) {
      let isValid = await this.$validator.validateAll()
      let resourceName = this.resourceName
      let data = {}
      let res = null
      switch (type) {
        case 'update':
          if (!isValid) return
          data = {
            time: this.local.itemTime,
            pre_order: this.local.itemPreOrder,
            workOrderLists: this.local.itemLists
          }
          resourceName = `${resourceName}/${this.$route.params.key}`
          res = await service.putResource({data, resourceName})
          break
        case 'delete':
          resourceName = `${resourceName}/${this.$route.params.key}`
          let queryString = []
          res = await service.deleteResource({resourceName, queryString})
          break
      }
      if (res.status === 200) {
        this.fetchData()
        this.NOTIFY('success')
        return
      }
      this.NOTIFY('error')
    },
    houseSelectedHandle (objVal) {
      if (objVal === null) {
        return
      }
      this.local.houseTemplate.selected = objVal.key
    },
    setCondition (index, value, type, fullItem) {
      let houseId = this.local.houseTemplate.selected
      let exist = false
      if (this.local.itemLists[index].condition !== undefined) {
        this.local.itemLists[index].condition.map((item) => {
          if (item.house_id === houseId) {
            exist = true
            item[type] = value
          }
        })
      }
      if (!exist) {
        this.local.itemLists[index].condition = []
        let obj = {
          house_id: houseId,
          order: fullItem.order,
          work_order_time: this.local.time,
          preiod: null,
          preiod_end: null,
          condition: null
        }
        obj[type] = value
        this.local.itemLists[index].condition.push(obj)
      }
    },
    getCondition (condition, type) {
      if (this.local.houseTemplate.selected === null || condition === undefined) return ''
      let obj = condition.filter((item) => {
        return item.house_id === this.local.houseTemplate.selected
      })[0]
      if (obj === undefined) return ''
      return obj[type]
    }
  }
}
</script>

<style lang="scss">
</style>
