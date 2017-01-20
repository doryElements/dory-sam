'use strict';
var gulp = require('gulp');

var browserSync = require('browser-sync');


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// LiveReload
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Watch Files For Changes & Reload
gulp.task('serve',   function () {
    // Proxy Server
    // -------------
    var url = require('url');
    var proxy = require('proxy-middleware');
    var proxyEsOpt = url.parse('http://localhost:9200/');
    proxyEsOpt.route = '/v1/';
    var proxyOptions = url.parse('http://localhost:8080/');
    proxyOptions.route = '/';
    var proxies = [ proxy(proxyEsOpt), proxy(proxyOptions)]; // ,

    // browserSync Server
    // ------------------
    browserSync({
        notify: true,
        // Run as an https by uncommenting 'https: true'
        // Note: this uses an unsigned certificate which on first access
        //       will present a certificate warning in the browser.
        // https: true,
        startPath: "/components/dory-sam/demo/index.html",
        ghostMode: false,
        server: {
            middleware: proxies,
            baseDir: ['./']
        //     directory: true
        }
    });
    gulp.watch("*.html").on('change', browserSync.reload);
});