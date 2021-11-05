import { showElem, hideElem } from './util.js';

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
