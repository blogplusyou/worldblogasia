//smart resize
(function($,sr){
  // debouncing function from John Hann
  // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
  var debounce = function (func, threshold, execAsap) {
      var timeout;

      return function debounced () {
          var obj = this, args = arguments;
          function delayed () {
              if (!execAsap)
                  func.apply(obj, args);
              timeout = null;
          };

          if (timeout)
              clearTimeout(timeout);
          else if (execAsap)
              func.apply(obj, args);

          timeout = setTimeout(delayed, threshold || 100);
      };
  }
  // smartresize 
  jQuery.fn[sr] = function(fn){  return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr); };

})(jQuery,'smartresize');




$.fn.registerToggle = function (content, tclass, atype, callback) {
    callback = (typeof (callback) == 'function') ? callback : function () {
    };
    tclass = tclass || 'active';

    $(this.selector).on('click', function () {

        $(this).toggleClass(tclass);

        switch (atype) {
            case 'prev':
                $(this).prev(content).slideToggle("fast", callback);
                break;
            case 'this':
                $(content).slideToggle("fast", callback);
                break;
            case 'parent-next':
                $(this).parent().next(content).slideToggle("fast", callback);
            default:
                $(content).slideToggle("fast", callback);
        }

    });
};



jQuery(document).ready(function () {


    $('.idea-slider').bxSlider({
        nextText: '',
        prevText: '',
        pager: false,
        mode: 'fade',
        auto: true,
        pause: 5000, 
    });


    

    function adjustsliderheight() {}

    setTimeout(adjustsliderheight(), 1000);


    $('ul.product-tab-nav li').click(function () {
        var tab_id = $(this).attr('data-tab');

        $('ul.product-tab-nav li').removeClass('active');
        $('.tab-content').removeClass('active');

        $(this).addClass('active');
        $("#" + tab_id).addClass('active');
    });




    //hide backto site if viewing account
    var accountnav = $('.account-nav-wrapper');
    var backtoprods = $('.category-list .back-to-site');
    if (accountnav.length > 0) {
        backtoprods.hide();
    } else {
        backtoprods.css({'display': 'block'});
    }



    jQuery('.trigger').registerToggle('.tablet-menu', 'active');
    jQuery('.mobile-menu-trigger').registerToggle('.menu-mobile', 'active');
    jQuery('.login-trigger').registerToggle('.checkout-login-form-wrapper', 'active');



    $('.submenu-trigger').click(function () {

        console.log('sub menu trigger clicked');

        $(this).toggleClass('active');
        $(this).next('.submenu').slideToggle("fast", function () {
            //notify
        });

        $(this).next('.mobile-submenu').slideToggle("fast", function () {
            //notify
        });


    });



    function showmenuafterresize() {

        var menu = jQuery('.main-menu');
        var tabletmenu = $('.tablet-menu');

        var dropdown = jQuery('.submenu');
        var menubutton = jQuery('.menu-trigger');

        var bp = 992;
        var innerwidth = jQuery('body').innerWidth();


        if (innerwidth >= bp) {

            menu.css({display: 'block'});
            dropdown.css({display: ''});
            menubutton.css({display: ''});

            tabletmenu.css({display: ''});

        }

        else {

            menu.css({display: 'none'});
            dropdown.css({display: 'none'});
            menubutton.css({display: 'block'});

        }
    }


    $(window).on('resize', showmenuafterresize);
    $(window).on('resize', adjustsliderheight);


    jQuery('a[href*=#]:not([href=#])').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
                || location.hostname == this.hostname) {

            var target = jQuery(this.hash);
            target = target.length ? target : jQuery('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                jQuery('html,body').animate({
                    scrollTop: target.offset().top
                }, 1000);
                return false;
            }
        }
    });


    //Guest checkout radio toggle view

    function billingShowGuest() {
        var value = $("input[name='billingAddress']:checked").val();
        if (value == "useBillingAddressEntered") {
            $("#alternate-billing-address").show();
        } else {
            $("#alternate-billing-address").hide();
        }
    }
    function billingShow() {
        var value = $("input[name='billingAddress']:checked").val();
        if (value == "useBillingAddressEntered") {
            $("#billing").show();
        } else {
            $("#billing").hide();
        }
    }
    function deliveryShow() {
        var value = $("input[name='shippingAddress']:checked").val();
        if (value == "useShippingAddressEntered") {
            $("#delivery").show();
        } else {
            $("#delivery").hide();
        }
    }




    var guestDelivery = $('#other');
    var guestDeliveryAddress = $('.alternate-billing-address');
    var billingAddress = $('#billingAddress');
    var billing = $('#billing');
    var shippingAddress = $('#other');
    var delivery = $('#delivery');
    billingShowGuest();
    billingShow();
    deliveryShow();

    $('input[name="billingAddress"]').click(function () {

        if (guestDelivery.is(':checked')) {
            guestDeliveryAddress.show();
        } else {
            guestDeliveryAddress.hide();
        }

    });
    $('input[name="billingAddress"]').click(function () {

        if (billingAddress.is(':checked')) {
            billing.show();
        } else {
            billing.hide();
        }

    });
    $('input[name="shippingAddress"]').click(function () {

        if (shippingAddress.is(':checked')) {
            delivery.show();
        } else {
            delivery.hide();
        }

    });




    $('.qty-up').click(function (e) {
        e.preventDefault();
        var num = parseInt($('#quantity').val()) + 1;
        $('#quantity').val(num);
    });

    $('.qty-down').click(function (e) {
        e.preventDefault();
        var num = parseInt($('#quantity').val()) - 1;
        num <= 1 ? $('#quantity').val('1') : $('#quantity').val(num);
    });




    //Image thumbnails

    var imgthumb = $('.product-thumbnail img');

    var thumbwrap = $('.product-thumbnail');
    thumbwrap.removeClass('active');

    var singleimage = imgthumb.parents('.product-thumbs').siblings('.single-product-image');

    $(imgthumb).click(function () {
        var imgurl = $(this).attr('data-image');

        console.log(imgurl);

        $('.single-product-image img').attr({src: imgurl});
        thumbwrap.removeClass('active');
        $(this).parents('.product-thumbnail').addClass('active');
    });


    $('#searchBtn').click(function (e) {
        e.preventDefault();
        if ($('#sitesearch').val()) {
            $('#searchform').submit();
        }
        
    });





    //we have to do clearfix depending on screen widths
    //smartloop to populate clearfix
    function smartclearfixloop(productdivs, nth){
        productdivs.each(function(index){
            var counternew = index + 1;
            if (counternew % nth == 0) {
                $(this).parents('.col-sm-4').after('<div class="clearfix"></div>');
            }
            counternew ++;
        });
    }

    
    //first get screen width as css sees it products
    function smartclearfixes(){

        var screenwidth = jQuery('#mediasizer').css('width');
        var screenwidthnumeric = parseInt(screenwidth);

        var productdivs = $('.product-category .category-product');
        var clearfixdivs = $('.product-category .clearfix');

        if(screenwidthnumeric < 768) {
            //detach clearfixes 
            clearfixdivs.detach();
            smartclearfixloop(productdivs, 2);

            console.log(screenwidthnumeric);
            
        } else {
            //attach relevant clearfixes
            clearfixdivs.detach();
            smartclearfixloop(productdivs, 3);
        }

    }


    //search results
    function smartclearfixesresults(){

        var screenwidth = jQuery('#mediasizer').css('width');
        var screenwidthnumeric = parseInt(screenwidth);

        var productdivs = $('.products-search .product-result');
        var clearfixdivs = $('.products-search .clearfix');

        if(screenwidthnumeric < 768) {
            //detach clearfixes 
            clearfixdivs.detach();
            smartclearfixloop(productdivs, 2);
            
        } else {
            //attach relevant clearfixes
            clearfixdivs.detach();
            smartclearfixloop(productdivs, 3);
        }

    }




    //clearfix related products

    function smartclearfixesrelated(){

        var screenwidth = jQuery('#mediasizer').css('width');
        var screenwidthnumeric = parseInt(screenwidth);

        var productdivs = $('.related-products .category-product');
        var clearfixdivs = $('.related-products .clearfix');

        if(screenwidthnumeric < 768) {
            //detach clearfixes 
            clearfixdivs.detach();
            smartclearfixloop(productdivs, 2);
            
        } else {
            //attach relevant clearfixes
            clearfixdivs.detach();
            smartclearfixloop(productdivs, 3);
        }

    }


    


    smartclearfixes();
    smartclearfixesresults();
    smartclearfixesrelated();
    //and also do on window resize
    $(window).smartresize(function(){
        smartclearfixes();
        smartclearfixesresults();
        smartclearfixesrelated();
    });



    //instead of smart clearfix match-height and see which displays better
    $('.category-product').matchHeight({
        property: 'height',
        target: null,
        remove: false
    });

    $('.blog-item').matchHeight({
        property: 'height',
    });

    $('.category-product-info h3').matchHeight({
        property: 'height',
    });

    $('.product-result').matchHeight({
        property: 'height',
    });

    $('.category-product-info').matchHeight({
        property: 'height',
    });


    //strip editor image styles
    $('.content-inner img').removeAttr('style');
    $('.content-inner img').attr({
        width: '',
        height: ''
    });



    //checkout thanks stacktable
    $('.thanks-item-table table').stacktable({
        headIndex : 1,
    });


    //ashbourne remove pull-right on slider in mobile view

    function removepullright(){
        var docwidth = $('#mediasizer').width();
        var slidetitle = $('h1.slider-title');
        var slidedesc = $('p.slider-description');
        var slidelink = $('a.slider-link');

        docwidth = parseInt(docwidth);
        if (docwidth < 768){
            slidetitle.removeClass('pull-right');
            slidedesc.removeClass('pull-right');
            slidelink.removeClass('pull-right');
        }
        else {
            slidetitle.addClass('pull-right');
            slidedesc.addClass('pull-right');
            slidelink.addClass('pull-right');   
        }
    }

    removepullright();

    //and also do on window resize
    $(window).smartresize(function(){
        removepullright();
    });



});

//cookie policy 
$('.dismiss-message').click(function () {
    $(this).parents('.feedback-message').fadeOut();

    //if cookie notice then set cookie
    if ($(this).attr('id') == 'cookieNoticeClose') {
        Cookies.set('cookiesAccepted', 1, { expires: 365, path: '/' });
    }

});