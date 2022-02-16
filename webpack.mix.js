const mix = require('laravel-mix')
const path = require('path')

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix
  .js('resources/js/app.js', 'public/js')
  .react()
  .alias({ '@': path.resolve('resources/js') })
  .postCss('resources/css/app.css', 'public/css', [require('tailwindcss')])

if (!mix.inProduction()) {
  mix.browserSync(process.env.APP_URL).disableSuccessNotifications()
}
