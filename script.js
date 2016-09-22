let activeImage = 0;
let imageContainer;
let imgSrc;

$(document).ready(() => {
    let content = $('.content');

    content.load('kezdolap.html');

    $("nav ul li").each(function () {
        $(this).click(function (event) {
            event.preventDefault();
            let source = $(this).children().attr('href')

            content.load(source, function() {
                if (source === 'kepek.html') {
                    imageContainer = $('.image-container');
                    imageContainer.css('background-image', 'url("' + imgSrc[activeImage] + '")');
                    subscribe();
                }

               /* if (source === 'tulajdonsagok.html') {
                    $.getJSON('news.json', function(data) {
                        $.each(data, function(key, val) {
                            $('div.news').append(
                                    '<div><h2>' + val['title'] + '</h2><p>' + val['date'] + '</p></div>');
                        });
                    });
                }*/
            });
        })
    })

    $.getJSON('picsinfo.json', function(data) {
        imgSrc = data.sources;
    });

    let navBar = $('nav');
    let navBarOffsetTop = navBar.offset().top;

    $(window).on("scroll", _.throttle(function () {



        if ($(window).scrollTop() > navBarOffsetTop) {
        navBar.addClass('fixed')
    } else {
        navBar.removeClass('fixed');
    }
    }, 100));
})

function subscribe() {
    $('.content').on('click', '.left-handler', function() {
        imageContainer.css('background-image', 'url("' + getImgSrc(false) + '")');
    });

    $('.content').on('click', '.right-handler', function() {
        imageContainer.css('background-image', 'url("' + getImgSrc(false) + '")');
    });
}

function getImgSrc(direction) {
	if (direction === false) {
  	activeImage = (activeImage - 1 < 0) ? imgSrc.length - 1 : activeImage - 1;
  } else if (direction === true) {
  	activeImage = (activeImage + 1 > imgSrc.length - 1) ? 0 : activeImage + 1;
  }

  return imgSrc[activeImage];
}