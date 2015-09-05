var gulp = require('gulp'),                       //基础库
    sass = require('gulp-sass'),                  //sass
    rename = require('gulp-rename'),              //重命命名
    concat = require('gulp-concat'),              //合并文件
    uglify = require('gulp-uglify'),              //js压缩
    watch = require('gulp-watch'),                //监听
    autoprefixer = require('gulp-autoprefixer'),  //添加浏览器特性
    minify = require('gulp-minify-css'),          //css压缩
    clean = require('gulp-clean'),                //清空文件夹
    tinylr = require('tiny-lr'),                  //livereload
    server = tinylr(),
    port = 35353,
    livereload = require('gulp-livereload');      //livereload

gulp.task('sass', function() {  
  var cssSrc = './develop/scss/**/*.scss';
  var cssDst = './dist/css';
  gulp.src(cssSrc)
    .pipe(sass().on('error', sass.logError))
    .pipe(rename({ suffix: '.min' }))
    .pipe(minify())
    .pipe(livereload(server))
    .pipe(gulp.dest(cssDst))
});

gulp.task('html', function() {
  var htmlSrc = './develop/html/**/**.html';
  var htmlDst = './dist/html';
  gulp.src(htmlSrc)
    .pipe(livereload(server))
    .pipe(gulp.dest(htmlDst));
});


gulp.task('default', function() {
  server.listen(port, function(err) {
    if(err) {
      return console.log(err);
    }
    
    gulp.watch('./develop/html/**/*.html', function() {
      console.log('run html');
      gulp.run('html');
    });
    
    gulp.watch('./develop/scss/**/*.scss', function() {
      console.log('run sass');
      gulp.run('sass');
    });
    
  });
});

































