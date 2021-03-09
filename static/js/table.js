d3.csv('data/new_country_data.csv').then(function(data) {
    d3.select("tbody")
        .selectAll("tr")
        .data(data)
        .enter()
        .append("tr")
        .html(function(d) {
            return `<td>${d.country}</td> <td>${d.gdp_percapita_2015}</td> <td>${d.sui_per_100k_2015}</td> <td>${d.happiness_score_2015}</td> <td>${d.human_development_index}</td> <td>${d.happiness_rank_2015}</td> <td>${d.hdi_rank}</td> <td>${d.private_debt_2015}</td> <td>${d.health_spending_percapita_2015}</td> <td>${d.alcohol_consumption_percapita}</td>`;
        });

})

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