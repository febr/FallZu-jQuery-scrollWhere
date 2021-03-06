/*!
* FallZu-jQuery-scrollWhere v1.0.1
* http://johnson4932.github.io/FallZu-jQuery-scrollWhere/
*
* Copyright (c) 2014 JohnsonLu
* Licensed under the MIT license
*/

(function($) {
    "use strict";

    var setCSS = function(fontColor, bgColor) {
        $('.fallzu-scroll-point').css({
            'position'      : 'fixed',
            'right'         : '0px',
            'top'           : '0px',
            'color'         : bgColor,
            'display'       : 'none'
        });

        $('.fallzu-scroll-bar').css({
            'position'      : 'fixed',
            'right'         : '30px',
            'bottom'        : '30px'
        });

        $('.fallzu-scroll-btn').css({
            'width'         : '50px',
            'height'        : '50px',
            'background'    : bgColor,
            'border-radius' : '25px',
            'text-align'    : 'center',
            'margin-bottom' : '10px'
        });

        $('.fallzu-scroll-btn > a').css({
            'display'       : 'block',
            'font-size'     : '16px',
            'color'         : fontColor
        });
    };

    $.fn.scrollWhere = function(devOptions) {
        // Insert HTML
        $(this).html(
            '<div class="fallzu-scroll-point">' +
                '<i class="fa fa-hand-o-right fa-2x"></i>' +
            '</div>' +
            '<div class="fallzu-scroll-bar">' +
                '<div class="fallzu-scroll-btn fallzu-scroll-return fallzu-scroll-return-top">' +
                    '<a href="#"><i class="fa fa-angle-double-up fa-3x"></i></a>' +
                '</div>' +
                '<div class="fallzu-scroll-btn fallzu-scroll-record">' +
                    '<a href="#"><i class="fa fa-pencil fa-3x"></i></a>' +
                '</div>' +
                '<div class="fallzu-scroll-area"></div>' +
                '<div class="fallzu-scroll-btn fallzu-scroll-return fallzu-scroll-return-bottom">' +
                    '<a href="#"><i class="fa fa-angle-double-down fa-3x"></i></a>' +
                '</div>' +
            '</div>'
        );

        // Option
        var defaultOptions = {
            topBtn      : true,
            bottomBtn   : true,
            recordBtn   : true,
            fontColor   : '#FFF',
            bgColor     : '#333'
        };

        var options = $.extend(defaultOptions, devOptions);

        // CSS
        setCSS(options.fontColor, options.bgColor);

        // Hide
        $('.fallzu-scroll-btn').hide();
        if (options.recordBtn) {
            $('.fallzu-scroll-record').show();
        }

        $(window).scroll(function() {
            var returnTop = $('.fallzu-scroll-return-top').stop(true, true);
            var returnBottom = $('.fallzu-scroll-return-bottom').stop(true, true);
            var windowHeight = $(this).height();
            var documentHeight = $(document).height();
            var scrollHeight = $(this).scrollTop();

            // Top
            if (options.topBtn) {
                if (scrollHeight) {
                    returnTop.fadeIn();
                } else {
                    returnTop.fadeOut();
                }
            }

            //Bottom
            if (options.bottomBtn) {
                if (windowHeight + scrollHeight < documentHeight) {
                    returnBottom.fadeIn();
                } else {
                    returnBottom.fadeOut();
                }
            }
        });

        // Top
        $('.fallzu-scroll-return-top').click(function(e) {
            e.preventDefault();
            $('html, body').animate({scrollTop:0}, 500);
        });

        // Bottom
        $('.fallzu-scroll-return-bottom').click(function(e) {
            e.preventDefault();
            $('html, body').animate({scrollTop:$(document).height() - $(window).height()}, 500);
        });

        // Record
        $('.fallzu-scroll-record').click(function(e) {
            e.preventDefault();
            var windowHeight = $(window).scrollTop();
            $('.fallzu-scroll-area').prepend(
                '<div class="fallzu-scroll-btn fallzu-scroll-anchor" data-scroll="' + windowHeight +  '">' +
                    '<a href="#"><i class="fa fa-anchor fa-3x"></i></a>' +
                '</div>'
            );
            setCSS(options.fontColor, options.bgColor);

            // Anchor
            $('.fallzu-scroll-area .fallzu-scroll-btn:first').on('click', function(e) {
                e.preventDefault();
                $('html, body').animate({scrollTop:$(this).data('scroll')}, 500);
            });

            // Anchor hover
            $('.fallzu-scroll-area .fallzu-scroll-btn:first').hover(function() {
                var pageHeight = $(document).height();
                var windowHeight = $(window).height();
                var position = $(this).data('scroll');

                //Height proportion
                var proportion  = position / pageHeight;
                var moveTopPosition = windowHeight * proportion;
                $('.fallzu-scroll-point').show();
                $('.fallzu-scroll-point').css({'top' : moveTopPosition});
            }, function() {
                $('.fallzu-scroll-point').hide();
            });
        });

        return $(this);
    };
})(jQuery);
