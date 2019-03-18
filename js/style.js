$(document).ready(function(){
    /* loading-page */
    setTimeout(function() {
      $('.loading-page').fadeToggle(500);
    },2500);

    /* enter main-page */
    $('.content-block').click(function(){
      $('.cover').addClass('ld ldt-blur-out', 750);
      $('.cover').delay(1500).hide(750);
      $('.main').addClass('show');
      $('.main').addClass('ld ldt-zoom-in', 750);
    });

    /* nav-bar Ctrl */  
    var $navBtn = $('.nav-bar ul li');
    // ctrl-block hide, except map-filter
    $($navBtn.eq(1).addClass('nav-isActive').find('a').attr('href')).siblings('.ctrl-block').hide();
    
    $navBtn.click(function(){
      // ctrl-block show
      $($(this).find('a').attr('href')).show().siblings('.ctrl-block').hide();
      // nav-bar style show
      $(this).addClass('nav-isActive').siblings().removeClass('nav-isActive');
    });

    /* side-block Ctrl */
    $('.side-ctrl').click(function(){
      $(".side-block").toggleClass('side-block_Hide', 750);

      if($('.side-block').hasClass('side-block_Hide')){
        $('.side-ctrl').empty();
        $('.side-ctrl').append('<i class="material-icons md-36">keyboard_arrow_left</i>');
      }
      else{
        $('.side-ctrl').empty();
        $('.side-ctrl').append('<i class="material-icons md-36">keyboard_arrow_right</i>');
      }
    });
    
  })
  
  /* Google Maps */
  var map;
  function initMap(){
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: -25.363, lng: 131.044},
      zoom: 5,
    });
  }
  
  
  
  
  