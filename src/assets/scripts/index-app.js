import LocomotiveScroll from 'locomotive-scroll';
import i18next from 'i18next';
import gsap from 'gsap';
import axios from 'axios';
import * as yup from 'yup';
import FormMonster from '../../pug/components/form/form';
import SexyInput from '../../pug/components/input/input';

/** ******************************* */
/*
 * smooth scroll start
 */
global.gsap = gsap;
global.axios = axios;

/* eslint-disable-next-line */
const locoScroll = new LocomotiveScroll({
  el: document.querySelector('[data-scroll-container]'),
  smooth: true,
  smoothMobile: false,
  inertia: 1.1,
});

global.locoScroll = locoScroll;
/*
 * smooth scroll end
 */
/** ******************************* */
/** ******************************* */
/*
 * form handlers start
 */
const forms = [
  // '[data-home-contact]',
  // '[data-form-popup]',
  // '[data-form-footer]',
  // '[data-form-popup-consultation]',
];

// const formsTel = ['[data-home-contact]', '[data-form-homepage]'];
const formsTel = ['[data-form-homepage]'];

formsTel.forEach(form => {
  const $form = document.querySelector(form);
  if ($form) {
    /* eslint-disable */
    new FormMonster({
      /* eslint-enable */
      elements: {
        $form,
        showSuccessMessage: false,
        successAction: () => {
          window.location.href = 'message';
        },
        $btnSubmit: $form.querySelector('[data-btn-submit]'),
        fields: {
          name: {
            inputWrapper: new SexyInput({
              animation: 'none',
              $field: $form.querySelector('[data-field-name]'),
              typeInput: 'text',
            }),
            rule: yup.string().required(i18next.t('required')),

            defaultMessage: i18next.t('phone'),
            valid: false,
            error: [],
          },
          phone: {
            inputWrapper: new SexyInput({
              animation: 'none',
              $field: $form.querySelector('[data-field-phone]'),
              typeInput: 'phone',
            }),
            rule: yup
              .string()
              .required(i18next.t('required'))
              .min(16, i18next.t('field_too_short', { cnt: 19 - 7 })),

            defaultMessage: i18next.t('phone'),
            valid: false,
            error: [],
          },
        },
      },
    });

    $form.querySelector('.js-mask-absolute').addEventListener(
      'click',
      () => {
        $form.querySelector('[name="phone"]').focus();
      },
      false,
    );
  }
});
const formHomePage = ['[data-form-homepage]'];
const formsWithRedirect = ['[data-popup-form]'];

formsWithRedirect.forEach(form => {
  const $form = document.querySelector(form);
  if ($form) {
    /* eslint-disable */
    new FormMonster({
      /* eslint-enable */
      elements: {
        $form,
        showSuccessMessage: false,
        successAction: () => {
          window.location.href = 'message';
        },
        $btnSubmit: $form.querySelector('[data-btn-submit]'),
        fields: {
          name: {
            inputWrapper: new SexyInput({
              animation: 'none',
              $field: $form.querySelector('[data-field-name]'),
            }),
            rule: yup
              .string()
              .required(i18next.t('required'))
              .trim(),
            defaultMessage: i18next.t('name'),
            valid: false,
            error: [],
          },

          phone: {
            inputWrapper: new SexyInput({
              animation: 'none',
              $field: $form.querySelector('[data-field-phone]'),
              typeInput: 'phone',
            }),
            rule: yup
              .string()
              .required(i18next.t('required'))
              .min(16, i18next.t('field_too_short', { cnt: 19 - 7 })),

            defaultMessage: i18next.t('phone'),
            valid: false,
            error: [],
          },
        },
      },
    });

    $form.querySelector('.js-mask-absolute').addEventListener(
      'click',
      () => {
        $form.querySelector('[name="phone"]').focus();
      },
      false,
    );
  }
});

forms.forEach(form => {
  const $form = document.querySelector(form);
  if ($form) {
    /* eslint-disable */
    console.log($form);
    console.log($form.querySelector('[data-btn-submit]'));
    new FormMonster({
      /* eslint-enable */
      elements: {
        $form,
        showSuccessMessage: false,
        successAction: () => {
          document.querySelector('.backdrop').classList.add('is-hidden-form');
        },
        $btnSubmit: $form.querySelector('[data-btn-submit]'),
        fields: {
          name: {
            inputWrapper: new SexyInput({
              animation: 'none',
              $field: $form.querySelector('[data-field-name]'),
            }),
            rule: yup
              .string()
              .required(i18next.t('required'))
              .trim(),
            defaultMessage: i18next.t('name'),
            valid: false,
            error: [],
          },

          phone: {
            inputWrapper: new SexyInput({
              animation: 'none',
              $field: $form.querySelector('[data-field-phone]'),
              typeInput: 'phone',
            }),
            rule: yup
              .string()
              .required(i18next.t('required'))
              .min(17, i18next.t('field_too_short', { cnt: 17 - 5 })),

            defaultMessage: i18next.t('phone'),
            valid: false,
            error: [],
          },
          checkbox1: {
            inputWrapper: new SexyInput({
              animation: 'none',
              $field: $form.querySelector('[data-field-checkbox]'),
              typeInput: 'checkbox',
            }),
            rule: yup
              .bool()
              .nullable()
              .oneOf([true], i18next.t('fillCheboxMessage')),

            defaultMessage: i18next.t('phone'),
            valid: false,
            error: [],
          },
        },
      },
    });

    $form.querySelector('.js-mask-absolute').addEventListener(
      'click',
      () => {
        $form.querySelector('[name="phone"]').focus();
      },
      false,
    );
  }
  document.querySelectorAll('[name="checkbox1"]').forEach(el => {
    el.value = false;
    el.addEventListener('change', () => {
      el.value = el.checked ? true : false;
      $form.querySelector('[name="phone"]').dispatchEvent(new Event('input'));
    });
  });
});

/*
 * form handlers end
 */
// function initPopup() {
//   const closePopup = document.querySelector('[data-popup-close]');
//   const popup = document.querySelector('.backdrop');
//   document.addEventListener('click', event => {
//     if (!event.target.classList.contains('js-more')) {
//       return;
//     }
//     // event.preventDefault();
//     popup.style.visibility = 'visible';
//     popup.classList.add('is-hidden-form');
//   });
//   closePopup.addEventListener('click', event => {
//     event.preventDefault();
//     popup.classList.remove('is-hidden-form');
//     popup.style.visibility = '';
//   });

// const closePopup = document.querySelector('[data-popup-close]');
// const popup = document.querySelector('.backdrop');
// document.addEventListener('click', event => {
//   if (!event.target.classList.contains('js-more')) {
//     return;
//   }
//   event.preventDefault();
//   popup.style.visibility = 'visible';
//   popup.classList.add('is-hidden-form');
// });
// closePopup.addEventListener('click', event => {
//   event.preventDefault();
//   popup.classList.remove('is-hidden-form');
//   popup.style.visibility = '';
// });
//}

function disableScroll() {
  const containersScroll = document.querySelectorAll('[data-disable-page-scroll]');
  containersScroll.forEach(block => {
    block.addEventListener('mouseenter', () => {
      locoScroll.stop();
    });
    block.addEventListener('mouseleave', () => {
      locoScroll.start();
    });
  });
}

window.addEventListener('load', () => {
  console.log('load');
  window.locoScroll.update();
});

// window.addEventListener('DOMContentLoaded', () => {
//   console.log('DOMContentLoaded');
//   disableScroll();
//   initPopup();
//   window.locoScroll.update();
// });
