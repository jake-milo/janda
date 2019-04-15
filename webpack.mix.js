const mix = require('laravel-mix');

mix
    .react('resources/js/index.js', 'public/js/app.js')
    .copyDirectory('resources/img', 'public/img')
