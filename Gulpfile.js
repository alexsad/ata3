var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var ts = require('gulp-typescript');
var rimraf = require('rimraf');
var replace = require('gulp-replace');
var runSequence = require('run-sequence');
var connect = require('gulp-connect');
var superviewsjs = require('gulp-superviewsjs');
var bower = require('gulp-bower');
var proxy = require('http-proxy-middleware');

var projectName = "ata";
var projectVersion = "3.0";
var rootPath = ".";

var appSourcePath = rootPath+"/src/br";
var appDestPathView = rootPath+"/public";
var appDestPathServer = rootPath+"/app";

var destPackagePathAppView = appDestPathView+"/js/br";
var destPackagePathFullView = destPackagePathAppView+"/"+projectName;
//var destPackagePathServer = appDestPathServer+"/"+projectName;
var compileVersion = projectName.toUpperCase()+"-"+projectVersion+"_"+new Date().getTime();


gulp.task('clear_dest_view', function (cb) {
  rimraf(destPackagePathAppView, cb);
});
gulp.task('clear_dest_server', function (cb) {
  rimraf(appDestPathServer+"/br", cb);
});
gulp.task('clear_view_lib', function (cb) {
  rimraf(rootPath+"/bower_components/underas", cb);
});

gulp.task('bower-install', function() {
  return bower();
});


gulp.task('copy_view_assets',function(){
    return gulp.src(
    [
        appSourcePath+"/**/assets/css/*.css"
        ,appSourcePath+"/**/assets/img/*.*"
        ,appSourcePath+"/**/assets/html/*.html"
    ])
    .pipe(gulp.dest(destPackagePathAppView));
});

gulp.task('copy_view_lib',function(){
    var bower_path_libs = rootPath+"/bower_components/";
    //'!'+bower_path_libs+"/underas"
    return gulp.src(
    [        
        bower_path_libs+"**/*.css"
        ,bower_path_libs+"**/*min.js"
        ,bower_path_libs+"**/require.js"
        ,bower_path_libs+"**/*min.css"        
    ])
    .pipe(gulp.dest(appDestPathView+"/js/lib/"));
});

gulp.task('copy_view_lib_not_min',function(){
    var bower_path_libs = rootPath+"/bower_components/underas/dist/js/";
    //'!'+bower_path_libs+"/underas"
    return gulp.src(
    [
        bower_path_libs+"**/*.*"
    ])
    .pipe(gulp.dest(appDestPathView+"/js/lib/"));
});

gulp.task('convert_template2IDOM',function(){
    return gulp.src([
        appSourcePath+"/**/assets/html/*.html"
    ])
    .pipe(superviewsjs())
    .pipe(rename({
        extname: ".js"
    }))
    .pipe(replace(";(function","define(['idom/incremental-dom-min'],function(_IDOM){return (function")) 
    .pipe(replace("function description (data) {","function($this){")) 
    .pipe(replace(/(elementOpen)/g,'_IDOM.$1'))
    .pipe(replace(/(elementVoid)/g,'_IDOM.$1'))
    .pipe(replace(/(elementClose)/g,'_IDOM.$1'))
    .pipe(replace(/(text)\(/g,'_IDOM.$1('))
    .pipe(replace(/\}\)\(\)$/g,"})()});"))
    .pipe(gulp.dest(destPackagePathAppView));
});

gulp.task('set_compile_revision', function(){
  gulp.src(appDestPathView+"/js/*.template.js")
    .pipe(replace(/(\$\{compile\-version\})/g,compileVersion))
    .pipe(replace(/(\$\{relative\-path\-package\})/g,destPackagePathFullView.replace(appDestPathView+"/","")))
    .pipe(rename(function (p_path) {        
        p_path.basename = p_path.basename.replace(".template","");        
    }))
    .pipe(gulp.dest(appDestPathView+"/js"));
});
gulp.task('set_compile_revision_index', function(){
  gulp.src(appDestPathView+"/*.template.html")
    .pipe(replace(/(\$\{compile\-version\})/g,compileVersion))
    .pipe(rename(function (p_path) {        
        p_path.basename = p_path.basename.replace(".template","");        
    }))
    .pipe(gulp.dest(appDestPathView));
});

