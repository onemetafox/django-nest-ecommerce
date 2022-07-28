export function getCartTotal(items) {
  let total = 0;
  if (items) {
    for (let i = 0; i < items.length; i++) {
      total += parseInt(items[i].price * items[i].qty, 10);
    }
  }

  return total;
}

/**
 * Util for making parallax background
 */
export function setParallax() {
  let parallax = document.querySelector('.parallax');
  if (parallax) {
    let y = (parallax.offsetTop - window.pageYOffset) / 20 + 40;
    parallax.style.backgroundPositionY = `${y}%`;
  }
}

/**
 * function to scroll window screen
 */
export function scrollTopHandlder(e) {
  if (isEdgeBrowser() || isSafariBrowser()) {
    let pos = window.pageYOffset;
    let timer = setInterval(() => {
      if (pos <= 0) clearInterval(timer);
      window.scrollBy(0, -40);
      pos -= 40;
    }, 1);
  } else {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
  e.preventDefault();
}

export function scrollTopInit() {
  if (document.querySelector('#scroll-top')) {
    if (window.pageYOffset > 600) {
      document.querySelector('#scroll-top').classList.add('fixed');
    } else {
      document.querySelector('#scroll-top').classList.remove('fixed');
    }
  }
}

/**
 * function to make header sticky
 */

export function stickyInit() {
  let stickyType =
    window.innerWidth > 991 ? '.desktop-sticky' : '.mobile-sticky';
  // Initialize
  let isSticky = document.querySelector('.sticky-header');
  if (
    isSticky &&
    !isSticky.classList.contains('mobile-sticky') &&
    !isSticky.classList.contains('desktop-sticky')
  ) {
    stickyType = '';
  } else {
    if (
      window.innerWidth >= 992 &&
      document.querySelector('.sticky-header.mobile-sticky.fixed')
    ) {
      document
        .querySelector('.sticky-header.mobile-sticky')
        .classList.remove('fixed');
      document
        .querySelector('.sticky-header.mobile-sticky')
        .parentElement.classList.contains('sticky-wrapper') &&
        document
          .querySelector('.sticky-header.mobile-sticky')
          .parentElement.setAttribute('style', 'height: auto');
    } else if (
      window.innerWidth < 992 &&
      document.querySelector('.sticky-header.desktop-sticky.fixed')
    ) {
      document
        .querySelector('.sticky-header.desktop-sticky')
        .classList.remove('fixed');
      document
        .querySelector('.sticky-header.desktop-sticky')
        .parentElement.classList.contains('sticky-wrapper') &&
        document
          .querySelector('.sticky-header.desktop-sticky')
          .parentElement.setAttribute('style', 'height: auto');
    }
  }

  if (
    window.innerWidth >= 992 &&
    document.querySelector('.main .sticky-header.mobile-sticky.fixed')
  ) {
    document
      .querySelector('.main .sticky-header.mobile-sticky')
      .classList.remove('fixed');
    document
      .querySelector('.main .sticky-header.mobile-sticky')
      .parentElement.classList.contains('sticky-wrapper') &&
      document
        .querySelector('.main .sticky-header.mobile-sticky')
        .parentElement.setAttribute('style', 'height: auto');
  } else if (
    window.innerWidth < 992 &&
    document.querySelector('.main .sticky-header.desktop-sticky.fixed')
  ) {
    document
      .querySelector('.main .sticky-header.desktop-sticky')
      .classList.remove('fixed');
    document
      .querySelector('.main .sticky-header.desktop-sticky')
      .parentElement.classList.contains('sticky-wrapper') &&
      document
        .querySelector('.sticky-header.desktop-sticky')
        .parentElement.setAttribute('style', 'height: auto');
  }

  let stickyHeader1 = document.querySelector(
    '.header .sticky-header' + stickyType,
  );
  if (stickyHeader1) {
    let height =
      parseInt(stickyHeader1.offsetHeight) +
      parseInt(
        window
          .getComputedStyle(stickyHeader1)
          .getPropertyValue('margin-top')
          .slice(0, -2),
      );
    stickyHeaderHandler(stickyHeader1, 0, height);
  }

  let stickyHeader2 = document.querySelector(
    '.main .sticky-header' + stickyType,
  );
  if (stickyHeader2) {
    let height =
      parseInt(stickyHeader2.offsetHeight) +
      parseInt(
        window
          .getComputedStyle(stickyHeader2)
          .getPropertyValue('margin-bottom')
          .slice(0, -2),
      );

    if (
      (window.innerWidth < 992 &&
        stickyHeader2.classList.contains('mobile-sticky')) ||
      (window.innerWidth >= 992 &&
        stickyHeader2.classList.contains('desktop-sticky'))
    ) {
      if (stickyHeader1) {
        stickyHeaderHandler(stickyHeader2, stickyHeader1.offsetHeight, height);
      } else {
        stickyHeaderHandler(stickyHeader2, 0, height);
      }
    }
  }

  if (window.innerWidth <= 576 && document.querySelector('.sticky-navbar')) {
    if (window.scrollY >= 400) {
      document.querySelector('.sticky-navbar').classList.add('fixed');
    } else {
      document.querySelector('.sticky-navbar').classList.remove('fixed');
    }
  }

  if (window.innerWidth >= 992 && document.querySelector('body.mmenu-active')) {
    document
      .querySelector('body.mmenu-active')
      .classList.remove('mmenu-active');
  }
}

export function stickyHeaderHandler(stickyHeader, offsetTop, height) {
  let top = 0;

  if (stickyHeader.parentElement.classList.contains('sticky-wrapper')) {
    top =
      window.pageYOffset +
      stickyHeader.parentElement.getBoundingClientRect().top +
      stickyHeader.parentElement.offsetHeight;
  } else {
    top =
      window.pageYOffset +
      stickyHeader.parentElement.getBoundingClientRect().top +
      stickyHeader.offsetHeight;
  }

  if (pageYOffset > top) {
    stickyHeader.classList.add('fixed');

    if (!stickyHeader.parentElement.classList.contains('sticky-wrapper')) {
      let wrapper = document.createElement('div');
      wrapper.className = 'sticky-wrapper';
      stickyHeader.parentElement.insertBefore(wrapper, stickyHeader);
      wrapper.insertAdjacentElement('beforeend', stickyHeader);
    }

    if (
      !stickyHeader.parentElement.getAttribute('style') &&
      stickyHeader.parentElement.classList.contains('sticky-wrapper')
    ) {
      stickyHeader.parentElement.setAttribute(
        'style',
        'height:' + height + 'px',
      );
    }

    if (
      stickyHeader.classList.contains('sticky-cart') ||
      stickyHeader.classList.contains('toolbox')
    ) {
      stickyHeader.setAttribute('style', 'top:' + offsetTop + 'px');
    }
  } else {
    stickyHeader.classList.remove('fixed');

    if (stickyHeader.parentElement.getAttribute('style')) {
      stickyHeader.parentElement.removeAttribute('style');
    }

    if (
      stickyHeader.classList.contains('sticky-cart') ||
      stickyHeader.classList.contains('toolbox')
    ) {
      stickyHeader.removeAttribute('style');
    }
  }
}

/**
 * set Countdown in Product
 */
export const productCountDown = function () {
  let items = document.querySelectorAll('.product-countdown-container');

  setInterval(function () {
    for (let i = 0; i < items.length; i++) {
      let item = items[i];
      let until = new Date('2021-08-20');
      let current = new Date();
      let time = (until - current) / 1000;
      let days = parseInt(time / (3600 * 24)).toString();
      let hours = parseInt((time % (3600 * 24)) / 3600).toString();
      let minutes = parseInt((time % 3600) / 60).toString();
      let seconds = parseInt(time % 60).toString();

      item.querySelector(
        '.product-countdown .days .countdown-amount',
      ).innerHTML = days;
      item.querySelector(
        '.product-countdown .hours .countdown-amount',
      ).innerHTML =
        (10 > hours ? '0' : '') + hours + '<b class="mr-1 ml-1">:</b>';
      item.querySelector(
        '.product-countdown .minutes .countdown-amount',
      ).innerHTML =
        (10 > minutes ? '0' : '') + minutes + '<b class="mr-1 ml-1">:</b>';
      item.querySelector(
        '.product-countdown .seconds .countdown-amount',
      ).innerHTML = (10 > seconds ? '0' : '') + seconds;
    }
  }, 1000);
};

/**
 * Is Firefox Explorer?
 * @return { bool }
 */
export const isFirefoxBrowser = function () {
  let sUsrAg = navigator.userAgent;
  if (sUsrAg.indexOf('Firefox') > -1) return true;
  return false;
};

/**
 * function to detect safari browser
 * @return {bool}
 */
export const isSafariBrowser = function () {
  let sUsrAg = navigator.userAgent;
  if (sUsrAg.indexOf('Safari') !== -1 && sUsrAg.indexOf('Chrome') === -1)
    return true;
  return false;
};

/**
 * function to detect Edge browser
 * @return {bool}
 */
export const isEdgeBrowser = function () {
  let sUsrAg = navigator.userAgent;
  if (sUsrAg.indexOf('Edge') > -1) return true;
  return false;
};

// controll count dom
export const countTo = function () {
  let items = document.querySelectorAll('.count-to');

  if (items) {
    for (let i = 0; i < items.length; i++) {
      let item = items[i];
      let amount =
        parseInt(item.getAttribute('data-to'), 10) -
        parseInt(item.getAttribute('data-from'), 10);
      let time = parseInt(item.getAttribute('data-speed'), 10);
      let interval = parseInt(item.getAttribute('data-refresh-interval'), 10);
      let pt = 0;
      let height =
        item.parentElement.parentElement.parentElement.getBoundingClientRect()
          .top + window.pageYOffset;
      let flag = 0;

      document.addEventListener('scroll', countToScrollHandler, false);

      function countToScrollHandler() {
        if (pt <= time && height >= window.pageYOffset) {
          if (0 === flag) {
            let timerId = setInterval(() => {
              if (pt >= time) {
                clearInterval(timerId);
              }

              item.innerHTML = parseInt((pt * amount) / time);
              pt = pt + interval;
            }, interval);
          }

          flag = 1;
        }
      }
    }
  }
};
