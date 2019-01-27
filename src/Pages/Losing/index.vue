<template>
  <section class="section losing-page">
    <breadcrumb-bar :dataObj="local.pageObj"></breadcrumb-bar>
    <div class="container-block">
      <div class="tile is-ancestor">
        <div class="tile is-vertical is-12">
          <div class="tile">
            <div class="tile is-parent is-vertical is-10">
              <article class="tile is-child notification">
                <div class="tile">
                  <div class="tile is-parent is-vertical is-12">
                    <bar-chart v-if="local.all != null" :data="local.all"  :height="150" ></bar-chart>
                  </div>
                </div>
              </article>
            </div>
            <div class="tile is-parent is-vertical">
              <article class="tile is-child notification">
                <div class="search-box container-block flex-center">
                  <div class="block">
                    <button class="button is-link" @click="GOTOPAGE('LosingDetail', '')"><i class="fa fa-eye" aria-hidden="true"></i> &nbsp; รายละเอียด </button>
                  </div>
                </div>
              </article>
            </div>
          </div>
          <div class="tile">
            <div class="tile is-parent is-vertical is-6">
              <article class="tile is-child notification">
                <div class="tile">
                  <div class="tile is-parent is-vertical is-12">
                    <bar-chart v-if="local.ordering != null" :data="local.ordering"  :height="150" ></bar-chart>
                  </div>
                </div>
              </article>
            </div>
            <div class="tile is-parent is-vertical is-6">
              <article class="tile is-child notification">
                <div class="tile">
                  <div class="tile is-parent is-vertical is-12">
                    <bar-chart v-if="local.paying != null" :data="local.paying"  :height="150" ></bar-chart>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import barChart from '@Components/Chart/line'
import breadcrumbBar from '@Components/Breadcrumb'
import service from '@Services/app-service'
import config from '@Config/app.config'
export default {
  props: {
  },
  components: {
    barChart,
    breadcrumbBar
  },
  name: 'OrderingPage',
  data () {
    return {
      local: {
        pageObj: {
          items: [
            {name: 'ข้อมูลสูญเสีย', route: 'Losing', key: '', active: true, icon: 'fa fa-thumbs-o-down'}
          ]
        },
        ordering: null,
        paying: null,
        all: null
      }
    }
  },
  computed: {
  },
  created () {
    this.fetchData()
  },
  methods: {
    async fetchData () {
      let resourceName = config.api.losing.home
      let queryString = []
      let res = await service.getResource({resourceName, queryString})
      this.local.ordering = res.data.ordering
      this.local.paying = res.data.paying
      this.local.all = res.data.all
    }
  }
}
</script>

<style lang="scss">
</style>
