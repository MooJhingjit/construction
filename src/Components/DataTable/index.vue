<template>
    <div class="data-table">
      <div class="search-status">
        <div class="tags">
          <span :class="['tag', {'is-warning': local.statusSelected == item.key}]"
          :key="index" v-for="(item, index) in statusSearch"
          @click="filterByStatus(item.key)">{{item.title}}</span>
        </div>
      </div>
      <template v-for="(item, index) in inputSearch">
        <template v-if="item.inputType == 'auto'">
          <my-auto-complete
          :ref="`${item.key}_autoComplete`"
          :key="index"
          @select="objVal => autoCompleteSelected(objVal, item.key) "
          :arrInputs="local.autoCompleteSearch[item.key].inputs "
          :placeholder="item.placeholder"
          label=""
          ></my-auto-complete>
        </template>
        <template v-else>
          <div :key="index" class="search-input control has-icons-left">
            <input class="input" type="text" @input="searchByText()" v-model="local.textSearch[item.key]" :placeholder="item.placeholder">
            <span class="icon is-small is-left">
              <i :class="item.icon" aria-hidden="true"></i>
            </span>
          </div>
        </template>
      </template>
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
import myAutoComplete from '@Components/Form/my-autocomp'
import config from '@Config/app.config'
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
    myAutoComplete
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
        autoCompleteSearch: {
          project: {
            inputs: [],
            selected: null
          },
          house: {
            inputs: [],
            selected: null
          },
          plan: {
            inputs: [],
            selected: null
          },
          contract: {
            inputs: [],
            selected: null
          }
        },
        inputSearch: {
          all: [
            {key: 'main', placeholder: 'ค้นหา', icon: 'fa fa-search', inputType: 'input'}
          ],
          ordering: [
            {key: 'project', placeholder: 'โครงการ', icon: 'fa fa-search', inputType: 'auto'},
            {key: 'house', placeholder: 'แบบบ้าน', icon: 'fa fa-search', inputType: 'auto'},
            {key: 'plan', placeholder: 'แปลน', icon: 'fa fa-search', inputType: 'auto'},
            {key: 'contract', placeholder: 'เลขที่สัญญา', icon: 'fa fa-search', inputType: 'auto'}
          ]
        }
      }
    }
  },
  computed: {
    inputSearch () {
      let inputs = null
      switch (this.resourceName) {
        case '/ordering':
          this.getSearchResource(this.local.inputSearch.ordering)
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
    searchByText (directSearch = null) {
      if (directSearch !== null) {
        let key = 'main'
        this.local.textSearch[key] = directSearch.value
        this.local.queryString[`${key}_search`] = this.local.textSearch[key]
      } else {
        for (let key in this.local.textSearch) {
          this.local.queryString[`${key}_search`] = this.local.textSearch[key]
        }
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
    },
    autoCompleteSelected (objSelected, key) {
      this.local.textSearch[key] = objSelected.key
      this.clearAutoCompleteValue(key)
      this.searchByText()
    },
    clearAutoCompleteValue (key) {
      switch (key) {
        case 'project':
          // xxxxxx
          break
        case 'house':
          // xxxxxx
          break
        case 'plan':
          // xxxxxx
          break
        case 'contract':
          // let refName = `${key}`
          // this.$refs.contract_autoComplete.name = null
          // xxxxxx
          break
      }
    },
    async getSearchResource (inputArr) {
      let queryString = []
      let resourceName = ''
      inputArr.map(async (item) => {
        resourceName = config.api[item.key].dropdown
        let res = await service.getResource({resourceName: resourceName, queryString})
        this.local.autoCompleteSearch[item.key].inputs = res.data
      })
    }
  }
}
</script>

<style lang="scss">
</style>
