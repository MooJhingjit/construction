<template>
  <section class="section front-site-update-page">
    <breadcrumb-bar :dataObj="local.pageObj"></breadcrumb-bar>
    <div class="container-block">
       <article class="tile is-child notification">
        <div class="project-name">Project name</div>
        <!-- <div class="current-task">งานปัจจุบัน: วางกระเบื้อง</div>-->
        <div class="todo-lists">
          <table class="table is-bordered">
            <thead>
              <th>งาน</th>
              <th>สถานะ</th>
            </thead>
            <tbody>
              <tr>
                <td class="list">
                  <div class="task">task</div>
                  <div class="detail">detail</div>
                  <div class="date">xx-xx-xxxx นายxxxxx xxxxxx</div>
                </td>
                <td class="status" width="70"><i class="fa fa-check-square-o" aria-hidden="true"></i></td>
              </tr>
              <tr>
                <td class="list">
                  <div class="task">task</div>
                  <div class="detail">detail</div>
                  <div class="date">xx-xx-xxxx นายxxxxx xxxxxx</div>
                </td>
                <td class="status"><i class="fa fa-check-square-o" aria-hidden="true"></i></td>
              </tr>
              <tr>
                <td class="list">
                  <div class="task">task</div>
                  <div class="detail">detail</div>
                  <!-- <div class="date">xx-xx-xxxx นายxxxxx xxxxxx</div> -->
                </td>
                <td class="status"><button class="button  is-link is-outlined">อัพเดท</button></td>
              </tr>
              <tr>
                <td class="list">
                  <div class="task">task</div>
                  <div class="detail">detail</div>
                  <!-- <div class="date">xx-xx-xxxx นายxxxxx xxxxxx</div> -->
                </td>
                <td class="status"><button class="button" disabled>อัพเดท</button></td>
              </tr>
              <tr>
                <td class="list">
                  <div class="task">task</div>
                  <div class="detail">detail</div>
                  <!-- <div class="date">xx-xx-xxxx นายxxxxx xxxxxx</div> -->
                </td>
                <td class="status"><button class="button" disabled>อัพเดท</button></td>
              </tr>
              <tr>
                <td class="list">
                  <div class="task">task</div>
                  <div class="detail">detail</div>
                  <!-- <div class="date">xx-xx-xxxx นายxxxxx xxxxxx</div> -->
                </td>
                <td class="status"><button class="button" disabled>อัพเดท</button></td>
              </tr>
              <tr>
                <td class="list">
                  <div class="task">task</div>
                  <div class="detail">detail</div>
                  <!-- <div class="date">xx-xx-xxxx นายxxxxx xxxxxx</div> -->
                </td>
                <td class="status"><button class="button" disabled>อัพเดท</button></td>
              </tr>
              <tr>
                <td class="list">
                  <div class="task">task</div>
                  <div class="detail">detail</div>
                  <!-- <div class="date">xx-xx-xxxx นายxxxxx xxxxxx</div> -->
                </td>
                <td class="status"><button class="button" disabled>อัพเดท</button></td>
              </tr>
              <tr>
                <td class="list">
                  <div class="task">task</div>
                  <div class="detail">detail</div>
                  <!-- <div class="date">xx-xx-xxxx นายxxxxx xxxxxx</div> -->
                </td>
                <td class="status"><button class="button" disabled>อัพเดท</button></td>
              </tr>
              <tr>
                <td class="list">
                  <div class="task">task</div>
                  <div class="detail">detail</div>
                  <!-- <div class="date">xx-xx-xxxx นายxxxxx xxxxxx</div> -->
                </td>
                <td class="status"><button class="button" disabled>อัพเดท</button></td>
              </tr>
              <tr>
                <td class="list">
                  <div class="task">task</div>
                  <div class="detail">detail</div>
                  <!-- <div class="date">xx-xx-xxxx นายxxxxx xxxxxx</div> -->
                </td>
                <td class="status"><button class="button" disabled>อัพเดท</button></td>
              </tr>
              <tr>
                <td class="list">
                  <div class="task">task</div>
                  <div class="detail">detail</div>
                  <!-- <div class="date">xx-xx-xxxx นายxxxxx xxxxxx</div> -->
                </td>
                <td class="status"><button class="button" disabled>อัพเดท</button></td>
              </tr>
            </tbody>
          </table>
        </div>
       <!-- <div class="actions container-block">
          <button class="button block">อัพเดทสถานะ</button>
        </div> -->
       </article>
    </div>
  </section>
</template>

<script>
import breadcrumbBar from '@Components/Breadcrumb'
import optionDetailTemplate from '@Components/Template/option-detail'
export default {
  props: {
    // templateName: {
    //   type: String,
    //   required: true
    // }
  },
  components: {
    breadcrumbBar,
    optionDetailTemplate
  },
  name: 'FrontSiteUpdatePage',
  data () {
    return {
      local: {
        pageObj: {
          items: [
            {name: 'ไชต์งานหลัก', route: 'FrontSite', key: '', active: false, icon: 'fa fa-home'},
            {name: 'อัพเดทสถานะ', route: 'FrontSiteUpdate', key: 'xxx', active: true, icon: ''}
          ]
        }
      }
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
