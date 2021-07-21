function filterBuildGalleries(objectWithValidFieldsArg, filterSelector, galleriesToFilter) {
  const objectWithValidFields = objectWithValidFieldsArg;
  objectWithValidFields[filterSelector.dataset.buildFilterName] = filterSelector.currentValue;
  /* Проверка совпадения по полям */
  Object.keys(objectWithValidFields).forEach(filterValue => {
    galleries.forEach(sngGalArg => {
      const sngGal = sngGalArg;
      if (
        objectWithValidFields[filterValue] == 'null' ||
        sngGal.dataset[filterValue] == objectWithValidFields[filterValue]
      ) {
        sngGal.validCount += 1;
      }
    });
  });
  /* Отрисовка после оопределения параметров */
  galleriesToFilter.forEach((snglGallery, index) => {
    const gallery = snglGallery;
    if (gallery.validCount === Object.keys(objectWithValidFields).length) {
      gallery.style.display = 'flex';
      if (gallery.dataset.isViewed === 'false') {
        const entranceSpeed = 50 * (1 + index * 0.5);
        // const heightWithMargin = (
        //   gallery.getBoundingClientRect().height
        //   + parseInt(getComputedStyle(gallery).marginBottom, 10));
        const tl = gsap.timeline({ timeScale: 10 });
        tl.set(gallery, { autoAlpha: 0, x: entranceSpeed });
        tl.fromTo(
          gallery,
          { autoAlpha: 0, x: entranceSpeed },
          { autoAlpha: 1, x: 0, ease: Expo.easeOut },
        );
      }
      gallery.dataset.isViewed = 'true';
    } else {
      const heightWithMargin =
        gallery.getBoundingClientRect().height +
        parseInt(getComputedStyle(gallery).marginBottom, 10);
      const tl = gsap.timeline({ timeScale: 10 });
      tl.to(gallery, { autoAlpha: 0, x: 50, ease: Expo.easeOut });
      tl.to(gallery, { marginTop: heightWithMargin * -1, ease: Expo.easeOut });
      tl.set(gallery, { display: 'none' }, '+=0.1');
      tl.set(gallery, { marginTop: 0 });

      gallery.dataset.isViewed = 'false';
    }
    gallery.validCount = 0;
  });
}

function clearAndAddImagesForRefreshSlider(links, container) {
  const containerToEdit = container;
  const imagesToRender = links.split('~');
  containerToEdit.innerHTML = '';
  imagesToRender.forEach(imageLink => {
    const newImage = document.createElement('img');
    newImage.setAttribute('src', imageLink);
    newImage.classList.add('swiper-slide');
    container.append(newImage);
  });
}

function getImagesForGalleryAjax(galleryObject, cb) {
  const data = new FormData();
  console.log(galleryObject);
  data.append('action', 'progress');
  data.append('id', galleryObject.dataset.buildPopup);
  fetch('/wp-admin/admin-ajax.php', {
    method: 'POST',
    body: data,
  })
    .then(el => {
      return el.json();
    })
    .then(el => {
      cb(el);
    });
}

function changeTextOnPopup() {
  if (POPUP_CONFIG.currentPopup === undefined) return;
  // POPUP_CONFIG.title.textContent = POPUP_CONFIG.currentPopup.querySelector('.subtitle.bold.black').textContent;
  // POPUP_CONFIG.subtitle.textContent = data.dataset.year;
}
function initPopupSlider(param) {
  getImagesForGalleryAjax(param, imageObject => {
    param.dataset.images = imageObject.slider.join('~');
    if (POPUP_CONFIG.swiper !== undefined) {
      POPUP_CONFIG.swiper.destroy(false, true);
      clearAndAddImagesForRefreshSlider(param.dataset.images, POPUP_CONFIG.navImages.children[0]);
      POPUP_CONFIG.swiper = undefined;
    }
    POPUP_CONFIG.swiper = new Swiper(POPUP_CONFIG.navImages, {
      slidesPerView: 'auto',
      // freeMode: true,
      // spaceBetween: 30,
      loop: true,
      centeredSlides: true,
      slideToClickedSlide: true,
      navigation: {
        nextEl: dqs('.arrow-next'),
        prevEl: dqs('.arrow-prev'),
      },
      on: {
        init(selfArg) {
          const self = selfArg;
          self.bigView = dqs('[data-swiper-current-img-view]');
          document.querySelector('[data-total]').innerHTML = document.querySelectorAll(
            '.swiper-slide:not(.swiper-slide-duplicate)',
          ).length;
        },
        activeIndexChange(obj) {
          document.querySelector('[data-current]').innerHTML = obj.realIndex + 1;
        },
      },
    });
    POPUP_CONFIG.swiper.on('activeIndexChange', obj => {
      // document.querySelector('[data-current]').innerHTML = obj.activeIndex + 1;
      document.querySelector('[data-current]').innerHTML = obj.realIndex + 1;
    });
    POPUP_CONFIG.swiper.on('init', () => {});
    POPUP_CONFIG.swiper.on('slideChange', evt => {
      let direction = evt.prevIndex < evt.activeIndex ? 1 : -1;
      // changeImgSrc(evt.bigView, evt.slides[evt.activeIndex].getAttribute('src'), direction);
      evt.prevIndex = evt.activeIndex;
    });
    // console.log(param);
    POPUP_CONFIG.innerPopupElement.innerHTML = imageObject.text;
  });
}
function changeInnerText(element, config) {
  const elementToAdd = element;
  elementToAdd.innerHTML = config.dataset.innerPopupContent;
  // console.log(config.dataset.innerPopupContent);
}
/* Перемещение попапа из контейнера с планвным скроллом */
document.body.append(document.querySelector('[data-build-gallery-popup]'));

