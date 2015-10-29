module.exports = function(grunt) {
	grunt.initConfig({		
		replace: {
			viewjs:{
				expand: true,
				src: ['public/js/br/**/*.js'],             // source files array (supports minimatch)
				overwrite: true,             // destination directory or file
				replacements: [{
					  from: /..\/..\/..\/..\/lib\//g,                   // string replacement
					  to: ''
					}
				]
		  }
		}		
		,copy: {
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
		}
		,clean: {
			server: {
				src: ['app/br']
			}
			,client: {
				src: 'public/js/br'
			}
		}
		,concat: {
			options: {
				separator: ';'
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
		  ,makerouter : {
			tsconfig: "../tsconfigmakerouter.json"
		  }
		}	
});


	//console.log( grunt.option( "target" ) );

	//var targetFile = grunt.option( "target" );

	//global[targetFile] = grunt.option( "target" );


	grunt.registerTask('build-view-pos', function(){
		grunt.file.recurse("public/js/br/", function(abspath, rootdir, subdir, filename){
			//console.log(abspath+":"+rootdir+":"+filename);
			if(filename.indexOf(".js")>-1){
				var contentFile = grunt.file.read(abspath);
				if(contentFile.indexOf("})(container_1.ModWindow);")){
					contentFile = contentFile.replace(/(_super\.call\(this,.*)/,"$1 this.setUrlModule('"+abspath.replace("public/","").replace(/\//g,".").replace(".js","")+"');");
					grunt.file.write(abspath, contentFile);
					grunt.log.writeln('File "' + abspath + '" modified.');
				}
			};
		});
	});



	grunt.loadNpmTasks("grunt-ts");
	grunt.loadNpmTasks('grunt-text-replace');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');


	grunt.registerTask('default', ['build-dev']);
	//grunt.registerTask('dist', ['clean', 'copy']);		
	grunt.registerTask('build-server-dev', ['clean:server','ts:server']);	
	grunt.registerTask('build-server-deploy', ['build-server-dev','uglify:server']);
	grunt.registerTask('build-view-dev', ['clean:client','ts:view','copy:viewAssets','replace:viewjs','build-view-pos']);
	grunt.registerTask('build-view-deploy', ['build-view-dev','uglify:view']);
	grunt.registerTask('build-dev', ['build-server-dev','build-view-dev']);	
	grunt.registerTask('build-deploy', ['build-server-deploy','build-view-deploy']);
	
	//grunt.registerTask('build-deploy', ['build-all','uglify:minview']);
	


};
