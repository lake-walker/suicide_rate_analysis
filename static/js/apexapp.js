// This worked but with ALL the data

var chart = c3.generate({
    data: {
        url: 'data/region_data.csv',
        type: 'bar',
        labels: true,
        x: 'region',
        columns: [
            ['region', 'Australia and New Zealand','Central and Eastern Europe','Eastern Asia','Latin America and Caribbean','Middle East and Northern Africa','North America','Southeastern Asia','Southern Asia','Sub-Saharan Africa','Western Europe']
        ]
    },
    axis: {
        x: {
            type: 'category',
            categories: ['Australia and New Zealand','Central and Eastern Europe','Eastern Asia','Latin America and Caribbean','Middle East and Northern Africa','North America','Southeastern Asia','Southern Asia','Sub-Saharan Africa','Western Europe'],
            // tick: {
            //     fit: true,
            //     values: ['Australia and New Zealand','Central and Eastern Europe','Eastern Asia','Latin America and Caribbean','Middle East and Northern Africa','North America','Southeastern Asia','Southern Asia','Sub-Saharan Africa','Western Europe']
            // }
        }
    }
});

// When the user scrolls the page, execute myFunction
window.onscroll = function() {myFunction()};

// Get the navbar
var navbar = document.getElementById("navbar");

// Get the offset position of the navbar
var sticky = navbar.offsetTop;

// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky")
  } else {
    navbar.classList.remove("sticky");
  }
};