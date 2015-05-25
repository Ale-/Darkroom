var gulp = require('gulp');
var gutil = require('gulp-util');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var pandoc = require('gulp-pandoc');
var livereload = require('gulp-livereload');
var jeditor = require('gulp-json-editor');
var symlink = require('gulp-symlink');

//Projects folder

var projects = './projects/';

/**
 * Sets 'watch' as Gulp's default task
 */

gulp.task('default', ['watch']);


/**
 * Create a new project in projects folder
 */

gulp.task('create', function()
{
  var name = gutil.env.n;  

  //Copy the template to the specified folder
  if(name == undefined) 
    return new Error('You must specify a name for your project.');

  gulp.src('./template/**').pipe( gulp.dest(projects + name) );
  
  gulp.src('./revealjs').pipe( symlink(projects + name + '/revealjs') ); 

  //Update index.json with the new project
  gulp.src("./index.json")
    .pipe( jeditor( function(json) {
        json.items.push( {
            "name" : "<a href='./projects/" + gutil.env.n + "'>"+ gutil.env.n + "</a>",
            "thumbnail" : "./projects/" + gutil.env.n + "/imgs/thumbnail.png", 
            "description" : "",
            "date" : ""
        });
        return json;
    }))
    .pipe(gulp.dest("./"));
});


/**
 * Compiles data
 */

gulp.task('compile', function() {
  if(gutil.env.n == undefined) 
    return;
  var folder = projects + gutil.env.n;
  gulp.src(folder + '/index.md')
    .pipe( pandoc ({
        from: 'markdown',
        to: 'html5',
        ext: '.html',
        args: [ '--template=' + folder + '/template.html', '--standalone', '--section-divs' ]
    }))
    .pipe( gulp.dest( folder ))
    .pipe( livereload ());
});


/**
 * Compiles sass
 */

gulp.task('sass', function() 
{
  if(gutil.env.n == undefined) { return; }
  var folder = projects + gutil.env.n + '/style/';
  gulp.src(folder + 'style.sass')
    .pipe( sass({ indentedSyntax: 'true' }) )
    .pipe( rename({ extname: '.css' }) )
    .pipe( gulp.dest(folder) )
    .pipe( livereload ());
});


/**
 * Watches changes
 */

gulp.task('watch', function() {
  if(gutil.env.n == undefined) 
    return;
  var sass = projects + gutil.env.n + '/style/style.sass';
  var data = projects + gutil.env.n + '/index.md';
  gulp.watch(data, ['compile']);
  livereload.listen();
});
