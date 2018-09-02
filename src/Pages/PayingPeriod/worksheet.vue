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
            <div class="block c-body" v-if="local.project.selected !== null && local.plan.selected !== null">
              <div class="container-block result">
                <div class="block">แบบบ้าน {{houseId}}</div>
                <div class="block"></div>
                <div class="block"></div>
              </div>
              <table class="table rows-table is-hoverable">
                <thead>
                  <tr>
                    <th>หมวด</th>
                    <th>งวด/รายการ</th>
                    <th width="80">หน่วย</th>
                    <th>ราคา</th>
                    <!-- <th width="80">ตรวจสอบ</th> -->
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
                      <p>
                        abc <input type="checkbox">
                      </p>
                       <p>
                        abc <input type="checkbox">
                      </p>
                       <p>
                        abc <input type="checkbox" disabled>
                      </p>
                       <p>
                        abc <input type="checkbox">
                      </p>
                    </td>
                    <td>
                      <my-input
                        :value="''"
                        :inputObj="{type: 'text', name: 'store_address', placeholder: '', validate: ''}"
                      ></my-input>
                      <my-input
                        :value="''"
                        :inputObj="{type: 'text', name: 'store_address', placeholder: '', validate: ''}"
                      ></my-input>
                      <my-input
                        :value="''"
                        :inputObj="{type: 'text', name: 'store_address', placeholder: '', validate: ''}"
                      ></my-input>
                      <my-input
                        :value="''"
                        :inputObj="{type: 'text', name: 'store_address', placeholder: '', validate: ''}"
                      ></my-input>
                    </td>
                    <td>
                      <p>100.00</p>
                      <p>100.00</p>
                      <p>100.00</p>
                      <p>100.00</p>
                    </td>
                    <td>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="container-block block right" v-if="local.project.selected !== null && local.plan.selected !== null">
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
        }
      }
    }
  },
  computed: {
    houseId () {
      return this.local.contract.selected.house_id
    }
    // materialGroupResource () {
    //   return config.api.materialGroup.index
    // }
  },
  async created () {
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
    technicianSelectedHandle (obj) {
      this.local.technicians.selected = obj.key
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
    },
    setContract () {
      let contract = this.local.contract.temp.filter((item) => {
        return item.project_id === this.local.project.selected
        && item.plan === this.local.plan.selected
      })
      this.local.contract.selected = contract[0]
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
</style>
