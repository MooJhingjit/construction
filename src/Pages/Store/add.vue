<template>
    <section :class="['section', local.pageObj.template.class]">
    <breadcrumb-bar :dataObj="local.pageObj"></breadcrumb-bar>
    <div class="container-block">
      <div class="detail-panel">
        <template v-if="local.store.id">
          <div class="container-block  detail-block">
            <div class="c-header container-block block">
              <div class="block info container-block">
                <div class="block store">
                  <div>ร้านค้า: <span class="value">{{local.store.name}}</span></div>
                  <div>ประเภท: <span class="value">{{local.store.type}}</span></div>
                </div>
                <div class="block container-block house-template tags-select">
                  <my-auto-complete
                  @select="houseSelectedHandle"
                  :arrInputs="local.houseTemplate.inputs"
                  placeholder="ชื่อแบบ หรือ แปลน"
                  label="ค้นหาแบบบ้าน"
                  ></my-auto-complete>
                </div>
              </div>
            </div>
            <div class="c-body">
              <component
              :obj="{
                storeId: this.$route.params.key,
                houseTemplate: local.houseTemplate.selected
              }"
              :is="local.materialTemplate" transition="fade" transition-mode="out-in"></component>
            </div>
          </div>
        </template>
        <template v-else>
          <template slot="detail"></template>
        </template>
      </div>
    </div>
    </section>
</template>

<script>
import breadcrumbBar from '@Components/Breadcrumb'
import config from '@Config/app.config'
import service from '@Services/app-service'
import myAutoComplete from '@Components/Form/my-autocomp'
import materialTemplateDefault from '@Pages/Material/template-default'
import materialTemplateGarage from '@Pages/Material/template-garage'
export default {
  props: {
    // templateName: {
    //   type: String,
    //   required: true
    // }
  },
  components: {
    breadcrumbBar,
    myAutoComplete,
    materialTemplateDefault,
    materialTemplateGarage
  },
  name: 'AddMaterialPage',
  data () {
    return {
      local: {
        pageObj: {
          items: [
            {name: 'ร้านค้า', route: 'Store', key: '', active: false, icon: 'fa fa-th-large'},
            {name: 'สร้างสินค้าใหม่', route: 'AddMaterial', key: this.$route.params.key, active: true, icon: ''}
          ],
          template: {
            class: 'add-material-page'
          }
        },
        store: {},
        houseTemplate: {
          inputs: [],
          selected: null
        },
        materialTemplate: null
      }
    }
  },
  computed: {
    // resourceName () {
    //   return config.api.project.index
    // }
  },
  created () {
    this.fetchData()
  },
  methods: {
    async fetchData () {
      let queryString = this.BUILDPARAM()
      let storeData = await service.getResource({resourceName: `${config.api.store.index}/${this.$route.params.key}`, queryString})
      let houseTemplate = await service.getResource({resourceName: config.api.house.dropdown, queryString})
      this.local.store = storeData.data
      this.local.houseTemplate.inputs = houseTemplate.data
    },
    houseSelectedHandle (objVal) {
      this.local.houseTemplate.selected = objVal
      if (!this.local.houseTemplate.selected) {
        this.local.materialTemplate = null
        return
      }
      if (this.local.houseTemplate.selected.key === '098SW319I') {
        this.local.materialTemplate = materialTemplateDefault
      } else {
        this.local.materialTemplate = materialTemplateGarage
      }
    }
  }
}
</script>

<style lang="scss">
</style>
