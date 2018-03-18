<template>
  <section class="section user-page">
    <div class="container">
        <h1 class="title">ข้อมูลระดับผู้ใช้</h1>
    </div>
    <div class="container-block">
      <div class="options-panel">
        <div class="container-block">
          <div class="control has-icons-left">
            <input class="input" type="text" placeholder="ค้นหา">
            <span class="icon is-small is-left">
              <i class="fa fa-search" aria-hidden="true"></i>
            </span>
          </div>
          <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
            <thead>
              <tr>
                <th>ตำแหน่ง</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Three</td>
              </tr>
              <tr>
                <td>Five</td>
              </tr>
              <tr>
                <td>Seven</td>
              </tr>
              <tr>
                <td>Nine</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="detail-panel">
        <div class="container-block">
          test
        </div>
        <div class="container-block footer-panel">
            <button class="button">บันทึกข้อมูล</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    // templateName: {
    //   type: String,
    //   required: true
    // }
  },
  components: {
  },
  name: 'AuthorityPage',
  data () {
    return {
      property: 'Blank'
    }
  },
  computed: {
    // propertyComputed() {
    //   console.log('I change when this.property changes.')
    //   return this.property
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
