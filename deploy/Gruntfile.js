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
			},

			viewAssets:{
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
            ,viewAssetsWatch:{
                expand: true,
                //cwd: 'src/',
                src: '**',
                dest: 'build/js/br/',
                flatten: true,
                filter: 'isFile'

			}
		}
		,clean: {
			server: {
				src: ['app/br']
			}
			,client: {
				src:['public/js/br']
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
     
        ,typescript:{
            view: {
                src: ["../src/br/**/view/*.ts","../src/br/**/model/I[A-Z]*.ts"],//"../src/br/**/view/*.ts","../src/br/**/model/I[A-Z]*.ts"
                dest: 'public/js',
                options: {
                    module: 'amd', //or commonjs 
                    target: 'es5',
                    rootDir: '../src',
                    sourceMap: false,
                    declaration: false,
                    removeComments:true,
                    experimentalDecorators:true,
                    noEmitHelpers:true,
                    references: [
                        "../src/lib/underas/**/*.d.ts",
                        "../src/lib/underas/*.d.ts",
                        "../src/lib/jspdf/*.ts",
                        "../src/lib/cookies/*.ts",
                        "../src/lib/jquery/jquery2.d.ts",
                        "../src/lib/jqueryui/jqueryui.d.ts"
                    ]
                }
            }
            ,server: {
                src: ["../src/config/*.ts","../src/br/ata/**/controller/*.ts"],//"br/cupom/**/controller/*.ts","br/cupom/**/model/*.ts"
                dest: 'app',
                options: {
                    module: 'commonjs', //or commonjs 
                    target: 'es5', //or es3 
                    rootDir: '../src',
                    sourceMap: false,
                    declaration: false,
                    removeComments:true,
                    experimentalDecorators:true,
                    noEmitHelpers:true,
                    references: [
                        "../src/config/sequelizedb.ts",
                        "../src/lib/restify/*.d.ts",
                        "../src/lib/router/router.d.ts",
                        "../src/lib/node/node.d.ts",
                        "../src/lib/sequelize/sequelize.d.ts"
                    ]
                }
            }
        }
        
		,bower: {
			install: {
				 //just run 'grunt bower:install' and you'll see files from your Bower packages in lib directory
			}
		}
		, watch: {
			options: { // passamos as opções (vide documentação)
					 livereload: true // aqui é onde a mágica acontece! Ele passa as informações para o livereload (que é o que faz a página atualizar automáticamente, junto com o connect)
			},
            view: {
                files: ['../src/**/view/*.ts']
                ,tasks: ['typescript:view','build-view-pos-full']
                ,options: {
                    spawn: false
                }
            },
            server: {
                files: ['../src/**/controller/*.*','../src/**/model/*.*','../src/config/*.*']
                ,tasks: ['typescript:server']
                ,options: {
                    spawn: false
                }
            }
            ,assets: {
                files: ['../src/br/**/assets/**/*.*']
                ,tasks: ['copy:viewAssetsWatch']
                ,options: {
                    spawn: false
                }
            }
        }
		,connect: { // aqui abrimos a task do connect
            server: { // definimos aqui o conjunto de configurações do servidor
                options: { // abertura das opções
                    port: '9000',           // Porta alternativa
                    hostname: '*',          // Acesso permitido para toda rede
                    livereload: true,       // Live Reload Ativado
                    path: 'public'             // Diretório base
                } // fechamento options
         } // fechamento server
    } // fechamento task connect
});


	grunt.loadNpmTasks('grunt-typescript');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-bower-task');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-connect');

