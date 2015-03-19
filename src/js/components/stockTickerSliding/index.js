angular.module('d3examples').directive('stockTickerSliding', ['$interval', function($interval) {
  return {
    templateUrl : 'components/stockTickerSliding/index.html',
    restrict : 'E',
    scope : {},
    link : function(scope, element, attrs) {
      var n = 40;
      
      scope.data = d3.range(40).map(function() {
        return Math.floor(Math.random() * 100);
      });

      var margin = {top: 20, right: 20, bottom: 20, left: 40},
          width = 960 - margin.left - margin.right,
          height = 500 - margin.top - margin.bottom;
    
      var x = d3.scale.linear()
          .domain([0, n - 1])
          .range([0, width]);
    
      var y = d3.scale.linear()
          .domain([0, 100])
          .range([height, 0]);
    
      var line = d3.svg.line()
          .x(function(d, i) { return x(i); })
          .y(function(d, i) { return y(d); });
    
      var svg = d3.select(element[0]).append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
        .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
      svg.append("defs").append("clipPath")
          .attr("id", "clip")
        .append("rect")
          .attr("width", width)
          .attr("height", height);
    
      svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + y(0) + ")")
          .call(d3.svg.axis().scale(x).orient("bottom"));
    
      svg.append("g")
          .attr("class", "y axis")
          .call(d3.svg.axis().scale(y).orient("left"));
    
      var path = svg.append("g")
          .attr("clip-path", "url(#clip)")
        .append("path")
          .datum(scope.data)
          .attr("class", "line")
          .attr("d", line);
      
      $interval(function() {
        scope.data.push(Math.floor(Math.random() * 100));
        scope.data.shift();
      }, 500);
      
      scope.$watchCollection('data', function() {
        // redraw the line, and slide it to the left
        path
            .attr("d", line)
            .attr("transform", null)
          .transition()
            .ease("linear")
            .attr("transform", "translate(" + x(-1) + ",0)");

      });
    }
  }
}]);