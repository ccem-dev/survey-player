(function() {

  var baseDir = __dirname + '/app/index.html';

  var gulp = require('gulp');
  var browserSync = require('browser-sync').create();
  var browserSyncSpa = require('browser-sync-middleware-spa');
  var sonar = require('gulp-sonar');
  var bump = require('gulp-bump');
  var packageJson = require('./package.json');
  var useref = require('gulp-useref');
  var gulpif = require('gulp-if');
  var uglify = require("gulp-uglify");
  var minifyCss = require('gulp-minify-css');
  var embedTemplates = require('gulp-angular-embed-templates');
  var babel = require('gulp-babel');
  gulp.task('compress', function() {
    return gulp.src('app/index.html',{allowEmpty: true})
      .pipe(useref({
        transformPath: function(filePath) {
          return filePath.replace('app/', '');
        }
      }))
      .pipe(gulpif('*.js',
        babel({
          presets: ['es2015']
        })
      ))
      // .pipe(gulpif('*.js', embedTemplates({
      //   basePath: __dirname + '/'
      // })))
      .pipe(gulpif('*.js', uglify()))
      .pipe(gulpif('*.css', minifyCss()))
      .pipe(gulp.dest('dist/survey-player/'));
  });

  gulp.task('browser-sync', function() {
    browserSync.init({
      server: {
        open: 'external',
        baseDir: '../',
        middleware: [
          //browserSyncSpa(/^[^\.]+$/, baseDir),

          function(req, res, next) {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Headers', '*');
            next();
          }
        ]
      },
      startPath: 'survey-player/app'
    });

    gulp.watch([
      'app/**/*.html',
      'app/**/*.js',
      'app/**/*.json',
      'app/**/*.css'
    ]).on('change', browserSync.reload);
  });

  gulp.task('upgrade-version', function(value) {
    gulp.src('./package.json')
      .pipe(bump({
        version: process.env.npm_config_value
      }))
      .pipe(gulp.dest('./'));
  });

  gulp.task('sonar', function() {
    var options = {
      sonar: {
        host: {
          url: process.env.npm_config_sonarUrl,
        },
        login: process.env.npm_config_sonarDatabaseUsername,
        password: process.env.npm_config_sonarDatabasePassword,
        projectKey: 'sonar:survey-player',
        projectName: 'survey-player',
        projectVersion: packageJson.version,
        sources: 'app',
        language: 'js',
        sourceEncoding: 'UTF-8',
        exec: {
          maxBuffer: 1024 * 1024
        },
        javascript: {
          lcov: {
            reportPath: 'target/test-coverage/report-lcov/lcov.info'
          }
        }
      }
    };

    return gulp.src('thisFileDoesNotExist.js', {
      read: false
    })
      .pipe(sonar(options));
  });


}());
