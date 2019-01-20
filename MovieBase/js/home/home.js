/* GLOBAL */
var page = 1;
var rowID = 0;
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var imageUrlPrefix = "";


/* FIRST LOAD + API CURRENT IMAGE CONFIGURATION */
$(document).ready(function () {
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://api.themoviedb.org/3/configuration?api_key=c5e4a1733c2995102fafe209c014e4c0",
        "method": "GET",
        "headers": {},
        "data": "{}"
    }
    $.ajax(settings).done(function (response) {
        imageUrlPrefix = response.images.secure_base_url + "w600_and_h900_bestv2";
        loadAPI(page);

        /* BOTTOM REACHING / INFINITE SCROLL LOADING */
        $(window).scroll(function () {
            if ($(window).scrollTop() + $(window).height() >= ($(document).height() - 100)) {
                $("#loader").removeClass("d-none");
                page++;
                loadAPI(page);
            }
        });
    });
});


/* APPEND ROW FUNCTION (4 MOVIES/ROW) */
function appendRow(divName, rowID) {
    $("#"+divName).append(`<div class="row" id="row` + rowID + `"></row>`);
}


/* APPEND MOVIE TO ROW FUNCTION */
function appendMovie(rowID, title, movieID, imagePath, releaseDate, overview, rating) {
    $("#row" + rowID).append(`<div class="col-lg-3 col-md-6 mb-4">
                        <div class="card">
                            <div class="view overlay z-depth-1">
                                <img src="`+ imageUrlPrefix + imagePath + `" class="card-img-top" alt="">
                                <a href="./Movie?id=`+ movieID + `">
                                    <div class="mask rgba-white-slight"></div>
                                </a>
                            </div>
                            <div class="card-body text-center p-3">
                                <a href="" class="text-muted">
                                    <h6><i class="far fa-clock pr-2"></i>`+ monthNames[releaseDate.getMonth()] + ` ` + releaseDate.getDay() + `, ` + releaseDate.getFullYear() + `</h6>
                                </a>
                                <h4 class="card-title">
                                    <strong>
                                        <a href="./Movie?id=`+ movieID + `">` + title + `</a>
                                    </strong>
                                </h4>
                                <p class="card-text">
                                    `+ overview.substring(0, 80) + `...
                                </p>
                                <div class="card-footer bg-transparent">
                                    <span class="badge badge-pill `+ ratingColor(rating) + ` float-left pt-1">
                                        `+ rating + `
                                    </span>
                                    <span class="small grey-text float-left ml-1">/10</span>
                                    <span class="float-right">
                                        <a class="" data-toggle="tooltip" data-placement="top" title="Add to Wishlist">
                                            <i class="fas fa-heart heart mr-2"></i> <span>X</span>
                                        </a>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>`);
}


/* RATING COLOR */
function ratingColor(rating) {
    if (rating >= 7) {
        return "success-color";
    } else if (rating >= 6) {
        return "indigo";
    } else if (rating >= 5) {
        return "warning-color-dark";
    } else if (rating < 5) {
        return "red darken-2";
    }
}


/* SETTINGS + API CALL */
function loadAPI(page) {
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://api.themoviedb.org/3/movie/popular?page=" + page + " &language=en-US&api_key=c5e4a1733c2995102fafe209c014e4c0",
        "method": "GET",
        "headers": {},
        "data": "{}"
    }

    $.ajax(settings).done(function (response) {
        //console.log(response);
        for (var i = 0, l = response.results.length; i < l; i++) {
            if (i % 4 == 0) {
                rowID++;
                appendRow("popularMoviesSection", rowID);
            }
            appendMovie(rowID, response.results[i].title, response.results[i].id, response.results[i].poster_path, new Date(response.results[i].release_date), response.results[i].overview, response.results[i].vote_average);
        }
        $("#loader").addClass("d-none");
    });
}