<template>
  <div ref="receipt" class="receipt">
    {{local.storeName}}
  </div>
</template>

<script>
export default {
  props: {
    dataObj: {
      type: Object,
      required: true
    }
  },
  components: {
  },
  name: 'UserPage',
  data () {
    return {
      local: {}
    }
  },
  computed: {
  },
  created () {
    this.local = this.dataObj
  },
  methods: {
    getHtm () {
      return this.$refs.receipt
    }
  },
  watch: {
    dataObj () {
      this.local = this.dataObj
      console.log(this.local.storeName)
    }
  }
}
</script>

<style lang="scss" scoped>
  p{
    color: green;
  }
</style>
