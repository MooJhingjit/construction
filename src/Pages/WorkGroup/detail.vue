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
                      <div class="time block">{{this.local.itemName}} {{this.local.houseTemplate.selected}}</div>
                      <div class="order-name container-block block">
                        <span class="name">แบบบ้าน</span>
                        <my-auto-complete
                        @select="houseSelectedHandle"
                        :arrInputs="local.houseTemplate.inputs"
                        placeholder="ค้นหาแบบบ้าน"
                        label=""
                        ></my-auto-complete>
                      </div>
                    </div>
                    <div class="item-body"  v-if="local.houseTemplate.selected !== null">
                      <table>
                        <thead>
                          <tr>
                            <th width="50">งวด</th>
                            <th>รายการ</th>
                            <th width="100">หน่วย</th>
                            <th width="150">ราคา</th>
                            <th>หมายเหตุ</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                           <tr :key="index" v-for="(item, index) in local.itemLists">
                            <!-- <td>{{item.order}}</td> -->
                            <td>
                              <my-input
                                :value="item.time"
                                :inputObj="{type: 'text', name: `time_${index}`, placeholder: '', validate: 'required'}"
                                :validator="$validator"
                                @input="value => { item.time = value }"
                                ></my-input>
                            </td>
                            <td>
                              <my-input
                                :value="item.name"
                                :inputObj="{type: 'text', name: `name_${index}`, placeholder: '', validate: 'required'}"
                                :validator="$validator"
                                @input="value => { item.name = value }"
                                ></my-input>
                            </td>
                            <td>
                              <my-input
                                :value="item.unit"
                                :inputObj="{type: 'text', name: `unit_${index}`, placeholder: '', validate: 'required'}"
                                :validator="$validator"
                                @input="value => { item.unit = value }"
                                ></my-input>
                            </td>
                            <td>
                              <my-input
                                :value="item.price"
                                :inputObj="{type: 'text', name: `price_${index}`, placeholder: '', validate: 'required'}"
                                :validator="$validator"
                                @input="value => { item.price = value }"
                                ></my-input>
                            </td>
                            <td>
                              <my-input
                                :value="item.note"
                                :inputObj="{type: 'text', name: `note_${index}`, placeholder: '', validate: ''}"
                                :validator="$validator"
                                @input="value => { item.note = value }"
                                ></my-input>
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
                        <button class="button" @click="editRow('add')"><i class="fa fa-plus" aria-hidden="true"></i></button>
                      </div>
                       <div class="container-block block action">
                        <my-action
                            type="update"
                            :obj="{title: 'บันทึกข้อมูล', color: 'is-info', isConfirm: true}"
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
          <!-- <template v-else>
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
          </template> -->
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
            {name: 'หมวดงาน', route: 'WorkGroup', key: '', active: true, icon: 'fa fa-th'},
            {name: 'ID', route: 'WorkGroupDetails', key: 'ID', active: true, icon: ''}
          ],
          template: {
            class: 'workgroup-details-page'
          }
        },
        houseTemplate: {
          inputs: [],
          selected: null
        },
        itemName: '',
        itemLists: [],
        inputTemplate: {
          time: 1,
          name: '',
          unit: 1,
          price: 0,
          note: ''
        }
      }
    }
  },
  computed: {
  },
  async created () {
    await this.getHouseTemplate()
    // await this.fetchData()
  },
  methods: {
    async getHouseTemplate () {
      let queryString = {}
      let houseTemplate = await service.getResource({resourceName: config.api.house.dropdown, queryString})
      this.local.houseTemplate.inputs = houseTemplate.data
    },
    async fetchData () {
      this.clearInputs()
      let houseId = this.local.houseTemplate.selected
      let queryString = this.BUILDPARAM({houseId, type: 'with-detail'})
      let res = await service.getResource({resourceName: `${config.api.workGroup.index}/${this.$route.params.key}`, queryString})
      let data = res.data[0]
      this.local.itemName = data.name
      if (data.details !== undefined && data.details.length) {
        data.details.map((item) => {
          this.local.itemLists.push({
            time: item.time,
            name: item.name,
            unit: item.unit,
            price: item.price,
            note: item.note
          })
        })
      } else {
        this.local.itemLists.push(this.local.inputTemplate)
      }
    },
    houseSelectedHandle (objVal) {
      if (objVal === null) {
        return
      }
      this.local.houseTemplate.selected = objVal.key
      this.fetchData()
    },
    editRow (type) {
      if (type === 'add') {
        this.local.itemLists.push({})
      } else {
        this.local.itemLists.pop()
      }
    },
    async submitForm (type) {
      let isValid = await this.$validator.validateAll()
      let resourceName = ''
      let data = {}
      let res = null
      switch (type) {
        case 'update':
          if (!isValid) return
          data = {
            houseId: this.local.houseTemplate.selected,
            itemLists: this.local.itemLists
          }
          resourceName = `${config.api.workGroup.detail}/${this.$route.params.key}`
          res = await service.putResource({data, resourceName})
          break
        case 'delete':
          // resourceName = `${resourceName}/${this.$route.params.key}`
          // let queryString = []
          // res = await service.deleteResource({resourceName, queryString})
          break
      }
      if (res.status === 200) {
        // this.fetchData()
        this.NOTIFY('success')
        return
      }
      this.NOTIFY('error')
    },
    deleteTime (indexOfOrder) {
      this.local.itemLists.splice(indexOfOrder, 1)
    },
    clearInputs () {
      this.local.itemLists = []
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
  padding: 0!important;
}
</style>
