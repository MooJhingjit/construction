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
export default {
  props: {
    arrInputs: {
      type: Array,
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
      data: this.arrInputs,
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
  methods: {
    searchValue (val) {
      this.$emit('searchValue', val)
    }
  },
  watch: {
    selected (val) {
      this.$emit('select', val)
    },
    arrInputs () {
      this.data = this.arrInputs
    }
  }
}
</script>
