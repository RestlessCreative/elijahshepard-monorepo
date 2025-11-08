/**
 * Custom JS.
 *
 * All site scripts should be contained below. Consider this as main.js, app.js, c0re.js or otherwise. Will be compressed with gulp.
 *
 */


/**
 * GLOBAL VARS
 *
 */
 
  $installDirectory = 1;  // setting this will update the scripts below as to where the site is located on the server. 1 for root, 2 for subdirectory, 3 for 2 directories deep, etc.
  pathArray = window.location.pathname.split( '/' );
  $mobile = '1000';
  $small = '1400';
  menuBreakpoint = '983'; // corresponds to $menuBreakpoint in app.scss value - 17px to offset for scrollbar
  footerOffset = 100;
  headerOffset = 100;
  onePageSections = ['']; // declare the main sections of the site to be used in the one-page scheme
  windowHeight = $(window).innerHeight();
  windowWidth = $(window).innerWidth();    
  adjHeight = windowHeight / 2;
  isTouch = ('ontouchstart' in window);
  isChrome   = navigator.userAgent.indexOf('Chrome') > -1;
  isExplorer = navigator.userAgent.indexOf('MSIE') > -1;
  isFirefox  = navigator.userAgent.indexOf('Firefox') > -1;
  isSafari   = navigator.userAgent.indexOf('Safari') > -1;
  isCamino   = navigator.userAgent.indexOf('Camino') > -1;
  isOpera    = navigator.userAgent.toLowerCase().indexOf('op') > -1;
  if ((isChrome) && (isSafari)) isSafari = false;
  if ((isChrome) && (isOpera)) isChrome = false;
  
  
$( document ).ready(function() {
  //$('body').overlayScrollbars({ });
  //body = $('body').overlayScrollbars({ }).overlayScrollbars();
  initC0re(); // ***** run initially and called again after successful ajax call (for .internalLink clicks)
  
});


/********************************************* F U N C T I O N S *****************************************/


/**
 * FUNCTIONALITY GROUP
 *
 * pushState/History management, ajax loading
 * 
 */
//( function( $, History, undefined ) {
//    
//	if ( !History.enabled ) {
//		return false;
//	}
//
//	var $wrap = $( ".c0re__view" );
//    var $this = $(this);
//                        
//    $wrap.on( "click", ".internalLink", function( event ) {
//  
//      var $this = $(this),
//          url = $this.attr('href'),
//          theTitle = $this.attr('title')||null,
//          pageID = $this.attr('data-id'),
//          location = window.location.href,
//          path = window.location.pathname,
//          windowWidth = $(window).innerWidth(),
//          windowHeight = $(window).innerHeight(),
//          home = window.location.protocol + "//" + window.location.host + "/",
//          pathArray = window.location.pathname.split( '/' );
//          
//      // add logic to tell if the user is already on the page 
//      if($('body').hasClass(pageID) ) {
//      
//        if ($('body').hasClass('small')) {
//          closeHamNav();  // if mobile menu is engaged, close it
//        }
//        
//        return false;  // do nothing because this is the same page
//        
//      } else {
//        // Setup animations for section transitions - calling processURL function with "onComplete" in the last animation (so animations aren't interupted) 
//        transition = new TimelineMax({ paused: true});
//        transition.to($('.c0re__content'), 0.1, {css:{autoAlpha:0}, onComplete:processURL}, '+=0');
//        
//        // speed up the transition if desired (watch out for null/negative values if sped up too much)
//        transition.timeScale(1);
//        // execute the transition
//        transition.play(0);
//            
//        return false;
//        
//      }
//          
//          
//      // on completion of animation, follow the link    
//      function processURL($this) {
//      
//        // Continue as normal for cmd clicks etc
//        if ( event.which == 2 || event.metaKey ) { return true; }  
//        title = theTitle;
//        History.pushState(null,title,url);
//        event.preventDefault();
//          
//      }
//    
//    });
//
//	History.Adapter.bind( window, "statechange", function() {
//
//		var state = History.getState();
//
//		$.get( state.url, function( res ) {
//			$.each( $( res ), function( index, elem ) {
//				
//				if ( $wrap.selector !== "#" + elem.id ) {
//					return;
//				}
//
//				$wrap
//					.html( $( elem ).html() )
//					.promise()
//						.done( function( res ) {
//
//							// update google analytics that page has changed
//                            if ( typeof ga === "function" && res.length !== 0 ) { // Make sure the new content is added, and the 'ga()' method is available.
//								ga('set', { 
//									page: window.location.pathname,
//									title: state.title
//                                    
//								});
//								ga('send', 'pageview');
//							}
//                            
//                            TweenMax.to($(document.body), 0, {className: 'activeSession', onComplete: initC0re});   // reload scripts because they die after ajax by default and add activeSession class to body
//                            
//						});
//			} );
//		} );
//	} );
//
//} )( jQuery, window.History );
//







/**
 * FUNCTIONALITY GROUP
 *
 * these are the main site scripts
 *
 */

function initC0re() {
  
  
  mainNav('B'); // pass A, B, C to tell it what style of nav to use
  initButtons();
  //inlineSVG();  // convert svgs in img tags with class of svg into inline svg
  initFancybox();
  logos();
  
  if($('#black-hole').length > 0) {
      if($('.list-view').length > 0 ) {
        // load up content if entering the black hole
        var initialContent = $('#landing-web');
        $('#active-content #loadWrapper').html($(initialContent).html());
        TweenMax.fromTo($('#active-content #loadWrapper'), 0.3, {css:{autoAlpha:0, top:500}}, {css:{autoAlpha:1}});
        TweenMax.to($('#active-content .hero-content'), 0.1, {css:{autoAlpha:1, className:"+=current"}});
        pauseVideos();
      }
      
      if($('.single-view').length > 0 ) {
        // if on a single project, let's turn on the lights
        TweenMax.fromTo($('#active-content #loadWrapper'), 0.3, {css:{autoAlpha:0, top:500}}, {css:{autoAlpha:1}});
        TweenMax.to($('#active-content .hero-content'), 0.1, {css:{autoAlpha:1, className:"+=current"}});
        pauseVideos();
      }
      
      filtering();
      c0re__listItems();
      //swipeNav();
      work();
      // webGL();
    // animate();
    
     //var resultItems = $("#list-web .mix");
     //for(var i = 0; i < resultItems.length; i+=6) {
     //  resultItems.slice(i, i+6).wrapAll('<div class="results-wrap"><div class="resultsGroup grid-3_xs-2_sm-2-middle-center-noGutter"></div></div>');
     //  resultItems.eq(i+0).addClass('pos_0');
     //  resultItems.eq(i+1).addClass('pos_1');
     //  resultItems.eq(i+2).addClass('pos_2');
     //  resultItems.eq(i+3).addClass('pos_3');
     //  resultItems.eq(i+4).addClass('pos_4');
     //  resultItems.eq(i+5).addClass('pos_5');
     //}
      
  }
  
  
  if($('#eye-candy').length > 0) {
    //filtering();
    //webGL();
    
    
        
    //  var swiper = new Swiper('.swiper-container', {
    //    pagination: {
    //      el: '.swiper-pagination',
    //      type: 'progressbar',
    //    },
    //    navigation: {
    //      nextEl: '.swiper-button-next',
    //      prevEl: '.swiper-button-prev',
    //    },
    //    slideClass: 'candy-item',
    //    slideActiveClass: 'active-item',
    //    centeredSlides:true,
    //    grabCursor:true,
    //    slidesPerView:'auto',
    //    slidesPerGroup:1,
    //    slidesPerColumn:1,
    //    speed:150,
    //    keyboard:true,
    //    mousewheel:true,
    //    forceToAxis:true
    //});
    
    
    //$('#candy').masonry({
    //  // use outer width of grid-sizer for columnWidth
    //  columnWidth: '.candy-sizer',
    //  itemSelector: '.candy-item',
    //  percentPosition: true,
    //  gutter:1
    //});
    //
    
    // init Masonry
    //var $grid = $('#candy').masonry({
    //  // options...
    //  itemSelector: '.candy-item',
    //  percentPosition: true,
    //  columnWidth: '.candy-sizer'
    //});
    // layout Masonry after each image loads
    //$grid.imagesLoaded().progress( function() {
    //  $grid.masonry('layout');
    //});
    
    
  }
  
  setTimeout(function() {setElements(); }, 10);  // set elements  - duplicate these in the resizeEvent area below as well
  // run page animations
  mainTimeline();
  contentAnimations();
  
  
  
  // browser testing/fixes
  is_firefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;								
  if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
    setTimeout(function() {
      firefoxFixes();
    }, 500);
  }
  
  if('CSS' in window && 'supports' in window.CSS) {
    var support = window.CSS.supports('mix-blend-mode','soft-light');
        support = support?'mix-blend-mode':'no-mix-blend-mode';
        //$('html').addClass(support);
  }
  
  /**
	* Test if an iOS device.
	*/
  function checkiOS() {
	return /iPad|iPhone|iPod/.test(navigator.userAgent) && ! window.MSStream;
  }
  
  // hammer slider
