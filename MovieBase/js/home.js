$(function () {
    $("#mdb-lightbox-ui").load("../mdb-addons/mdb-lightbox-ui.html");
});

$('.navbar-collapse a').click(function () {
    $(".navbar-collapse").collapse('hide');
});

new WOW().init();