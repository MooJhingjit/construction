<template>
  <section :class="['section', this.templateObj.class]">
    <slot name="title"></slot>
    <div class="container-block">
      <div class="detail-panel">
        <slot name="detail"></slot>
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
  name: 'detailTemplate',
  data () {
    return {
    }
  },
  computed: {
  },
  created () {
  },
  methods: {
  },
  watch: {
  }
}
</script>

<style lang="scss">
</style>
