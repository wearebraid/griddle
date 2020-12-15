const { resolve } = require('path')

const defaults = {
  columnWidth: '4.5em',
  gutterWidth: '2em',
  columns: 12,
  columnColor: 'red',
  breakpoints: [
    ['base', '0em', '1em'],
    ['xs', '23.5em', '1em'],
    ['s', '36em', '1.5em'],
    ['m', '48em', '2em'],
    ['l', '64em', '3em'],
    ['xl', '86.5em', '4em'],
    ['xxl', '100em', '6em']
  ]
}

export default function (moduleOptions) {
  // consolidate all module options
  const options = Object.assign({}, defaults, this.options.griddle, moduleOptions)

  // create scss overrides file for later inclusion
  this.addTemplate({
    src: resolve(__dirname, 'config.scss'),
    fileName: 'griddle_overrides.scss',
    options
  })

  // add a plugin that registers the Griddle component
  this.addPlugin({
    src: resolve(__dirname, 'plugin.js'),
    fileName: 'griddle.js',
    options
  })

  // ensure that plugin is transpiled
  this.options.build = this.options.build || {}
  this.options.build.transpile = this.options.build.transpile || []
  this.options.build.transpile.push('@braid/griddle')

  // add griddle overlay to global project css
  this.options.css = this.options.css || []
  this.options.css.push(resolve(__dirname, '../scss/griddle-overlay.scss'))

  // add griddle variables to styleResources
  if (!this.options.buildModules.includes('@nuxtjs/style-resources') && !this.options.modules.includes('@nuxtjs/style-resources')) {
    console.error('You must have @nuxtjs/style-resources installed as a buildModule in your nuxt project and the styleResources key added to your nuxt.config.js file: https://github.com/nuxt-community/style-resources-module')
  } else {
    this.options.styleResources = this.options.styleResources || {}
    this.options.styleResources.scss = this.options.styleResources.scss || []
    this.options.styleResources.scss.unshift('./.nuxt/griddle_overrides.scss') // ensure we add variables early
    this.options.styleResources.scss.push(resolve(__dirname, '../scss/griddle.scss'))
  }
}
