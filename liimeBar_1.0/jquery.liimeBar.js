/*!
 * liimeBar - for jQuery
 * http://codecanyon.net/user/Liime/profile
 *
 * Copyright 2011, Andy Marshall
 * http://codecanyon.net/wiki/buying/howto-buying/licensing/
 *
 * Version: 1.0.0 (21 Sep 2011)
 *
 * Requires jQuery Mousewheel plugin
 * http://plugins.jquery.com/project/mousewheel
 */

/*!
 * liimeBar - for jQuery
 * http://codecanyon.net/user/Liime/profile
 *
 * Copyright 2011, Andy Marshall
 * http://codecanyon.net/wiki/buying/howto-buying/licensing/
 *
 * Version: 1.0.0 (21 Sep 2011)
 *
 * Requires jQuery Mousewheel plugin
 * http://plugins.jquery.com/project/mousewheel
 */
(function ($) {
  $.fn.liimeBar = function (d) {
    var d = $.extend({
      hideBar: true,
      hideButton: true,
      scrollSpeed: 20,
      barColour: '#000000',
      barOpacity: 0.3,
      buttonColour: '#000000',
      buttonOpacity: 0.3,
      loopCheck: false
    }, d || {});
    var e = false;
    var f;
    var g = false;
    var h = false;
    var i = 10;
    if (!(window.innerHeight)) {
      window.innerHeight = document.documentElement.clientHeight;
      e = true
    }
    var j = window.innerHeight;
    constructScrollers();
    if (d.loopCheck) {
      checkHeight()
    }

    function checkHeight() {
      if (j < $('body')[0].scrollHeight) {
        f = $('#liimeBar_wrapper').height();
        $('#liimeBar_bar').height(j - 20);
        $('#liimeBar_button').height(((j - 20) / f) * j)
      }
      setTimeout(checkHeight, 500)
    }

    function constructScrollers() {
      if (j < $('body')[0].scrollHeight) {
        var a = $('body').html();
        $('body').html('').prepend('<div id="liimeBar_bar"></div><div id="liimeBar_button"></div><div id="liimeBar_wrapper">' + a + '</div>').css({
          'overflow': 'hidden'
        });
        f = $('#liimeBar_wrapper').height();
        $('#liimeBar_button').css({
          opacity: d.buttonOpacity,
          'background': d.buttonColour
        }).height(((j - 20) / f) * j);
        $('#liimeBar_bar').height(j - 20);
        if (!d.hideBar) {
          $('#liimeBar_bar').css({
            opacity: d.barOpacity,
            'background': d.barColour
          })
        }
      }
    }
    if (d.hideButton) {
      $('#liimeBar_button').hide()
    }
    $('#liimeBar_button').mousedown(function (c) {
      if (c.preventDefault) {
        c.preventDefault()
      }
      onMove = (((i * -1) / f) * (j - 20)) * -1 + c.pageY;
      scrollBarHeight = $('#liimeBar_button').height();
      $(document).unbind('mouseup').mousemove(function (a) {
        if (a.pageY - onMove + 10 >= 10 && a.pageY - onMove + 20 + scrollBarHeight <= j) {
          var b = a.pageY - onMove + 10;
          $('#liimeBar_button').css({
            'top': b
          });
          i = ((b - 10) / (j - 20)) * f * -1;
          $('#liimeBar_wrapper').css({
            'top': i
          })
        } else if (a.pageY - onMove + 20 + scrollBarHeight > j) {
          var b = j - scrollBarHeight - 10;
          $('#liimeBar_button').css({
            'top': b
          });
          $('#liimeBar_wrapper').css({
            'top': window.innerHeight - f
          })
        } else if (a.pageY - onMove + 10 < 10) {
          $('#liimeBar_button').css({
            'top': 10
          });
          $('#liimeBar_wrapper').css({
            'top': 0
          })
        }
      }).mouseup(function () {
        $(document).unbind('mousemove').unbind('mouseup');
        h = setTimeout(hideScroller, 600)
      })
    });
    $('html').mousewheel(function (a, b) {
      if (!g) {
        clearTimeout(h);
        h = setTimeout(hideScroller, 500)
        $('#liimeBar_button').fadeIn(150)
      }
      b *= d.scrollSpeed;
      if (i + b <= 0 && i + b >= window.innerHeight - f) {
        i += b;
        $('#liimeBar_wrapper').css({
          'top': i
        });
        $('#liimeBar_button').css({
          'top': (((i * -1) / f) * (j - 20) + 10) < (j - 20) ? ((i * -1) / f) * (j - 20) + 10 : j - 20
        })
      } else if (i + b < window.innerHeight - f) {
        $('#liimeBar_wrapper').css({
          'top': window.innerHeight - f
        });
        $('#liimeBar_button').css({
          'top': j - 10 - $('#liimeBar_button').height()
        })
      } else if (i + b > 0) {
        $('#liimeBar_wrapper').css({
          'top': 0
        });
        $('#liimeBar_button').css({
          'top': 10
        })
      }
    });
    $(window).resize(function () {
      if (e) {
        window.innerHeight = document.documentElement.clientHeight
      }
      if (window.innerHeight > j && (f + i) < window.innerHeight) {
        i -= (f + i) - window.innerHeight;
        $('#liimeBar_wrapper').css({
          'top': i
        })
      }
      j = window.innerHeight;
      $('#liimeBar_button').css({
        'top': ((i * -1) / f) * (j - 20) + 10
      });
      $('#liimeBar_bar').height(j - 20);
      $('#liimeBar_button').height(((j - 20) / f) * j)
    });
    $('#liimeBar_bar').mouseover(function (a) {
      $('#liimeBar_button').fadeIn(150);
      g = true;
      clearTimeout(h)
    }).mouseout(function (a) {
      h = setTimeout(hideScroller, 600);
      g = false
    });

    function hideScroller() {
      if (!($(document).data('events')) && !g && d.hideButton) {
        $('#liimeBar_button').stop().fadeOut(250)
      }
    }
  }
})(jQuery)