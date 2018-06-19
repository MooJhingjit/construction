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
                        <span class="name">รายการสั่งซื้อก่อนหน้างวดที่ {{local.time}} </span>
                        <!-- <div class="control has-icons-right">
                          <input class="input" type="text" v-model="local.pre_order" placeholder="">
                          <span class="icon is-right">
                            <i class="fa fa-search" aria-hidden="true"></i>
                          </span>
                        </div> -->
                        <my-tags-selection
                        v-if="local.itemTime"
                        :objInputs="{label: 'เลือกกลุ่มวัสดุ', placeholder: 'เพิ่มกลุ่มวัสดุ', maxtags: '1'}"
                        :resourceName="materialGroupResource"
                        :itemSelected="local.itemPreOrder"
                        @selected="value => { local.itemPreOrder = value }"
                        ></my-tags-selection>
                      </div>
                    </div>
                    <div class="item-body">
                      <table>
                        <thead>
                          <tr>
                            <td>รายละเอียดงาน</td>
                            <td width="50"></td>
                            <td width="50"></td>
                          </tr>
                        </thead>
                        <tbody>
                          <tr :key="index" v-for="(item, index) in local.itemLists">
                              <td>
                                <my-input
                                  :value="item.taskName"
                                  :inputObj="{type: 'text', name: `order_group_${index}`, placeholder: 'ระบุรายละเอียดงาน', validate: 'required'}"
                                  :validator="$validator"
                                  @input="value => { item.taskName = value }"
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
                    <div class="item-footer container-block">
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
export default {
  props: {
  },
  components: {
    breadcrumbBar,
    myInput,
    myAction,
    myTagsSelection
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
    fetchData () {
      let resourceName = `${config.api.workOrder.index}/${this.$route.params.key}`
      let queryString = this.BUILDPARAM({type: 'full'})
      service.getResource({resourceName, queryString})
        .then((res) => {
          if (res.status === 200) {
            if (res.data) {
              this.local.itemTime = res.data.time
              this.local.itemPreOrder = [res.data.pre_order]
              this.local.itemLists = res.data.lists.map(item => {
                return {
                  taskName: item.name,
                  postOrder: [item.post_order]
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
        this.NOTIFY('success')
        return
      }
      this.NOTIFY('error')
    }
  }
}
</script>

<style lang="scss">
</style>
