<template>
  <div class="contract-search-form">
    <div class="project">
      <my-auto-complete
      @select="projectSelectedHandle"
      :arrInputs="local.project.inputs"
      placeholder="โครงการ"
      label=""
      ></my-auto-complete>
    </div>
    <div class="search-result container-block" v-if="local.contractSelected != null">
      <div class="block">เลขที่สัญญา: {{local.contractSelected.code}} >> แบบบ้าน: {{local.contractSelected.house_id}}</div>
    </div>
  </div>
</template>

<script>
import config from '@Config/app.config'
import service from '@Services/app-service'
import myAutoComplete from '@Components/Form/my-autocomp'
export default {
  props: {
  },
  components: {
    myAutoComplete
  },
  data () {
    return {
      local: {
        project: {
          selected: null,
          inputs: [],
          temp: []
        },
        house: {
          selected: null,
          inputs: []
        },
        contractSelected: null
      }
    }
  },
  computed: {
  },
  created () {
    this.fetchData()
  },
  methods: {
    async fetchData () {
      // search project from contract table
      let queryString = this.BUILDPARAM({type: 'project-search'})
      let project = await service.getResource({resourceName: config.api.contract.dropdown, queryString})
      this.local.project.temp = project.data
      this.local.project.inputs = project.data.map(item => {
        return {
          key: item.code,
          value: `โครงการ: ${item.project_name} >> แปลง: ${item.plan}`
        }
      })
    },
    projectSelectedHandle (obj) {
      if (obj === null) {
        this.local.project.selected = null
        return
      }
      this.local.project.selected = obj.key
      this.local.contractSelected = this.local.project.temp.filter((item) => {
        return item.code === this.local.project.selected
      })[0]
      this.$emit('select', this.local.contractSelected)
    }
  },
  watch: {
  }
}
</script>

<style lang="scss" scoped>
.contract-search-form{
  &>div+div{
    margin-top: 5px;
  }
  .search-result{
    .block{
      margin-bottom: unset;
    }
  }
}
</style>
