var gulp = require('gulp'),
    sass = require('gulp-sass'),
    prefix = require('gulp-autoprefixer'),
    rename = require('gulp-rename'),
    coffee = require('gulp-coffee'),
    concat = require('gulp-concat');

gulp.task('sass', function() {
  return gulp.src('./sass/master.sass')
    .pipe(sass())
    .pipe(prefix({
      browsers : ["last 3 versions", "> 1%", "ie 8", "ie 7", "ie 6"]
    }))
    .pipe(rename('style.css'))
    .pipe(gulp.dest('../public/stylesheets/'));
});

gulp.task('js', function() {
  return gulp.src('./js/*.js')
    .pipe(gulp.dest('../public/js'));
});

gulp.task('coffee', function() {
  return gulp.src('./coffee/*.coffee')
    .pipe(coffee({bare: false}).on('error', function(err) { console.log(err); }))
    .pipe(gulp.dest('../public/js'));
});

gulp.task('watch', function() {
  gulp.watch('./sass/*.**', ['sass']);
  gulp.watch('./js/*.**', ['js']);
  gulp.watch('./coffee/*.coffee', ['coffee']);
});

gulp.task('default', ['sass', 'js', 'coffee', 'watch']);