function buildviewpos(){
    var tmpFilePath = this.data;
    //console.log(tmpFilePath);
    var c_version = "TSCOPONS-1.0.0_"+new Date().getTime();
    var countFound = 0;
    var filename = tmpFilePath.substring(tmpFilePath.lastIndexOf("/")+1,tmpFilePath.length);
    console.log(tmpFilePath+":"+filename);
    var contentFile = grunt.file.read(tmpFilePath);

    var pathRelative = tmpFilePath.replace("public/","");
    pathRelative = pathRelative.replace(filename,"");
    //console.log(pathRelative);
    //["templateResource","itemViewResource","styleResource"]
    var regexTemplateResource = /(templateResource['"]?\s?:\s?['"][^!])/g;
    var indexTemplateResource = regexTemplateResource.exec(contentFile);
    if(indexTemplateResource){
        contentFile = contentFile.replace(/(['"]?templateResource['"]?\s?):\s?(['"])([^!"]+)*/g,"$1:$2"+pathRelative+"$3.html?cache="+c_version);
        //console.log(contentFile);
        countFound++;
    };
    
    var regexTemplateViewResource = /(itemViewResource['"]?\s?:\s?['"][^!])/g;
    var indexItemViewResource = regexTemplateViewResource.exec(contentFile);
    
    if(indexItemViewResource){
        //contentFile = contentFile.replace(/(['"]?itemViewResource['"]?\s?):\s?(['"])([^!"]+)*/g," =a= $1 =b= : =c= $2 =d= "+pathRelative+" =e= $3 =f= .html =g=");
        contentFile = contentFile.replace(/(['"]?itemViewResource['"]?\s?):\s?(['"])([^!"]+)*/g,"$1:$2"+pathRelative+"$3.html?cache="+c_version);
        countFound++;
        //console.log(contentFile);
        //console.log("item:"+indexItemViewResource+":"+abspath);
    };
    

    var indexStyleResource = contentFile.indexOf("styleResource");
    if(indexStyleResource >-1 ){
        var regexStyleResource =  /["']?styleResource["']?\s?:\s?\[((\s|['".?=&,#-:]|\/|\!|\d|\w|\n)*)?\]/g;
        var listStyleResource = contentFile.match(regexStyleResource);
        var nStyleResource = listStyleResource[0].replace(/"/g,"'").replace(/\s/g,"").replace(/'?styleResource'?:\[/g,"").replace("]","");
        nStyleResource = nStyleResource.replace("'","").replace(/'$/g,"")
        var nlistStyleResource = nStyleResource.split("','");
        //console.log(nlistStyleResource);
        var nlist = [];
        var initCount = countFound;
        nlistStyleResource.forEach(function(itemStyle){
            if(itemStyle.indexOf("!") != 0){
                itemStyle = pathRelative+itemStyle+".css?cache="+c_version;
                countFound++;
            }
            nlist.push(itemStyle);
            //console.log(itemStyle);
        });
        if(initCount!=countFound){
            var concatList = "styleResource:['"+nlist.join("','")+"']";
            //console.log(concatList);

            contentFile = contentFile.replace(regexStyleResource,concatList);
            
            //console.log(contentFile.replace(regexStyleResource,concatList));
        }
        //console.log("style:"+abspath);
    };
    //contentFile = contentFile.replace(/(_super\.call\(this,.*)/,"$1 this.setUrlModule('"+abspath.replace("test/","").replace(/\//g,".").replace(".js","")+"');"+"this.setRevision('"+new Date().getTime()+"');");
    //grunt.file.write(abspath, contentFile);
    if(contentFile.indexOf("})(container_1.ModWindow);")>-1){
        contentFile = contentFile.replace(/(_super\.call\(this,.*)/,"$1 this.setUrlModule('"+pathRelative.replace(/\//g,'.')+filename.replace(".js","")+"');"+"this.setRevision('"+new Date().getTime()+"');");
    }
    if(contentFile.indexOf("})(container_1.ModWindow);")>-1 || countFound >0){
        grunt.file.write(tmpFilePath, contentFile);
        
        //console.log(contentFile);
    }
}

grunt.registerTask('build-view-pos','set the url of module',buildviewpos);



    grunt.registerMultiTask('build-view-pos2','set the url of module', function(){
        console.log(this.data);
        var tmpFilePath = this.data;
        //console.log(this.data.options.filename);       
        var contentFile = grunt.file.read(tmpFilePath);
        if(contentFile.indexOf("})(container_1.ModWindow);")>-1){
            contentFile = contentFile.replace(/(_super\.call\(this,.*)/,"$1 this.setUrlModule('"+tmpFilePath.replace("public/","").replace(/\//g,".").replace(".js","")+"');"+'this.setRevision("'+new Date().getTime()+'");');
            grunt.file.write(tmpFilePath, contentFile);
            //grunt.log.writeln('File "' + abspath + '" modified.');
        }             
    });
    
    
    
   grunt.registerTask('set_compile_version', function(){
        var abspath = "public/js/app.template.js";
        var contentFile = grunt.file.read(abspath);
        if(contentFile.indexOf("${compile-version}")){
            contentFile = contentFile.replace(/(\$\{compile\-version\})/,"JEQ-1.0.0_"+new Date().getTime());
            grunt.file.write("public/js/app.js", contentFile);
        }
        
        abspath = "public/index.template.html";
        contentFile = grunt.file.read(abspath);
        if(contentFile.indexOf("${compile-version}")){
            contentFile = contentFile.replace(/(\$\{compile\-version\})/,"JEQ-1.0.0_"+new Date().getTime());
            grunt.file.write("public/index.html", contentFile);
        }
	});   

    
    grunt.registerTask('build-view-pos-full', function(){
		grunt.file.recurse("public/js/br/", function(abspath, rootdir, subdir, filename){
			//console.log(abspath+":"+rootdir+":"+filename);
			if(filename.indexOf(".js")>-1 && abspath.indexOf("/model/I") < 0){
                //console.log(abspath+":"+abspath.indexOf("/model/I"));
                buildviewpos.apply({data:abspath})
                //grunt.config.set('build-view-pos.filename',abspath);
                //grunt.task.run(['build-view-pos']);
                /*
				var contentFile = grunt.file.read(abspath);
				if(contentFile.indexOf("})(container_1.ModWindow);")>-1){
					contentFile = contentFile.replace(/(_super\.call\(this,.*)/,"$1 this.setUrlModule('"+abspath.replace("public/","").replace(/\//g,".").replace(".js","")+"');"+'this.setRevision("'+new Date().getTime()+'");');
					grunt.file.write(abspath, contentFile);
					//grunt.log.writeln('File "' + abspath + '" modified.');
				}
                */
			};
		});
	});



	grunt.registerTask('default', ['build-dev']);
	//grunt.registerTask('dist', ['clean', 'copy']);
	grunt.registerTask('build-server-dev', ['clean:server','typescript:server']);//'clean:server',
	grunt.registerTask('build-server-deploy', ['build-server-dev','uglify:server']);
	grunt.registerTask('build-view-dev', ['clean:client','typescript:view','copy:viewAssets','build-view-pos-full','set_compile_version']);//'clean:client',
	grunt.registerTask('build-view-deploy', ['build-view-dev','uglify:view']);
	grunt.registerTask('build-dev', ['build-server-dev','build-view-dev']);
	grunt.registerTask('build-deploy', ['build-server-deploy','build-view-deploy']);

	grunt.registerTask('install-deps', ['clean:underaslib','bower:install','copy:jsLibs','copy:jsLibsNotMin']);

	grunt.registerTask('auto', ['build-dev','connect', 'watch']);


	//grunt.registerTask('build-deploy', ['build-all','uglify:minview']);

    grunt.event.on('watch', function(action, filepath,target) {
        //console.log("------->>>>>>"+target+":"+action+":"+filepath);        
        var tmpPath = "public/js/"+filepath.replace(/(\\)/g,"/").replace("src/","");
        var tmpPathWithFileName = tmpPath;  
        tmpPath = tmpPath.substring(0,tmpPath.lastIndexOf("/"));        
        grunt.config('copy.viewAssetsWatch.src', filepath);
        grunt.config('copy.viewAssetsWatch.dest',tmpPath);       
        grunt.config('typescript.view.src',filepath);     
        grunt.config('typescript.server.src',filepath); 
           
        grunt.config.set('build-view-pos.filename',tmpPathWithFileName.replace(/(\.ts$)/g,".js"));
    });

};
