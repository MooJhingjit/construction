<template>
  <section>
    <b-dropdown>
      <button class="button" slot="trigger">
        <b-icon icon="list"></b-icon>
        <!-- <span>เพิ่ม</span> -->
      </button>
      <section>
        <b-field :label="objInputs.label">
            <b-taginput
                :maxtags="objInputs.maxtags"
                v-model="local.tags"
                :data="local.filteredTags"
                autocomplete
                field="name"
                icon="search"
                :placeholder="objInputs.placeholder"
                @add="changeItems"
                @remove="changeItems"
                @typing="getFilteredTags">
                <template slot-scope="props">
                    <strong>{{props.option.name}}</strong>
                </template>
                <template slot="empty">
                    ไม่พบข้อมูล
                </template>
            </b-taginput>
        </b-field>
        <!-- <pre style="max-height: 400px"><b>Tags:</b>{{ local.tags }}</pre> -->
    </section>
    </b-dropdown>
  </section>
</template>

<script>
import service from '@Services/app-service'
export default {
  props: {
    objInputs: {
      type: Object,
      required: true
    },
    resourceName: {
      type: String,
      required: true
    },
    itemSelected: {
      type: Array,
      required: false
    }
  },
  data () {
    return {
      local: {
        data: [],
        filteredTags: [],
        isSelectOnly: false,
        tags: [],
        maxDefault: this.maxtags || 20
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
      let resourceName = this.resourceName
      let materialGroup = await service.getResource({resourceName, queryString: [this.BUILDPARAM({type: 'selection'})]})
      this.local.data = materialGroup.data
      this.getFilterResult()
    },
    getFilteredTags (text) {
      this.local.filteredTags = this.local.data.filter((option) => {
        return option.name.indexOf(text) >= 0
      })
    },
    changeItems () {
      let tagsArr = []
      this.local.tags.map(item => {
        tagsArr.push(item.id)
      })
      this.$emit('selected', tagsArr)
    },
    getFilterResult () {
      if (this.itemSelected === null || this.itemSelected === undefined) return []
      this.local.tags = this.local.data.filter(item => {
        return this.itemSelected.includes(item.id)
      })
    }
  },
  watch: {
    itemSelected () {
      this.getFilterResult()
    }
  }
}
</script>

<style scoped>
</style>
