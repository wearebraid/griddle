const{resolve:resolve}=require("path"),defaults={columnWidth:"4.5em",gutterWidth:"2em",columns:12,columnColor:"red",breakpoints:[["base","0em","1em"],["xs","23.5em","1em"],["s","36em","1.5em"],["m","48em","2em"],["l","64em","3em"],["xl","86.5em","4em"],["xxl","100em","6em"]]};export default function(s){const e=Object.assign({},defaults,this.options.griddle,s);this.addTemplate({src:resolve(__dirname,"config.scss"),fileName:"griddle_overrides.scss",options:e}),this.addPlugin({src:resolve(__dirname,"plugin.js"),fileName:"griddle.js",options:e}),this.options.build=this.options.build||{},this.options.build.transpile=this.options.build.transpile||[],this.options.build.transpile.push("@braid/griddle"),this.options.css=this.options.css||[],this.options.css.push(resolve(__dirname,"../scss/griddle-overlay.scss")),this.options.buildModules.includes("@nuxtjs/style-resources")||this.options.modules.includes("@nuxtjs/style-resources")?(this.options.styleResources=this.options.styleResources||{},this.options.styleResources.scss=this.options.styleResources.scss||[],this.options.styleResources.scss.unshift("./.nuxt/griddle_overrides.scss"),this.options.styleResources.scss.push(resolve(__dirname,"../scss/griddle.scss"))):console.error("You must have @nuxtjs/style-resources installed as a buildModule in your nuxt project and the styleResources key added to your nuxt.config.js file: https://github.com/nuxt-community/style-resources-module")};