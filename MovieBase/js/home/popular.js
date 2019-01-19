/* GLOBAL */
var page = 1;
var rowID = 0;



/* GET API CURRENT IMAGE CONFIGURATION */
var imageUrlPrefix = "";
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
    console.log(imageUrlPrefix);
});

/* APPEND ROW FUNCTION (4 MOVIES/ROW) */
function appendRow(rowID) {
    $("#popularMoviesSection").append(`<div class="row" id="row` + rowID+`"></row>`);
}

/* APPEND MOVIE TO ROW FUNCTION */
function appendMovie(rowID, title, imagePath) {
    $("#row" + rowID).append(`<div class="col-lg-3 col-md-6 mb-4">
                        <div class="card">
                            <div class="view overlay z-depth-1">
                                <img src="`+ imageUrlPrefix + imagePath +`" class="card-img-top" alt="">
                                <a>
                                    <div class="mask rgba-white-slight"></div>
                                </a>
                            </div>
                            <div class="card-body text-center no-padding">
                                <a href="" class="text-muted">
                                    <h6>01/01/2019</h6>
                                </a>
                                <h4 class="card-title">
                                    <strong>
                                        <a href="">`+title+`</a>
                                    </strong>
                                </h4>
                                <p class="card-text">
                                    Neque porro quisquam est, qui dolorem ipsum quia dolor.
                                </p>
                                <div class="card-footer bg-transparent">
                                    <span class="float-left">
                                        Rating
                                    </span>
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
        console.log(response);
        for (var i = 0, l = response.results.length; i < l; i++) {
            if (i % 4 == 0) {
                rowID++;
                appendRow(rowID);
            }
            appendMovie(rowID, response.results[i].title, response.results[i].poster_path);
        }
        $("#loader").addClass("d-none");
    });
}


/* BOTTOM REACHING / INFINITE SCROLL LOADING */
$(window).on("scroll", function () {
    var scrollHeight = $(document).height();
    var scrollPosition = $(window).height() + $(window).scrollTop();
    if ((scrollHeight - scrollPosition) / scrollHeight === 0) {
        $("#loader").removeClass("d-none");
        page++;
        loadAPI(page);
    }
});

/* FIRST LOAD */
$(document).ready(function () {
    loadAPI(page);
});