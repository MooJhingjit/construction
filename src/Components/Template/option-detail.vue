<template>
  <section :class="['section', this.templateObj.class]">
    <slot name="title"></slot>
    <div class="container-block search-options">
      <div :class="{'options-panel':true, 'small': isHideMenu}">
        <div class="container-block">
          <slot name="data-table"></slot>
          <span class="container-block hide-menu">
            <i class="block fa fa-chevron-circle-left" aria-hidden="true" @click="hideMenu()"></i>
          </span>
        </div>
        <div class="expand">
          <i class="fa fa-chevron-circle-right" aria-hidden="true" @click="showMenu()"></i>
        </div>
        <div class="container-block function">
          <slot name="function"></slot>
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
    // optionMinimize: {
    //   type: Boolean,
    //   required: false
    // },
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
      isHideMenu: false,
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
    hideMenu () {
      this.isHideMenu = true
    },
    showMenu () {
      this.isHideMenu = false
    },
    cancleForm () {
      this.$emit('cancleForm')
      this.isShowPanel = false
    },
    setPanel () {
      if (this.isSelected !== null && this.isSelected !== '') {
        this.isShowPanel = true
      } else {
        this.isShowPanel = false
      }
    }
  },
  watch: {
    isSelected: function () {
      this.setPanel()
    }
  }
}
</script>

<style lang="scss" scoped>
.hide-menu{
  justify-content: center;
  // align-items: center;
  color: #fff;
  font-size: 1.6em;
  // margin-bottom: 5px;
  margin-left: 5px;
  cursor: pointer;
  i{
    // margin-top: 5px;
  }
}
.function {
  margin-right: 22px;
}
.expand{
  cursor: pointer;
  text-align: center;
  color: #fff;
  display: none;
  i{
    font-size: 1.5em;
  }
}
</style>
