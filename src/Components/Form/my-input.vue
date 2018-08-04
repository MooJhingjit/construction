<template>
  <div>
    <template v-if="local.type == 'text' || local.type == 'textarea'">
      <b-field
        :type="errors.has(local.name) ? 'is-danger': ''"
        :message="errors.has(local.name) ? 'โปรดตรวจสอบข้อมมูลข้างต้น' : ''">
        <b-input
            @blur="blurEvent()"
            :type="local.type"
            :name="local.name"
            v-model="inputVal"
            :placeholder="local.placeholder"
            :autocomplete="local.autocomplete || 'off'"
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
    <template v-else-if="local.type == 'datepicker'">
      <b-field
      :type="errors.has(local.name) ? 'is-danger': ''"
        :message="errors.has(local.name) ? 'โปรดตรวจสอบข้อมมูลข้างต้น' : ''">
        <b-datepicker
            :placeholder="local.placeholder"
            :name="local.name"
            v-model="inputVal"
            icon="calendar"
            v-validate="local.validate">
        </b-datepicker>
      </b-field>
    </template>
    <!-- <template v-else-if="local.type == 'textarea'">
      <b-field
        :type="errors.has(local.name) ? 'is-danger': ''"
        :message="errors.has(local.name) ? 'โปรดตรวจสอบข้อมมูลข้างต้น' : ''">
        <b-input
            type="textarea"
            minlength="10"
            maxlength="100"
            placeholder="Maxlength automatically counts characters">
        </b-input>
      </b-field>
    </template> -->
  </div>
</template>

<script>
export default {
  props: {
    // validator: this.validator,
    value: {
      type: [String, Number, Date],
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
        this.$emit('onBlur', this.inputVal)
      }
    }
  },
  watch: {
    inputObj () {
      this.local = this.inputObj
    },
    inputVal (val) {
      this.$emit('input', val)
      this.$emit('change', val)
    },
    value () {
      this.inputVal = this.value
    }
  }
}
</script>

<style lang="scss">
</style>
