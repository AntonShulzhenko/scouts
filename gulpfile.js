const gulp         = require('gulp');
const sass         = require('gulp-sass');
const postcss      = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const sourcemaps   = require('gulp-sourcemaps');
const include      = require('gulp-include');
const gutil        = require('gulp-util');
const plumber      = require('gulp-plumber');
const notify       = require('gulp-notify');
const cache        = require('gulp-cached');
const eslint       = require('gulp-eslint');
const sequence     = require('run-sequence');
const path         = require('path');
const del          = require('del');
const server       = require('browser-sync').create();
const imagemin     = require('gulp-imagemin');
const min          = require('gulp-clean-css');
const jade         = require('gulp-jade');

const errorHandler = (title) => plumber(
  title = 'Error',
  {
    errorHandler: notify.onError({
      title,
      message: '<%= error.message %>',
      sound: 'Submarine'
    })
  });


gulp.task('server', () => {
  server.init({
    server: {
      baseDir: ['public', 'src'],
      routes: {
        '/libs': 'node_modules'
      }
    },
    files: [
      'public/css/**/*.css',
      'public/js/**/*.js',
      'public/**/*.html'
    ],
    open: gutil.env.open !== false,
    ghostMode: false
  });
});


gulp.task('jade', () => {
  gulp.src('./src/*.jade')
  .pipe(errorHandler())
  .pipe(jade({
    pretty: true
  }))
  .pipe(gulp.dest('./public'));
});


gulp.task('styles', () => {
  return gulp
    .src('src/scss/**/*.scss')
    .pipe(errorHandler())
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([autoprefixer()]))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('public/css'));
});


const bundleScripts = (src) => {
  return gulp
    .src(src)
    .pipe(errorHandler())
    .pipe(sourcemaps.init())
    .pipe(include({
      includePaths: [
        path.join(__dirname, 'node_modules'),
        path.join(__dirname, 'src', 'js')
      ]
    }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('public/js'));
};


gulp.task('scripts:vendor', () => {
  return bundleScripts('src/js/vendor.js');
});


gulp.task('scripts:main', () => {
  return bundleScripts('src/js/main.js');
});


gulp.task('scripts', [
  'scripts:vendor',
  'scripts:main'
]);


gulp.task('lint', () => {
  return gulp
    .src([
      'src/js/**/*.js',
      '!src/js/vendor.js',
      '!node_modules/**'
    ])
    .pipe(errorHandler())
    .pipe(cache('lint'))
    .pipe(eslint())
    .pipe(eslint.format());
});


gulp.task('static:fonts', () => {
  return gulp
    .src([
      'node_modules/font-awesome/fonts/*.{woff2,woff}',
      'node_modules/bootstrap-sass/assets/fonts/bootstrap/*.{woff2,woff}',
      'src/fonts/**/*'
    ])
    .pipe(errorHandler())
    .pipe(gulp.dest('public/fonts'));
});


gulp.task('static:images', () => {
  return gulp
    .src('src/img/**/*.*')
    .pipe(errorHandler())
    .pipe(cache(imagemin({
      interlaced: true
    })))
    .pipe(gulp.dest('public/img'));
});


gulp.task('static', ['static:fonts', 'static:images'], () => {
  return gulp
    .src([
      'src/*.png', 'src/*.svg', 'src/*.json', 'src/*.xml'
    ])
    .pipe(errorHandler())
    .pipe(gulp.dest('public'));
});


gulp.task('clean', () => {
  return del('public').then((paths) => {
    gutil.log('Deleted:', gutil.colors.magenta(paths.join('\n')));
  });
});


gulp.task('build', (cb) => {
  sequence(
    'clean',
    'jade',
    'styles',
    'scripts',
    'lint',
    // 'templates',
    'static',
    cb
  );
});


gulp.task('watch', () => {
  gulp.watch('src/scss/**/*.scss', ['styles']);
  gulp.watch(['src/js/**/*.js', '!src/js/vendor.js'], ['scripts:main', 'lint']);
  gulp.watch('!src/js/vendor.js', ['scripts:vendor']);
  gulp.watch('src/**/*.jade', ['jade']);
});


gulp.task('default', () => {
  sequence(
    'build',
    'watch',
    'server'
  );
});
