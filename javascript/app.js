/**
* Author: Aarjab Goudel
*/
(function() {
  "use strict";

  /**
   * Selects one or more elements
   */
   const select = (element, all = false) => {
    element = element.trim()
    if (all) {
      return [...document.querySelectorAll(element)]
    } else {
      return document.querySelector(element)
    }
  }

  /**
  * Attaches all or one event listener of the element passed in the parameter
  */
  const onEvent = (event_type, element, listener, all = false) => {
    let selectEl = select(element, all)
    if (selectEl) {
      if (all) {
        for (let i = 0; i < selectEl.length; i++) {
          selectEl[i].addEventListener(event_type, listener)
        }
      } else {
        selectEl.addEventListener(event_type, listener)
      }
    }
  }
  
  /**
  * Adds scroll event to element passed in parameter
  */
  const onscroll = (element, listener) => {
    element.addEventListener('scroll', listener)
  }

  /**
   *  Scrolls to an element with header
   */
  const scrollto = (element) => {
    let header = select('.header-section')
    let offset = header.offsetHeight
    let elementPos = select(element).offsetTop
    if (!header.classList.contains('header-scrolled')) {
      offset -= 16
    }
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Manages the visibility of the back to the top button
   */
   let backtotop = select('.back-to-top-button')
   if (backtotop) {
     const toggleBacktotop = () => {
      let scrollY = window.scrollY
       if (scrollY > 100) {
         backtotop.classList.add('active')
       } else {
         backtotop.classList.remove('active')
       }
     }
     window.addEventListener('load', toggleBacktotop)
     onscroll(document, toggleBacktotop)
   }

  /**
   * Selects the header section and makes it fixed to the top
   */
  let selectHeader = select('.header-section')
  if (selectHeader) {
    let headerOffset = selectHeader.offsetTop
    let nextElement = selectHeader.nextElementSibling
    const headerFixed = () => {
      let scrollY = window.scrollY
      if ((headerOffset - scrollY) <= 0) {
        selectHeader.classList.add('fixed-top')
        nextElement.classList.add('scrolled-offset')
      } else {
        selectHeader.classList.remove('fixed-top')
        nextElement.classList.remove('scrolled-offset')
      }
    }
    window.addEventListener('load', headerFixed)
    onscroll(document, headerFixed)
  }

  /**
   * Makes the Navbar links active when scrolling
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let scrollY = window.scrollY;
    let position = scrollY + 200
    for (let i = 0; i < navbarlinks.length; i++) {
      let navbarlink = navbarlinks[i];
      if (!navbarlink.hash) {
        continue
      } 
      let section = select(navbarlink.hash)
      if (!section) {
        continue
      } 
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    }
   }
   window.addEventListener('load', navbarlinksActive)
   onscroll(document, navbarlinksActive)
  
   /**
   * Scrolls to element with the scrollto class
   */
  onEvent('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()
  
      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
  * Activates mobile dropdown when navigating through mobile
  */
  onEvent('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  onEvent('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })


  /**
   * Manages preloader 
   */
  let preloader = select('.preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

  /**
   * On page load, scrolls with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  

  /**
   * Porfolio isotope and filter 
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      onEvent('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

    /**
   * Adds animation on scroll  
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

  /**
   *  Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   *  Portfolio details slider 
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });
})()