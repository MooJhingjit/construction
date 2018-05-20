<template>
  <div>
    <template v-if="local.type == 'text'">
      <b-field
        :type="errors.has(local.name) ? 'is-danger': ''"
        :message="errors.has(local.name) ? 'โปรดตรวจสอบข้อมมูลข้างต้น' : ''">
        <b-input
            @blur="blurEvent()"
            :type="local.text"
            :name="local.name"
            v-model="inputVal"
            :placeholder="local.placeholder"
            v-validate="local.validate">
        </b-input>
      </b-field>
    </template>
    <template v-else-if="local.type == 'select'">
      <b-field
        :type="errors.has(local.name) ? 'is-danger': ''"
        :message="errors.has(local.name) ? 'โปรดตรวจสอบข้อมมูลข้างต้น' : ''">
        <b-select
          v-validate="local.validate"
          :name="local.name"
          v-model="inputVal"
          :placeholder="local.placeholder"
          >
          <option :key="index" :value="item.key" v-for="(item, index) in local.inputValue">{{item.name}}</option>
        </b-select>
      </b-field>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    // validator: this.validator,
    value: {
      type: String,
      required: false
    },
    inputObj: {
      type: Object,
      required: false
    },
    validator: {
      type: Object,
      required: false
    }
  },
  components: {
  },
  name: 'MyInput',
  data () {
    return {
      inputVal: this.value,
      local: {}
    }
  },
  computed: {
    // propertyComputed() {
    //   console.log('I change when this.property changes.')
    //   return this.property
    // }
  },
  created () {
    if (this.validator) {
      this.$validator = this.validator
    }
    this.local = this.inputObj
  },
  methods: {
    blurEvent () {
      if (this.local.isBlur) {
        this.$emit('onBlur')
      }
    }
  },
  watch: {
    inputVal (val) {
      this.$emit('input', val)
    },
    value () {
      this.inputVal = this.value
    }
  }
}
</script>

<style lang="scss">
</style>