gulp.task('ts_view',function(){
    //console.log(""+destPackagePathAppView);
    return gulp.src([
        appSourcePath+'/**/view/*.ts'
        ,appSourcePath+'/**/model/*.ts'
        ,rootPath+"/src/lib/jquery/jquery.d.ts"
        ])
        .pipe(ts({
            noImplicitAny: true,            
            module: 'amd',
            target: 'es5',
            rootDir: rootPath+"/src",
            sourceMap: false,
            declaration: false,
            removeComments:true,
            experimentalDecorators:true,
            noEmitHelpers:true, 
            suppressImplicitAnyIndexErrors: true
        }))
        //.pipe(uglify())
        .pipe(gulp.dest(destPackagePathAppView));   
});

gulp.task('ts_server',function(){            
    return gulp.src([            
            appSourcePath+'/**/controller/*.ts' 
            ,appSourcePath+'/**/model/*.ts'       
        ])
        .pipe(ts({
            noImplicitAny: true,            
            module: 'commonjs',
            target: 'es5',  
            rootDir: rootPath+'/src',          
            sourceMap: false,
            declaration: false,
            removeComments:true,
            experimentalDecorators:true,
            noEmitHelpers:true,
            suppressImplicitAnyIndexErrors: true, 
            moduleResolution: "classic"
        }))
        .pipe(uglify({
            mangle:false
        }))        
        .pipe(gulp.dest(appDestPathServer+"/br"));   
});


gulp.task('build-view-lib',function(callback){
    //return gulp.run('ts_view_lib','copy_libs_2_test');
    runSequence('ts_view_lib','copy_libs_2_test',callback);
});

gulp.task('b-view',function(cb){
    //return gulp.run('clean_test','ts_view_test','copy_view_assets');
    runSequence('ts_view','copy_view_assets','convert_template2IDOM','set_compile_revision','set_compile_revision_index',cb);
    //runSequence('clean_test','ts_view_test','copy_view_assets','replace_relative_path','convert_template2IDOM','set_compile_revision',callback);
});

gulp.task('i-deps',function(cb){
    runSequence('clear_view_lib','bower-install','copy_view_lib','copy_view_lib_not_min',cb);
});

gulp.task('default',function(){
    return gulp.run('build-view-lib');
});



gulp.task('connect', function() {
  connect.server({
    root: rootPath,
    port: 9000,
    livereload: true
  });
});


gulp.task('connect_proxy', function() {
  connect.server({
    root: rootPath,
    port: 9000,
    livereload: true,
    middleware: function(connect, opt) {
        //http://127.0.0.1:8299/dist/ws/backoffice/module
        var apiProxy = proxy('/public/ws', {
            target: 'http://localhost:8330'
            ,changeOrigin: true   // for vhosted sites
            ,pathRewrite: {
                '^/public/ws' : '/ws'           
            }
        });
        return [apiProxy];
    }
  });
});


gulp.task('reload_browser', function () {
  gulp.src([
      destPackagePathAppView+'/**/*.js'
      ,destPackagePathAppView+'/**/assets/html/*.html'
      ,destPackagePathAppView+'/**/assets/css/*.css'
      ])
    .pipe(connect.reload());
});


/*

gulp.task('watch_ts_view',function(){
   runSequence('ts_view','reload_browser');
});

gulp.task('watch_copy_view_assets',function(){
   runSequence('copy_view_assets','reload_browser');
});

gulp.task('watch_convert_template',function(){
   runSequence('copy_view_assets','convert_template2IDOM','reload_browser');
});

gulp.task('default',function(){
    return gulp.run('b-view');
});

*/




gulp.task('watch_ts_view',function(cb){
    runSequence('ts_view','set_compile_revision','set_compile_revision_index','reload_browser',cb);
});

gulp.task('watch_assets_view_html',function(cb){
    runSequence('copy_view_assets','convert_template2IDOM','set_compile_revision','set_compile_revision_index','reload_browser',cb);
});
gulp.task('watch_assets_view_css',function(cb){
    runSequence('copy_view_assets','set_compile_revision','set_compile_revision_index','reload_browser',cb);
});

gulp.task('auto',function(){
    gulp.run('b-view','ts_server');
    gulp.run('connect');  
    gulp.watch([
        appSourcePath+"/**/assets/css/*.css"      
    ], ['watch_assets_view_css']);
    gulp.watch(appSourcePath+"/**/assets/html/*.html", ['watch_assets_view_html']);
    gulp.watch(appSourcePath+'/**/view/*.ts', ['watch_ts_view']);
    gulp.watch([
        appSourcePath+'/**/controller/*.ts' 
        ,appSourcePath+'/**/model/*.ts'   
    ], ['ts_server']);
});
