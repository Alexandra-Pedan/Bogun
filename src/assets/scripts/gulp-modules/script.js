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
  console.log('dddd!!!!!!!!!!!!!');
  window.locoScroll.scrollTo(0);
  // window.scrollTo({
  //   top: 0,
  //   behavior: 'smooth',
  // });
  // window.scrollTo(0, 0);
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
// buttonUp.addEventListener('click', up);

// function up() {
//   let top = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
//   if (top > 0) {
//     window.scrollBy(0, (top + 100) / -10);
//     t = setTimeout('up()', 20);
//   } else clearTimeout(t);
//   return false;
// }

// location1.addEventListener('click', () => {
//   window.locoScroll.scrollTo(service1);
//   // service1.scrollIntoView(false);
// });
// service1.addEventListener('click', () => {
//   window.locoScroll.scrollTo(architecture1);
//   // architecture1.scrollIntoView(false);
// });
// architecture1.addEventListener('click', () => {
//   // flat1.scrollIntoView(false);
//   window.locoScroll.scrollTo(flat1);
// });
// flat1.addEventListener('click', () => {
//   // contacts1.scrollIntoView(false);
//   window.locoScroll.scrollTo(contacts1);
// });

// contacts1.addEventListener('click', () => {
//   // contacts2.scrollIntoView(false);
//   window.locoScroll.scrollTo(contacts2);
// });

// location.addEventListener('click', () => {
//   window.scrollBy(0, 1000);
// });

// document.addEventListener('DOMContentLoaded', () => {
//   var swiper = new Swiper(".mySwiper", {
//     spaceBetween: 30,
//     effect: "fade",
//     navigation: {
//       nextEl: ".swiper-button-next",
//       prevEl: ".swiper-button-prev",
//     },
//     pagination: {
//       el: ".swiper-pagination",
//       clickable: true,
//     },
//   });
//   window.locoScroll.update();
// })

// const burger = document.querySelector(".container-burger");

// const burgerSelect = document.querySelector(".burger-menu");
// const consultation = document.querySelector(".js-consultation");
// const backdrop = document.querySelector(".backdrop");
// const closeBtn = document.querySelector('.close-button-div');
// const question = document.querySelectorAll(".js-more");
// const backdropQuestion = document.querySelector(".backdrop-question");
// const backdropConsultation = document.querySelector(".backdrop-consultation");
// const callBackdropConsultation = document.querySelectorAll('.js-call-consultation');
// burger.addEventListener('click', () => {
//   burger.classList.toggle('change');
//   burgerSelect.classList.toggle('is-hidden');
// });

// // consultation.addEventListener('click', () => {
// //   backdrop.classList.add('is-hidden-form');
// // });

// closeBtn.addEventListener('click', () => {
//   backdrop.classList.remove('is-hidden-form');
// });

// question.forEach((el) => {
//   el.addEventListener('click', () => {
//     backdropQuestion.classList.add('is-hidden-form');
//   });
// })

// backdropConsultation.querySelector('.close-button-div').addEventListener('click', () => {
//   backdropConsultation.classList.remove('is-hidden-form');
// });

// callBackdropConsultation.forEach((el) => {
//   el.addEventListener('click', () => {
//     backdropConsultation.classList.add('is-hidden-form');
//   });
// })
// window.onscroll = function () {
//     console.log('scroll !!!!!!');
// };

// const buttonUp = document.querySelector('.js-btn-up');
// buttonUp.addEventListener('click', () => {
//     window.scrollTo(0, 0);
// }