//  (function() {
//  const sliderElement = document.getElementById('hammer-slider'),
//    nextBtn = document.getElementById('next-btn'),
//    prevBtn = document.getElementById('prev-btn'),
//    slider = HammerSlider(sliderElement, {
//      mouseDrag: true,
//      dots: true
//    });
//  
//  slider.setupSlider();
//  
//  nextBtn.addEventListener('click', slider.next, false);
//  prevBtn.addEventListener('click', slider.prev, false);
//})();
  
  

  // setup section logic
  //if (pathArray[$installDirectory] == '' || pathArray[$installDirectory] == 'home') {
  //  section = 0;
  //  loadPage(section);
  //}
  //else if (pathArray[$installDirectory] == 'black-hole') {
  //  section = 1;
  //  loadPage(section);
  //}
  //else if (pathArray[$installDirectory] == 'ear-worms') {
  //  section = 2;
  //  loadPage(section);
  //}
  //
  //else {
  //  section = 99;  //section = 99;  // make global for use in other functions. sets the current active section
  //  loadPage(section);
  //}

  
  
  // setup conditional classes
  if (windowWidth <= 1440) { $('body').addClass('small'); }
  
  
  
  // resize events    
  var $originalWidth = $(window).innerWidth();
  $(window).smartresize(function(){
    
    logos();
    
    if(window.location.pathname != '/') {
    
      var $newWidth = $(window).innerWidth();
      // special actions based on new screen size is in a totally different mode than before
      if ($newWidth > 1000 && $originalWidth <= 1000 || $newWidth <= 1000 && $originalWidth > 1000) {
               
      }
      
    } else {
      
    }  
    
    setTimeout(function() {
      setElements(); 
      
    }, 100); // reset things
    
  });
  
  
  
  
  $('.materialboxed').materialbox();
  $('.parallax').parallax();
  $('.collapsible').collapsible({accordion: true});
  $('.tabs').tabs();

  // MODALS - OVERLAYS
  $(".overlayClose").click(function(){
      $("#overlayVideo").css("opacity","0");
      $("#overlayFailed").css("opacity","0");
      $( "#mobileNav .subNav a, #mobileNav .subNav span " ).css('pointer-events', 'none'); // fix for indirect touch event in mobile menu subnav

      setTimeout(function(){$("#overlayVideo").css("display","none");}, 500);
      setTimeout(function(){$("#overlayFailed").css("display","none");}, 500);
      $("#youtubeVideo").attr("src", "");
      $('body').removeClass('overlayOpen');
      setElements();  // this is to address the removal of scrollbars during overlays being open
  });
  
  $(function() {
    $(".callModal").on("click", function() {
      
        $("body").addClass("modal-open");
       
    });
  
    $(".modal-fade-screen, .modal-close").on("click", function() {
   //   $(".modal-state:checked").prop("checked", false).change();
    
    $("body").removeClass("modal-open");
    });
  
    $(".modal-inner").on("click", function(e) {
      e.stopPropagation();
    });
    
  });
  
  
  
  $('.modal').modal({
      dismissible: true, // Modal can be dismissed by clicking outside of the modal
      opacity: .25, // Opacity of modal background
      inDuration: 300, // Transition in duration
      outDuration: 200, // Transition out duration
      startingTop: '4%', // Starting top style attribute
      endingTop: '5%', // Ending top style attribute
      ready: function(modal, trigger) { // Callback for Modal open. Modal and trigger parameters available.
        //alert("Ready");
        //console.log(modal, trigger);
      },
      complete: function() {  } // Callback for Modal close
    }
  );
  
  $('.modal-trigger').each(function() {
    $(this).click(function(){
      var target = $(this).attr('data-target');
      $('#' +  target).modal('open');
    });
  });
  $('.close-modal').each(function() {
    $(this).click(function(){
      $(this).parents('.modal').modal('close');
    });
  });
  
  
  
 
  $(".inputs").keyup(function () {
      if (this.value.length == this.maxLength) {
          var $next = $(this).next('.inputs');
          if ($next.length)
              $(this).next('.inputs').focus();
          else
              $(this).blur();
      }
  });

  
   //$(".nano").nanoScroller({ scroll: 'top', preventPageScrolling: false });  

  //
  
  //var bLazy = new Blazy({
  //      selector: ".b-lazy",
  //      offset: 100,
  //      //loadInvisible:true,
  //      //breakpoints: [{
  //      //    width: 420 // Max-width
  //      //        , src: 'data-src-small'
  //      //}]
  //      //, success: function(element){
  //      //    setTimeout(function(){
  //      //  // We want to remove the loader gif now.
  //      //  // First we find the parent container
  //      //  // then we remove the "loading" class which holds the loader image
  //      //  var parent = element.parentNode;
  //      //  parent.className = parent.className.replace(/\bloading\b/,'');
  //      //    }, 200);
  //      //}
  // });
  //
 
  
  
  // SCROLLING **********
  
  // if someone tries to submit a form that fails, make sure to bring them back to the form on reload (important if on single-page experience)
  $('.validation_error').each(function() {
        var relatedForm = $(this).parents('form');
        $("html, body").animate({scrollTop: relatedForm.offset().top}, 1000);
  });
  
  
  if($('#black-hole').length > 0 ) {
    $(".continue").click(function () {
      //$(".nano").nanoScroller({ scrollTo: $('.c0re__list') });
    });
  }
  if($('#about').length > 0 ) {
      $('.continue').click(function () {
        //  $(".nano").nanoScroller({ scrollTo: $('#deep-dive') });
      });
  }
  //
  //var didScroll = false;  
  //$(window).scroll(function() {
  //     didScroll = true;
  //     
  //});
  
  //$(".nano").debounce("scrollend", function() {
  //    didScroll = true;
  //    var outerPane = $("#active-content #loadWrapper");
  //         //var eTop = $(outerPane).offset().top;
  //         //console.log(eTop - $(window).scrollTop());
  //         console.log(outerPane.offset().top);
  //         if(outerPane.offset().top <= 90 ) {
  //          TweenMax.to($('#loadWrapper'), 0.3, {autoAlpha:0});
  //         } else {
  //          TweenMax.to($('#loadWrapper'), 0.3, {autoAlpha:1});
  //         }
  //}, 100);
   //setInterval(function() {
   //    if ( didScroll ) {
   //        var didScroll = false;
   //        // Check your page position and then
   //        // Load in more results
   //        var outerPane = $("#active-content #loadWrapper");
   //        //var eTop = $(outerPane).offset().top;
   //        //console.log(eTop - $(window).scrollTop());
   //        if(outerPane.offset().top <= 0 ) {
   //         $('#loadWrapper').hide();
   //        }
   //    }
   //}, 150);
  
  
  
  
    // scroll to top
  $("#toTop").click(function () {
    $("html, body").animate({scrollTop: 0}, 1000);
  });
  // control display of elements
  var didScroll = false;
  $(window).debounce('scroll', function(e) {
      didScroll = true;      
      var wintop = $(window).scrollTop(),
      docheight = $(document).height(),
      winheight = $(window).height();      
      
      setMasks();
      setElements();
      
      
      
  }, 150);
  
  
  
  if($('#eye-candy').length > 0 ) {
    
    //$('#candy').masonry({
    //  // use outer width of grid-sizer for columnWidth
    //  columnWidth: '.grid-sizer',
    //  itemSelector: '.grid-item',
    //  percentPosition: true,
    //  gutter:10
    //});
    //
    
    // init Masonry
    //var $grid = $('#candy').masonry({
    //  // options...
    //  itemSelector: '.candy-item',
    //  percentPosition: true,
    //  columnWidth: '.candy-sizer'
    //});
    //// layout Masonry after each image loads
    //$grid.imagesLoaded().progress( function() {
    //  $grid.masonry('layout');
    //});
    //
    
  }
  
  
  
  
  
}





/**
 * FUNCTIONALITY GROUP
 *
 * MixItUp Filtering and Search
 * 
 */
