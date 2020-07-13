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
  render (h) {
    if (this.visible) {
      return h('div',
        {
          ref: 'griddle',
          class: ['griddle-container'],
          attrs: {
            'data-column-numbers': this.columnNumbers,
            'data-column-borders': this.columnBorders
          }
        },
        (new Array(this.numberOfColumns).fill('').map((col, index) => {
          return h('div',
            {
              key: index,
              class: ['griddle-column']
            }
          )
        }))
      )
    }
    return null
  },
  data () {
    return {
      visible: false,
      numberOfColumns: 0,
      tickInterval: null
    }
  },
  mounted () {
    // add listener for grid toggle
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

    // set CSS variable helper for getting document width
    // without scrollbars
    window.addEventListener('resize', () => {
      this.setScrollbarWidth()
    })
    this.setScrollbarWidth()
  },
  methods: {
    countColumns () {
      if (Object.keys(this.$refs).length && this.$refs.griddle) {
        this.numberOfColumns = getComputedStyle(this.$refs.griddle).gridTemplateColumns.split(' ').length
      }
    },
    setScrollbarWidth () {
      const root = document.documentElement
      root.style.setProperty('--scrollbar-width', (window.innerWidth - document.documentElement.clientWidth) + 'px')
    }
  }
}
