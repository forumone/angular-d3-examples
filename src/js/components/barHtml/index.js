angular.module('d3examples').directive('barHtml', [function() {
  return {
    templateUrl : 'components/barHtml/index.html',
    restrict : 'E',
    scope : {},
    link : function(scope, element, attrs) {
      scope.data = [4, 8, 15, 16, 23, 42];
      var x = d3.scale.linear()
        .domain([0, d3.max(scope.data)])
        .range([0, 420]);

      d3.select(element[0])
        .selectAll("div")
          .data(scope.data)
        .enter().append("div")
          .style("width", function(d) { return x(d) + "px"; })
          .text(function(d) { return d; });
    }
  }
}]);