function filtering() {

    var multiFilter = {
      
      // Declare any variables we will need as properties of the object
      
      $filterGroups: null,
      $filterUi: null,
      $reset: null,
      groups: [],
      outputArray: [],
      outputString: '',
      
      // The "init" method will run on document ready and cache any jQuery objects we will need.
      
      init: function(){
        var self = this; // As a best practice, in each method we will asign "this" to the variable "self" so that it remains scope-agnostic. We will use it to refer to the parent "checkboxFilter" object so that we can share methods and properties between all parts of the object.
        
        self.$filterUi = $('#theFilters');
        self.$filterGroups = $('.filter-group');
        self.$reset = $('#resetFilters');
        self.$container = $('.mixContainer');
        
        
        self.$filterGroups.each(function(){
          self.groups.push({
            $inputs: $(this).find('input'),
            active: [],
            tracker: false
          });
        });
        
        self.bindHandlers();
      },
      
      // The "bindHandlers" method will listen for whenever a form value changes. 
      
      bindHandlers: function(){
        var self = this,
            typingDelay = 300,
            typingTimeout = -1,
            resetTimer = function() {
              // add exception to prevent search input from clearing if the enter key is pressed
              $(window).keydown(function(event){
                if(event.keyCode == 13) {
                  event.preventDefault();
                  return false;
                }
              });
              clearTimeout(typingTimeout);
              
              typingTimeout = setTimeout(function() {
                self.parseFilters();
              }, typingDelay);
            };
        
        self.$filterGroups
          .filter('.checkboxes')
          .on('change', function() {
            self.parseFilters();                        
          });
        
        self.$filterGroups
          .filter('.search')
          .on('keyup change', resetTimer);
        
        self.$reset.on('click', function(e){
          e.preventDefault();
          self.$filterUi[0].reset();
          self.$filterUi.find('input[type="text"]').val('');
          self.parseFilters();
        });
      },
      
      // The parseFilters method checks which filters are active in each group:
      
      parseFilters: function(){
        var self = this;
     
        // loop through each filter group and add active filters to arrays
        
        for(var i = 0, group; group = self.groups[i]; i++){
          group.active = []; // reset arrays
          group.$inputs.each(function(){
            var searchTerm = '',
                $input = $(this),                
                minimumLength = 3;
            
            if ($input.is(':checked')) {
              group.active.push(this.value);
              $(this).parent('.checkbox').addClass('active');
              
            }
              
            if ($input.is('[type="text"]') && this.value.length >= minimumLength) {
              
              searchTerm = this.value
                .trim()
                .toLowerCase()
                .replace(' ', '-');
              
              
              group.active[0] = '[class*="' + searchTerm + '"]';
              //group.active[0] = '['+$(".mix li").text().toLowerCase().match(searchTerm)+']'; 
            }
            
          });
          
          group.active.length && (group.tracker = 0);
        }
        
        self.concatenate();
        
        //var results = $('#resultsWrapper');
        //$("html, body").animate({
        //  scrollTop: results.offset().top
        //  }, 1000, function() {
        //  var bLazy = new Blazy({ selector:'.b-lazy',offset:200});
        //  setTimeout(function() {
        //    bLazy.revalidate();
        //    
        //  }, 100);
        //});
        //
        
        
        
        
        
      },
      
      // The "concatenate" method will crawl through each group, concatenating filters as desired:
      
      concatenate: function(){
        var self = this,
          cache = '',
          crawled = false,
          checkTrackers = function(){
            var done = 0;
            
            for(var i = 0, group; group = self.groups[i]; i++){
              (group.tracker === false) && done++;
            }
    
            return (done < self.groups.length);
          },
          crawl = function(){
            for(var i = 0, group; group = self.groups[i]; i++){
              group.active[group.tracker] && (cache += group.active[group.tracker]);
    
              if(i === self.groups.length - 1){
                self.outputArray.push(cache);
                cache = '';
                updateTrackers();
              }
            }
          },
          updateTrackers = function(){
            for(var i = self.groups.length - 1; i > -1; i--){
              var group = self.groups[i];
    
              if(group.active[group.tracker + 1]){
                group.tracker++; 
                break;
              } else if(i > 0){
                group.tracker && (group.tracker = 0);
              } else {
                crawled = true;
              }
            }
          };
        
        self.outputArray = []; // reset output array
    
        do{
          crawl();
        }
        while(!crawled && checkTrackers());
    
        self.outputString = self.outputArray.join();
        
        // If the output string is empty, show all rather than none:
        
        !self.outputString.length && (self.outputString = 'all'); 
        
        console.log(self.outputString); 
        
        // ^ we can check the console here to take a look at the filter string that is produced        
        // Send the output string to MixItUp via the 'filter' method:
        
        if(self.$container.mixItUp('isLoaded')){
          self.$container.mixItUp('filter', self.outputString);
        }
      
      }
    };
      
    // On document ready, initialise our code.
    
    $(function(){
          
      // Initialize multiFilter code
          
      multiFilter.init();
          
      // Instantiate MixItUp
          
      $('.mixContainer').mixItUp({
        controls: {
          enable: false // we won't be needing these
        },
        //animation: {
        //  easing: 'cubic-bezier(0.86, 0, 0.07, 1)',
        //  queueLimit: 3,
        //  duration: 300
        //}
      });
      
      setTimeout(function() {
          var bLazy = new Blazy({ selector:'.b-lazy',offset:100});
          bLazy.revalidate();
          
        }, 1000);
 
      
      
    });
    
    
    $('.section-filters .more').on('click', function() {
      $('.available-filters').toggle();
      var activeFilters = $('.section-filters').find('input[type="checkbox"]');
      if(activeFilters.is(':checked')) {
        $('.section-filters').addClass('filters-active');
        $(this).data("data-tooltip", "You've got filters active. You aren't seeing EVERYTHING!");
        $('.section-filters .more').tooltip();
      } else {
        $('.section-filters').removeClass('filters-active');
        $(this).attr("data-tooltip", "Just like coffee, you can FILTER IT.");
        $('.section-filters .more').tooltip();
      }
      
      $(this).toggleClass('active');
    });
    
    
    // close the filters menu if user clicks anywhere on page
    //$(document).mouseup(function (e)
    //{
    //    var container = $(".section-filters");
    //    var trigger = $(".section-filters .more");
    //
    //    if (!container.is(e.target) && !trigger.is(e.target) && $('.section-filters .more').hasClass('active') // if the target of the click isn't the container OR the trigger nav...
    //        && trigger.has(e.target).length === 0 && container.has(e.target).length === 0) // ... nor a descendant of the container
    //    {
    //        $('.available-filters').toggle();
    //        var activeFilters = container.find('input[type="checkbox"]');
    //        if(activeFilters.is(':checked')) {
    //          container.addClass('filters-active');
    //        } else {
    //          container.removeClass('filters-active');
    //        }
    //        
    //        $('.section-filters .more').toggleClass('active');
    //        
    //    }
    //});
    $('.available-filters').mouseenter(function() {
              $('.available-filters').show();              
              $('.section-filters .more').addClass('active');
              
    }).mouseleave(function() {
      // let's close the filters if the user navigates away
        //setTimeout(function() {
        //  
        //      //$('.section-filters .more').removeClass('active');              
        //      //$('.available-filters').hide();
        //      //var activeFilters = $('.section-filters').find('input[type="checkbox"]');
        //      //if(activeFilters.is(':checked')) {
        //      //  $('.section-filters').addClass('filters-active');
        //      //  
        //      //} else {
        //      //  $('.section-filters').removeClass('filters-active');
        //      //  
        //      //}
        //      //
        //      
        //  
        //},1000);
    });
    $('#resetFilters').on('click', function(e) {
        e.preventDefault();
        
          $('.available-filters').hide();                
          $('.section-filters').removeClass('filters-active');
          $('.section-filters .more').attr("data-tooltip", "Just like coffee, you can FILTER IT.");
          $('.section-filters .more').tooltip();
          $('.section-filters .more').removeClass('active');
          var theResults = $('#resultsWrapper');
          $('html, body').animate({
            scrollTop: theResults.offset().top
          }, 100, function() {
            var bLazy = new Blazy({ selector:'.b-lazy',offset:0});
            setTimeout(function(){bLazy.revalidate();},200);
          });
        
    });
    $('.filters-close').on('click', function(e) {
        e.preventDefault();
        
        $('.available-filters').hide();
        var activeFilters = $('.section-filters').find('input[type="checkbox"]');
        if(activeFilters.is(':checked')) {
          $('.section-filters').addClass('filters-active');
          $('.section-filters .more').attr("data-tooltip", "You've got filters active. You aren't seeing EVERYTHING!");
          $('.section-filters .more').tooltip();
          
          var theResults = $('#resultsWrapper');
          $('html, body').animate({
              scrollTop: theResults.offset().top
            }, 100);
          
          var bLazy = new Blazy({ selector:'.b-lazy',offset:0});
          setTimeout(function(){bLazy.revalidate();},100);
          TweenMax.staggerTo($('.current_count'), 0.1, {css:{scale:2, color:"#7ed4d4"}, onComplete:function(){          
            TweenMax.staggerTo($('.current_count'), 0.05, {css:{scale:1, color:"#b0b0b0"}}, 0.25);
          }});
          
          var duration = 1;
          TweenMax.fromTo($('.filterUpdateMessage'), 0.1, {autoAlpha:0}, {autoAlpha:1});
          TweenMax.to($('.filterUpdateMessage i'), duration / 4, {delay:1, x:5, ease:Power2.easeOut});
          TweenMax.to($('.filterUpdateMessage i'), duration / 2, {x:0, ease:Bounce.easeOut, delay:duration / 4});
          TweenMax.to($('.filterUpdateMessage i'), duration / 2, {x:2, ease:Bounce.easeOut, delay:duration / 4});
          TweenMax.to($('.filterUpdateMessage i'), duration / 4, {delay:0.5, x:-2, ease:Power2.easeOut});
          TweenMax.to($('.filterUpdateMessage'), 0.25, {delay:5, autoAlpha:0});    
          
          
        } else {
          $('.section-filters .more').removeClass('active');              
          $('.section-filters').removeClass('filters-active');
          $('.section-filters .more').attr("data-tooltip", "Just like coffee, you can FILTER IT.");
          $('.section-filters .more').tooltip();
        }
        
        
    });
    $('.filter-status').on('click', function() {
      $('#resetFilters').trigger("click");
      $('.section-filters').removeClass('filters-active');
      
      $(this).hide();
    });
    
    $('#list-web').on('mixEnd', function(e, state) {
      // list count of all active in each category after filtering 
      var featuredItems = $('#list-web .featured-wrapper .mix').length;
      var allItems = $('#list-web .credits-a-z .mix'); 
      var activeItems = state.totalShow;            
      var adjTotal = $(allItems).filter(function() {
            return $(this).css('display') !== 'none';
          }).length;
      if(adjTotal == 0) { var catTotal = 0; } else {
        var catTotal = adjTotal;      
      }
      $('.current_count.web').html(catTotal);
      
      
      
    });
    $('#list-film-tv').on('mixEnd', function(e, state) {
      // list count of all active in each category after filtering 
      var featuredItems = $('#list-film-tv .featured-wrapper .mix').length;
      var allItems = $('#list-film-tv .credits-a-z .mix'); 
      var activeItems = state.totalShow;            
      var adjTotal = $(allItems).filter(function() {
            return $(this).css('display') !== 'none';
          }).length;
      if(adjTotal == 0) { var catTotal = 0; } else {
        var catTotal = adjTotal;      
      }
      $('.current_count.film-tv').html(catTotal);
      
     
      
    });
    $('#list-games').on('mixEnd', function(e, state) {
      // list count of all active in each category after filtering 
      var featuredItems = $('#list-games .featured-wrapper .mix').length;
      var allItems = $('#list-games .credits-a-z .mix'); 
      var activeItems = state.totalShow;            
      var adjTotal = $(allItems).filter(function() {
            return $(this).css('display') !== 'none';
          }).length;
      if(adjTotal == 0) { var catTotal = 0; } else {
        var catTotal = adjTotal;      
      }
      $('.current_count.games').html(catTotal);
      
   
      
    });
    $('#list-other').on('mixEnd', function(e, state) {
      // list count of all active in each category after filtering 
      var featuredItems = $('#list-other .featured-wrapper .mix').length;
      var allItems = $('#list-other .credits-a-z .mix'); 
      var activeItems = state.totalShow;            
      var adjTotal = $(allItems).filter(function() {
            return $(this).css('display') !== 'none';
          }).length;
      if(adjTotal == 0) { var catTotal = 0; } else {
        var catTotal = adjTotal;      
      }
      $('.current_count.other').html(catTotal);
      
     
      
    });
    $('#category-switcher .tab a').on('click', function() {
        var targetRel = $(this).attr('rel');
        $('#category-switcher').attr('data-status', 'switching');  // set for some other functions to know a transition is currently in progress      
          
        if($(window).innerWidth() <= 1440) {
          //$(".nano").nanoScroller({ scroll: 'top' });
          $('body,html').animate(
            {'scrollTop':0},
            150
          );
        }     
        
        if($('#black-hole').length > 0) {
         
            var targetResults = $('#list-'+targetRel);
            
            $.when($('.mixContainer').removeClass('active')).then(targetResults.addClass('active'));
            
            // let's make sure any videos in loading div are not playing, including the newly added node
            //$('#data-container video').each(function() {
            //  this.pause();
            //});
            pauseVideos(); // triggering play on videos loaded from below is handled in the playVideos function which is automatically triggered by pauseVideos function
          
          
            var supplemental = $('#landing-'+targetRel+' .supplemental');        
            $('#active-content .supplemental').html($(supplemental).html());
              
            var targetTitle = $('#landing-'+targetRel+' h1').text();
            var h1 = $('#active-content h1');
            TweenMax.to(h1, 0.3, {text:targetTitle, speed:0.3, ease:Linear.easeNone, revealDelay:0.25});
            
            var targetHero = $('#landing-'+targetRel+' .hero-container');        
            var heroContent = $('#active-content .hero-container .hero-content');
            TweenMax.to(heroContent, 0.4, {x:-400, autoAlpha:0, onComplete: function() {
              $.when($('#active-content .hero-container').html($(targetHero).html())).then(function() {
                var newHero = $('#active-content .hero-content');
                TweenMax.fromTo(newHero, 0.4, {x:700}, {delay:0.25, autoAlpha:1, x:0, ease:Expo.easeInOut});
              });  
            }, ease:Expo.easeIn});
            
            
            var activeContent = document.getElementById('landing-'+targetRel);
            var targetMeta = activeContent.getElementsByClassName('meta-wrapper')[0];
            var pageMeta = $('#active-content .content-leader .meta-wrapper');
            $(pageMeta).html($(targetMeta).html());
            
            
            
           
            var background = $('#landing-'+targetRel+' .active-background');       
            if($(background).hasClass('hasBg')) {              
                  var targetBg = $(background).find('.background-container'),              
                  currentBg = $('.c0re__content .background-container').not('.targetBg');              
                  
                  $(targetBg).addClass('targetBg');
                  var changeBg = function() {
                    return $('.c0re__content .active-background').append(targetBg);
                  };
                  $.when(changeBg()).done(function() {
                    var newBg = $('.c0re__content .active-background .targetBg');
                    TweenMax.to(currentBg, 0.5, {scale:1.5, autoAlpha:0});  
                    TweenMax.fromTo(newBg, 0.4, {scale:1.3, autoAlpha:0}, {scale:1, autoAlpha:1});
                    setTimeout(function(){ $(currentBg).remove(); TweenMax.to(newBg, 0, {css:{className:"-=targetBg"}}); }, 100);
                  });
              
            } else {
              $('.c0re__content #active-background .background-container').attr('data-src', '');
              $('.c0re__content #active-background .background-container').css('background-image', '');
            }
        
        
        }
        
        
        // need to reinit blazy for quirk
        var bLazy = new Blazy({ selector:'.b-lazy',offset:100});
        setTimeout(function() {
          bLazy.revalidate();
          
        }, 300);
        
        setTimeout(function() {
          $('#category-switcher').attr('data-status', '');  // clear status of switcher
        }, 1000);
      
    });
    
    
    
    
}




