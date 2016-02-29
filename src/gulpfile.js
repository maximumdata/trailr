var gulp = require('gulp'),
    sass = require('gulp-sass'),
    prefix = require('gulp-autoprefixer'),
    rename = require('gulp-rename'),
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


gulp.task('watch', function() {
  gulp.watch('./sass/*.**', ['sass']);
});

gulp.task('default', ['sass', 'watch']);
