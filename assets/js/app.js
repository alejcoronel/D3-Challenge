// @TODO: YOUR CODE HERE!
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold the chart
var svg = d3.select("#scatter") 
  .append("svg") 
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g") 
  .attr("height", height)
  .attr("width", width)
  .attr("transform", `translate(${margin.left}, ${margin.top})`); 


// import Data
d3.csv("assets/data/data.csv").then(function(censusData) {


  // parse Data/Cast as numbers
  censusData.forEach(function(data) {
    data.poverty = +data.poverty;  
    data.healthcare = +data.healthcare;
    data.abbr = data.abbr;

  });

  // create scale functions
  var xLinearScale = d3.scaleLinear()
    .domain(
      [
        d3.min(censusData, d => d.poverty) * 0.8,
        d3.max(censusData, d => d.poverty) * 1.1           


      ])
    .range([0, width]);

  var yLinearScale = d3.scaleLinear()
    .domain(
      [
        d3.min(censusData, d => d.healthcare) * 0.8,
        d3.max(censusData, d => d.healthcare) * 1.1         

      ])
    .range([height, 0]);

  //create axis 
  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);

  //append axes 
  chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

  chartGroup.append("g")
    .call(leftAxis);

  //create Circles
  var circlesGroup = chartGroup.selectAll("circle")
    .data(censusData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.poverty)) 
    .attr("cy", d => yLinearScale(d.healthcare)) 
    .attr("r", "12") /
    .attr("class", "stateCircle") 
    .attr("opacity", ".9");

  //add text to circle
  var circleText = chartGroup.selectAll()
    .data(censusData)
    .enter()
    .append("text")
    .text(d => d.abbr)
    .attr("x", d => xLinearScale(d.poverty)) 
    .attr("y", d => yLinearScale(d.healthcare))
    .attr("class", "stateText") /
    .attr("font-size", "9");

  console.log(censusData);

  // Create axes labels
  chartGroup.append("text") 
    .attr("transform", "rotate(-90)") 
    .attr("y", 0 - margin.left + 40) 
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em") 
    .attr("class", "axisText") 
    .text("Lack Healthcare (%)");

  chartGroup.append("text")
    .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
    .attr("class", "axisText") 
    .text("In Poverty (%)"); 
}).catch(function (error) {
  console.log(error);
});       
