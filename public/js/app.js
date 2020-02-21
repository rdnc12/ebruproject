//jshint esversion:6

///sticky navbar when on scroll

$(window).bind('scroll', function() {
    if ($(window).scrollTop() > 512) {
        $('.navbar').addClass('fixed-top rounded-pill shadow');

    } else {
        $('.navbar').removeClass('fixed-top rounded-pill shadow');
    }
});

// smooth scroll
$('#back-to-top').click(function(link) {
    link.preventDefault();
    let target = $(this).attr('href');
    $('html, body').animate({
        scrollTop: $(target).offset().top - 25
    }, 3000);

});

//window scroll

$(window).scroll(function() {
    let position = $(this).scrollTop();
    if (position >= 513) {
        $('#back-to-top').addClass('scrollTop');
        $('#back-to-top').addClass('shadow-sm');
        $('#back-to-top').addClass('rounded');


    } else {
        $('#back-to-top').removeClass('scrollTop');
        $('#back-to-top').removeClass('shadow-sm');
        $('#back-to-top').removeClass('rounded');

    }
});

$('#myCarousel').carousel({
    interval: 3000,
})