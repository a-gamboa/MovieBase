/* GLOBAL */
const urlParams = new URLSearchParams(window.location.search);
var nActors = 6;
var imageUrlPrefix;
var castJSON;

/* FIRST API LOAD + API CURRENT IMAGE CONFIGURATION */
var configSettings = {
    "async": true,
    "crossDomain": true,
    "url": "https://api.themoviedb.org/3/configuration?api_key=840a49ef22ad1005a33effa837972b8e",
    "method": "GET",
    "headers": {},
    "data": "{}"
}
$.ajax(configSettings).done(function (response) {
    imageUrlPrefix = response.images.secure_base_url;
});

var castSettings = {
    "async": true,
    "crossDomain": true,
    "url": "https://api.themoviedb.org/3/movie/" + urlParams.get('id') + "/credits?api_key=840a49ef22ad1005a33effa837972b8e",
    "method": "GET",
    "headers": {},
    "data": "{}"
}
$.ajax(castSettings).done(function (response) {
    cast = response.cast;
});


$(document).ready(function () {
    /* LOAD MORE CLICK */
    $("#loadMoreBtn").on("click", function () {
        loadMore();
    });
});


/* APPEND ROW FUNCTION (4 MOVIES/ROW) */
function loadMore() {

    $("#loadMoreBtn").addClass("d-none");
    $("#loader").removeClass("d-none");

    var i = nActors;
    for (let j = nActors; j < i + 6; j++) {
        $("#actorsDiv").append(`<div class="col-6 col-md-4 px-2 pt-3 text-center">
                                                            <div class="avatar mx-auto mb-3 view overlay zoom">
                                                                <a href="`+ locationOrigin + `/Actor?ID=`+ cast[nActors].id + `">
                                                                    <img src="`+ imageUrlPrefix + `/w300` + cast[nActors].profile_path + `" class= "z-depth-1 img-fluid rounded" >
                                                                </a>
                                                            </div>
                                                            <a href="`+ locationOrigin + `/Actor?ID=`+ cast[nActors].id + `" class="h5 h5-responsive blue-text font-weight-bold">` + cast[nActors].name + `</a>
                                                            <h6 class="h6-responsive m-0">`+ cast[nActors].character + `</h6>
                                                        </div>`);
        nActors++;
        if (cast[nActors] === undefined) {
            break;
        }
    }
    
    $("#loader").addClass("d-none");
    if (cast[nActors] !== undefined) {
        $("#loadMoreBtn").removeClass("d-none");
    }
}