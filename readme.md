# 🍳 Griddle - Cook up something delicious.

Griddle is a system of Sass functions and mixins with an accompanying visual grid overlay to help you be exact with your front-end development.

The goal of the system is to assist front-end engineers in executing a 1:1 implementation of referenced designs. This is done through a visual grid overlay that is toggleable in the browser and an accompanying set of `.scss` mixins and functions that place items precisely on the grid.

![Griddle Example](https://assets.wearebraid.com/griddle/braid-grid.mov.gif "Griddle on https://www.wearebraid.com")

## 📋 Table of Contents
- [Why does Griddle exist?](#why-does-griddle-exist)
- [Who is Griddle for?](#who-is-griddle-for)
- [Who is Griddle not for?](#who-is-griddle-not-for)
- [Real projects made with Griddle](#real-projects-made-with-griddle)
- [Installation](#installation)
  - [Nuxt](#nuxt)
  - [Vue](#vue)
  - [Other frameworks?](#other-frameworks)
- [Customization](#customization)
- [Usage](#usage)
  - [`container()`](#container)
  - [`span()`](#span)
  - [`bleed()`](#bleed)
  - [`bp()`](#bp)
  - [the `max-body` breakpoint](#the-max-body-breakpoint)
- [Questions / Issues / Pull Requests](#questions--issues--pull-requests)

## <a name="why-does-griddle-exist"></a> 🤔 Why does Griddle exist?
[Details Matter: Add a Visual Grid System to your Front-end Development Process](https://www.wearebraid.com/articles/add-visual-grid)

## <a name="who-is-griddle-for"></a> 🙂 Who is Griddle for?
Griddle is for front-end engineers who prefer to do their layout work via "rules inside of stylesheets" rather than "classes inside of HTML templates". If you prefer for all of your layout work to occur inside of your project styles then Griddle is for you. With a visual overlay that that perfectly matches your design file grid and a set of tools that help you place elements in exactly the right place, Griddle is like being able to see for the first time.

## <a name="who-is-griddle-not-for"></a> 🙃 Who is Griddle not for?
If you're married to Bootstrap's class system or a utility framework such as Tailwind — then this approach will take some adjustments to your mental model. Griddle assumes that you're comfortable writing your own styles and creating the sturcture neccessary for your project beyond adhering layout items precisely to your project grid.

## <a name="real-projects-made-with-griddle"></a> 🔥 Real projects made with Griddle
use `control + shift + L` to show the Griddle overlay in the browser on these projects. Note that each project represents a different grid configuration that was derived from that project's design file.

- [Braid](https://www.wearebraid.com) - Digital Agency, creator of Griddle.
- [UVA Mcintire School of Commerce](https://www.commerce.virginia.edu) - The McIntire School of Commerce at the University of Virginia.
- [Outdoor Dreams](https://www.outdoordreamsva.com) - Bespoke outdoor rooms.
- [All Source Pregnancy](https://www.allsourcepregnancy.com) - Well-researched and understandable information about pregnancy.
- [Cosaic](https://cosaic.io) - Industry-leading financial software.
- [Gardenary](https://www.gardenary.com) - Garden Coaching and education.
- [Sidecar](https://sidecar.work) - On-demand project and office adminstration.

## Installation
### Nuxt
#### Install packages
```bash
npm install @braid/griddle @nuxtjs/style-resources
```

Installing Griddle in your nuxt project with the included module is the easiest way to get started.
In your `nuxt.config.js` file include the provided module in your `buildModules` property and then optionally configure options with the `griddle` property.

#### configure nuxt.config.js

```javascript
// nuxt.config.js
{
  buildModules: [
    '@braid/griddle/dist/nuxt',
    '@nuxtjs/style-resources' // required to automatically provide griddle mixins to each component in your project
  ],
  // optionally configure arguments. Here are the defaults
  griddle: {
    debug: false, // outputs some helpful console logs on Nuxt build,
    overridesPath: false, // provide a path to your own overrides .scss file
    // use the same format you would for styleResources paths eg ('./assets/scss/griddle.scss')
    // if not using `overridesPath` then use the inline options here:
    columnWidth: '4.5em',
    gutterWidth: '2em',
    columns: 12,
    columnColor: 'red',
    breakpoints: [
      // each breakpoint consists of 3 items:
      // 1.) name,
      // 2.) breakpoint width
      // 3.) Minimum inset from edge of screen
      ['base', '0em', '1em'],
      ['xs', '23.5em', '1em'],
      ['s', '36em', '1.5em'],
      ['m', '48em', '2em'],
      ['l', '64em', '3em'],
      ['xl', '86.5em', '4em'],
      ['xxl', '100em', '6em']
    ]
  }
}
```
#### Should I use `overridesPath` or the inline options?
It depends. I've run into issues with some deployment processes where the dynamically generated griddle overrides file from the nuxt.config.js options has failed to load - namely on Heroku. In general using the `overridesPath` option seems the most reliable and the inline options are available for those who wish to use them.

If you are supplying your own file, use the [customization options](#customization) to get started.

#### add the Griddle component to your default nuxt project layout
Next, place the `<Griddle />` component in your project. We recommend placing the component at the root layout because it consists entirely of a fixed position grid overlay. The Griddle `.scss` mixins will work without the overlay, but it's sort of the key point. 😉

```html
<!-- in your project root layout -->
<template>
  ...
  <Griddle />
</template>
```

### Vue
```bash
npm install @braid/griddle
```

First, import and register the Griddle component

```javascript
/* Example in project setup file */
import Vue from 'vue'
import { VueGriddle } from '@braid/griddle'

Vue.component('Griddle', VueGriddle)
```

and place the `<Griddle />` component in your project. We recommend placing the component at the root layout because it consists entirely of a fixed position grid overlay. The Griddle `.scss` mixins will work without the overlay, but it's sort of the key point. 😉

```html
<!-- in your project root layout -->
<template>
  ...
  <Griddle />
</template>
```

Second, you need to add the Griddle `.scss` mixins to your project. The exact method to do this may differ depending on your specific build process. Here is an example using a `vue.config.js` from a Vue CLI 3 project. First add the variables, functions, and mixins to every `.scss` style block in your project by registering them as part of the Sass loader:

```js
/* in vue.config.js */
module.exports = {
  css: {
    loaderOptions: {
      sass: {
        // An overrides file should be included in your build process
        // before griddle.scss if you wish to override default settings
        // these files should only include variables and mixins, not styles
        // as they will be added to every component that uses SCSS.

        // sass-loader less than v9.0
        data: `
          @import "@/assets/griddle-overrides.scss";
          @import "@braid/griddle/scss/griddle.scss";
        `,

        // sass-loader v9.0+
        additionalData: `
          @import "@/assets/griddle-overrides.scss";
          @import "@braid/griddle/scss/griddle.scss";
        `
      }
    }
  }
}
```
Then include the visual overlay styles by including them in your `.scss` files that become part of your global stylesheet. `griddle-overlay.scss` should _not_ be imported into every component because it actually outputs style classes which should only be done once in your project.

```scss
/* in your own global SCSS file */
// default griddle overlay styles
@import "@braid/griddle/scss/griddle-overlay.scss";
```

### Other Frameworks?
Griddle is 99% the `.scss` mixins represented in this repo. Pull Requests are welcome for other frameworks if you would like to include Griddle in your specific workflow.

## Customization

You can change the settings for Griddle by including your own `griddle-overrides.scss` file (call it whatever you want) and loading it into your `.scss` _before_ the main `griddle.scss` is included. Your overrides file will take precedence over the default values.

Griddle is intended to match your design file’s grid settings as closely as possible. Use the available column and gutter sizes along with the column count from your design program to set up your project.

Here are the default settings that can be overridden in your `griddle-overrides.scss`. Feel free to copy them to your own overrides file as a starting point.

### As of version 2.0 all breakpoint values must be provided in `em` values.
Why? because [`em` values allow for proportional website scaling](https://www.wearebraid.com/articles/proportional-website-scaling) and there
is internal math in Griddle being done with `em` values. Sass does not allow mixed value math (eg. 100px - 1em) so `em` values must be used for variable declarations. Once you declare them though, you'll use the names so its only truly applicable in the variable declarations file.

I recommend a base font size of `16px` in your project but you do you.

```scss
$g-max-column-width: 4.5em !default; // 72px
$g-max-gutter-width: 2em !default; // 32px
$g-column-count: 12 !default;
$g-column-color: red !default; // fill color will be used at 10% opacity

$g-user-breakpoints:
  // each breakpoint consists of 3 items:
  // 1.) name,
  // 2.) breakpoint width
  // 3.) Minimum inset from edge of screen
  'base' 0em 1em, // the base breakpoint is required
  'xs' 23.5em 1em, // 376px
  's' 36em 1.5em, // 576px
  'm' 48em 2em, // 768px
  'l' 64em 3em, // 1024px
  'xl' 86.5em 4em, // 1384px
  'xxl' 100em 6em // 1600px
!default;
```

## Usage

### In Browser
Press `control + shift + L` (think "Layout") to toggle the visual grid overlay. At 100% zoom your grid in the browser should perfectly match your grid in you target design file.

### In Code

**Quick Links**
- [`container()`](#container)
- [`span()`](#span)
- [`bleed()`](#bleed)
- [`bp()`](#bp)
- [the `max-body` breakpoint](#the-max-body-breakpoint)

### `container()`
a `container()` mixin sets up the responsive styles needed to create a grid container element. This element should consist of 100% of the available viewport width and must surround any `span()` mixins in order for them to be aligned to the grid.

```html
<!-- example Vue component -->
<template>
  <div class="container">
    ...
  </div>
</template>

<style lang="scss" scoped>
.container {
  @include container();
}
</style>
```

### `span()`
a `span()` function calculates a percentage width based on its given arguments. The `span()` function always returns a `%` value. The `span()` function takes 3 arguments which will each be explained in further detail:

- `columns`: (required) The number of columns you wish to span, including interior gutters.
- `extra_gutters`: (optional) The number of extra gutters you wish to span.
- `context`: (optional) The context for width calculations. Defaults to 100% which is the full grid width.

The simplest usage of the `span()` function is to specify only a number of `columns` to be spanned.
```scss
.my-element {
  width: span(4); // 31.57895% assuming a 12-column grid
}
```
![span(4)](./assets/img/span-4.jpg)


If you need to span across any `extra_gutters` you can pass those as a 2nd argument to the function.
```scss
.my-element {
  width: span(4, 1); // 34.21053%; assuming a 12-column grid
}
```
![span(4, 1)](./assets/img/span-4-1.jpg)


Lastly, you may be trying to style an element that's nested inside of a parent element that already has `span()` styles applied to it. In this case, if you provide the parent `context` as a 3rd argument the `span()` function will return _root_ `column` and `gutter` values
```scss
.my-element {
  width: span(4); // 31.57895% assuming a 12-column grid

  img {
    width: span(2, 0, span(4)); // 45.83333% assuming a 12-column grid
    // PRO TIP!
    // the second argument in span() is flexible. If you don’t need any
    // extra gutters you can pass a span() context as the 2nd argument
    // and it will be resolved.
    // "span(2, 0, span(4))" is the same as "span(2, span(4))"
  }
}
```
![span() with context](./assets/img/context.jpg)

Do you need to push or pull an element by a number of columns? Since the `span()` function always returns a percent you can use it in other properties all well. To push and pull I recommend `margin-left`.

```scss
.my-element {
  width: span(4); // 31.57895% assuming a 12-column grid
  margin-left: span(4, 1); // 34.21053% assuming a 12-column grid

  img {
    width: span(2, span(4)); // 45.83333% assuming a 12-column grid
    // note that "span(2, span(4))" is the same as "span(2, 0, span(4))"
  }
}
```
![span() being pushed with margin](./assets/img/push.jpg)

### `bleed()`
a `bleed()` mixin outputs all of the responsive styles needed to take a `span()` aligned element to the edge of the screen, beyond the edge of the `container()`. The `bleed()` mixin assumes that you have used `span()` to align your element properly to the edge of the container. `bleed()` takes 2 arguments `direction` and `start-at`.

- `direction`: (required) The direction you would like the element to bleed. Valid options are `left`, `right`, `both`, `left-full`, `right-full` and `both-full`. The `-full` variations will always persist to the edge of the viewport assuming that your element is aligned to one edge of a full grid-width container. The non `-full` variations will use the provided `offset` value of a given breakpoint as their maximum bleed distance.
- `start-at`: (optional, defaults to `base`) The string name of the breakpoint you would like the bleed effect to start at.
- `end-at`: (optional, defaults to `false`) The string name of the breakpoint you would like the bleed effect to end at.

By including the `bleed()` we can easily break `span()` items out of `containers()`:
```scss
.my-element {
  @include bleed('right-full', base);

  width: span(4); // 31.57895% assuming a 12-column grid
  margin-left: span(8, 1); // 68.42105% assuming a 12-column grid
}
```
![bleed(right) example](./assets/img/bleed.jpg)

If you want to limit the bleed effect to a range of breakpoint widths — or you need to change the type of bleed across breakpoints — then you can include the mixin multiple times with different arguments.

```scss
.my-element {
  @include bleed('both', base, m);
  @include bleed('left', m);

  @media (bp(m)) {
    width: span(6);
  }
}
```

### `bp()`
a `bp()` returns the width value of a given breakpoint name. It is most useful for creating media queries tied to the named breakpoints in your Griddle configuration.

- `name`: The name of the breakpoint from which you would like to retrieve a width.

```scss
.my-element {
  width: span(12); // 100% assuming a 12-column grid

  @media (min-width: bp(m)) {
    width: span(6); // 48.68421% assuming a 12-column grid
  }
  @media (min-width: bp(l)) {
    width: span(4); // 31.57895% assuming a 12-column-grid
  }
}
```

When using Griddle you are not constrained to the breakpoints defined in your Griddle configuration settings. If you happen to have need for a one-off breakpoint here or there, go for it!

```scss
.my-special-element {
  width: span(12); // 100% assuming a 12-column grid

  @media (min-width: 50.875em) { // 814px
    // fixes that one visual bug at a specific width or something.
    // use your imagination.
  }
}
```

#### the `max-body` breakpoint

There's one extra trick Griddle has up its sleeves when it comes to breakpoints. Whether you use the defaults or define your own, Griddle always inserts one magic breakpoint called `max-body`.

The `max-body` breakpoint is the minimum width at which your `container()` element and any defined inset spacing can show at their maximum possible widths. It is at this exact breakpoint value that the Griddle grid system forces a switch to `auto` for your `container()` mixin’s left and right margin.

it's strongly recommended that all of your user-defined breakpoints have `px` or `em` insets defined. **Let Griddle take care of calculating the switch to `auto` inset for you.**

The formula for the `max-body` breakpoint is roughly this:

`$max-body = $max-container-width + ($previous-breakpoint-inset * 2)`

## Questions / Issues / Pull Requests
We've been using Griddle internally for a while now and we're happy to see it in use by others. All questions, issues, and pull requests are welcome on this repo.
