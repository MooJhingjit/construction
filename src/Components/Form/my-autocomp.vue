<template>
  <section>
    <b-field :label="label">
      <b-autocomplete
        v-model="name"
        :placeholder="placeholder"
        :keep-first="keepFirst"
        :open-on-focus="openOnFocus"
        :data="filteredDataObj"
        @input="val => searchValue(val)"
        field="value"
        icon="search"
        @select="option => selected = option">
      </b-autocomplete>
    </b-field>
  </section>
</template>

<script>
import service from '@Services/app-service'
import config from '@Config/app.config'
export default {
  props: {
    arrInputs: {
      type: [Array, String],
      required: true
    },
    placeholder: {
      type: String,
      required: false
    },
    label: {
      type: String,
      required: false
    }
  },
  data () {
    return {
      data: [],
      keepFirst: false,
      openOnFocus: true,
      name: '',
      selected: null
    }
  },
  computed: {
    filteredDataObj () {
      return this.data.filter((option) => {
        return option.value
          .toString()
          .toLowerCase()
          .indexOf(this.name.toLowerCase()) >= 0
      })
    }
  },
  async created () {
    if (typeof this.arrInputs === 'string') {
      await this.getInputs()
    } else {
      this.data = this.arrInputs
    }
  },
  methods: {
    searchValue (val) {
      this.$emit('searchValue', val)
    },
    selectedValue (val) {
      // console.log(val)
      if (val === null) {
        return
      }
      this.$emit('select', val)
    },
    setValue (obj) {
      this.name = obj.key
      this.selected = obj
    },
    async getInputs () {
      let inputsType = this.arrInputs
      let queryString = {}
      let obj = []
      switch(inputsType) {
        case 'project':
          obj = await service.getResource({resourceName: config.api.project.dropdown, queryString})
          this.data = obj.data
          break;
        case 'technician':
          data = await service.getResource({resourceName: config.api.technician.dropdown, queryString}).data
          this.data = obj.data
          break;
      }
    }
  },
  watch: {
    selected (val) {
      this.selectedValue(val)
    },
    arrInputs () {
      this.data = this.arrInputs
    }
  }
}
</script>
