<template>
  <section :class="['section', this.templateObj.class]">
    <slot name="title"></slot>
    <div class="container-block">
      <div :class="{'options-panel':true, 'small': isSmallOptions}">
        <div class="container-block">
          <slot name="data-table"></slot>
        </div>
        <div class="expand">
          <i class="fa fa-expand" aria-hidden="true" @click="expandOptionsPanel()"></i>
        </div>
        <div class="container-block function">
          <slot name="function"></slot>
          <!-- <button class="button is-link">เพิ่มข้อมูล</button> -->
          <!-- <button class="button is-info">เพิ่มรายการสั่งซื้อใหม่</button> -->
          <!-- <button class="button is-danger">เพิ่มข้อมูล</button> -->
        </div>
      </div>
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
    },
    optionMinimize: {
      type: Boolean,
      required: false
    }
  },
  components: {
  },
  name: 'optionsDetailTemplate2',
  data () {
    return {
      isSmallOptions: false
    }
  },
  computed: {
    // getTemplateClass () {
    //   return this.templateObj.class
    // }
  },
  created () {
    // console.log('created')
    // this.property = 'Example property update.'
    // console.log('propertyComputed will update, as this.property is now reactive.')
  },
  methods: {
    expandOptionsPanel () {
      this.isSmallOptions = false
    }
  },
  watch: {
    optionMinimize: function () {
      this.isSmallOptions = this.optionMinimize
    }
  }
}
</script>

<style lang="scss">
</style>
