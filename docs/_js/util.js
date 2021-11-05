// common utility functions

const addClass = ({target, className}) => document.querySelector(target)?.classList.add(className);
const removeClass = ({target, className}) => document.querySelector(target)?.classList.remove(className);

const showElem = selector => {
  const el = document.querySelector(selector);
  if (el) {
    // restore previous value, if any
    el.style.display = el.style.prevDisplay || 'block';
  }
}

const hideElem = selector => {
  const el = document.querySelector(selector);
  if (el) {
    // remember current value
    el.style.prevDisplay = getComputedStyle(el).display;
    el.style.display = 'none';
  }
}

export {
  addClass,
  removeClass,
  showElem,
  hideElem,
};
