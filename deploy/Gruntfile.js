module.exports = function(grunt) {
	grunt.initConfig({
		copy: {
			view:{
				expand: true,
				cwd: './app/br',
				src: [
				"**/view/*.js"
				//,"**/model/I[A-Z]*.js"
				],
				dest: 'public/js/br'
			}
			,viewAssets:{
				expand: true,
				cwd: '../src/br',
				src: [
					"**/view/assets/**"
				//,"**/model/I[A-Z]*.js"
				],
				dest: 'public/js/br'
			}
			,jsLibs:{
				expand: true,
				cwd: './bower_components',
				src: [
					'!underas/'
					,"**/*min.js"
					,"**/require.js"
					,"**/*min.css"
				],
				dest: 'public/js/lib'
			}
			,jsLibsNotMin:{
				expand: true,
				cwd: './bower_components/underas/dist/js/lib',
				src: [
					"bootstrap/**/*.*"
					,"underas/**/*.*"
					,"util/**/*.*"
					,"jspdf/**/*.*"
				],
				dest: 'public/js/lib'
			}
		}
		,clean: {
			server: {
				src: ['app/br']
			}
			,client: {
				src: 'public/js/br'
			}
			,underaslib:{
				src:['./bower_components/underas']
			}
		}
		,uglify: {
			view: {
				files: [{
					expand: true,
					src: "**/view/*.js",
					dest: 'public/js/br',
					cwd: './public/js/br'
				}]
			}
			,server: {
				options: {
					mangle: false
				}
				,files: [{
					expand: true,
					src: "**/*.js",
					dest: 'app/br',
					cwd: './app/br'
				}]
			}
		}
		,ts: {
		  view : {
			tsconfig: "../tsconfigview.json"
		  }
		  ,server : {
			tsconfig: "../tsconfigserver.json"
		  }
		}
		,bower: {
			install: {
				 //just run 'grunt bower:install' and you'll see files from your Bower packages in lib directory
			}
		}
});

	grunt.loadNpmTasks("grunt-ts");
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-bower-task');

	grunt.registerTask('build-view-pos', function(){
		grunt.file.recurse("public/js/br/", function(abspath, rootdir, subdir, filename){
			//console.log(abspath+":"+rootdir+":"+filename);
			if(filename.indexOf(".js")>-1){
				var contentFile = grunt.file.read(abspath);
				if(contentFile.indexOf("})(container_1.ModWindow);")>-1){
					contentFile = contentFile
						.replace(/(_super\.call\(this,.*)/,"$1 this.setUrlModule('"
							+abspath.replace("public/","").replace(/\//g,".").replace(".js","")
							+"');"
							+'this.setRevision("'+new Date().getTime()+'");'
							)
						;
						//.replace(/(\$\{compile\-version\})/,"$"+new Date().getTime());
					grunt.file.write(abspath, contentFile);
					//grunt.log.writeln('File "' + abspath + '" modified.');
				}
			};
		});
	});

	grunt.registerTask('set-version-tag', function(){
        var abspath = "public/js/app.template.js";
        var contentFile = grunt.file.read(abspath);
        if(contentFile.indexOf("${compile-version}")){
            contentFile = contentFile.replace(/(\$\{compile\-version\})/,"DEV_"+new Date().getTime());
            grunt.file.write(abspath.replace(".template",""), contentFile);
        }
        abspath = "public/index.template.html";
        contentFile = grunt.file.read(abspath);
        if(contentFile.indexOf("${compile-version}")){
            contentFile = contentFile.replace(/(\$\{compile\-version\})/,"DEV_"+new Date().getTime());
            grunt.file.write(abspath.replace(".template",""), contentFile);
        }
	});


	grunt.registerTask('default', ['build-dev']);
	//grunt.registerTask('dist', ['clean', 'copy']);
	grunt.registerTask('build-server-dev', ['clean:server','ts:server']);
	grunt.registerTask('build-server-deploy', ['build-server-dev','uglify:server']);
	grunt.registerTask('build-view-dev', ['clean:client','ts:view','copy:viewAssets','build-view-pos','set-version-tag']);//,'replace:viewjs'
	grunt.registerTask('build-view-deploy', ['build-view-dev','uglify:view']);
	grunt.registerTask('build-dev', ['build-server-dev','build-view-dev']);
	grunt.registerTask('build-deploy', ['build-server-deploy','build-view-deploy']);

	grunt.registerTask('install-deps', ['clean:underaslib','bower:install','copy:jsLibs','copy:jsLibsNotMin']);



	//grunt.registerTask('build-deploy', ['build-all','uglify:minview']);



};
