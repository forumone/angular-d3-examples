module.exports = function (grunt) {
  grunt.registerTask('default', ['bower', 'ngtemplates', 'concat', 'connect', 'watch']);
};