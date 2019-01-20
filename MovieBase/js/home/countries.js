﻿/* COUNTRIES SELECT */
$(document).ready(function () {
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://api.themoviedb.org/3/configuration/countries?api_key=c5e4a1733c2995102fafe209c014e4c0",
        "method": "GET",
        "headers": {},
        "data": "{}"
    }
    $.ajax(settings).done(function (response) {
        for (var i = 0, l = response.length; i < l; i++) {
            $("#countrySelector").append(`<option value="` + response[i].iso_3166_1 + `" ` + (response[i].iso_3166_1 == "US" ? "selected" : "") +`>` + response[i].english_name + `</option>`);
        }
        $('.mdb-select').materialSelect();
        $('#countrySelector').on('change', function () {
            console.log("API Call for country: " + this.value);
            loadAPIbyCountry(this.value);
        });
    });
});


/* LOAD API / COUNTRY FILTER */
function loadAPIbyCountry(country) {
    page = 1;
    $("#loader").removeClass("d-none");
    $("#popularMoviesSection").empty();

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://api.themoviedb.org/3/movie/popular?page=" + page + "&language=en-US&region=" + country + "&api_key=c5e4a1733c2995102fafe209c014e4c0",
        "method": "GET",
        "headers": {},
        "data": "{}"
    }

    $.ajax(settings).done(function (response) {
        for (var i = 0, l = response.results.length; i < l; i++) {
            if (i % 4 == 0) {
                rowID++;
                appendRow(rowID);
            }
            appendMovie(rowID, response.results[i].title, response.results[i].id, response.results[i].poster_path, new Date(response.results[i].release_date), response.results[i].overview, response.results[i].vote_average);
        }
        $("#loader").addClass("d-none");
    });
}