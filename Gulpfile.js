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
        ,appSourcePath+"/**/assets/img/*.png"
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
    var bower_path_libs = rootPath+"/bower_components/underas/dist/js/lib/";
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
    .pipe(replace("function description (data) {","define(['lib/idom/incremental-dom'],function(_IDOM){return function($data){with($data){"))   
    .pipe(replace(/\}$/g,"}}});"))
    .pipe(replace(/(elementOpen)/g,'_IDOM.$1'))
    .pipe(replace(/(elementVoid)/g,'_IDOM.$1'))
    .pipe(replace(/(elementClose)/g,'_IDOM.$1'))
    .pipe(replace(/(text)\(/g,'_IDOM.$1('))
    //.pipe(uglify({mangle:false}))
    .pipe(gulp.dest(destPackagePathAppView));
});


gulp.task('replace_relative_path', function(){
  gulp.src(destPackagePathAppView+"**/*.js")
    .pipe(replace(/(templateResource):(['"])([^!"']+)*/g,"$1:$2"+destPackagePathFullView+"$3.js?cache="+compileVersion))
    .pipe(gulp.dest(destPackagePathAppView));
});

gulp.task('set_compile_revision', function(){
  gulp.src(appDestPathView+"/js/*.template.js")
    .pipe(replace(/(\$\{compile\-version\})/g,compileVersion))
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
            suppressImplicitAnyIndexErrors: true,            
            references: [
                rootPath+"/src/lib/underas/**/*.d.ts",
                rootPath+"/src/lib/underas/*.d.ts",
                rootPath+"/src/lib/jspdf/*.ts",
                rootPath+"/src/lib/cookies/*.ts",
                rootPath+"/src/lib/jquery/jquery2.d.ts",
                rootPath+"/src/lib/jqueryui/jqueryui.d.ts"
            ]
        }))
        .pipe(uglify())
        .pipe(replace(/(templateResource):(['"])([^!"']+)*/g,"$1:$2"+destPackagePathFullView.replace(appDestPathView+"/","")+"/$3.js"))
		.pipe(replace(/(itemViewResource):(['"])([^!"']+)*/g,"$1:$2"+destPackagePathFullView.replace(appDestPathView+"/","")+"/$3.html?cache="+compileVersion))
        .pipe(replace(/["']?styleResource["']?\s?:\s?\[((\s|['".?=&,#-:]|\/|\!|\d|\w|\n)*)?\]/g,function(p_founded_regx){
             return p_founded_regx.replace(/(styleResource:\["|')/g,"$1"+destPackagePathFullView.replace(appDestPathView+"/","")+"/").replace(/(["']\])$/g,".css?cache="+compileVersion+"$1"); 
        })) 
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
            moduleResolution: "classic",
            references: [
                rootPath+"/src/config/sequelizedb.ts",
                rootPath+"/src/lib/restify/restify.d.ts",
                //rootPath+"/src/restify2.d.ts",
                //rootPath+"/src/restify.ts",
                rootPath+"/src/lib/router/router.d.ts",
                rootPath+"/src/lib/node/node.d.ts",
                rootPath+"/src/lib/sequelize/sequelize.d.ts"
            ]
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

gulp.task('watch_ts_view',function(cb){
    runSequence('ts_view','set_compile_revision','set_compile_revision_index',cb);
});

gulp.task('watch_assets_view_html',function(cb){
    runSequence('copy_view_assets','set_compile_revision','set_compile_revision_index',cb);
});
gulp.task('watch_assets_view_css',function(cb){
    runSequence('copy_view_assets','set_compile_revision','set_compile_revision_index',cb);
});

gulp.task('auto',function(){
    gulp.run('b-view','ts_server');
    gulp.watch([
        appSourcePath+"/**/assets/css/*.css"      
    ], ['watch_assets_view_css']);
    gulp.watch(appSourcePath+"/**/assets/html/*.html", ['convert_template2IDOM','watch_assets_view_html']);
    gulp.watch(appSourcePath+'/**/view/*.ts', ['watch_ts_view']);
    gulp.watch([
        appSourcePath+'/**/controller/*.ts' 
        ,appSourcePath+'/**/model/*.ts'   
    ], ['ts_server']);
});
