angular.module('d3examples').directive('stockTicker', ['$interval', function($interval) {
  return {
    templateUrl : 'components/stockTicker/index.html',
    restrict : 'E',
    scope : {},
    link : function(scope, element, attrs) {
      var margin = {top: 20, right: 20, bottom: 30, left: 50},
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

      var parseDate = d3.time.format("%d-%b-%y").parse;
    
      var x = d3.time.scale()
          .range([0, width]);
    
      var y = d3.scale.linear()
          .range([height, 0]);
    
      var xAxis = d3.svg.axis()
          .scale(x)
          .orient("bottom");
    
      var yAxis = d3.svg.axis()
          .scale(y)
          .orient("left");
    
      var line = d3.svg.line()
          .x(function(d) { return x(d.date); })
          .y(function(d) { return y(d.close); });
    
      var svg = d3.select(element[0]).append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
        .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
      scope.data = [];
      
      $interval(function() {
        var newVal = {
          date : new Date(),
          close : Math.floor(Math.random() * 100)
        };
        
        scope.data.push(newVal);

      }, 1000);
      
      svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

      svg.append("g")
          .attr("class", "y axis")
          .call(yAxis)
        .append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .text("Price ($)");
    
      svg.append("path")
        .datum(scope.data)
        .attr("class", "line")
        .attr("d", line);
  
      svg.selectAll(".line")
        .data(scope.data)
        .enter()
          .append("path")
          .attr("class","line")
          .attr("d", line);
    }
  }
}]);