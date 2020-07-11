// Vue plugin for Griddle 2
import '../assets/scss/griddle.scss'
import Griddle from './Griddle'

export default {
  install (Vue, options) {
    Vue.component('Griddle', Griddle)
  }
}
