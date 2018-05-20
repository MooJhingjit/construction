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
        <div class="close-panel" v-if="isShowPanel" @click="cancleForm"><i class="fa fa-times" aria-hidden="true"></i></div>
        <slot name="detail" v-if="isShowPanel"></slot>
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
    },
    isSelected: {
      type: [Number, String],
      required: false
    }
  },
  components: {
  },
  name: 'optionsDetailTemplate',
  data () {
    return {
      isSmallOptions: false,
      isShowPanel: false
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
  updated () {
    // this.setPanel()
  },
  methods: {
    expandOptionsPanel () {
      this.isSmallOptions = false
    },
    cancleForm () {
      this.$emit('cancleForm')
      this.isShowPanel = false
    },
    setPanel () {
      console.log(this.isShowPanel)
      if (this.isSelected !== null && this.isSelected !== '') {
        this.isShowPanel = true
      } else {
        this.isShowPanel = false
      }
    }
  },
  watch: {
    optionMinimize: function () {
      this.isSmallOptions = this.optionMinimize
    },
    isSelected: function () {
      this.setPanel()
    }
  }
}
</script>

<style lang="scss">
</style>
