$(document).ready(function () {
    $('.mdb-select').materialSelect(); 

    $("#searchMovie").keyup(function (e) {
        if ($(this).val() != "") {
            $("#divResults").removeClass("d-none");
            showResults($(this).val());
        } else {
            $("#divResults").addClass("d-none");
        }
    })
});

function showResults(search) {
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://api.themoviedb.org/3/search/movie?api_key=840a49ef22ad1005a33effa837972b8e&language=en-US&page=1&include_adult=false&query=" + search,
        "method": "GET",
        "headers": {},
        "data": "{}"
    }

    $.ajax(settings).done(function (response) {
        $("#movieList").empty();
        for (var i = 0, l = response.results.length; i < l; i++) {
            $("#movieList").append(`<a href="./Movie?id=` + response.results[i].id + `">` + response.results[i].title + `</a></br>`);
        }
    });
};