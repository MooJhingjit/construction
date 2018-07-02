<template>
  <div :class="['modal', {'is-active': isActive}]"> <!-- is-active -->
    <div class="modal-background" @click="closeModel()"></div>
    <div class="modal-content">
      <slot></slot>
    </div>
    <!-- <button class="modal-close is-large" aria-label="close" @click="closeModel()"></button> -->
  </div>
</template>

<script>
export default {
  props: {
    // templateName: {
    //   type: String,
    //   required: true
    // }
  },
  components: {
  },
  name: 'Model',
  data () {
    return {
      isActive: false
    }
  },
  computed: {
    // propertyComputed() {
    //   console.log('I change when this.property changes.')
    //   return this.property
    // }
  },
  created () {
    // console.log('created')
    // this.property = 'Example property update.'
    // console.log('propertyComputed will update, as this.property is now reactive.')
  },
  methods: {
    closeModel () {
      this.isActive = false
    }
  }
}
</script>

<style lang="scss">
</style>
