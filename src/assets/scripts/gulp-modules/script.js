var swiper = new Swiper('.mySwiper', {
  slidesPerView: 5,
  spaceBetween: 0,
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
});

const menuContainer = document.querySelector('.js-menu-container');
const menuOpen = document.querySelector('.js-menu-open');
const menuClose = document.querySelector('.js-menu-close');
menuOpen.addEventListener('click', () => {
  if (menuContainer.classList.contains('active')) return;
  menuContainer.classList.add('active');
});

menuClose.addEventListener('click', () => {
  if (!menuContainer.classList.contains('active')) return;
  menuContainer.classList.remove('active');
});

const buttonUp = document.querySelector('.js-btn-up');

buttonUp.addEventListener('click', () => {
  window.locoScroll.scrollTo(0);
});

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
const btnClose = document.querySelector('.js-close');
const formCall = document.querySelector('.sideform');
btnCall.addEventListener('click', () => {
  formCall.classList.toggle('sideform-active');
});
btnClose.addEventListener('click', () => {
  formCall.classList.remove('sideform-active');
});
