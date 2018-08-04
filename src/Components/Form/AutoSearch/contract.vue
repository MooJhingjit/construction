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
    <div class="plan" v-if="local.project.selected !== null">
      <my-auto-complete
      @select="planSelectedHandle"
      :arrInputs="local.plan.inputs"
      placeholder="แปลง"
      label=""
      ></my-auto-complete>
    </div>
    <div class="search-result container-block" v-if="local.contract.selected != null">
      <div class="block">
        <input class="input" disabled type="text" :value="`สัญญา: ${local.contract.selected.code} แบบบ้าน: ${local.contract.selected.house_id}`">
      </div>
    </div>
  </div>
</template>

<script>
import config from '@Config/app.config'
import service from '@Services/app-service'
import myAutoComplete from '@Components/Form/my-autocomp'
export default {
  props: {
    dataObj: {
      type: Array,
      required: false,
      default: null
    }
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
          temp: null
        },
        plan: {
          selected: null,
          inputs: []
        },
        contract: {
          selected: null,
          inputs: [],
          temp: null
        }
        // contractSelected: null
      }
    }
  },
  computed: {
  },
  created () {
    // console.log('this.dataObj')
    this.fetchData()
  },
  mounted () {
    this.selectedContract()
  },
  methods: {
    selectedContract () {
      if (this.$route.params.key && this.$route.params.key !== 'all') {
        this.$emit('select', {code: this.$route.params.key})
      } else if (this.local.contract.selected !== null) {
        this.$emit('select', this.local.contract.selected)
      }
    },
    async fetchData () {
      let queryString = this.BUILDPARAM({type: 'project-search'})
      let project = await service.getResource({resourceName: config.api.contract.dropdown, queryString})
      this.setContractObj(project.data)
    },
    async setContractObj (obj) {
      this.local.contract.temp = obj
      let contractObj = obj.map(item => {
        return {
          key: item.project_id,
          value: `โครงการ: ${item.project_name}`
        }
      })
      this.local.project.inputs = this.REMOVEDUPLICATES(contractObj, 'key')
    },
    async projectSelectedHandle (obj) {
      if (obj === null) {
        this.local.project.selected = null
        this.local.plan.inputs = []
        this.local.contract.selected = null
        this.$emit('select', null)
        return
      }
      this.local.project.selected = obj.key
      this.setPlanData()
    },
    setPlanData () {
      let planObj = this.local.contract.temp.filter((item) => {
        return item.project_id === this.local.project.selected
      })
      this.local.plan.inputs = planObj.map(item => {
        return {
          key: item.plan,
          value: `แปลง: ${item.plan}`
        }
      })
    },
    planSelectedHandle (obj) {
      if (obj === null) {
        this.local.plan.selected = null
        this.local.contract.selected = null
        this.$emit('select', null)
        return
      }
      this.local.plan.selected = obj.key
      this.local.contract.selected = this.local.contract.temp.filter((item) => {
        return item.project_id === this.local.project.selected && item.plan === this.local.plan.selected
      })[0]
      this.$emit('select', this.local.contract.selected)
    }
  },
  watch: {
    dataObj () {
      this.setContractObj(this.dataObj)
    }
  }
}
</script>

<style lang="scss" scoped>
.contract-search-form{
  width: 100%;
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
