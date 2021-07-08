export default {
  props: {
    columnNumbers: {
      type: Boolean,
      default: true
    },
    columnBorders: {
      type: Boolean,
      default: true
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  render (h) {
    if (this.computedVisible) {
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
      internalVisible: false,
      numberOfColumns: 0,
      tickInterval: null
    }
  },
  computed: {
    computedVisible () {
      return this.visible || this.internalVisible
    }
  },
  watch: {
    visible: {
      immediate: true,
      handler () {
        this.internalVisible = this.visible
        this.renderGriddle()
      }
    }
  },
  mounted () {
    // add listener for grid toggle
    window.addEventListener('keyup', (e) => {
      if (e.ctrlKey && e.shiftKey && e.which === 76) {
        this.internalVisible = !this.internalVisible
        this.renderGriddle()
      }
    })

    // set CSS variable helper for getting document width
    // without scrollbars
    window.addEventListener('resize', () => {
      this.setScrollbarWidth()
    })
    this.setScrollbarWidth()
    this.setGriddleBooted()
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
    },
    setGriddleBooted () {
      const root = document.documentElement
      root.setAttribute('data-griddle-booted', true)
    },
    renderGriddle () {
      this.$emit('toggle', this.internalVisible)
      if (this.computedVisible) {
        this.$nextTick(() => { this.countColumns() })
        this.tickInterval = setInterval(() => {
          this.countColumns()
        }, 1000)
      } else {
        clearInterval(this.tickInterval)
      }
    }
  }
}
