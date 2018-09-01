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
                      <div class="time block">หมวดงานโครงสร้าง</div>
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
                          </tr>
                        </thead>
                        <tbody>
                           <tr :key="index" v-for="(item, index) in local.itemLists">
                            <td>{{item.order}}</td>
                            <td><input type="text" class="input" name="" id=""></td>
                            <td><input type="text" class="input" name="" id=""></td>
                            <td><input type="text" class="input" name="" id=""></td>
                            <td><input type="text" class="input" name="" id=""></td>
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
                            @clickEvent="submitForm('')"
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
import myAutoComplete from '@Components/Form/my-autocomp'
import myAction from '@Components/Form/my-action'
export default {
  props: {
  },
  components: {
    breadcrumbBar,
    myAutoComplete,
    myAction
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
        itemLists: []
      }
    }
  },
  computed: {
  },
  async created () {
    await this.getHouseTemplate()
  },
  methods: {
    async getHouseTemplate () {
      let queryString = {}
      let houseTemplate = await service.getResource({resourceName: config.api.house.dropdown, queryString})
      this.local.houseTemplate.inputs = houseTemplate.data
    },
    houseSelectedHandle (objVal) {
      if (objVal === null) {
        return
      }
      this.local.houseTemplate.selected = objVal.key
    },
    editRow (type) {
      if (type === 'add') {
        this.local.itemLists.push({
          order: this.local.itemLists.length + 1
        })
      } else {
        this.local.itemLists.pop()
      }
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
