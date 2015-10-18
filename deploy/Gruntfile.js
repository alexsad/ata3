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
	  ,typescript: {
		server: {
		  cwd: '.'
		  ,expand: false
		  ,src: [			
				"../src/br/**/*.ts"
				,"!../src/br/**/view/*.ts"
		  ]
		  ,dest: 'app/br/ata'
		  ,options: {			
			"target": "es5",
			"module": "commonjs",
			"declaration": false,
			"noImplicitAny": false,
			"removeComments": true,
			"noLib": false,
			"sourceMap": false,
			"experimentalDecorators": true,
			"emitDecoratorMetadata":false,
			"isolatedModules": false,
			"noEmitHelpers": true,
			"noResolve": true,
			"references": [
				"../src/lib/DinRoute.d.ts",
				"../src/lib/router.d.ts",
				"../src/lib/express-middleware.d.ts",
				"../src/lib/express.d.ts",
				"../src/lib/mongodb.d.ts",
				"../src/lib/mongoose.d.ts",
				"../src/lib/node.d.ts"				
			]
		  }
		}
		,client: {
		  cwd: '.'
		  ,expand: false
		  ,src: [			
			"../src/**/view/*.ts"
		  ]
		  ,dest: 'public/js'
		  ,options: {			
			"target": "es5",
			"module": "amd",
			"declaration": false,
			"noImplicitAny": true,
			"removeComments": true,
			"noLib": false,
			"sourceMap": false,
			"rootDir":"../src",
			"experimentalDecorators": true,
			"emitDecoratorMetadata":false,
			"isolatedModules": false,
			"noEmitHelpers": true,
			"noResolve": true,
			"references": [
				"../src/lib/jquery2.d.ts",	
				"../src/lib/jqueryui.d.ts",
				"../src/lib/util.d.ts",
				"../src/lib/core.d.ts",
				"../src/lib/container.d.ts",
				"../src/lib/controller.d.ts",				
				"../src/lib/net.d.ts",	
				"../src/**/model/I[A-Z]*.ts"			
			]
		  }
		}
		,clientF: {
		  cwd: '.'
		  ,expand: false
		  ,src:grunt.option( "target" )
		  ,dest: 'public/js'
		  ,options: {			
			"target": "es5",
			"module": "amd",
			"declaration": false,
			"noImplicitAny": true,
			"removeComments": true,
			"noLib": false,
			"sourceMap": false,
			"rootDir":"../src",
			"experimentalDecorators": true,
			"emitDecoratorMetadata":false,
			"isolatedModules": false,
			"noEmitHelpers": true,
			"noResolve": true,
			"references": [
				"../src/lib/jquery2.d.ts",	
				"../src/lib/jqueryui.d.ts",
				"../src/lib/util.d.ts",
				"../src/lib/core.d.ts",
				"../src/lib/container.d.ts",
				"../src/lib/controller.d.ts",				
				"../src/lib/net.d.ts",
				"../src/**/model/I[A-Z]*.ts"				
			]
		  }
		}
		,makerouter: {
		  cwd: '.'
		  ,expand: false
		  ,src: [			
				"../src/lib/router.ts"
				,"!../src/br/**/view/*.ts"
		  ]
		  ,dest: 'app/lib'
		  ,options: {			
			"target": "es5",
			"module": "commonjs",
			"declaration": true,
			"noImplicitAny": false,
			"removeComments": true,
			"noLib": false,
			"sourceMap": false,
			"experimentalDecorators": true,
			"emitDecoratorMetadata":false,
			"isolatedModules": false,
			"noEmitHelpers": true,
			"noResolve": true,
			"references": [
				"../src/lib/express-middleware.d.ts"
				,"../src/lib/express.d.ts"
				,"../src/lib/node.d.ts"	
				,"../src/lib/express.d.ts"
				,"../src/lib/DinRoute.d.ts"				
			]
		  }
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

	
	grunt.registerTask('build-view-file', ['typescript:clientF']);


	grunt.registerTask('default', ['build-dev']);
	//grunt.registerTask('dist', ['clean', 'copy']);		
	grunt.registerTask('build-server-dev', ['clean:server','typescript:server']);	
	grunt.registerTask('build-server-deploy', ['build-server-dev','uglify:server']);
	grunt.registerTask('build-view-dev', ['clean:client','typescript:client','copy:viewAssets','replace:viewjs','build-view-pos']);
	grunt.registerTask('build-view-deploy', ['build-view-dev','uglify:view']);
	grunt.registerTask('build-dev', ['build-server-dev','build-view-dev']);	
	grunt.registerTask('build-deploy', ['build-server-deploy','build-view-deploy']);
	
	//grunt.registerTask('build-deploy', ['build-all','uglify:minview']);
	
	grunt.loadNpmTasks('grunt-text-replace');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	//grunt.loadNpmTasks('grunt-contrib-cssmin');
	//grunt.loadNpmTasks('grunt-usemin');
	grunt.loadNpmTasks('grunt-typescript');

};