/* Галереи с фотографиями строительства  */
const galleries = document.querySelectorAll('[data-progress-gallery]');
const $percentBlocks = document.querySelectorAll('[data-percent-block]');
const POPUP_CONFIG = {
  navImages: dqs('[data-swiper-slider]'),
  bigImage: dqs('[data-swiper-big-image]'),
  title: dqs('[data-popup-title]'),
  subtitle: dqs('[data-popup-subtitle]'),
  swiper: undefined,
  currentPopup: undefined,
  filteredPopups: Array.from(galleries),
  innerPopupElement: dqs('[data-popup-inner-content]'),
};

document.querySelectorAll('[data-build-filter-name]').forEach(el => {
  /* Первичная фильттрация(добавление первой галереи в попап) */
  filterBuildGalleries(buildProgressConfig, el, galleries);
  el.addEventListener('change', () => {
    filterBuildGalleries(buildProgressConfig, el, galleries);
    POPUP_CONFIG.filteredPopups = dqsA('[data-is-viewed*="true"]');
  });
});
initPopupSlider(galleries[0]);

function buildPopupIn(settings) {
  const obj = { ...settings, paused: true, clearProps: 'all' };
  const tl = gsap.timeline(obj);
  tl.fromTo(this.$popup, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.25 }, '<0.125');
  tl.fromTo(this.$popup.querySelector('.swiper-slide-active'), { scale: 1.2 }, { scale: 1 }, '<');
  return tl;
}
function buildPopupOut(settings) {
  const obj = { ...settings, paused: true, clearProps: 'all' };
  const tl = gsap.timeline(obj);
  tl.fromTo(this.$popup.querySelector('.swiper-slide-active'), { scale: 1 }, { scale: 1.1 });
  tl.fromTo(this.$popup, { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.25 }, '<0.125');
  return tl;
}
galleries.forEach((galleryWithData, index) => {
  /*const buildPopup = */
  const modal = new showModal({
    $popup: document.querySelector('[data-build-gallery-popup]'),
    $openBtn: galleryWithData,
    $closeBtn: document.querySelector('[data-build-popup-close]'),
    animationIn: animationPopapIn,
    animationOut: animationPopapOut,
    attrParrentNode: '[data-build-popup="' + galleryWithData.dataset.buildPopup + '"]',
    onOpenCompleteCallback: function() {
      document
        .querySelector('[data-build-gallery-popup] [data-build-popup-close]')
        .setAttribute('data-build-popup', galleryWithData.dataset.buildPopup);
      initPopupSlider(galleryWithData);
      changeTextOnPopup(galleryWithData);
      POPUP_CONFIG.currentPopup = galleryWithData;
    },
  });
  galleryWithData.poputConstructor = modal;
});

/**Предыдущий отчет */
dqs('[data-popup-prev-gallery]').addEventListener('click', function() {
  let prevGallery = POPUP_CONFIG.currentPopup.previousElementSibling;
  if (
    prevGallery === null ||
    prevGallery === undefined ||
    !prevGallery.classList.contains('build-card')
  )
    return;
  document
    .querySelector('[data-build-gallery-popup] [data-build-popup-close]')
    .setAttribute('data-build-popup', prevGallery.dataset.buildPopup);
  initPopupSlider(prevGallery);
  changeTextOnPopup(prevGallery);
  POPUP_CONFIG.currentPopup.poputConstructor.setStatus(false);
  POPUP_CONFIG.currentPopup = prevGallery;
  POPUP_CONFIG.currentPopup.poputConstructor.setStatus(true);
});
/**Следующий отчет */
dqs('[data-popup-next-gallery]').addEventListener('click', function() {
  let prevGallery = POPUP_CONFIG.currentPopup.nextElementSibling;
  if (
    prevGallery === null ||
    prevGallery === undefined ||
    !prevGallery.classList.contains('build-card')
  )
    return;
  document
    .querySelector('[data-build-gallery-popup] [data-build-popup-close]')
    .setAttribute('data-build-popup', prevGallery.dataset.buildPopup);
  initPopupSlider(prevGallery);
  changeTextOnPopup(prevGallery);
  POPUP_CONFIG.currentPopup.poputConstructor.setStatus(false);
  POPUP_CONFIG.currentPopup = prevGallery;
  POPUP_CONFIG.currentPopup.poputConstructor.setStatus(true);
});

$percentBlocks.forEach(block => {
  const svg = block.querySelector('circle');
  pathDrawingInPercents(svg, +block.dataset.value);
});
// document.querySelector('.build-card').click();
const innerPopupCall = document.querySelector('[data-inner-popup-call]');
const innerPopupClose = document.querySelectorAll('[data-inner-popup-close]');
const innerPopup = document.querySelector('[data-inner-popup]');
const innerPopupWrap = document.querySelector('[data-inner-popup-wrap]');

innerPopupCall.addEventListener('click', () => {
  innerPopup.classList.add('opened');
  innerPopupWrap.classList.add('opened');
});
innerPopupClose.forEach(button => {
  button.addEventListener('click', evt => {
    if (
      evt.target.closest('[data-inner-popup]') !== null &&
      evt.target.dataset.innerPopupClose === undefined
    )
      return;
    innerPopup.classList.remove('opened');
    innerPopupWrap.classList.remove('opened');
  });
});