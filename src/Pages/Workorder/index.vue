<template>
    <section :class="['section', local.pageObj.template.class]">
    <breadcrumb-bar :dataObj="local.pageObj"></breadcrumb-bar>
    <div class="container-block">
      <div class="detail-panel">
        <template v-if="true">
          <div class="container-block  detail-block">
            <div class="c-header container-block block">
            </div>
            <div class="c-body">
              <div class="items">
                 <table class="table rows-table is-hoverable">
                  <thead>
                    <tr>
                      <th>งวด</th>
                      <th>รายละเอียดงาน</th>
                      <th>รายการจัดซื้อ</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr :key="index" v-for="(item, index) in local.workOrderObj">
                      <td>{{item.time}}</td>
                      <td>
                        <div :key="taskIndex" class="list" v-for="(task, taskIndex) in item.tasks">{{task.name}}</div>
                      </td>
                      <td>
                        <div :key="taskIndex" class="list" v-for="(task, taskIndex) in item.tasks">{{task.material_group_name}}</div>
                      </td>
                      <td>
                        <button class="button" @click="GOTOPAGE('EditWorkorder', item.time)">แก้ไขงวดที่ {{item.time}}</button>
                      </td>
                    </tr>
                    <!-- <tr>
                      <td>2</td>
                      <td>
                        <div class="list">ถังบำบัดน้ำเสียและถังเก็บน้ำใต้ดิน</div>
                        <div class="list">งานเดินท่อประปาใต้อาคาร</div>
                        <div class="list">งานเทพื้นชั้นหนึ่ง 100%</div>
                        <div class="list">งานโครงหลังคารอบบน ล่าง</div>
                      </td>
                      <td>
                        <div class="name">name of product group</div>
                        <div class="product-list">product xxxx</div>
                        <div class="product-list">product xxxx</div>
                        <div class="product-list">product xxxx</div>
                        <div class="product-list">product xxxx</div>
                      </td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>
                        <div class="list">ถังบำบัดน้ำเสียและถังเก็บน้ำใต้ดิน</div>
                        <div class="list">งานเดินท่อประปาใต้อาคาร</div>
                        <div class="list">งานเทพื้นชั้นหนึ่ง 100%</div>
                        <div class="list">งานโครงหลังคารอบบน ล่าง</div>
                      </td>
                      <td>
                        <div class="name">name of product group</div>
                        <div class="product-list">product xxxx</div>
                        <div class="product-list">product xxxx</div>
                        <div class="product-list">product xxxx</div>
                        <div class="product-list">product xxxx</div>
                      </td>
                    </tr> -->
                  </tbody>
                </table>
                <div class="container-block footer-panel" v-if="local.workOrderObj.length < 10">
                  <my-action
                    type="update"
                    :obj="{title: 'เพิ่มงวด'}"
                    @clickEvent="addItem()"
                  >
                  </my-action>
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
import myAction from '@Components/Form/my-action'
export default {
  props: {
    // templateName: {
    //   type: String,
    //   required: true
    // }
  },
  components: {
    breadcrumbBar,
    myAction
  },
  name: 'WorkOrderPage',
  data () {
    return {
      local: {
        pageObj: {
          items: [
            {name: 'ลำดับการทำงาน', route: 'Workorder', key: '', active: true, icon: 'fa fa-address-book-o'}
          ],
          template: {
            class: 'work-order-page'
          }
        },
        workOrderObj: {}
      }
    }
  },
  computed: {
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      let resourceName = `${config.api.workOrder.index}`
      let queryString = this.BUILDPARAM()
      service.getResource({resourceName, queryString})
        .then((res) => {
          if (res.status === 200) {
            this.local.workOrderObj = res.data
          }
        })
        .catch(() => {
        })
    },
    addItem () {
      let data = {}
      let resourceName = `${config.api.workOrder.index}`
      service.postResource({data, resourceName})
        .then((res) => {
          if (res.status === 200) {
            this.GOTOPAGE('EditWorkorder', res.data.time)
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>

<style lang="scss">
</style>
