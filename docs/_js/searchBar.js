import { showElem, hideElem } from './util.js';

const MIN_TABLET_WIDTH = 768;

const btnOpen = document.querySelector('.search-bar-open');
const btnClose = document.querySelector('.search-bar-close');

const showSearchBar = () => {
  hideElem('.search-bar-open');
  hideElem('.nav-menu-inner-box > .items');

  showElem('.search-bar-form');
  showElem('.search-bar-close');
}

const hideSearchBar = () => {
  showElem('.search-bar-open');
  showElem('.nav-menu-inner-box > .items');

  hideElem('.search-bar-form');
  hideElem('.search-bar-close');
}

// toggling behavior on mobile phone size window
btnOpen.addEventListener('click', showSearchBar);
btnClose.addEventListener('click', hideSearchBar);

window.addEventListener('resize', () => {
  // if the width comes in tablet width range
  // or, if the width comes in mobile width range
  if (window.innerWidth >= MIN_TABLET_WIDTH && MIN_TABLET_WIDTH > window.oldInnerWidth ||
    window.innerWidth < MIN_TABLET_WIDTH && MIN_TABLET_WIDTH <= window.oldInnerWidth) {
    window.location.reload();
  }

  window.oldInnerWidth = window.innerWidth;
});
