module.exports = function(grunt) {

  grunt.config.set('concat', {
    js: {
      src: ['src/js/index.js', 'src/js/**/*.js'],
      dest: 'build/app.js'
    },
    css: {
      src: ['src/js/**/*.css'],
      dest: 'build/app.css'
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
};