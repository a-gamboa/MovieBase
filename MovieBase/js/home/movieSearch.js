$(document).ready(function () {
    $('.mdb-select').materialSelect(); 

    $("#searchMovie").keyup(function (e) {
        if ($(this).val() != "") {
            $("#divResults").removeClass("d-none");
        } else {
            $("#divResults").addClass("d-none");
        }
        

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://api.themoviedb.org/3/search/movie?api_key=c5e4a1733c2995102fafe209c014e4c0&language=en-US&page=1&include_adult=false&query=" + $(this).val(),
            "method": "GET",
            "headers": {},
            "data": "{}"
        }

        $.ajax(settings).done(function (response) {
            $("#movieList").empty();
            console.log("a");
            for (var i = 0, l = response.results.length; i < l; i++) {
                $("#movieList").append(`<a href="./Movie?id=` + response.results[i].id + `">` + response.results[i].title + `</a></br>`);
            }
        });
    })
});
