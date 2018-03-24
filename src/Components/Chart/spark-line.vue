<template>
  <div :class="this.data.class"><div class="ui active inline loader"></div></div>
</template>

<script>
import '@Modules/jquery-sparkline/jquery.sparkline.min.js'
export default {
  props: [
    'config',
    'data'
  ],
  components: {
  },
  name: 'SparkLine',
  data () {
    return {
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
    this.$nextTick(() => {
      let dataSets = this.data.dataSets.values
      let config = this.config
      config.barColor = this.data.barColor
      config.tooltipValueLookups = {
        offset: this.data.dataSets.label,
        value: this.data.dataSets.values
      }
      $('.' + this.data.class).sparkline(dataSets, config)
    })
  },
  beforeMount () {},
  mounted () {},
  beforeUpdate () {},
  updated () {},
  beforeDestroy () {},
  destroyed () {},
  methods: {}
}
</script>

<style lang="scss">
</style>
