angular.module('d3examples').directive('stockTicker', ['$interval', function($interval) {
  return {
    templateUrl : 'components/stockTicker/index.html',
    restrict : 'E',
    scope : {},
    link : function(scope, element, attrs) {
      var margin = {
          top: 20,
          right: 20,
          bottom: 30,
          left: 50
      };
      
      scope.data = [];

      var width = 960 - margin.left - margin.right,
          height = 500 - margin.top - margin.bottom;

      var parseDate = d3.time.format("%d-%b-%y").parse;

      var x = d3.time.scale()
          .domain([new Date(), new Date()])
          .range([0, width]);

      var y = d3.scale.linear()
          .domain([0, 100])
          .range([height, 0]);

      scope.xAxis = d3.svg.axis()
          .scale(x)
          .orient("bottom");

      scope.yAxis = d3.svg.axis()
          .scale(y)
          .orient("left");

      scope.line = d3.svg.line()
          .x(function (d) { return x(d.date); })
          .y(function (d) { return y(d.close); });

      scope.svg = d3.select(element[0])
          .append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      scope.xSel = scope.svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(scope.xAxis);

      scope.ySel = scope.svg.append("g")
          .attr("class", "y axis")
          .call(scope.yAxis)
          .append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .text("Price ($)");

      scope.path = scope.svg.append("path")
          .datum(scope.data)
          .attr("class", "line")
          .attr("d", scope.line);
      
      var interval = $interval(function() {
        scope.data.push({
          date: new Date(),
          close: Math.random() * 100
        });
      }, 500);
      
      scope.$watchCollection('data', function() {
        x.domain(d3.extent(scope.data, function (d) { return +d.date; }));
        
        scope.path.datum(scope.data)
          .transition()
          .attr('d', scope.line);
  
        scope.xSel.transition().call(scope.xAxis);
        
        if (100 < scope.data.length) {
          $interval.cancel(interval);
        }
      }); 
    }
  }
}]);