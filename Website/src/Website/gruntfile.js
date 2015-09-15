/// <binding ProjectOpened='watch' />
module.exports = function (grunt) {

    //load tasks from NPM from package.json
    require('load-grunt-tasks')(grunt);

    // some constants for various paths and files to be used by
    // the task configurations
    var BUILD_DIR = 'wwwroot/dist/';
    var BUILD_FILE_CSS = BUILD_DIR + 'app.css';
    var BUILD_FILE_JS = BUILD_DIR + 'app.js';

    var SRC_DIR = '/';
    var SRC_DIR_JS = SRC_DIR + 'Scripts/';
    var SRC_FILES_JS = SRC_DIR_JS + '*.js';
    var SRC_FILE_SASS = 'Styles/app.scss';
    var SRC_FILES_SASS = 'Styles/**/*.scss';


    // object to represent the type of environment we are running in.
    // eg. production or development
    var envType = {
        prod: 'production',
        dev: 'development'
    };

    var scripts = [                      
        //libs
        'bower_components/waypoints/lib/noframework.waypoints.js',
        'bower_components/angular-animate/angular-animate.js',
        'bower_components/angular-aria/angular-aria.js',
        'bower_components/angular-route/angular-route.js',
        'bower_components/angular-touch/angular-touch.js',
        'bower_components/ngSmoothScroll/angular-smooth-scroll.js',
        'Scripts/libs/angular-waypoints/dist/angular-waypoints.js',
        'Scripts/app.js',
        'Scripts/appSettings.js',
        //services
        'Scripts/services/services.js',
        'Scripts/services/**/*.js',
        //controllers
        'Scripts/controllers/controllers.js',
        'Scripts/controllers/appCtrl.js',
        'Scripts/controllers/**/*.js',
        //directives
        'Scripts/directives/directives.js',
        'Scripts/directives/**/*.js',
        //filters
        'Scripts/filters/filters.js',
        'Scripts/filters/**/*.js'
    ];

    // configure plugins
    grunt.initConfig({      
        sass: {
            development: {
                files: [
             {
                 expand:true,
                 src: SRC_FILE_SASS,
                 dest: BUILD_DIR,
                 flatten: true,
                 ext: '.css'
             }]
            },
            production: {
                options: {
                    // minify css in prod mode
                    style: 'compressed'
                },
                files: [
                {
                    expand: true,
                    src: SRC_FILE_SASS,
                    dest: BUILD_DIR,
                    flatten: true,
                    ext: '.css'
                }]
            }
        },
        postcss: {
            options: {
                map: true,
                processors: [
                    require('autoprefixer')({browsers: ['last 2 versions']})
                ]
            },
            dist: {
                files: {
                    'wwwroot/dist/app.css': 'wwwroot/dist/app.css'
                }
            }
        },
        // concatenate all source js - Dev
        concat: {
            dist: {
                src: scripts,
                dest: BUILD_FILE_JS
            }
        },
        //minify all source js - Prod
        uglify: {
            build: {
                files: [{
                    src: scripts,
                    dest: BUILD_FILE_JS
                }]
            }
        },
        //watch changes and run concats - Dev 
        watch: {
            scripts: {
                files: scripts,
                tasks: ['concat']
            },
            sass: {
                options: { livereload: true },
                files: SRC_FILES_SASS,
                tasks: ['sass:development', 'postcss']
            }
        }

    });

    /**
  * Utility function to register the build task to grunt.
  * @param  {[type]} mode  [the mode, either dev or production]
  */
    var registerBuildTask = function (mode) {
        grunt.registerTask('build:' + mode,
          'Compiles all of the assets and copies them' +
          ' to the build directory',
          [
              'stylesheets:' + mode,
              'scripts:' + mode
          ]
        );
    };

    /**
   * Utility function to register the Sass compilation task to grunt.
   * @param  {[type]} mode  [the mode, either dev or production]
   */
    var registerStylesTask = function (mode) {
        grunt.registerTask('stylesheets:' + mode,
            'Compiles the stylesheets for development mode',
            ['sass:' + mode]
        );
    };

    /**
     * Utility function to register the scripts task to grunt.
     * @param  {[type]} mode  [the mode, either dev or production]
     */
    var registerScriptsTask = function (mode) {
        // if we are running in dev mode, only concat the scripts
        // otherwise minify them also
        var scriptTask = (mode === envType.dev) ? 'concat' : 'uglify';

        grunt.registerTask('scripts:' + mode,
          'Compiles the javascript files in ' + mode + ' mode',
          [
              scriptTask
          ]
        );
    };

   

    /**
  * Utility function to register the build task to grunt.
  * @param  {[type]} mode  [the mode, either dev or production]
  */
    var registerWatchTask = function (mode) {
        grunt.registerTask('watch:' + mode,
          'Watches source scripts and styles and' +
          ' runs proper tasks on them',
          [
              'watch:' + mode
          ]
        );
    };

    /**
   * Utility function to register the main task to grunt.
   * @param  {[type]} mode  [the mode, either dev or production]
   */
    var registerMainTask = function (mode) {
        grunt.registerTask(mode,
          'Watches the project for changes' +
          'automatically builds them',
          [
              'build:' + mode
          ]
        );
    };

    // register all the tasks for both development and production
    registerStylesTask(envType.dev);
    registerStylesTask(envType.prod);
    registerScriptsTask(envType.dev);
    registerScriptsTask(envType.prod);
    registerBuildTask(envType.dev);
    registerBuildTask(envType.prod);
    registerWatchTask(envType.dev);
    registerWatchTask(envType.prod);
    registerMainTask(envType.dev);
    registerMainTask(envType.prod);

    // register development mode as the main task
    grunt.registerTask('default', 'Default task: development', 'development');

};