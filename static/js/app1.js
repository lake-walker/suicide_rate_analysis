// Bubble Chart
var svgWidth = 1000;
var svgHeight = 750;

var margin = {
  top: 20,
  right: 40,
  bottom: 150,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
var svg = d3
  .select(".chart")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Append an SVG group
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Initial Params
var chosenXAxis = "happiness_score_2015";

// function used for updating x-scale var upon click on axis label
function xScale(countryData, chosenXAxis) {
  // create scales
  var xLinearScale = d3.scaleLinear()
    .domain([d3.min(countryData, d => d[chosenXAxis]),
      d3.max(countryData, d => d[chosenXAxis])
    ])
    .range([0, width]);

  return xLinearScale;

}

// function used for updating xAxis var upon click on axis label
function renderAxes(newXScale, xAxis) {
  var bottomAxis = d3.axisBottom(newXScale);

  xAxis.transition()
    .duration(1000)
    .call(bottomAxis);

  return xAxis;
}

// function used for updating circles group with a transition to
// new circles
function renderCircles(circlesGroup, newXScale, chosenXAxis) {

  circlesGroup.transition()
    .duration(1000)
    .attr("cx", d => newXScale(d[chosenXAxis]));

  return circlesGroup;
}

// function used for updating circles group with new tooltip
function updateToolTip(chosenXAxis, circlesGroup) {

  var label;

  if (chosenXAxis === "happiness_score_2015") {
    label = "2015 Happiness Index Score";
  }
  else if (chosenXAxis === "gdp_percapita_2015") {
    label = "GDP per Capita";
  }
  else if (chosenXAxis === "alcohol_consumption_percapita") {
    label = "Alcohol Consumption per Capita";
  }
  else if (chosenXAxis === "health_spending_percapita_2015") {
    label = "Health Spending per Capita";
  }
  else if (chosenXAxis === "private_debt_2015") {
    label = "Private Debt";
  }
  else {
    label = 'Human Development Index';
  }

  // var body = ;

    var toolTip = d3.tip()
        .attr("class", "tooltip")
        .offset([2, 80])
        .html(function(d) {
        return (`${d.country}<br>${label} ${d[chosenXAxis]}<br>Suicides per 100k:  ${d.sui_per_100k_2015}<br>Happiness Rank: ${d.happiness_rank_2015}<br>HDI Rank: ${d.hdi_rank}`);
        });
    // var table = d3.select("tbody")
    //     .selectAll("tr")
    //     .data(countryData)
    //     .enter()
    //     .append("tr")
    //     .html(function(d) {
    //         return `<td>${d.country}</td><td>${d.economy_gdp_per_capita_2015}</td><td>${d.sui_per_100k_2015}</td><td>${d.happiness_score_2015}</td>`;
    //     });

  circlesGroup.call(toolTip);
//   circlesGroup.call(table);

  circlesGroup.on("click", function(data) {
    toolTip.show(data);
  })
    // onmouseout event
    .on("mouseout", function(data, index) {
      toolTip.hide(data);
    });

  return circlesGroup;
}

// Create functions to assign colors to the different regions
function getColor(d) {
  return d == 'Australia and New Zealand' ? '#00FFFF' :
        d == 'Central and Eastern Europe'  ? '#0000FF' :
        d == 'Eastern Asia'  ? '#9900e6' :
        d == 'Latin America and Caribbean'   ? '#CCCCFF' :
        d == 'Middle East and Northern Africa'   ? '#E97451' :
        d == 'North America'   ? '#800000' :
        d == 'Southeastern Asia'   ? '#097969' :
        d == 'Southern Asia'   ? '#90EE90' :
        d == 'Sub-Saharan Africa'   ? '#cccc00' :
        d == 'Western Europe'   ? '#DC143C' :
                    '#00FF00';
}

var keys = ['Australia and New Zealand','Central and Eastern Europe','Eastern Asia','Latin America and Caribbean','Middle East and Northern Africa','North America','Southeastern Asia','Southern Asia','Sub-Saharan Africa','Western Europe']

// var color = d3.scaleOrdinal()
//   .domain(keys)
//   .range(d3.schemeset2);

// Retrieve data from the CSV file and execute everything below
d3.csv("data/new_country_data.csv").then(function(countryData, err) {
  if (err) throw err;
  console.log(countryData);

  // parse data
  countryData.forEach(function(data) {
    data.happiness_score_2015 = +data.happiness_score_2015;
    data.sui_per_100k_2015 = +data.sui_per_100k_2015;
    data.gdp_percapita_2015 = +data.gdp_percapita_2015;
    data.human_development_index = +data.human_development_index;
    data.private_debt_2015 = +data.private_debt_2015;
    data.health_spending_percapita_2015 = +data.health_spending_percapita_2015;
    data.alcohol_consumption_percapita = +data.alcohol_consumption_percapita;
  });

  // xLinearScale function above csv import
  var xLinearScale = xScale(countryData, chosenXAxis);

  // Create y scale function
  var yLinearScale = d3.scaleLinear()
    .domain([0, d3.max(countryData, d => d.sui_per_100k_2015)])
    .range([height, 0]);

  // Create initial axis functions
  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);

  // append x axis
  var xAxis = chartGroup.append("g")
    .classed("x-axis", true)
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

  // append y axis
  chartGroup.append("g")
    .call(leftAxis);

  // append initial circles
  var circlesGroup = chartGroup.selectAll("circle")
    .data(countryData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d[chosenXAxis]))
    .attr("cy", d => yLinearScale(d.sui_per_100k_2015))
    .attr("r", 10)
    .attr("fill", d => getColor(d.region))
    .attr('text', d => d.country)
    .attr("opacity", ".5");  

  // Create group for two x-axis labels
  var labelsGroup = chartGroup.append("g")
    .attr("transform", `translate(${width / 2}, ${height + 20})`);

  var happinessLabel = labelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 20)
    .attr("value", "happiness_score_2015") // value to grab for event listener
    .classed("active", true)
    .text("Happiness Index Score");

  var gdpLabel = labelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 40)
    .attr("value", "gdp_percapita_2015") // value to grab for event listener
    .classed("inactive", true)
    .text("GDP per Capita (2015)");
  

  var hdiLabel = labelsGroup.append("text")
      .attr("x", 0)
      .attr("y", 60)
      .attr("value", "human_development_index") // value to grab for event listener
      .classed("inactive", true)
      .text("Human Development Index");

  var debtLabel = labelsGroup.append("text")
      .attr("x", 0)
      .attr("y", 80)
      .attr("value", "private_debt_2015") // value to grab for event listener
      .classed("inactive", true)
      .text("Private Debt");

  var healthLabel = labelsGroup.append("text")
      .attr("x", 0)
      .attr("y", 100)
      .attr("value", "health_spending_percapita_2015") // value to grab for event listener
      .classed("inactive", true)
      .text("Health Spending per Capita");

  var alcoholLabel = labelsGroup.append("text")
      .attr("x", 0)
      .attr("y", 120)
      .attr("value", "alcohol_consumption_percapita") // value to grab for event listener
      .classed("inactive", true)
      .text("Alcohol Consumption per Capita");

  // append y axis
  chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .classed("axis-text", true)
    .text("Suicides per 100k (2015)");

  // append the legend
  svg.selectAll('mylabels')
    .data(keys)
    .enter()
    .append('text')
      .attr('x', 120)
      .attr('y', function(d,i) {return 35 + i*25})
      .style('fill', function(d) {return getColor(d)})
      .text(function(d){return d})
      .attr('text-anchor', 'left')
      .style('alignment-baseline', 'middle')


  // updateToolTip function above csv import
  var circlesGroup = updateToolTip(chosenXAxis, circlesGroup);

  // x axis labels event listener
  labelsGroup.selectAll("text")
    .on("click", function() {
      // get value of selection
      var value = d3.select(this).attr("value");
      if (value !== chosenXAxis) {

        // replaces chosenXAxis with value
        chosenXAxis = value;

        console.log(chosenXAxis)

        // functions here found above csv import
        // updates x scale for new data
        xLinearScale = xScale(countryData, chosenXAxis);

        // updates x axis with transition
        xAxis = renderAxes(xLinearScale, xAxis);

        // updates circles with new x values
        circlesGroup = renderCircles(circlesGroup, xLinearScale, chosenXAxis);

        // updates tooltips with new info
        circlesGroup = updateToolTip(chosenXAxis, circlesGroup);

        // changes classes to change bold text
        if (chosenXAxis === "gdp_percapita_2015") {
            gdpLabel
                .classed("active", true)
                .classed("inactive", false);
            happinessLabel
                .classed("active", false)
                .classed("inactive", true);
            hdiLabel
                .classed("active", false)
                .classed("inactive", true);
            debtLabel
                .classed("active", false)
                .classed("inactive", true);
            healthLabel
                .classed("active", false)
                .classed("inactive", true);
            alcoholLabel
                .classed("active", false)
                .classed("inactive", true);
        }
        else if (chosenXAxis === 'happiness_score_2015') {
            gdpLabel
                .classed("active", false)
                .classed("inactive", true);
            happinessLabel
                .classed("active", true)
                .classed("inactive", false);
            hdiLabel
                .classed("active", false)
                .classed("inactive", true);
            debtLabel
                .classed("active", false)
                .classed("inactive", true);
            healthLabel
                .classed("active", false)
                .classed("inactive", true);
            alcoholLabel
                .classed("active", false)
                .classed("inactive", true);
        }
        else if (chosenXAxis === 'human_development_index'){
            gdpLabel
                .classed("active", false)
                .classed("inactive", true);
            happinessLabel
                .classed("active", false)
                .classed("inactive", true);
            hdiLabel
                .classed("active", true)
                .classed("inactive", false);
            debtLabel
                .classed("active", false)
                .classed("inactive", true);
            healthLabel
                .classed("active", false)
                .classed("inactive", true);
            alcoholLabel
                .classed("active", false)
                .classed("inactive", true);
        }
        else if (chosenXAxis === 'private_debt_2015'){
          gdpLabel
              .classed("active", false)
              .classed("inactive", true);
          happinessLabel
              .classed("active", false)
              .classed("inactive", true);
          hdiLabel
              .classed("active", false)
              .classed("inactive", true);
          debtLabel
              .classed("active", true)
              .classed("inactive", false);
          healthLabel
              .classed("active", false)
              .classed("inactive", true);
          alcoholLabel
              .classed("active", false)
              .classed("inactive", true);
        }
        else if (chosenXAxis === 'health_spending_percapita_2015'){
          gdpLabel
              .classed("active", false)
              .classed("inactive", true);
          happinessLabel
              .classed("active", false)
              .classed("inactive", true);
          hdiLabel
              .classed("active", false)
              .classed("inactive", true);
          debtLabel
              .classed("active", false)
              .classed("inactive", true);
          healthLabel
              .classed("active", true)
              .classed("inactive", false);
          alcoholLabel
              .classed("active", false)
              .classed("inactive", true);
        }
        else if (chosenXAxis === 'alcohol_consumption_percapita'){
          gdpLabel
              .classed("active", false)
              .classed("inactive", true);
          happinessLabel
              .classed("active", false)
              .classed("inactive", true);
          hdiLabel
              .classed("active", false)
              .classed("inactive", true);
          debtLabel
              .classed("active", false)
              .classed("inactive", true);
          healthLabel
              .classed("active", false)
              .classed("inactive", true);
          alcoholLabel
              .classed("active", true)
              .classed("inactive", false);
        }
      }
    });
});

// // When the user scrolls the page, execute myFunction
// window.onscroll = function() {myFunction()};

// // Get the navbar
// var navbar = document.getElementById("navbar");

// // Get the offset position of the navbar
// var sticky = navbar.offsetTop;

// // Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
// function myFunction() {
//   if (window.pageYOffset >= sticky) {
//     navbar.classList.add("sticky")
//   } else {
//     navbar.classList.remove("sticky");
//   }
// };


