var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var pandoc = require('gulp-pandoc');


gulp.task('default', ['sass']);

gulp.task('create', function() 
{
  if(gutil.env.n == undefined) return;
  gulp.src('./template/*')
    .pipe(gulp.dest('./slideshows/' + gutil.env.n));
});

gulp.task('compile', function() 
{
  if(gutil.env.n == undefined) return;
  var folder = './slideshows/' + gutil.env.n;
  gulp.src(folder + '/index.md')
    .pipe( pandoc ({
        from: 'markdown',
        to: 'html5',
        ext: '.html',
        args: [ '--template=' + folder + '/template.html', '--standalone', '--section-divs' ]
    }))
    .pipe( gulp.dest( folder ))
});

gulp.task('sass', function(done) 
{
  if(gutil.env.n == undefined) return;
  var folder = './slideshows/' + gutil.env.n + '/style/';
  gulp.src(folder + 'style.sass')
    .pipe(sass())
    .pipe(gulp.dest(folder))
    .pipe(minifyCss({
        keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .on('end', done);
});

gulp.task('watchdata', function() {
  if(gutil.env.n == undefined) return;
  var data = './slideshows/' + gutil.env.n + '/index.md';
  gulp.watch(data, ['compile']);
});

gulp.task('watchsass', function() {
  if(gutil.env.n == undefined) return;
  var sass = './slideshows/' + gutil.env.n + '/style/style.sass';
  gulp.watch(sass, ['sass']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});
