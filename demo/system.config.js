(function (global) {
    System.config({
        paths: {
            'npm:': '../node_modules/'
        },

        map: {
            app: './demo',
            'src': './src',
            'lodash': 'npm:lodash',

            '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
            '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
            '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
            '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
            '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
            '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
            '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
            '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
            '@angular2-material/core': 'npm:@angular2-material/core/core.umd.js',
            '@angular2-material/slider': 'npm:@angular2-material/slider/slider.umd.js',

            'rxjs': 'npm:rxjs'
        },

        packages: {
            app: {
                main: './main.js',
                defaultExtension: 'js'
            },
            src: {
                main: './index.js',
                defaultExtension: 'js'
            },
            lodash: {
                main: './lodash.js',
                defaultExtension: 'js',
            },
            rxjs: {
                defaultExtension: 'js'
            }
        }
    });
})(this);