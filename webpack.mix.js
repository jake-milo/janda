const mix = require("laravel-mix");

mix.react("resources/js/index.js", "public/js/app.js")
    .copyDirectory("resources/img", "public/img")
    .sass("resources/sass/login.scss", "public/css/login.css")
    .sourceMaps()
    .version()
    .options({
        hmrOptions: {
            host: "janda.test",
            port: "8000"
        }
    });
