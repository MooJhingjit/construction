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
                <td :key="index" v-for="(item, index) in itemBody.show">{{itemBody.items[item]}}</td>
              </tr>
            </tbody>
        </table>
        <nav class="pagination" role="navigation" aria-label="pagination">
          <button class="pagination-previous" title="This is the first page" disabled>ก่อนหน้า</button>
          <button class="pagination-next">หน้าถัดไป</button>
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
        statusSelected: ''
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
      let queryString = this.BUILDPARAM(this.local.queryString)
      service.getResource({resourceName, queryString})
        .then((res) => {
          if (res.status === 200) {
            this.local.items = res.data
          }
        })
        .catch(() => {
        })
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
    }
  }
}
</script>

<style lang="scss">
</style>
