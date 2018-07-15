<template>
  <button :class="btnClass" @click="clickEvent()">
    <i :class="btnIcon"></i>
    {{obj.title}}
  </button>
</template>

<script>
export default {
  props: {
    type: {
      type: [String],
      required: true
    },
    obj: {
      type: Object,
      required: false
    }
    // label: {
    //   type: String,
    //   required: false
    // }
  },
  data () {
    return {
    }
  },
  computed: {
    btnClass () {
      if (this.obj.color) {
        return [
          'button',
          this.obj.color
        ]
      } else {
        return [
          'button',
          {'is-danger': this.type === 'delete'},
          {'is-light ': this.type === 'link'},
          {'is-light': this.type === 'update'}
        ]
      }
    },
    btnIcon () {
      return [
        'fa',
        {'fa-trash': this.type === 'delete'},
        {'fa-external-link ': this.type === 'link'},
        {'fa-check': this.type === 'update'}
      ]
    }
  },
  methods: {
    clickEvent () {
      if (this.type === 'delete') {
        this.$dialog.confirm({
          message: 'ยืนยันการลบข้อมูล',
          cancelText: 'ยกเลิก',
          confirmText: 'ยืนยัน',
          type: 'is-danger',
          onConfirm: () => this.$emit('clickEvent')
        })
        return
      }
      if (this.obj.isConfirm) {
        this.$dialog.confirm({
          message: 'ยืนยันการทำรายการ',
          cancelText: 'ยกเลิก',
          confirmText: 'ยืนยัน',
          type: 'is-success',
          onConfirm: () => this.$emit('clickEvent')
        })
        return
      }
      this.$emit('clickEvent')
    }
  },
  watch: {
    // selected (val) {
    //   this.$emit('select', val)
    // },
    // arrInputs () {
    //   this.data = this.arrInputs
    // }
  }
}
</script>

<style scoped>
button > i{
  margin-right: 5px;
}
</style>
