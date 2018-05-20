<template>
    <div class="data-table">
      <div class="search-status">
        <div class="tags">
          <span :class="['tag', {'is-warning': local.statusSelected == item.name}]" :key="index" v-for="(item, index) in statusSearch" @click="filterByStatus(item.name)">{{item.title}}</span>
        </div>
      </div>
      <div class="search-input control has-icons-left">
        <input class="input" type="text" @input="searchByText()" v-model="local.textSearch" placeholder="ค้นหา">
        <span class="icon is-small is-left">
          <i class="fa fa-search" aria-hidden="true"></i>
        </span>
      </div>
      <div class="search-results">
        <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
          <thead>
              <tr>
                <th :key="index" v-for="(itemHeader, index) in local.items.header">{{itemHeader.name}}</th>
              </tr>
            </thead>
            <tbody>
              <tr :class="{'selected': itemBody.key == local.idSelected}" :key="index" v-for="(itemBody, index) in local.items.body" @dblclick="setDataSelected(itemBody.items)">
                <td :key="index" v-for="(item, index) in itemBody.show">
                  <template v-if="item == 'status'">
                    {{GET_STATUSNAME(itemBody.items[item])}}
                  </template>
                  <template v-else>
                    {{itemBody.items[item]}}
                  </template>
                </td>
              </tr>
            </tbody>
        </table>
        <nav class="pagination" role="navigation" aria-label="pagination">
          <button class="pagination-previous" @click="changePage('previous')" :disabled="local.currentPage == 1">ก่อนหน้า</button>
          <button class="pagination-next" @click="changePage('next')" :disabled="local.totalPage == local.currentPage">หน้าถัดไป</button>
        </nav>
      </div>
    </div>
</template>

<script>
import service from '@Services/app-service'
export default {
  props: {
    resourceName: {
      type: String,
      required: true
    },
    statusSearch: {
      type: Array,
      required: false
    }
  },
  components: {
  },
  name: 'DataTable',
  data () {
    return {
      local: {
        items: {},
        idSelected: '',
        queryString: [],
        textSearch: '',
        statusSelected: '',
        limitRequest: 5,
        currentPage: 1,
        totalPage: 0
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
    this.fetchData()
    // console.log('created')
    // this.property = 'Example property update.'
    // console.log('propertyComputed will update, as this.property is now reactive.')
  },
  methods: {
    fetchData () {
      let resourceName = this.resourceName
      this.local.queryString['limit'] = this.local.limitRequest
      this.local.queryString['currentPage'] = this.local.currentPage
      let queryString = this.BUILDPARAM(this.local.queryString)
      service.getResource({resourceName, queryString})
        .then((res) => {
          if (res.status === 200) {
            this.local.items = res.data
            this.setTotalPage()
          }
        })
        .catch(() => {
        })
    },
    reloadDataTable () {
      this.fetchData()
    },
    filterByStatus (statusName) {
      let item = []
      item['status'] = statusName
      this.local.statusSelected = statusName
      this.local.queryString['status'] = statusName
      this.fetchData()
    },
    setDataSelected (item) {
      this.$emit('selectedData', item)
    },
    searchByText () {
      this.local.queryString['main_search'] = this.local.textSearch
      this.fetchData()
    },
    changePage (action) {
      if (action === 'next') {
        this.local.currentPage += 1
      } else {
        if (this.local.currentPage === 1) return
        this.local.currentPage -= 1
      }
      this.reloadDataTable()
    },
    setTotalPage () {
      this.local.totalPage = Math.ceil(this.local.items.total / this.local.limitRequest)
    }
  }
}
</script>

<style lang="scss">
</style>