/**
 * FUNCTIONALITY GROUP
 *
 * Content Loading
 * 
 */
function c0re__listItems ()
{    
    
    $('.c0re__list-item a').on('click', function(event){
        event.preventDefault();
        var select = $(this),
            selectOthers = $(this).parent('.c0re__list-item').siblings('li'),
            destination = $(this).attr('href');
        
        TweenMax.to(selectOthers, 1, {css:{className:"-=active"}}, 0);
          TweenMax.to(select, 1, {css:{className:"+=active"}}, 0);        
          replaceStage(destination);
        
    });
    
}

		
function replaceStage (destination)
{
    
    $('#data-container #incoming').load(destination+' #loadWrapper', function() {
        
        pauseVideos();
        
        if($(window).innerWidth() <= 1440 || $(window).innerHeight() <= 1100) {
          //$(".nano").nanoScroller({ scroll: 'top' });
          $('body,html').animate(
            {'scrollTop':0},
            150
          );
        }        
        
        var projectID = $('#incoming .landing-content').attr('data-project');
        $('#active-content .landing-content').attr('data-project', projectID);
        
        var supplemental = $('#incoming .supplemental');        
        $('#active-content .supplemental').html($(supplemental).html());

        var targetTitle = $('#incoming h1').text();
        var h1 = $('#active-content h1');
        TweenMax.to(h1, 0.3, {text:targetTitle, speed:0.3, ease:Linear.easeNone, revealDelay:0.25});
        
        var targetHero = $('#incoming .hero-container');
        var heroContent = $('#active-content .hero-container .hero-content');
        TweenMax.to(heroContent, 0.4, {x:-400, autoAlpha:0, onComplete: function() {
          $.when($('#active-content .hero-container').html($(targetHero).html())).then(function() {
            var newHero = $('#active-content .hero-content');
            TweenMax.fromTo(newHero, 0.4, {x:700}, {delay:0.25, autoAlpha:1, x:0, ease:Expo.easeInOut});
          });  
        }, ease:Expo.easeIn});
        
        
        var activeContent = document.getElementById('incoming');       
        var targetMeta = activeContent.getElementsByClassName('meta-wrapper')[0];
        var pageMeta = $('#active-content .content-leader .meta-wrapper');
        $(pageMeta).html($(targetMeta).html());
        
        
        // let's also change the view to reflect that we are now in a single project
        $('.c0re__view').addClass('single-view');
        $('.c0re__view').removeClass('list-view');
        
        // update url
        if (window.history && window.history.pushState) {          
            history.pushState("", document.name, destination);
        }
    });
    
    $('#data-container #incoming-bg').load(destination+' #active-background', function() {
        var background = $('#incoming-bg .active-background');
        
        if($(background).hasClass('hasBg')) {
          var targetBg = $(background).find('.background-container'),
              //bgImgSrc = $(targetBg).attr('data-src'),
              currentBg = $('.c0re__content .background-container').not('.targetBg');
              //$(targetBg).css('background-image', 'url('+bgImgSrc+')');
              
              $(targetBg).addClass('targetBg');
              var changeBg = function() {
                return $('.c0re__content .active-background').append(targetBg);
              };
              $.when(changeBg()).done(function() {
                var newBg = $('.c0re__content .active-background .targetBg');
                TweenMax.to(currentBg, 0.5, {scale:1.5, autoAlpha:0});  
                TweenMax.fromTo(newBg, 0.4, {scale:1.3, autoAlpha:0}, {scale:1, autoAlpha:1});
                setTimeout(function(){ $(currentBg).remove(); TweenMax.to(newBg, 0, {css:{className:"-=targetBg"}}); }, 100);
              });
              
        } else {
          // reset bg if none exists in target
          $('.c0re__content #active-background .background-container').attr('data-src', '');
          $('.c0re__content #active-background .background-container').css('background', '');
          $('.c0re__content #active-background .background-container').css('background-image', '');
        }
    });
    
}


function pauseVideos() {
  clearTimeout(playVideos);
  $.when($('video').each(function() {
      this.pause();
      //console.log('all paused');
  })).then(playVideos);
         
}
function playVideos() {
  setTimeout(function() {
    if($('#active-content .hero-container video').length > 0) {

       var vidCounter = 0;                
       //var vid = document.getElementById("active-vid");
       var vid = $('#active-content .hero-container .hero-content video').get(0);
       $('#active-content .hero-container .hero-content .vid-overlay').css('opacity', '0');
       vid.play();
       vid.addEventListener('ended', function () {    
         
             if (vidCounter < 3) {       
         
                 this.currentTime = 0;
                 this.play();
                 vidCounter ++;
                 //console.log(vidCounter);
             }   else {
              
                $('#active-content .hero-container .hero-content .vid-overlay').css('opacity', '1');
              
             }
         
         }, false);
     
    }
  }, 2150);
 
}


/**
 * FUNCTIONALITY GROUP
 *
 * Browser Fixes
 * 
 */
function firefoxFixes() {
  
    
}
  
  





/**
 * FUNCTIONALITY GROUP
 *
 * Handle Cookies
 * 
 */
function createCookie(name,value,days) {
  if (days) {
    var date = new Date();
    date.setTime(date.getTime()+(days*24*60*60*1000));
    var expires = "; expires="+date.toGMTString();
  }
  else var expires = "";
  document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
    var c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1,c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}

function eraseCookie(name) {
  createElementteCookie(name,"",-1);
}



/**
 * FUNCTIONALITY GROUP
 *
 * Utilize the url 
 * 
 */
