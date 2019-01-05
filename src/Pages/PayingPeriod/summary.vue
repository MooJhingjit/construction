<template>
  <section class="section">
      <breadcrumb-bar :dataObj="local.pageObj"></breadcrumb-bar>
      <div class="container-block">
        <div class="detail-panel">
          <div class="container-block detail-block">
            <div class="columns">
              <div class="column">
                <my-auto-complete
                @select="projectSelectedHandle"
                :arrInputs="'project'"
                :config="{getNullVal: true}"
                placeholder="ค้นหาโครงการ"
                label=""
                ></my-auto-complete>
              </div>
              <div class="column">
                <my-auto-complete
                  @select="technicianSelectedHandle"
                  :arrInputs="local.technicians.inputs"
                  :config="{getNullVal: true}"
                  placeholder="ค้นหาช่าง"
                  label=""
                ></my-auto-complete>
              </div>
              <div class="column flex-center">
                <label class="checkbox">
                  <input type="checkbox" value="normal" v-model="local.type">
                  ปกติ
                </label>
                &nbsp;&nbsp;&nbsp;
                <label class="checkbox">
                  <input type="checkbox" value="extra" v-model="local.type">
                  พิเศษ
                </label>
              </div>
              <div class="column is-2">
                <button :class="['button is-fullwidth', {'is-loading': local.isLoading}]" @click="searchData()">ค้นหา</button>
              </div>
            </div>
            <!-- start content -->
            <div class="columns">
              <div class="column">
                <table class="table is-narrow">
                  <thead>
                    <tr>
                      <th>เดือน/ปี</th>
                      <th>โครงการ</th>
                      <th>ช่าง</th>
                      <th>เงินรวม</th>
                      <th>ประเภท</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr :key="index" v-for="(item, index) in server.result">
                      <td>{{SET_DATEFORMAT(item[0].date, 'MM/YYYY')}}</td>
                      <td>{{item[0].projectName}}</td>
                      <td>{{item[0].technicianName}}</td>
                      <td>{{NUMBERWITHCOMMAS(item[0].total)}}</td>
                      <td><span :class="['tag', {'is-warning': item[0].is_extra, 'is-light': !item[0].is_extra}]">{{getTypeText(item[0])}}</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <!-- end content -->
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
export default {
  props: {
    // templateName: {
    //   type: String,
    //   required: true
    // }
  },
  components: {
    breadcrumbBar,
    myAutoComplete
  },
  name: 'PayingSummaryPage',
  data () {
    return {
      local: {
        pageObj: {
          items: [
            {name: 'จ่ายค่างวด', route: 'PayingPeriod', key: '', active: false, icon: 'fa fa-exchange'},
            {name: 'สรุปรายการจ่าย', route: 'PayingSummary', key: '', active: true, icon: ''}
          ]
        },
        type: ['normal', 'extra'],
        project: {
          selected: null,
          value: null
        },
        technicians: {
          inputs: [],
          selected: null
        },
        isLoading: false
      },
      server: {
        result: []
      }
    }
  },
  computed: {
  },
  created () {
    this.getTechnician()
  },
  methods: {
    async getTechnician () {
      let queryString = {}
      let technicians = await service.getResource({resourceName: config.api.technician.dropdown, queryString})
      this.local.technicians.inputs = technicians.data
    },
    projectSelectedHandle (obj) {
      if (obj === null) {
        this.local.project.selected = null
        return
      }
      this.local.project.selected = obj.key
    },
    technicianSelectedHandle (obj) {
      if (obj === null) {
        this.local.technicians.selected = null
        return
      }
      this.local.technicians.selected = obj.key
    },
    async searchData () {
      // this.local.isLoading = true
      let queryString = this.BUILDPARAM({
        project: this.local.project.selected,
        technician: this.local.technicians.selected,
        type: this.local.type
      })
      let result = await service.getResource({resourceName: config.api.payingPeriod.summary, queryString})
      this.local.isLoading = false
      this.server.result = result.data
    },
    getTypeText (item) {
      if (item.is_extra) {
        return 'พิเศษ'
      }
      return 'ปกติ'
    }
  }
}
</script>

<style lang="scss">
</style>
