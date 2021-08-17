$(window).resize(() => {
  document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
});
document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
// document.addEventListener('DOMContentLoaded', () => {

// });
var swiper = new Swiper('.mySwiper', {
  slidesPerView: 5,
  spaceBetween: 10,
  slidesPerGroup: 1,
  loop: true,
  loopFillGroupWithBlank: true,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  breakpoints: {
    // when window width is >= 320px
    320: {
      slidesPerView: 3,
      spaceBetween: 5,
    },
    // when window width is >= 480px
    480: {
      slidesPerView: 4,
      spaceBetween: 30,
    },
    // when window width is >= 640px
    640: {
      slidesPerView: 4,
      spaceBetween: 40,
    },
    860: {
      slidesPerView: 5,
      spaceBetween: 40,
    },
  },
});

const menuContainer = document.querySelector('.js-menu-container');
const menuOpen = document.querySelector('.js-menu-open');
const menuClose = document.querySelector('.js-menu-close');
menuOpen.addEventListener('click', () => {
  if (menuContainer.classList.contains('active')) return;
  document.querySelector('body').style.overflow = 'hidden';
  menuContainer.classList.add('active');
});

menuClose.addEventListener('click', () => {
  if (!menuContainer.classList.contains('active')) return;
  menuContainer.classList.remove('active');
  document.querySelector('body').style.overflow = 'auto';
});

const buttonUp = document.querySelector('.js-btn-up');
console.log(buttonUp);
if (buttonUp) {
  buttonUp.addEventListener('click', () => {
    window.locoScroll.scrollTo(0);
  });
}

const scrollButtons = document.querySelectorAll('[data-scroll-to]');
scrollButtons.forEach(container => {
  container.addEventListener('click', e => {
    const { scrollTo } = e.currentTarget.dataset;
    if (!scrollTo) return;
    const elem = document.querySelector(`[data-container="${scrollTo}"]`);
    window.locoScroll.scrollTo(elem);
  });
});

const btnCall = document.querySelector('.js-call');
const btnCallMenu = document.querySelectorAll('.js-call-menu');
const btnClose = document.querySelector('.js-close');
const formCall = document.querySelector('.sideform');
btnCall.addEventListener('click', () => {
  formCall.classList.toggle('sideform-active');
});
btnCallMenu.forEach(el =>
  el.addEventListener('click', () => {
    formCall.classList.toggle('sideform-active');
    document.querySelector('body').style.overflow = 'hidden';
  }),
);
btnClose.addEventListener('click', () => {
  formCall.classList.remove('sideform-active');
  document.querySelector('body').style.overflow = 'auto';
});

// form tel

const placeHolder = document.querySelector('.place-holder-pop-up'),
  input = document.querySelector('.input-tel-pop-up');
placeHolder.addEventListener('click', function() {
  placeHolder.style.display = 'none';
  input.focus();
});

const placeholderFooter = document.querySelector('.js-placeholder-footer');
const inputFooter = document.querySelector('.js-input-footer');
placeholderFooter.addEventListener('click', function() {
  placeholderFooter.style.display = 'none';
  inputFooter.focus();
});

// form of gratitude start
const backdrop = document.querySelector('.backdrop');
const closeBtn = document.querySelector('.js-submit-close');
// const submitBtn = document.querySelectorAll('data-btn-submit');

closeBtn.addEventListener('click', () => {
  backdrop.classList.remove('is-hidden-form');
});

// submitBtn.addEventListener('click', () => {
//   backdrop.classList.add('is-hidden-form');
// });

// end
