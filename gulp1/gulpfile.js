var gulp = require('gulp');
var server = require('gulp-webserver');
var path = require('path');
var fs = require('fs');
var sass = require('gulp-sass');
var data = require('./meituan/data/data.json');
gulp.task('server', function () {
    gulp.src('meituan')
     .pipe(server({
         port:8989,
         open:true,
         middleware: function (req, res, next) {
            var pathname = require('url').parse(req.url).pathname;
            if (req.url === '/favicon.ico') {
                return;
            }
            pathname = pathname === '/' ? 'index.html' : pathname;
            if (pathname === '/api/dataList') {
                res.end(JSON.stringify(data));
            } else {
                res.end(fs.readFileSync(path.join(__dirname, 'meituan', pathname)))
            }
         }
     }))
})

