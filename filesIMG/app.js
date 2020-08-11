
$.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

(function () {

  'use strict';


  App.debouncer = function(func, time) 
    { 
      var timeoutID,
        timeout = time || 200;

      return function() 
      {
        var scope = this, args = arguments;
          clearTimeout(timeoutID);
          timeoutID = setTimeout(function () 
          {
            func.apply(scope, Array.prototype.slice.call(args));
          }, timeout);
      };
  };

  App.resizeBanner = function() {
    var banner = $('.banner ul'),
        oHeight = 375,
        oWidth = 1024,
        nWidth = banner.width(),
        ratio = oHeight / oWidth,
        nHeight = ratio * nWidth;

        banner.css('height', nHeight);
  };


  App.animateBanner = function(ref, el, speed, fade) {
    var slides = $(el),
        length = slides.length,
        last = (length - 1),
        next = (ref === last) ? 0 : (ref + 1),
        delay = speed;
        App.slideref = ref;

      $(slides[ref]).delay(delay).fadeOut(fade);

      $(slides[next]).delay(delay).fadeIn(fade, function(){
          window.setTimeout(function() {
            App.animateBanner(next, el, speed, fade);
          }, delay);
          App.slideref = next;
        });
  };





  // $('.basket-qty-update , .basket-qty-remove').click(function(e){

  //    e.preventDefault();
  //    var el = this ;

  //    //get your various data attributes here
  //     var action = $(el).data('qtyaction'),
  //         qty = $(el).data('qtyProduct'),
  //         value = $(el).data('qtyValue');

  //     console.log(action);

  //     //create a data array 
  //     var data = [];
  //     data.push({action, value, qty});

  //    $.ajax({
  //     type: "POST",
  //     url: '/ajax/ajaxProduct.php',
  //     data: data,

  //    }).done(function(msg){
  //     $('.response-div').html(msg);
  //     console.log('basket update ajax complete');
  //    })




  // });






 // };

//  App.prepareSubmit = function()  {
//    var submit = $('.button.buy-me, .form-submit');
//    //Makes buttons behave like submit elements, but allows links to have url for backup 
//      submit.click(function(e) {
//          e.preventDefault();
//          var el = this;
//          
//          if($(el).hasClass('buy-me')) {
//            //this is a product button, submit through ajax
//             App.ajaxProductAdd(el);
//          }
//          else
//          {
//            $(el).closest('form').submit();
//          }
//          
//      });
//  };


//    App.prepareSubmit = function()  {
//        var submit = $('.button.buy-me');
//        submit.click(function(e) {
//            e.preventDefault();
//            App.ajaxProductAdd(this);
//        });
//    };


    /**
     * @desc Add product To Basket
     * @returns {undefined}
     */
    App.ajaxProductAdd = function() {
        
        $('.button.buy-me').click(function(e) {
        
            e.preventDefault();
       
            //console.log('ajaxProductAdd');
            
            var el = this;
            
            // var data = {},
            var data = $(el).closest('form').serializeObject();
            console.log(data);

            //update the button so we know we're submitting
            $(el).addClass('not-in-stock').find('span').text('Adding...');

            //start the submission
        
            $.ajax({
                type: "POST",
                // dataType: "json",
                async: false,
                url: '/ajax/addProductToBasket.php',
                data: data,
            })
            .done(function( response ) {
                
                // alert(response);
                response = $.parseJSON(response);
        
                //update the button
                $(el).removeClass('not-in-stock').find('span').text(App.translate.buyMore).parent().addClass('added');
                //$(this).prev('.group').find('.alreadyInBasket').text('('+response.itemCount+' '+App.translate.inBasket+')');
                
                //update the basket at the top
                $('.basket-items span').text(response.totalCount);
                $('#orderTotal span').html(response.totalPrice);
                $('#orderTotalMob span').html(response.totalPrice);

                //update quantity in basket
                // $('.quantity-in-basket').html(response.itemCount);
                $('.quantity-in-basket').html(response.itemCount);
                
            })
            .fail(function() {
                $(el).addClass('font-small').html('could not add to basket');
                window.setTimeout(function () {
                    $(el).removeClass('not-in-stock font-small').html('<span>'+App.translate.buyMore+'</span>');
                }, 2000);
            });
        });
    };



  App.resizeElement = function(el, width, limit) {

   if($(el).length > 0) {
    var box = $(el),
        oWidth = width,
        nWidth = $(el)[0].parentElement.clientWidth,
        ratio = nWidth / oWidth,
        nHeight = box.height() * ratio;

        if(window.outerWidth >= limit || (limit === 0)) {

          box.css({ 'transform': 'scale('+ratio+')', 'transform-origin': '0 0' });
          box.parent().css({ height: nHeight });
        }
        else
        {
          box.css({ 'zoom': 1, 'transform': 'scale(1)'});
          box.parent().css({ height: 'auto'});
        }
    }
  };

  //ajax call for instagram feed. Appends photos/links to social box
  // App.setPictures = function() {
  //     $.ajax({
  //       url: 'https://api.instagram.com/v1/users/499539682/media/recent?count=2&access_token=499539682.1fb234f.8197fcccdeb94fff99b12553f029b770',
  //       method: 'GET',
  //       dataType: "jsonp",
  //       jsonp: "callback",
  //       jsonpCallback: "jsonpcallback",

  //     })
  //     .done(function(response) {
        
  //       var instaBox = $('#instagram .inner');

  //       $.each(response.data, function(i, v){

  //         instaBox.append('<a id="pic'+i+'" href="'+v.link+'" target="_new"><img src="'+v.images.thumbnail.url+'" alt="'+v.caption.text+'"></a>');
  //       });

  //     });
  // };


  App.setPictures = function(userid,divid) {
    if($(divid).length) {
        $.ajax({
          url: 'https://api.instagram.com/v1/users/'+userid+'/media/recent?count=2&access_token=30917341.1fb234f.52a80751b823476996d37725133f7912',
          method: 'GET',
          dataType: "jsonp",
          jsonp: "callback",
          jsonpCallback: "jsonpcallback",

        })
        .done(function(response) {
          
          var instaBox = $(divid +' .inner');

          $.each(response.data, function(i, v){
            instaBox.append('<a id="pic'+i+'" href="'+v.link+'" target="_new"><img src="'+v.images.thumbnail.url+'" alt="'+v.caption.text+'"></a>');
          });

        });
      }
  };

//checks the width of the browser and sets the nav as collapsed if needed
  App.checkForCollapsibleNav = function() {

    var wrap = window.innerWidth,
        leftMenu = $('.menu-left');

    if(wrap <= 800) {
        $("#menu-title").show();
        $("#menu-h").hide();
        $( ".accordion" ).accordion({ header: "#menu-title", collapsible: true, active: false, disable: false });
        $( ".accordion" ).accordion({enable: true });


        /*FIX for ensuring the height of drop down. This is because accordion inherits the biggest height unless set. Uncomment below*/
        $( ".accordion" ).css({height: 'auto'});

      
      //if we have a left nav we need to collapse that as well
      if(leftMenu.length > 0) {
          $( ".menu-left" ).accordion({ header: "h4", collapsible: true, active: false, disable: false });
          $( ".menu-left" ).accordion({enable: true });
      }
     
    }
    else
    {
      $("#menu-h").css('height', 'auto').show();
      $("#menu-title").hide();
      $( ".accordion" ).accordion({disable: true });
      $( ".menu-left" ).accordion({collapsible: false });
    }

  };

  //adds view more links to reviews
  App.viewMoreToggle = function() {

      $('.review-text').each(function() {
      //append the more link

        var scrollHeight = $(this).prop("scrollHeight");

        if(scrollHeight >= 220) {
          $(this).find('p:last-of-type').append('<div class="more-link">...  <a href="#" class="view-more">view more</a></div>');
        }

      });

        $('.view-more').click(function(e){

            e.preventDefault();

            $(this).parents().find('.review-text').toggleClass('show-more');
            if($(this).text() === 'view more') {
                $(this).text('view less');
            }
            else
            {
              $(this).text('view more');
            }
        });
   
  };


  //get submit fields prepared to submit through ajax
//  App.prepareSubmit();
  App.ajaxProductAdd();

  //populate instagram feed
 // App.setPictures();

  //populate new instagram feed
  App.setPictures(499539682 , '#instagram');
  App.setPictures(2109687573 , '#instagram-trek');
  
  //resize social box if needed
  App.resizeElement('#social_box', 303, 0);
  
  //collpase/expand nav as needed
  App.checkForCollapsibleNav();
  
  //set up 'veiw more' links
  App.viewMoreToggle();

  //initiate "tabs" for social box
  $( "#social_box" ).tabs({ active: 2 });

  
  $(window).resize(App.debouncer(function () 
  {
    App.resizeElement('#social_box', 303, 0);
 
    App.checkForCollapsibleNav();
  }, 200));

}());


