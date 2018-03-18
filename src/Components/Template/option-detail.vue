<template>
    <section :class="['section', this.templateObj.class]">
    <div class="container">
        <h1 class="title"><slot name="title"></slot></h1>
    </div>
    <div class="container-block">
      <div class="options-panel">
        <slot name="options"></slot>
      </div>
      <div class="detail-panel">
        <slot name="detail"></slot>
        <!-- <slot name="empty"></slot> -->
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    templateObj: {
      type: Object,
      required: true
    }
  },
  components: {
  },
  name: 'optionsDetailTemplate',
  data () {
    return {
      property: 'Blank'
    }
  },
  computed: {
    // getTemplateClass () {
    //   return this.templateObj.class
    // }
  },
  created () {
    // console.log('created')
    // this.property = 'Example property update.'
    // console.log('propertyComputed will update, as this.property is now reactive.')
  },
  beforeMount () {
    // console.log('beforeMount')
    // console.log(`this.$el doesn't exist yet, but it will soon!`)
  },
  mounted () {
    // console.log('mounted')
    // console.log(this.$el.textContent) // I'm text inside the component.
  },
  beforeUpdate () {
    // console.log('beforeUpdate')
    // console.log(this.counter) // Logs the counter value every second, before the DOM updates.
  },
  updated () {
    // console.log('updated')
    // Fired every second, should always be true
    // console.log(+this.$refs['dom-element'].textContent === this.counter)
  },
  beforeDestroy () {
    // console.log('beforeDestroy')
    // Perform the teardown procedure for someLeakyProperty.
    // (In this case, effectively nothing)
    // this.someLeakyProperty = null
    // delete this.someLeakyProperty
  },
  destroyed () {
    // console.log('destroyed')
    // console.log(this) // There's practically nothing here!
    // MyCreepyAnalyticsService.informService('Component destroyed. All assets move in on target on my mark.')
  },
  methods: {
  }
}
</script>

<style lang="scss">
</style>
