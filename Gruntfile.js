var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT});
var proxySnippet = require('grunt-connect-proxy/lib/utils').proxyRequest;
var serveStatic = require('serve-static');

module.exports = function (grunt) {
    'use strict';

    require('load-grunt-tasks')(grunt);

    var yeomanConfig = {
        app: 'app',
        dist: 'dist'
    };

    grunt.initConfig({
        yeoman: yeomanConfig,

        handlebars: {
            compile: {
                options: {
                    namespace: 'JST',
                    amd: true
                },
                files: {
                    '.tmp/scripts/templates.js': ['app/templates/**/*.hbs']
                }
            }
        },
        watch: {
            options: {
                nospawn: true
            },
            sass: {
                files: ['app/scss/*.scss'],
                tasks: ['sass:dist']
            },
            livereload: {
                options: {
                    livereload: LIVERELOAD_PORT
                },
                files: [
                    'app/*.html',
                    'app/scripts/*.js',
                    'app/templates/*.hbs',
                    'app/scss/*.scss'
                ]
            },
            handlebars: {
                files: ['<%= yeoman.app %>/templates/**/*.hbs'],
                tasks: ['handlebars']
            }
        },
        connect: {
            options: {
                port: 9999,
                hostname: '0.0.0.0'
            },
            proxies: [{
                context: ['/api'],
                host: process.env.BACKEND_HOST || 'localhost',
                port: 8081
            }, {
                context: ['/socket.io'],
                host: process.env.BACKEND_HOST || 'localhost',
                port: 8081,
                ws: true
            }],
            livereload: {
                options: {
                    middleware: function (connect) {
                        return [
                            proxySnippet,
                            lrSnippet,
                            serveStatic('.tmp'),
                            serveStatic('app'),
                        ];
                    }
                }
            },
            report: {
                options: {
                    middleware: function (connect) {
                        return [
                            proxySnippet,
                            lrSnippet,
                            serveStatic('reports')
                        ];
                    }
                }
            },
        },
        open: {
            server: {
                path: 'http://localhost:<%= connect.options.port %>'
            },
            report: {
                path: 'http:/localhost:<%= connect.options.port %>'
            }
        },
        clean: {
            server: '.tmp',
            test: 'app/scripts/templates.js',
            dist: 'dist'
        },
        requirejs: {
            dist: {
                // Options: https://github.com/jrburke/r.js/blob/master/build/example.build.js
                options: {
                    dir: 'dist',
                    appDir: 'app',
                    baseUrl: 'scripts',
                    paths: {
                        'templates': '../../.tmp/scripts/templates'
                    },
                    mainConfigFile: 'app/scripts/main.js',
                    removeCombined: true,
                    findNestedDependencies: false,
                    optimize: 'uglify2',
                    modules: [{
                        name: 'main'
                    }]
                }
            }
        },
        useminPrepare: {
            html: 'index.html',
            options: {
                dest: 'dist'
            }
        },
        usemin: {
            html: ['dist/{,*/}*.html'],
            css: ['dist/css/{,*/}*.css'],
            options: {
                dirs: ['dist']
            }
        },
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'app/img',
                    src: '{,*/}*.{png,jpg,jpeg}',
                    dest: 'dist/img'
                }]
            }
        },
        cssmin: {
            dist: {
                files: [{
                    'dist/css/main.css': [
                        'app/css/{,*/}*.css'
                    ]
                }]
            }
        },
        htmlmin: {
            dist: {
                options: {
                    removeCommentsFromCDATA: true,
                    collapseWhitespace: true,
                    collapseBooleanAttributes: true,
                    removeAttributeQuotes: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                    removeEmptyAttributes: true,
                    removeOptionalTags: true
                },
                files: [{
                    expand: true,
                    cwd: '',
                    src: 'app/*.html',
                    dest: 'dist/'
                }]
            }
        },
        sass: {
            dist: {
                files: [{
                    'app/css/main.css': 'app/scss/main.scss'
                }]
            }
        },
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.app %>',
                    dest: '<%= yeoman.dist %>',
                    src: [
                        '*.{ico,txt}',
                        '.htaccess',
                        'fonts/{,*/}*.*',
                        'img/*.*',
                        'index.html'
                    ]
                }]
            },
            test: {
                files: [{
                    src: '.tmp/scripts/templates.js',
                    dest: '<%= yeoman.app %>/scripts/templates.js'
                }]
            }
        },
        karma: {
            unit: {
                configFile: 'karma.conf.js'
            }
        },
        plato: {
            options: {
                jshint: grunt.file.readJSON('.jshintrc')
            },
            report: {
                files: {'reports': ['app/scripts/**/*.js', 'tests/**/*.js']},
            }
        },
        jshint: {
          options: {
              jshintrc: '.jshintrc',
          },
          serve: {
            files: {
                src: ['app/scripts/**/*.js', 'tests/**/*.js']
            },
          },
          dist: {
            options: {
              reporter: require('jshint-jenkins-checkstyle-reporter'),
              reporterOutput: 'jshintoutput.xml'
            },
            files: {
                src: ['app/scripts/**/*.js', 'tests/**/*.js']
            },
          }
        },
        cucumberjs: {
          src: 'features',
          options: {
            steps: 'features/step_definitions'
          }
        },
        parallel: {
          assets: {
            tasks: [{
              grunt: true,
              args: ['handlebars', 'requirejs']
            }, {
              grunt: true,
              args: ['sass', 'useminPrepare', 'cssmin', 'usemin', 'htmlmin']
            }, {
              grunt: true,
              args: ['imagemin']
            }]
          }
        }
    });

    grunt.registerTask('serve', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'open']);
        }

        grunt.task.run([
            'clean:server',
            'configureProxies',
            'sass:dist',
            'handlebars',
            'connect:livereload',
            'open:server',
            'watch'
        ]);
    });

    grunt.registerTask('build', [
        'clean:dist',
        'parallel:assets',
        'copy:dist'
    ]);

    grunt.registerTask('report', [
        'plato',
        'connect:report',
        'open:report',
        'watch'
    ]);

    grunt.registerTask('test', [
        'clean:server',
        'handlebars',
        'copy:test',
        'karma',
        'clean:test'
    ]);

    grunt.registerTask('acceptance', [
      'cucumberjs'
    ]);

    grunt.registerTask('default', [
        'jshint',
        'test',
        'build'
    ]);
};