function getParameterByName(name, url) {
  if (!url) {
    url = window.location.href;
  }
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function addParameter(url, param, value) {
  // Using a positive lookahead (?=\=) to find the
  // given parameter, preceded by a ? or &, and followed
  // by a = with a value after than (using a non-greedy selector)
  // and then followed by a & or the end of the string
  var val = new RegExp('(\\?|\\&)' + param + '=.*?(?=(&|$))'),
      qstring = /\?.+$/;
  
  // Check if the parameter exists
  if (val.test(url))
  {
      // if it does, replace it, using the captured group
      // to determine & or ? at the beginning
      return url.replace(val, '$1' + param + '=' + value);
  }
  else if (qstring.test(url))
  {
      // otherwise, if there is a query string at all
      // add the param to the end of it
      return url + '&' + param + '=' + value;
  }
  else
  {
      // if there's no query string, add one
      return url + '?' + param + '=' + value;
  }
}




/**
 * FUNCTIONALITY GROUP
 *
 * helper function to get an element's exact position
 *
 */
function getPosition(el) {
  var xPosition = 0;
  var yPosition = 0;
  
  while (el) {
    if (el.tagName == "body") {
      // deal with browser quirks with body/window/document and page scroll
      var xScrollPos = el.scrollLeft || document.documentElement.scrollLeft;
      var yScrollPos = el.scrollTop || document.documentElement.scrollTop;
  
      xPosition += (el.offsetLeft - xScrollPos + el.clientLeft);
      yPosition += (el.offsetTop - yScrollPos + el.clientTop);
    } else {
      xPosition += (el.offsetLeft - el.scrollLeft + el.clientLeft);
      yPosition += (el.offsetTop - el.scrollTop + el.clientTop);
    }
  
    el = el.offsetParent;
  }
  return {
    x: xPosition,
    y: yPosition
  };
}

function printMousePos(event) {
  document.body.textContent =
    "clientX: " + event.clientX +
    " - clientY: " + event.clientY;
}




/**
 * FUNCTIONALITY GROUP
 *
 * INTERFACE ANIMATIONS - Intro and Build Sequences
 *
 */
function mainTimeline() {
  
  var introCookie = readCookie('skipIntro');
  masterTimeline = new TimelineMax({ paused: true});
  
  
  if (introCookie == null) {
      
    createCookie('skipIntro', 'ElijahShepard.Com', 'Cookie sets whether to display the main site intro animation.');

        // handle mobile different
        if (windowWidth < $mobile) {
                
               
          
                  masterTimeline.from($('#sound-control'), 0.5, {css:{ autoAlpha: 0, scale:0 }, ease: Expo.easeOut}, 1.7)
                  .to($('.c0re__transition-wrapper .left'), 1, {css:{ left: "-100%" }, ease: Back.easeOut}, 1)
                  .to($('.c0re__transition-wrapper .right'), 1, {css:{ right: "-100%" }, ease: Back.easeOut}, 1)
                  .to($('.c0re__loader-wrapper'), 0.5, { autoAlpha:0 }, 1)
                  .from($('#c0re__outer'), 0.5, {css:{ autoAlpha: 0 }}, 0.5)
                  .from($('.c0re__view'), 0.5, {css:{ autoAlpha:0, bottom:-100 }}, 1)
                  .from($('.c0re__footer'), 0.8, {css:{ autoAlpha: 0 }, ease: Elastic.easeInOut}, 1.5)
                  .staggerFrom($('#main-nav a'), 0.3, {scale:0}, 0.1);
                  
                  
                    masterTimeline.fromTo($('#elijah #e'), 0.4, {css:{ fill: "#000000" }}, {css:{ fill: "#ffffff" }}, '+=0.25')
                    .fromTo($('#elijah #l'), 0.4, {css:{ fill: "#000000" }}, {css:{ fill: "#ffffff" }}, '-=0.25')
                    .fromTo($('#elijah #i'), 0.4, {css:{ fill: "#000000" }}, {css:{ fill: "#ffffff" }}, '-=0.25')
                    .fromTo($('#elijah #j'), 0.3, {css:{ fill: "#000000" }}, {css:{ fill: "#ffffff" }}, '-=0.3')
                    .fromTo($('#elijah #a'), 0.3, {css:{ fill: "#000000" }}, {css:{ fill: "#ffffff" }}, '-=0.3')
                    .fromTo($('#elijah #h'), 0.2, {css:{ fill: "#000000" }}, {css:{ fill: "#ffffff" }}, '-=0.35');      
                
                
        
        } else {
    
          
                  masterTimeline.from($('#sound-control'), 0.5, {css:{ autoAlpha: 0, scale:0 }, ease: Expo.easeOut}, 1.7)
                  .to($('.c0re__transition-wrapper .left'), 1, {css:{ left: "-100%" }, ease: Back.easeOut}, 1)
                  .to($('.c0re__transition-wrapper .right'), 1, {css:{ right: "-100%" }, ease: Back.easeOut}, 1)
                  .to($('.c0re__loader-wrapper'), 0.5, { autoAlpha:0 }, 1)
                  .from($('#c0re__outer'), 0.5, {css:{ autoAlpha: 0 }}, 0.5)
                  .from($('.c0re__view'), 0.5, {css:{ autoAlpha:0, bottom:-100 }}, 1)
                  .from($('.c0re__footer'), 0.8, {css:{ autoAlpha: 0 }, ease: Elastic.easeInOut}, 1.5)
                  .staggerFrom($('#main-nav a'), 0.3, {scale:0}, 0.1);
                  
                  
                    masterTimeline.fromTo($('#elijah #e'), 0.4, {css:{ fill: "#000000" }}, {css:{ fill: "#ffffff" }}, '+=0.25')
                    .fromTo($('#elijah #l'), 0.4, {css:{ fill: "#000000" }}, {css:{ fill: "#ffffff" }}, '-=0.25')
                    .fromTo($('#elijah #i'), 0.4, {css:{ fill: "#000000" }}, {css:{ fill: "#ffffff" }}, '-=0.25')
                    .fromTo($('#elijah #j'), 0.3, {css:{ fill: "#000000" }}, {css:{ fill: "#ffffff" }}, '-=0.3')
                    .fromTo($('#elijah #a'), 0.3, {css:{ fill: "#000000" }}, {css:{ fill: "#ffffff" }}, '-=0.3')
                    .fromTo($('#elijah #h'), 0.2, {css:{ fill: "#000000" }}, {css:{ fill: "#ffffff" }}, '-=0.35');
                
                
          
        }
    
  } else {

       // handle mobile different
        if (windowWidth < $mobile) {
                
                
                  masterTimeline.from($('#sound-control'), 0.5, {css:{ autoAlpha: 0, scale:0 }, ease: Expo.easeOut}, 1.7)
                  .to($('.c0re__transition-wrapper .left'), 1, {css:{ left: "-100%" }, ease: Back.easeOut}, 1)
                  .to($('.c0re__transition-wrapper .right'), 1, {css:{ right: "-100%" }, ease: Back.easeOut}, 1)
                  .to($('.c0re__loader-wrapper'), 0.5, { autoAlpha:0 }, 1)
                  .from($('#c0re__outer'), 0.5, {css:{ autoAlpha: 0 }}, 0.5)
                  .from($('.c0re__view'), 0.5, {css:{ autoAlpha:0, bottom:-100 }}, 1)
                  .from($('.c0re__footer'), 0.8, {css:{ autoAlpha: 0 }, ease: Elastic.easeInOut}, 1.5)
                  .staggerFrom($('#main-nav a'), 0.3, {scale:0}, 0.1);
                  
                  
                    masterTimeline.fromTo($('#elijah #e'), 0.4, {css:{ fill: "#000000" }}, {css:{ fill: "#ffffff" }}, '+=0.25')
                    .fromTo($('#elijah #l'), 0.4, {css:{ fill: "#000000" }}, {css:{ fill: "#ffffff" }}, '-=0.25')
                    .fromTo($('#elijah #i'), 0.4, {css:{ fill: "#000000" }}, {css:{ fill: "#ffffff" }}, '-=0.25')
                    .fromTo($('#elijah #j'), 0.3, {css:{ fill: "#000000" }}, {css:{ fill: "#ffffff" }}, '-=0.3')
                    .fromTo($('#elijah #a'), 0.3, {css:{ fill: "#000000" }}, {css:{ fill: "#ffffff" }}, '-=0.3')
                    .fromTo($('#elijah #h'), 0.2, {css:{ fill: "#000000" }}, {css:{ fill: "#ffffff" }}, '-=0.35');              
                
                
                  
        
        } else {
    
            
                  masterTimeline.from($('#sound-control'), 0.5, {css:{ autoAlpha: 0, scale:0 }, ease: Expo.easeOut}, 1.7)
                  .to($('.c0re__transition-wrapper .left'), 1, {css:{ left: "-100%" }, ease: Back.easeOut}, 1)
                  .to($('.c0re__transition-wrapper .right'), 1, {css:{ right: "-100%" }, ease: Back.easeOut}, 1)
                  .to($('.c0re__loader-wrapper'), 0.5, { autoAlpha:0 }, 1)
                  .from($('#c0re__outer'), 0.5, {css:{ autoAlpha: 0 }}, 0.5)
                  .from($('.c0re__view'), 0.5, {css:{ autoAlpha:0, bottom:-100 }}, 1)
                  .from($('.c0re__footer'), 0.8, {css:{ autoAlpha: 0 }, ease: Elastic.easeInOut}, 1.5)
                  .staggerFrom($('#main-nav a'), 0.3, {scale:0}, 0.1);
                  
                  
                    masterTimeline.fromTo($('#elijah #e'), 0.4, {css:{ fill: "#000000" }}, {css:{ fill: "#ffffff" }}, '+=0.25')
                    .fromTo($('#elijah #l'), 0.4, {css:{ fill: "#000000" }}, {css:{ fill: "#ffffff" }}, '-=0.25')
                    .fromTo($('#elijah #i'), 0.4, {css:{ fill: "#000000" }}, {css:{ fill: "#ffffff" }}, '-=0.25')
                    .fromTo($('#elijah #j'), 0.3, {css:{ fill: "#000000" }}, {css:{ fill: "#ffffff" }}, '-=0.3')
                    .fromTo($('#elijah #a'), 0.3, {css:{ fill: "#000000" }}, {css:{ fill: "#ffffff" }}, '-=0.3')
                    .fromTo($('#elijah #h'), 0.2, {css:{ fill: "#000000" }}, {css:{ fill: "#ffffff" }}, '-=0.35');
                  
                
                
          
        }
        
  }
  
  masterTimeline.timeScale(2.75);
  masterTimeline.play();
  

}





/**
 * FUNCTIONALITY GROUP
 *
 * ANIMATIONS
 *
 */

function webGL() {
        
}




//var camera, scene, renderer,
//    geometry, material, mesh;
// 
//
//
//function webGL() {
//    
//    clock = new THREE.Clock();
//
//    renderer = new THREE.WebGLRenderer();
//    renderer.setSize( window.innerWidth, window.innerHeight );
//
//    scene = new THREE.Scene();
// 
//    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
//    camera.position.z = 1000;
//    scene.add( camera );
// 
//    geometry = new THREE.CubeGeometry( 200, 200, 200 );
//    material = new THREE.MeshLambertMaterial( { color: 0xf1f1f1, wireframe: false } );
//    mesh = new THREE.Mesh( geometry, material );
//    //scene.add( mesh );
//    cubeSineDriver = 0;
// 
//    textGeo = new THREE.PlaneGeometry(300,300);
//    THREE.ImageUtils.crossOrigin = ''; //Need this to pull in crossdomain images from AWS
//    textTexture = THREE.ImageUtils.loadTexture('../assets/img/interfaceElem.png');
//    textMaterial = new THREE.MeshLambertMaterial({color: 0xe7e7e7, opacity: 1, map: textTexture, transparent: true, blending: THREE.AdditiveBlending})
//    text = new THREE.Mesh(textGeo,textMaterial);
//    text.position.z = 800;
//    scene.add(text);
//
//    light = new THREE.DirectionalLight(0xf4f4f4,0.5);
//    light.position.set(-1,0,1);
//    scene.add(light);
//  
//    smokeTexture = THREE.ImageUtils.loadTexture('../assets/img/interfaceSmoke.png');
//    smokeMaterial = new THREE.MeshLambertMaterial({color: 0xf1f1f1, map: smokeTexture, transparent: true});
//    smokeGeo = new THREE.PlaneGeometry(300,300);
//    smokeParticles = [];
//
//
//    for (p = 0; p < 150; p++) {
//        var particle = new THREE.Mesh(smokeGeo,smokeMaterial);
//        particle.position.set(Math.random()*500-250,Math.random()*500-250,Math.random()*1000-100);
//        particle.rotation.z = Math.random() * 360;
//        scene.add(particle);
//        smokeParticles.push(particle);
//    }
// 
//    document.body.appendChild( renderer.domElement );
// 
//}
// 
//function animate() {
// 
//    // note: three.js includes requestAnimationFrame shim
//    
//    delta = clock.getDelta();
//    requestAnimationFrame( animate );
//    evolveSmoke();
//    render();
//    
//}
// 
//function evolveSmoke() {
//    var sp = smokeParticles.length;
//    while(sp--) {
//        smokeParticles[sp].rotation.z += (delta * 0.2);
//    }
//}
//
//function render() {
// 
//    mesh.rotation.x += 0.005;
//    mesh.rotation.y += 0.01;
//    cubeSineDriver += .01;
//    mesh.position.z = 100 + (Math.sin(cubeSineDriver) * 500);
//    renderer.render( scene, camera );
// 
//}
//




//
//
//function  checkInView(elem,partial)
//{
//    var container = $(".nano");
//    var contHeight = container.height();
//    var contTop = container.scrollTop();
//    var contBottom = contTop + contHeight ;
// 
//    var elemTop = $(elem).offset().top - container.offset().top;
//    var elemBottom = elemTop + $(elem).height();
//    
//    var isTotal = (elemTop >= 0 && elemBottom <=contHeight);
//    var isPart = ((elemTop < 0 && elemBottom > 0 ) || (elemTop > 0 && elemTop <= container.height())) && partial ;
//    
//    return  isTotal  || isPart ;
//}
//
//$(document).ready(function(){
//    $(".nano").scroll(function(){
//        var result="",result2="";
//       $.each( $("#loadWrapper"),function(i,e){
//            result += " " +  checkInView($(e),false);
//           result2 += " " +  checkInView($(e),true);
//        });
//        console.log(result, result2);
//    });
//});


function reloadContentLeader () {
   
   //console.log('Hey, look at you. At the tip of the iceberg.');
   
    var isProject = $('#active-content .landing-content').attr('data-project');
    if($('.single-view').length > 0 && $('#black-hole').length > 0 && isProject != '' ) {   // if we are on a project view - in black hole - and the active content is not categorical, then let's re-update the active content when the user scrolls to the top of the page
      
      if (!$('#incoming').is(':empty')){  
        
        var supplemental = $('#incoming .supplemental');
        $('#active-content .supplemental').empty();
        $('#active-content .supplemental').html($(supplemental).html());
        
        
        var targetTitle = $('#incoming h1').text();
        var h1 = $('#active-content h1');
        TweenMax.to(h1, 0.5, {text:targetTitle, speed:0.3, ease:Linear.easeNone, revealDelay:0.25});
        
        var targetHero = $('#incoming .hero-container');        
        var heroContent = $('#active-content .hero-container .hero-content.current');
        TweenMax.to(heroContent, 0.2, {x:-400, autoAlpha:0, ease:Expo.easeIn, onComplete:function(){
          heroContent.remove();
          
        }});
        $.when($('#active-content .hero-container').append($(targetHero).html())).then(function() {
          var newHero = $('#active-content .hero-content').not('.current');
          TweenMax.fromTo(newHero, 0.4, {x:700}, {delay:0.25, autoAlpha:1, x:0, ease:Expo.easeOut, onComplete:function(){
            var newHero = $('#active-content .hero-content').not('.current');
            newHero.addClass('current');
          }});
        });
        
        var activeContent = document.getElementById('incoming');       
        var targetMeta = activeContent.getElementsByClassName('meta-wrapper')[0];
        var pageMeta = $('#active-content .content-leader .meta-wrapper');
        if($('#active-content .meta-wrapper').length > 0 ) {
          $(pageMeta).html($(targetMeta).html());
        } else {
          $(pageMeta).append(targetMeta.outerHTML);
        }
        
        var targetDescription = $('#incoming .content-leader .description').html();
        var description = $('#active-content .content-leader .description');
        TweenMax.to(description, 0.1, {text:targetDescription});
        
        // and start video in the target section
        $('#active-content .hero-container video').each(function() {
          this.play();
        });
    } 
    
    
  }
    
}

function reloadContentLeaderWithCategory () {
          // lets pause the video in the active content area when the user is browsing the list, to free up resources
          //$('#active-content video').each(function() {
          //  $(this).get(0).pause();
          //});
          
          // first, let's store the old data in the #incoming div so we can restore it when the user goes back up the page
          $('#incoming').html($('#active-content .landing-content').html());
          
          // going to swap out the content on the right when a user scrolls the page far enough to start seeing the related work items in the given category. So we'll update the text to reflect the active section
          
          var targetRel = $('#category-switcher .active').attr('rel');
          var categoryContent = $('#landing-'+targetRel);        
          $('#active-content .supplemental').empty();
          
          var targetTitle = $('#landing-'+targetRel+' h1').text();
          var h1 = $('#active-content h1');
          TweenMax.to(h1, 0.5, {text:targetTitle, speed:0.3, ease:Linear.easeNone, revealDelay:0.25});
          
          var targetDescription = $('#landing-'+targetRel+' .content-leader .description').html();
          var description = $('#active-content .content-leader .description');
          TweenMax.to(description, 0.1, {text:targetDescription});
          
          
          var activeContent = document.getElementById('landing-'+targetRel);       
          var targetMeta = activeContent.getElementsByClassName('meta-wrapper')[0];
          var pageMeta = $('#active-content .content-leader .meta-wrapper');
          if($('#active-content .meta-wrapper').length > 0 ) {
            $(pageMeta).html($(targetMeta).html());
          } else {
            $(pageMeta).append(targetMeta.outerHTML);
          }
    
    
}


function contentAnimations() {
  
  var scrollMagicController = new ScrollMagic.Controller();
  
  //// scene 1
  //var trigger_scene1 = '#resultsWrapper';
  //if ($(trigger_scene1).length) {
  //  
  //  var s1_t1 = TweenMax.fromTo($('#active-content h1'), 0.2, {scale:1}, {scale:1, onComplete:reloadContentLeaderWithCategory});
  //    
  //  var scene1 = new ScrollMagic.Scene({
  //    triggerElement: trigger_scene1,
  //    offset: 500,
  //    triggerHook:"onEnter"
  //  })
  //  .setTween(s1_t1)
  //  .addTo(scrollMagicController);
  //  
  //}
  
  
  ////scene 2
  //var trigger_scene2 = '#active-content .hero-container';
  //if ($(trigger_scene2).length) {
  //  
  //  var s2_t1 = TweenMax.fromTo('#active-content .hero-container', 0.35, {autoAlpha:1}, {autoAlpha:0});
  //  var s2_t2 = TweenMax.fromTo('#active-content .content-leader', 0.15, {autoAlpha:1, left:"90px", ease:Expo.easeIn}, {autoAlpha:0, left:"70px"});
  //  
  //  var scene2 = new ScrollMagic.Scene({
  //    triggerElement: trigger_scene2,
  //        offset: 50,
  //        triggerHook:"onLeave"
  //  })    
  //  .setTween([s2_t1, s2_t2])
  //  .addTo(scrollMagicController);
  //
  //}
  
  
  // scene 3
  var trigger_scene3 = '#resultsWrapper';  
  if ($(trigger_scene3).length) {
    $(".mixContainer.active .featured-wrapper .mix .metaThumb").each(function (index, elem) {
        
        //var wrap = $(elem).parents('.results-wrap');
        var s3_t1 = TweenMax.from(elem, 0.15, {
          top:75,
          autoAlpha:0, ease:Expo.easeOut
        });
        
    
      var scene3 = new ScrollMagic.Scene({
        triggerElement: elem,
        offset: 40,
        triggerHook: "onEnter",
        reverse: true
      })
      .setTween(s3_t1)
      //.setClassToggle(wrap, 'activeScene')
      .addTo(scrollMagicController);
      
     
      
    });
    
    $(".mixContainer.active .credits-a-z .mix").each(function (index, elem) {
        
        //var wrap = $(elem).parents('.results-wrap');
        var s3_2_t1 = TweenMax.from(elem, 0.15, {
          top:75,
          autoAlpha:0, ease:Expo.easeOut
        });
        
    
      var scene3_2 = new ScrollMagic.Scene({
        triggerElement: elem,
        offset: 60,
        triggerHook: "onEnter",
        reverse: true
      })
      .setTween(s3_2_t1)
      //.setClassToggle(wrap, 'activeScene')
      .addTo(scrollMagicController);
      
     
      
    });
  }
  
  
  
  
  // scene 4
  var trigger_scene4 = '#the-blahg';  
  if ($(trigger_scene4).length) {
    //TweenMax.from($('.c0re__list-wrapper'), 0.15, {css:{
    //  marginTop:"100vh"},
    //  autoAlpha:0, delay:1 ,ease:Expo.easeOut
    //});
    $(".blahg-item").each(function (index, elem) {
        
        var s4_t2 = TweenMax.from(elem, 0.15, {
          top:75,
          autoAlpha:0, delay:0.3, ease:Expo.easeOut
        });
        
    
      var scene4 = new ScrollMagic.Scene({
        triggerElement: elem,
        offset: 40,
        triggerHook: "onEnter",
        reverse: true
      })
      .setTween(s4_t2)
      //.setClassToggle(wrap, 'activeScene')
      .addTo(scrollMagicController);
      
    });
  }
  
  // scene 5
  var trigger_scene5 = '#about';  
  if ($(trigger_scene5).length) {
    
    $(".legacy").each(function (index, elem) {
        
        var s5_t1 = TweenMax.from(elem, 0.15, {
          top:75,
          autoAlpha:0, delay:0.3, ease:Expo.easeOut
        });
        
    
      var scene5 = new ScrollMagic.Scene({
        triggerElement: elem,
        offset: 50,
        triggerHook: "onEnter",
        reverse: true
      })
      .setTween(s5_t1)
      //.setClassToggle(wrap, 'activeScene')
      .addTo(scrollMagicController);
      
    });
  }
  
  
  
  
  $('#logo').on('mouseenter', function() {    
      logoAnimation = new TimelineMax({ paused: true});
      logoAnimation.fromTo($('#elijah #e'), 0.7, {css:{ fill: "#ffffff" }}, {css:{fill:"#3a4141" }}, '+=0')
      .fromTo($('#elijah #l'), 0.6, {css:{ fill: "#ffffff" }}, {css:{fill:"#3a4141" }}, '-=0.25')
      .fromTo($('#elijah #i'), 0.6, {css:{ fill: "#ffffff" }}, {css:{fill:"#3a4141" }}, '-=0.25')
      .fromTo($('#elijah #j'), 0.5, {css:{ fill: "#ffffff" }}, {css:{fill:"#3a4141" }}, '-=0.25')
      .fromTo($('#elijah #a'), 0.4, {css:{ fill: "#ffffff" }}, {css:{fill:"#3a4141" }}, '-=0.25')
      .fromTo($('#elijah #h'), 0.3, {css:{ fill: "#ffffff" }}, {css:{fill:"#3a4141" }}, '-=0.25');
      logoAnimation.timeScale(4.5).play();                  
  });
  $('#logo').on('mouseleave', function() {    
      logoAnimation.timeScale(5).reverse();                  
  });
  
  
  
  
  
}

function logos() {
  
  
  if ($('#brand-experience').length > 0) {
  
    if($(window).innerWidth() <= 768) {
      
      var logos_1 = TweenMax.fromTo('.logos_1',27.5,{backgroundPosition:"0"}, {repeat:-1,backgroundPosition:"-1100px",ease:SteppedEase.config(11)});
      var logos_2 = TweenMax.fromTo('.logos_2',19,{backgroundPosition:"0"}, {repeat:-1,backgroundPosition:"-1100px",ease:SteppedEase.config(11)});
      var logos_3 = TweenMax.fromTo('.logos_3',22.5,{backgroundPosition:"0"}, {repeat:-1,backgroundPosition:"-1100px",ease:SteppedEase.config(11)});
      var logos_4 = TweenMax.fromTo('.logos_4',25,{backgroundPosition:"0"}, {repeat:-1,backgroundPosition:"-1100px",ease:SteppedEase.config(11)});            
      logos_1.timeScale(1).delay(1).play(0);
      logos_2.timeScale(1).delay(1).play(0);
      logos_3.timeScale(1).delay(1).play(0);
      logos_4.timeScale(1).delay(1).play(0);
      console.log('sarah');
    } else if($(window).innerWidth() > 768) {
      var logos_1 = TweenMax.fromTo('.logos_1',27.5,{backgroundPosition:"0"}, {repeat:-1,backgroundPosition:"-2200px",ease:SteppedEase.config(11)});
      var logos_2 = TweenMax.fromTo('.logos_2',19,{backgroundPosition:"0"}, {repeat:-1,backgroundPosition:"-2200px",ease:SteppedEase.config(11)});
      var logos_3 = TweenMax.fromTo('.logos_3',22.5,{backgroundPosition:"0"}, {repeat:-1,backgroundPosition:"-2200px",ease:SteppedEase.config(11)});
      var logos_4 = TweenMax.fromTo('.logos_4',25,{backgroundPosition:"0"}, {repeat:-1,backgroundPosition:"-2200px",ease:SteppedEase.config(11)});
      logos_1.timeScale(1).delay(1).play(0);
      logos_2.timeScale(1).delay(1).play(0);
      logos_3.timeScale(1).delay(1).play(0);
      logos_4.timeScale(1).delay(1).play(0);
      console.log('walker');
    }
    
  }

}


/**
 * FUNCTIONALITY GROUP
 *
 * ELEMENT SIZES AND RESETS
 *
 */
function setMasks () {
  
  var scrollPos = $(window).scrollTop();
  if (scrollPos > 80) {
      //$("#footer").addClass('masked');
      //if($(".active-background").length > 0 ) {
      //  $(".active-background").addClass('masked');
      //}
  }
  if (scrollPos < 70) {
      //$("#footer").removeClass('masked');
      //if($(".active-background").length > 0 ) {
      //  $(".active-background").removeClass('masked');
      //}
  }
  if (scrollPos > 700) {
    //console.log('looks like you have scrolled, my friend.');
    
    
  }
  else if (scrollPos < 200) {   
    // user is back towards the top
    //var isProject = $('#active-content .landing-content').attr('data-project');
    //var isSwitching = $('#category-switcher').attr('data-status');
    //if($('#black-hole').length > 0 && isProject != "" && isSwitching != "switching" ) { reloadContentLeader(); }
  }
  
  manageBackground();
  
}
function manageBackground() {
   if($('#active-content .active-background').length > 0) {
    $('body').addClass('background-is-active');
  } else {
    $('body').removeClass('background-is-active');
  }
}
function setElements() {
  
  setMasks();
  
  var windowHeight = $(window).innerHeight(),
      windowWidth = $(window).innerWidth(),
      adjHeight = windowHeight / 2,
      theContent = $('.c0re__content').innerHeight(),
      main = $('#active-content').innerHeight(),
      landingContent = $('#active-content .landing-content').innerHeight(),
      hero = $('.hero-content img, .hero-content video').innerHeight(),
      fit = $('.c0re__view, .viewport'),
      fitHeight = windowHeight - 180,
      winTop = $(window).scrollTop(),
      adjustForMain = main - windowHeight + 120;
  
  TweenMax.set(fit, {css:{minHeight:fitHeight}});  // immediate adjustments
  
  if($('#eye-candy').length > 0 ) {
    TweenMax.set(fit, {css:{minHeight:windowHeight}});  // immediate adjustments
  }
  setTimeout(function(){  // delayed adjustments
    if (theContent >= windowHeight) {
        // the following elements with .scrollable class applied with force the browser scrollbar
        TweenMax.set($('#c0re__outer'), {css:{className: "+=scrollable"}});     
    } else {
        // otherwise remove scrollable class and set min-height to fit the window
        TweenMax.set($('#c0re__outer'), {css:{className: "-=scrollable"}});      
    }
    // see how tall the main content is and do some things
    if (landingContent >= windowHeight-180 && windowWidth >= 1024) {
      $('#black-hole').addClass('scrollable');
      $('#black-hole .landing-content').removeClass('hasHeight');
      //$('#black-hole #active-content .landing-content').removeClass('hasHeight');
    }
    else if (windowHeight < 1000 && windowWidth >= 1024) {
      $('#black-hole').addClass('scrollable');
    }
    else if (windowWidth < 1024) {
      $('#black-hole').removeClass('scrollable');
      $('#black-hole .landing-content').removeClass('hasHeight');
      TweenMax.set($('#active-content'), {css:{minHeight:fitHeight}}); 
      
    }
    else if (landingContent < windowHeight && windowWidth > 1024 && windowWidth <= 1800) {
      $('#black-hole .landing-content').addClass('hasHeight');
      
    } else {
      $('#black-hole').removeClass('scrollable');
      $('#black-hole .landing-content').removeClass('hasHeight');
      
      //TweenMax.set(main, {css:{minHeight:fitHeight}}); 
      //$('#black-hole #active-content .landing-content').addClass('hasHeight');
    }
    
    
    
    // the following will prevent the left side from being empty while scrolling the rest of the results by sticking the main content once its end is reached
    //if( winTop > adjustForMain && windowWidth > 1024) {
    //  $('#black-hole #active-content .landing-content').addClass('hasHeight');
    //} else {
    //  $('#black-hole #active-content .landing-content').removeClass('hasHeight');
    //}
    
    
    //if($(window).innerWidth() <= 1440 && $(window).innerWidth() > 1024 ) {
    //  $('#black-hole #active-content .landing-content').addClass('scrollable');    
    //  $('#black-hole #active-content .landing-content').css({'left':'10px', 'width':'95%'});
    //}
    //
    //if($(window).innerWidth() < 1024 ) {
    //  //var mainWidth = $(window).innerWidth() - 30;
    //  //$('#black-hole #active-content .landing-content').css({'width':+mainWidth});
    //  var mainHeight = $('#black-hole #active-content .landing-content').innerHeight() + 100;
    //  $('#black-hole #active-content .landing-content').css({'height':+mainHeight});
    //}
  }, 175); // called after debounce scroll function
  
}




/**
 * FUNCTIONALITY GROUP
 *
 * SECTION LOGIC
 *
 */
function loadPage(section) {
  
  var scrollPos = $(window).scrollTop();
  if (scrollPos > 0) {
      $("#navigation").addClass('scrolled');
  }

  //if ($.inArray(pathArray[$installDirectory], onePageSections) > 0) {
  //  
  //  var targetID = $('section[data-id='+section+']');
  //    $('html, body').animate({
  //      scrollTop: targetID.offset().top - 80
  //    }, 1000);
  //}
  //
  
}







/**
 * FUNCTIONALITY GROUP
 *
 * SECTION SWITCHING EVENTS
 *
 */
function changeSectionVar(target) {
  // set var for current section AFTER animation takes place ***important****
  //console.log('the target section is', target);
  section = target;
  //console.log('the current section is now', section); 
}
//function closePage(href, target, name, currentName, style) {
//      
//      //if (style == 'A') {
//      //    
//      //   var targetID = $('section[data-id='+target+']');
//      //   var current = $('section[data-id='+section+']');
//      //   var siblings = $(current).siblings('section');
//      //   var newSiblings = $(targetID).siblings('section');
//      //   
//      //   if(!$('#navigation-menu').is(':hidden') && $(window).innerWidth() < menuBreakpoint) {
//      //       $('#navigation-menu').slideToggle(function(){
//      //           $('#navigation-menu').removeAttr('style');
//      //       });
//      //       $('#menuIcon').toggle();
//      //       $('#closeMenu').toggle();
//      //   }
//      //   
//      //   
//      //   if (window.history && window.history.pushState) {
//      //     
//      //     history.pushState("", document.name, href);
//      //   }
//      //   
//      //   var pageSwitching = new TimelineMax({ paused: true});
//      //     
//      //     pageSwitching          
//      //     .from(targetID, 1, {css:{ bottom: "-10%" }, ease: Expo.easeInOut, onComplete:changeSectionVar(target)});  
//      //   
//      //   pageSwitching.play();
//      //   console.log(target);
//      //   
//      //   $(newSiblings).removeClass('active');
//      //   $(targetID).addClass('active');
//      //   
//      //   $('html, body').animate({
//      //     scrollTop: targetID.offset().top - 80
//      //   }, 1000);
//      //   
//      //   
//      //   // update google analytics
//      //   ga('send', {
//      //       'hitType': 'pageview',
//      //       'page': href,
//      //       'title': name
//      //   });
//      //   
//      //}
//      
//      if (style == 'B') {
//        
//             var targetID = $('section[data-id='+target+']');
//             var current = $('section[data-id='+section+']');
//             var siblings = $(current).siblings('section');
//             var newSiblings = $(targetID).siblings('section');
//             
//             //if(!$('#navigation-menu').is(':hidden')) {
//             //    $('#navigation-menu').slideToggle(function(){
//             //        $('#navigation-menu').removeAttr('style');
//             //    });
//             //    $('#menuIcon').toggle();
//             //    $('#closeMenu').toggle();
//             //    $('body').removeClass('mobileMenuOpen');
//             //}
//             //
//             //
//             if (window.history && window.history.pushState) {
//               
//               history.pushState("", document.name, href);
//             }
//             
//             var pageSwitching = new TimelineMax({ paused: true});
//               
//               pageSwitching          
//               .from(targetID, 1, {css:{ bottom: "-10%" }, ease: Expo.easeInOut, onComplete:changeSectionVar(target)});  
//             
//             pageSwitching.play();
//             console.log(target);
//             
//             $(newSiblings).removeClass('active');
//             $(targetID).addClass('active');
//             
//             $('html, body').animate({
//               scrollTop: targetID.offset().top - 80
//             }, 1000);
//             
//             
//             // update google analytics
//             //ga('send', {
//             //    'hitType': 'pageview',
//             //    'page': href,
//             //    'title': name
//             //});
//             //
//      }
//      
//                
//}
//




/**
 * FUNCTIONALITY GROUP
 *
 * NAVIGATION
 *
 */
function expandHamNav(){
    $('#menu-icon').toggleClass('open');
    var navContainer = $("#overlay-nav");
    TweenMax.fromTo(navContainer, 0.3, {opacity:0}, {opacity:1,display:'block'});
    if($('#navigation .brand-logo').hasClass('hideLogo')) {
      TweenMax.fromTo($('#navigation .brand-logo'), 0.2, {opacity:0}, {opacity:1, scale:1})
    }
    if($('.navigation-menu').is(':hidden')) {
        $('.navigation-menu').slideToggle(function(){
        
          $('.navigation-menu').removeAttr('style');          
          $('body').addClass('menuOpen');
        
        });
      }
    
}
function closeHamNav(){
    $('#menu-icon').toggleClass('open');
    var navContainer = $("#overlay-nav");
    TweenMax.fromTo(navContainer, 0.3, {opacity:1}, {opacity:0,display:'none'});
    if($('#navigation .brand-logo').hasClass('hideLogo')) {
      TweenMax.fromTo($('#navigation .brand-logo'), 0.2, {opacity:1}, {opacity:0, scale:0})
    }
    if($('.navigation-menu').is(':visible')) {
        $('.navigation-menu').slideToggle(function(){
         //   $('#c0re__interface').css('position', 'initial');
            $('.navigation-menu').removeAttr('style');
            $('body').removeClass('menuOpen');
        });
        var navContainer = $("#overlay-nav");
        TweenMax.fromTo(navContainer, 0.3, {opacity:1}, {opacity:0,display:'none'});
        
    }
    
}
function mainNav(style) {
  
  
    // if using hamburger nav
    //var menuToggle = $('#menu-icon').unbind();
    ////var menuToggle = $('#menu-icon');
    //
    //menuToggle.on('click', function(e) {
    //  e.preventDefault();
    //  if ($('body').hasClass('menuOpen')) {
    //    closeHamNav();
    //  } else {
    //    expandHamNav();
    //  }
    //});
    //  
    //// close if user doesn't want to use nav anymore
    //$(document).mouseup(function (e)
    //{
    //    var container = $("#overlay-nav .navigation-menu");
    //    var hamburger = $("#navigation #menu-icon");
    //
    //    if (!container.is(e.target) && !hamburger.is(e.target) && $('body').hasClass('menuOpen') // if the target of the click isn't the container OR the hamburger nav...
    //        && hamburger.has(e.target).length === 0 && container.has(e.target).length === 0) // ... nor a descendant of the container
    //    {
    //        //container.hide();
    //        closeHamNav();
    //        
    //    }
    //});
  

  // handle menu structure animations
  $(".c0re__header .navigation-menu .nav-link").each(function(index, element){
      
      var nav = new TimelineMax({paused:true});
      var item = $(this);
      var submenu = item.find('.submenu');
      var destination = item.find('.destination');
      var supplemental = item.find('.supplemental');
      var siblings = item.siblings();  // important for mobile
      var subnav = submenu.find('li');
      
      nav.to(item, 0, {css:{className:'+=active'}}, 0)
          .to(destination, 0.2, {css:{y:-8, ease:Expo.easeInOut}})
          .to(supplemental, 0.25, {css:{y:8, autoAlpha:1, ease:Expo.easeInOut}});
          //.to(submenu, 0.2, {css:{autoAlpha:1}})
          //.staggerFrom(subnav, 0.2, {autoAlpha:0, x:50, ease: Back.easeOut}, 0.2);
      nav.timeScale(1);
      element.animation = nav;
    });
  
    function over(){
      this.animation.play();
      
    }
    function out(){
      var activeMenu = $(this).find('.submenu');
      if (activeMenu.hasClass('active')) {
      
      }
      else {
        this.animation.reverse();
        
      }
    }
    $(".c0re__header .navigation-menu .nav-link").hover(over, out);
    
    
    
    $(".c0re__header .navigation-menu .nav-link .submenu").each(function(index, element){
      var subnav = new TimelineMax({paused:true});
      var item = $(this);
      
      subnav.to(item, 0, {css:{className:'+=active'}}, 0);
      
      element.animation = subnav;
      
    });
    function subOver(){
      this.animation.play();
      
    }
    function subOut(){
      this.animation.reverse();
    }
  
    $('.c0re__header .navigation-menu .submenu').hover(subOver, subOut);
  

  
}

function initButtons() {
  
  //$(".button-collapse").sideNav({
  //    menuWidth: 300, // Default is 300
  //    edge: 'right', // Choose the horizontal origin
  //    closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
  //    draggable: true // Choose whether you can drag to open on touch screens
  //});
  
  
  var navItem = $('.c0re__header .nav-link a'); 

  $(navItem).on('click', function(e) {
      e.preventDefault();
      
      var href = this.href;
      var target = $(this).attr('data-target');
      var name = $(this).attr('data-name');
      var currentName = $(this).attr('data-name');
      var parent =  $(this).parent('.nav-link');
      var siblings  = $(parent).siblings();
      var targetID = $('section[data-id='+target+']');
      
      $(siblings).find('a').removeClass('active');
      $(this).addClass('active');
      
      if ($(this).attr('target') == '_blank') {
          gotoPage(href);
      }
      else if ($(this).parent('li').hasClass('has-dropdown')) {
          return false;
      }
      //else if(targetID.length <= 0) {
      //    gotoPage(href);
      //}
      else {
          closePage(href);  
      }     
  });
  
    
    $('#pageSubNav').pushpin({
        top: 705,
        //bottom: 100,
        offset: 105 
    });
    
    if ($('#pageSubNav').length > 0) {
      if ($('#pageSubNav').hasClass('pinned')) {
        //$('.c0re__header').css('position','relative');
      } else {
        //$('.c0re__header').css('position','fixed');
      }
    }
    
//
//	//smooth scroll to the section
//	navigationItems.on('click', function(event){
//        event.preventDefault();
//        //smoothScroll($(this.hash));
//        
//        //var activeSection = $(this).attr('data-number');
//        //var targetSection = $('section[data-id="'+activeSection+'"]');
//        ////var siblingSection = $(targetSection).siblings('section');
//        //var siblingSection = $('.c0re-section').not(targetSection);
//        //$("#navigation").addClass('scrolled');  
//        //$(siblingSection).removeClass('in-view');
//        //$(targetSection).addClass('in-view');
//        //$.when($(targetSection).addClass('in-view')).then(smoothScroll($(targetSection)));
//        
//        //smoothScroll($(this.hash));
//
//    });


    //smooth scroll 
    $('.c0re-scroll-down').on('click', function(event){
        event.preventDefault();
        smoothScroll($(this.hash));
    });

    ////open-close navigation on touch devices
    //$('.touch .c0re-nav-trigger').on('click', function(){
    //	$('.touch #c0re-vertical-nav').toggleClass('open');
    //
    //});
    ////close navigation on touch devices when selectin an elemnt from the list
    //$('.touch #c0re-vertical-nav a').on('click', function(){
    //	$('.touch #c0re-vertical-nav').removeClass('open');
    //});

	
}



function smoothScroll(target) {
    $('body,html').animate(
        {'scrollTop':target.offset().top},
        600
    );
}



function gotoPage(href){
    window.open(href, '_blank');
}
function closePage(href){
    window.location = href;
}










/**
 * FUNCTIONALITY GROUP
 *
 * Replace SVG images with inline SVG for manipulation with css/js.
 * Add class of "svg" to img tags you want to utilize this. 
 *
 */

function inlineSVG() {
  
  jQuery('img.svg').each(function(){
      var $img = jQuery(this);
      var imgID = $img.attr('id');
      var imgClass = $img.attr('class');
      var imgURL = $img.attr('src');
  
      jQuery.get(imgURL, function(data) {
          // Get the SVG tag, ignore the rest
          var $svg = jQuery(data).find('svg');
  
          // Add replaced image's ID to the new SVG
          if(typeof imgID !== 'undefined') {
              $svg = $svg.attr('id', imgID);
          }
          // Add replaced image's classes to the new SVG
          if(typeof imgClass !== 'undefined') {
              $svg = $svg.attr('class', imgClass+' replaced-svg');
          }
  
          // Remove any invalid XML tags as per http://validator.w3.org
          $svg = $svg.removeAttr('xmlns:a');
  
          // Replace image with new SVG
          $img.replaceWith($svg);
  
      }, 'xml');
  
  });
}



/**
 * FUNCTIONALITY GROUP
 *
 * Setup lightboxes, overlays, modals
 * 
 */
function gallery() {
  
}
function initFancybox() {
  
  $("[data-fancybox]").fancybox({
		protect: true,
        loop: false,
        keyboard:true,
        toolbar:true,
        mobile : {
            clickContent : function( current, event ) {
                return current.type === 'image' ? 'toggleControls' : false;
            },
            clickSlide : function( current, event ) {
                return current.type === 'image' ? 'toggleControls' : "close";
            },
            dblclickContent : function( current, event ) {
                return current.type === 'image' ? 'zoom' : false;
            },
            dblclickSlide : function( current, event ) {
                return current.type === 'image' ? 'zoom' : false;
            }
        },
        media : {
            youtube : {
                params : {
                    autoplay : 0
                }
            }
        },
        slideShow : {
            autoStart : true,
            speed     : 5000
        },
        fullScreen : {
            autoStart : false,
        },
    
        touch : {
            vertical : true,  // Allow to drag content vertically
            momentum : true   // Continue movement after releasing mouse/touch when panning
        },
  });
  
  //
  //$(".fancybox").fancybox({
  //          openEffect	: 'none',
  //          closeEffect	: 'none',
  //          helpers : {
  //              overlay: {
  //                  locked: false
  //              }
  //          }            
  //  });
  //  
  //  $(".videoOverlay").fancybox({
  //          maxWidth	: 1800,
  //          maxHeight	: 1200,
  //          fitToView	: true,
  //          width		: '100%',
  //          height		: '90%',
  //          autoSize	: true,
  //          closeClick	: false,
  //          openEffect	: 'none',
  //          closeEffect	: 'none'
  //  });
  //
  //$('.media').fancybox({
  //      beforeShow: function () {
  //          if (this.title) {
  //              // New line
  //              this.title = '';
  //              
  //              // Add tweet button
  //              this.title += '<a href="https://twitter.com/share" class="twitter-share-button" data-count="none" data-url="' + this.href + '">Tweet</a> ';
  //              
  //              // Add FaceBook like button
  //              this.title += '<iframe src="//www.facebook.com/plugins/like.php?href=' + this.href + '&amp;layout=button_count&amp;show_faces=true&amp;width=500&amp;action=like&amp;font&amp;colorscheme=light&amp;height=23" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:110px; height:23px;" allowTransparency="true"></iframe>';
  //          }
  //      },
  //      afterShow: function() {
  //          // Render tweet button
  //          twttr.widgets.load();
  //          
  //      },
  //      helpers : {
  //          title : {
  //              type: 'inside'
  //          },
  //          overlay: {
  //              locked: false
  //          },
  //          media : {
  //            
  //          }
  //
  //      }
  //});
     
}


/**
 * FUNCTIONALITY GROUP
 *
 * WORK PAGES
 *
 */
function work() {
  if ($('.swiper-container').length > 0) {
    
    var swiper = new Swiper('.swiper-container', {
          //pagination: '.swiper-pagination',
          slidesPerView: 'auto',
          centeredSlides: false,
          //paginationClickable: true,
          spaceBetween: 3,
          //loop: true,
          //nextButton: '.swiper-button-next',
          //prevButton: '.swiper-button-prev',
    });
    
  }
}




/**
 * FUNCTIONALITY GROUP
 *
 * WEBGL
 *
 */
function phone() {
//    $(".stage").on("mousemove", function(e){
//		xPos = e.pageX;
//		yPos = e.pageY;
//		stageWidth = $(".stage").width();
//		stageHeight = $(".stage").height();
//		
//		glareX = (stageWidth - xPos) - 300;
//		glareY = (stageHeight - yPos) - 300;
//		softxPos = -[(xPos/stageWidth * 80) + -40];
//		softyPos = [(yPos/stageHeight * 80) + -40];
//				
//		$(".positioning").css("-webkit-transform", "rotateY("+softxPos+"deg) rotateX("+softyPos+"deg)");
//		$(".glare").css("-webkit-transform", "translateX("+glareX+"px) translateY("+glareY+"px) rotateZ(45deg)");
//	});
	//
	//$("#new-image").on("keypress", function(e){
	//	if(e.keyCode == 13){
	//		newImage = $(this).val();
	//		$(".screen img").attr("src", newImage);
	//		$(this).val("");
	//	}
	//});
	//
	//$("#new-video").on("keypress", function(e){
	//	if(e.keyCode == 13){
	//		newVideo = $(this).val();
	//		$('#source').remove();
	//		var video = document.getElementById('video');
	//		var source = document.createElement('source');
	//		source.setAttribute('src', ''+newVideo+'');
	//		source.id = "source";
	//		video.appendChild(source);
	//		video.play();
	//		$(this).val("");
	//	}
	//});
}





/**
 * FUNCTIONALITY GROUP
 *
 * TOUCH EVENTS - CUSTOM SWIPING FUNCTIONALITY
 *
 */
function swipeNav() {
  
  
  // let's allow the user to swipe to change sections on touch devices
  var myElement = document.getElementById('black-hole');    
  var mc = new Hammer.Manager(myElement);
  
  if(myElement.length > 0) {
      mc.add(new Hammer.Pan({direction:Hammer.DIRECTION_HORIZONTAL, threshold:200, pointers: 0}));
      mc.on("panend", function(ev) {
        
        
        var activeSection = $('#category-switcher .active');
        var prevSection = $(activeSection).parent('li').prev('.tab');    
        var nextSection = $(activeSection).parent('li').next('.tab');
        var prev = $(prevSection).find('a');    
        var next = $(nextSection).find('a');
        
        if(ev.direction == Hammer.DIRECTION_LEFT) 
        {
             
             if(next.length > 0) {
                $(next).trigger('click');                
             }
        }
        if(ev.direction == Hammer.DIRECTION_RIGHT) 
        {  
            if(prev.length > 0) {
              $(prev).click();          
            }
        }
      });
  }
}

