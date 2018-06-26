<template>
    <div class="data-table">
      <div class="search-status">
        <div class="tags">
          <span :class="['tag', {'is-warning': local.statusSelected == item.key}]"
          :key="index" v-for="(item, index) in statusSearch"
          @click="filterByStatus(item.key)">{{item.title}}</span>
        </div>
      </div>
      <!-- <template v-if="isDemo">
        <div class="search-input control has-icons-left">
          <input class="input" type="text" placeholder="ค้นหาโครงการ">
          <span class="icon is-small is-left">
            <i class="fa fa-search" aria-hidden="true"></i>
          </span>
        </div>
        <div class="search-input control has-icons-left">
          <input class="input" type="text" placeholder="ค้นหา" value="LH120610029">
          <span class="icon is-small is-left">
            <i class="fa fa-search" aria-hidden="true"></i>
          </span>
        </div>
        <div class="search-input control has-icons-left">
          <input class="input" type="text" placeholder="ค้นหาแบบบ้าน">
          <span class="icon is-small is-left">
            <i class="fa fa-search" aria-hidden="true"></i>
          </span>
        </div>
      </template> -->
      <!-- <div class="search-input control has-icons-left">
        <input class="input" type="text" @input="searchByText()" v-model="local.textSearch" placeholder="ค้นหา">
        <span class="icon is-small is-left">
          <i class="fa fa-search" aria-hidden="true"></i>
        </span>
      </div> -->

      <div :key="index" class="search-input control has-icons-left" v-for="(item, index) in inputSearch">
        <input class="input" type="text" @input="searchByText()" v-model="local.textSearch[item.key]" :placeholder="item.placeholder">
        <span class="icon is-small is-left">
          <i :class="item.icon" aria-hidden="true"></i>
        </span>
      </div>

      <div class="search-results">
        <!-- <table v-if="isDemo" class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
          <thead>
            <tr>
              <th>เลขที่สัญญา</th>
              <th>ประเภท</th>
              <th>สถานะ</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>LH120610029</td>
              <td>ปกติ</td>
              <td><span class="tag is-link">รอสินค้า</span></td>
            </tr>
            <tr>
              <td>LH120610029</td>
              <td>พิเศษ</td>
              <td><span class="tag is-warning">รออนุมัติ</span></td>
            </tr>
            <tr>
              <td>LH120610026</td>
              <td>ปกติ</td>
              <td><span class="tag is-success">รับสินค้า</span></td>
            </tr>
          </tbody>
        </table> -->
        <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
          <thead>
              <tr>
                <th :key="index" v-for="(itemHeader, index) in local.items.header">{{itemHeader.name}}</th>
              </tr>
            </thead>
            <tbody>
              <tr :class="{'selected': itemBody.key == local.idSelected}" :key="index" v-for="(itemBody, index) in local.items.body" @dblclick="setDataSelected(itemBody.items)">
                <td :key="index" v-for="(item, index) in itemBody.show">
                  <template v-if="item == 'status' || item == 'order_type'">
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
    },
    isDemo: {
      type: Boolean,
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
        textSearch: {},
        statusSelected: '',
        limitRequest: 5,
        currentPage: 1,
        totalPage: 0,
        inputSearch: {
          all: [
            {key: 'main', placeholder: 'ค้นหา', icon: 'fa fa-search'}
          ],
          ordering: [
            {key: 'project', placeholder: 'โครงการ', icon: 'fa fa-search'},
            {key: 'house', placeholder: 'แบบบ้าน', icon: 'fa fa-search'},
            {key: 'plan', placeholder: 'แปลน', icon: 'fa fa-search'},
            {key: 'contract', placeholder: 'เลขที่สัญญา', icon: 'fa fa-search'},
          ]
        }
      }
    }
  },
  computed: {
    inputSearch() {
      let inputs = null
      switch(this.resourceName) {
        case '/ordering':
          inputs = this.local.inputSearch.ordering
          break
        default:
          inputs = this.local.inputSearch.all
      }
      
      return inputs
    }
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
    filterByStatus (key) {
      let item = []
      item['status'] = key
      this.local.statusSelected = key
      this.local.queryString['status'] = key
      this.fetchData()
    },
    setDataSelected (item) {
      this.$emit('selectedData', item)
    },
    searchByText () {
      for (let key in this.local.textSearch) {
        this.local.queryString[`${key}_search`] = this.local.textSearch[key]
      }
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
