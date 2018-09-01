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
                placeholder="ค้นหาช่าง"
                label=""
                ></my-auto-complete>
              </div>
              <div class="block">
                <my-auto-complete
                @select="projectSelectedHandle"
                :arrInputs="[]"
                placeholder="ค้นหาโครงการ"
                label=""
                ></my-auto-complete>
              </div>
              <div class="block">
                <my-auto-complete
                @select="projectSelectedHandle"
                :arrInputs="[]"
                placeholder="ค้นหาแปลง"
                label=""
                ></my-auto-complete>
              </div>
            </div>
            <div class="block c-body">
              <div class="container-block result">
                <div class="block">แบบบ้าน 198PWY32T</div>
                <div class="block"></div>
                <div class="block"></div>
              </div>
               <table class="table rows-table is-hoverable">
                <thead>
                  <tr>
                    <th>หมวด</th>
                    <th>งวด/รายการ</th>
                    <th width="80">หน่วย</th>
                    <th width="80">ราคา</th>
                    <!-- <th width="80">ตรวจสอบ</th> -->
                    <th width="">หมายเหตุ</th>
                    <th width="80">สถานะ</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
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
                      <my-input
                        :value="''"
                        :inputObj="{type: 'text', name: 'store_address', placeholder: '', validate: ''}"
                      ></my-input>
                    </td>
                     <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="container-block block right">
              <button class="button" @click="editRow('add')"><i class="fa fa-plus" aria-hidden="true"></i></button>
            </div>
          </div>
          <div class="container-block footer-panel" >
            <my-action
              type="update"
              :obj="{title: 'บันทึกข้อมูล', color: 'is-info', isConfirm: true}"
              @clickEvent="submitForm('')"
            >
            </my-action>
          </div>
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
            {name: 'งานพิเศษ', route: 'ExtraJob', key: '', active: true, icon: ''}
          ],
          template: {
            class: 'extra-job-page'
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
.container-block.result{
  padding: 0 0 0 5px;
}
.detail-panel .c-body{
  padding: 0 !important;
}
.block.right{
  justify-content: flex-end;
}
</style>
