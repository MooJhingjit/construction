<template>
  <div v-if="local.data" :class="data.class"><div class="ui active inline loader"></div></div>
</template>

<script>
import '@Modules/jquery-sparkline/jquery.sparkline.min.js'
export default {
  props: {
    config: {
      type: Object,
      required: true
    },
    data: {
      type: Object,
      required: true
    }
  },
  components: {
  },
  name: 'SparkLine',
  data () {
    return {
      local: {
        data: {}
      }
      // property: 'Blank'
    }
  },
  computed: {
    // propertyComputed() {
    //   console.log('I change when this.property changes.')
    //   return this.property
    // }
  },
  created () {
    this.setData()
  },
  methods: {
    setData () {
      let data = this.local.data
      if (data.dataSets) {
        this.$nextTick(() => {
          let dataSets = data.dataSets.values
          let config = this.config
          config.barColor = data.barColor
          config.tooltipValueLookups = {
            offset: data.dataSets.label,
            value: data.dataSets.values
          }
          $('.' + data.class).sparkline(dataSets, config)
        })
      }
    }
  },
  watch: {
    data () {
      this.local.data = this.data
      this.setData()
      // this.data = this.data
    }
  }
}
</script>

<style lang="scss">
</style>
