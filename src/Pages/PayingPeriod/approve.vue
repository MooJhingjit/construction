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
                :arrInputs="[]"
                placeholder="เลือกโครงการ"
                label=""
                ></my-auto-complete>
              </div>
              <div class="block">
                <!-- <my-auto-complete
                @select="projectSelectedHandle"
                :arrInputs="[]"
                placeholder="ค้นหาโครงการ"
                label=""
                ></my-auto-complete> -->
              </div>
              <div class="block">
                <!-- <my-auto-complete
                @select="projectSelectedHandle"
                :arrInputs="[]"
                placeholder="ค้นหาแปลง"
                label=""
                ></my-auto-complete> -->
              </div>
            </div>
            <div class="block c-body">
              <table class="table rows-table is-hoverable">
                <thead>
                  <tr>

                    <th>ชื่อช่าง</th>
                    <th>แปลง</th>
                    <th>หมวดงาน</th>
                    <th>งวด/รายการ</th>
                    <th>หน่วย</th>
                    <th>ราคาต่อหน่วย</th>
                    <th>จำนวนเงินรวม</th>
                    <!-- <th width="80">ตรวจสอบ</th> -->
                    <th width=""></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>นาย..</td>
                    <td>
                      <p>แปลง</p>
                      <p>แปลง</p>
                      <p>แปลง</p>
                      <p>แปลง</p>
                      <p>แปลง</p>
                    </td>
                    <td>
                      <p>a</p>
                      <p>b</p>
                      <p>c</p>
                      <p>d</p>
                      <p>e</p>
                    </td>
                    <td>
                      <p>1 xxxx</p>
                      <p>2 xxxx</p>
                      <p>3 xxxx</p>
                      <p>4 xxxx</p>
                      <p>5 xxxx</p>
                    </td>
                    <td>
                      <p>1 หน่วย</p>
                      <p>2 หน่วย</p>
                      <p>3 หน่วย</p>
                      <p>4 หน่วย</p>
                      <p>5 หน่วย</p>
                    </td>
                    <td>
                      <p>1 บาท</p>
                      <p>2 บาท</p>
                      <p>3 บาท</p>
                      <p>4 บาท</p>
                      <p>5 บาท</p>
                    </td>
                    <td>
                      <p>1 บาท</p>
                      <p>2 บาท</p>
                      <p>3 บาท</p>
                      <p>4 บาท</p>
                      <p>5 บาท</p>
                    </td>
                    <td>
                      <div>
                        <my-action
                          type="null"
                          :obj="{title: 'จ่ายเงิน', color: 'is-warning', isConfirm: true}"
                        >
                        </my-action>
                        <my-action
                          type="null"
                          :obj="{title: 'ไม่ผ่าน', color: 'is-danger', isConfirm: true}"
                        >
                        </my-action>
                      </div>
                       <div>
                        <my-action
                          type="null"
                          :obj="{title: 'จ่ายเงิน', color: 'is-warning', isConfirm: true}"
                        >
                        </my-action>
                        <my-action
                          type="null"
                          :obj="{title: 'ไม่ผ่าน', color: 'is-danger', isConfirm: true}"
                        >
                        </my-action>
                      </div>
                       <div>
                        <my-action
                          type="null"
                          :obj="{title: 'จ่ายเงิน', color: 'is-warning', isConfirm: true}"
                        >
                        </my-action>
                        <my-action
                          type="null"
                          :obj="{title: 'ไม่ผ่าน', color: 'is-danger', isConfirm: true}"
                        >
                        </my-action>
                      </div>
                       <div>
                        <my-action
                          type="null"
                          :obj="{title: 'จ่ายเงิน', color: 'is-warning', isConfirm: true}"
                        >
                        </my-action>
                        <my-action
                          type="null"
                          :obj="{title: 'ไม่ผ่าน', color: 'is-danger', isConfirm: true}"
                        >
                        </my-action>
                      </div>
                       <div>
                        <my-action
                          type="null"
                          :obj="{title: 'จ่ายเงิน', color: 'is-warning', isConfirm: true}"
                        >
                        </my-action>
                        <my-action
                          type="null"
                          :obj="{title: 'ไม่ผ่าน', color: 'is-danger', isConfirm: true}"
                        >
                        </my-action>
                      </div>
                    </td>
                  </tr>
                  <!-- <tr>
                    <td>
                      <my-input
                        :value="''"
                        :inputObj="{type: 'text', name: 'store_address', placeholder: '', validate: ''}"
                      ></my-input>
                    </td>
                    <td>
                      <my-input
                        :value="''"
                        :inputObj="{type: 'text', name: 'store_address', placeholder: '', validate: ''}"
                      ></my-input>
                    </td>
                    <td>
                      <my-input
                        :value="''"
                        :inputObj="{type: 'text', name: 'store_address', placeholder: '', validate: ''}"
                      ></my-input>
                    </td>
                    <td>
                      <my-input
                        :value="''"
                        :inputObj="{type: 'text', name: 'store_address', placeholder: '', validate: ''}"
                      ></my-input>
                    </td>
                    <td>
                      <my-action
                        type="null"
                        :obj="{title: 'จ่ายเงิน', color: 'is-warning', isConfirm: true}"
                      >
                      </my-action>
                      <my-action
                        type="null"
                        :obj="{title: 'ไม่ผ่าน', color: 'is-danger', isConfirm: true}"
                      >
                      </my-action>
                    </td>
                  </tr> -->
                </tbody>
              </table>
            </div>
          </div>
          <!-- <div class="container-block footer-panel" >
            <my-action
              type="update"
              :obj="{title: 'บันทึกข้อมูล', color: 'is-info', isConfirm: true}"
              @clickEvent="submitForm('')"
            >
            </my-action>
          </div> -->
        </div>
      </div>
    </section>
</template>

<script>
import breadcrumbBar from '@Components/Breadcrumb'
// import service from '@Services/app-service'
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
        }
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
    projectSelectedHandle () {
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
.container-block.detail{

}
</style>
