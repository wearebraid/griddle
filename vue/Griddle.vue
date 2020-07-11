<template>
  <div
    v-if="visible"
    ref="griddle"
    class="griddle-container"
  >
    <div
      v-for="i in numberOfColumns"
      :key="i"
      class="griddle-column"
    />
  </div>
</template>

<script>
export default {
  data () {
    return {
      visible: false,
      showColumnNumbers: false,
      numberOfColumns: 0,
      tickInterval: null
    }
  },
  mounted () {
    window.addEventListener('keyup', (e) => {
      if (e.ctrlKey && e.shiftKey && e.which === 76) {
        this.visible = !this.visible

        if (this.visible) {
          this.$nextTick(() => { this.countColumns() })
          this.tickInterval = setInterval(() => {
            this.countColumns()
          }, 1000)
        } else {
          clearInterval(this.tickInterval)
        }
      }
    })
  },
  methods: {
    countColumns () {
      if (Object.keys(this.$refs).length && this.$refs.griddle) {
        this.numberOfColumns = getComputedStyle(this.$refs.griddle).gridTemplateColumns.split(' ').length
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/griddle';

.griddle-container {
  @include overlay();

  .griddle-column {
    background-color: rgba(red, 0.1);
  }
}
</style>
