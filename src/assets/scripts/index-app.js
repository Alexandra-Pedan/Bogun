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
window.locoScroll = locoScroll;
window.locoScroll.update();
disableScroll();
setTimeout(() => {
  window.locoScroll.update();
}, 2000);
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

const footerForm = ['[data-form-footer]'];
footerForm.forEach(form => {
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

/**footer form fake placeholder */
const footerPlaceholder = document.querySelector('.footer-placeholder');
const footerPlaceholderInput = footerPlaceholder.previousElementSibling;
console.log(footerPlaceholderInput);

footerPlaceholderInput.addEventListener('input', () => {
  console.log('LENGTH', footerPlaceholderInput.value.length);
  const lengthMinusMask = footerPlaceholderInput.value.length - 5;
  footerPlaceholder.style.clipPath = `polygon(${lengthMinusMask *
    10}% 0, 100% 0, 100% 100%, ${lengthMinusMask * 10}% 100%)`;
});
/**footer form fake placeholder END */

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

function disableScroll() {
  const containersScroll = document.querySelectorAll('[data-disable-page-scroll]');
  containersScroll.forEach(block => {
    block.addEventListener('mouseenter', () => {
      window.locoScroll.stop();
    });

    block.addEventListener('mouseleave', () => {
      window.locoScroll.start();
    });
  });
}

window.addEventListener('load', () => {
  console.log('load');
  window.locoScroll.update();
});

window.addEventListener('DOMContentLoaded', () => {
  // console.log('DOMContentLoaded');
  disableScroll();
  // initPopup();
  window.locoScroll.update();
});
