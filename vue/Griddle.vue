<template>
  <div
    v-if="visible"
    ref="griddle"
    class="griddle-container"
    :data-column-numbers="columnNumbers"
    :data-column-borders="columnBorders"
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
  props: {
    columnNumbers: {
      type: Boolean,
      default: true
    },
    columnBorders: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      visible: false,
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

  &[data-column-numbers="true"] {
    counter-reset: columnCount;

    .griddle-column {
      position: relative;
      counter-increment: columnCount;

      &:before,
      &:after {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        color: red;
        opacity: 0.5;
        content: counter(columnCount);
      }

      &:before {
        top: 1em;
      }
      &:after {
        bottom: 1em;
      }
    }
  }

  &[data-column-borders="true"] {
    .griddle-column {
      box-shadow: inset 0 0 1px 0 red;
    }
  }
}
</style>
