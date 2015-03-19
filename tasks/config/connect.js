module.exports = function(grunt) {

  grunt.config.set('connect', {
    dev: {
      options: {
        port: 8000,
        hostname: '*',
        livereload: true
      }
    }
  });
  
  grunt.loadNpmTasks('grunt-contrib-connect');
};