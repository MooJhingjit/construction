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
              <table class="table rows-table is-hoverable">
                <thead>
                  <tr>
                    <th>xxxxx</th>
                    <th>xxxxx</th>
                    <th>xxxxx</th>
                    <th width="80">ตรวจสอบ</th>
                    <th width="80">สถานะ</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>.....</td>
                    <td>.....</td>
                    <td>.....</td>
                    <td><input type="checkbox"></td>
                    <td><span class="tag is-success">จ่ายแล้ว</span></td>
                  </tr>
                  <tr>
                    <td>.....</td>
                    <td>.....</td>
                    <td>.....</td>
                    <td><input type="checkbox"></td>
                    <td><span class="tag is-warning">รออนุมัติจ่าย</span></td>
                  </tr>
                  <tr>
                    <td>.....</td>
                    <td>.....</td>
                    <td>.....</td>
                    <td><input type="checkbox"></td>
                    <td><span class="tag is-warning">รออนุมัติจ่าย</span></td>
                  </tr>
                  <tr>
                    <td>.....</td>
                    <td>.....</td>
                    <td>.....</td>
                    <td><input type="checkbox"></td>
                    <td><span class="tag is-white">รอตรวจสอบ</span></td>
                  </tr>
                  <tr>
                    <td>.....</td>
                    <td>.....</td>
                    <td>.....</td>
                    <td><input type="checkbox"></td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
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
import service from '@Services/app-service'
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
            {name: 'จ่ายค่างวด', route: 'PayingPeriod', key: '', active: true, icon: 'fa fa-exchange'},
            {name: 'ใบส่งงาน', route: 'Worksheet', key: '', active: true, icon: ''}
          ],
          template: {
            class: 'work-sheet-page'
          }
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
.container-block.detail{

}
</style>
