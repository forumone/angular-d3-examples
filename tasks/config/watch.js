module.exports = function(grunt) {

  grunt.config.set('watch', {
    html: {
      files: ['index.html'],
      options : {
        livereload: true,
      }
    },
    js: {
      files: ['src/js/**/*.js', 'src/js/**/*.html'],
      tasks: ['ngtemplates' , 'concat:js'],
      options: {
        livereload: true,
      },
    },
    css: {
      files: ['src/js/**/*.css'],
      tasks: ['concat:css'],
      options: {
        livereload: true,
      },
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
};