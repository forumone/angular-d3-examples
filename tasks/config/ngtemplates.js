module.exports = function(grunt) {

  grunt.config.set('ngtemplates', {
    d3examples : {
      cwd : 'src/js',
      src : '**/**.html',
      dest : 'build/templates.js',
      options : {
        htmlmin : '<%= htmlmin.d3examples %>'
      }
    }
  });
  
  grunt.loadNpmTasks('grunt-angular-templates');
}