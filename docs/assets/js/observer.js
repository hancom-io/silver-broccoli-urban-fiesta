// ref)
// - https://css-tricks.com/styling-based-on-scroll-position/
// - https://gomakethings.com/how-to-check-if-any-part-of-an-element-is-out-of-the-viewport-with-vanilla-js/

if ('IntersectionObserver' in window &&
  'IntersectionObserverEntry' in window &&
  'intersectionRatio' in window.IntersectionObserverEntry.prototype) {
  const addClass = ({target, className}) => document.querySelector(target)?.classList.add(className);
  const removeClass = ({target, className}) => document.querySelector(target)?.classList.remove(className);

  const topObserver = new IntersectionObserver(entries => {
    if (entries[0].boundingClientRect.y < 0) {
      // page is scrolled
      removeClass({
        target: '.site-header-big .nav-menu',
        className: 'nav-menu-overlay',
      });
      removeClass({
        target: '.btn-top',
        className: 'hide',
      });
    } else {
      addClass({
        target: '.site-header-big .nav-menu',
        className: 'nav-menu-overlay',
      });
      addClass({
        target: '.btn-top',
        className: 'hide',
      });
    }
  });
  topObserver.observe(document.querySelector("#top-pixel-anchor"));

  const bottomObserver = new IntersectionObserver(entries => {
    if (entries[0].boundingClientRect.bottom > (window.innerHeight || document.documentElement.clientHeight)) {
      // bottom-pixel-anchor is out of sight
      removeClass({
        target: '.btn-top',
        className: 'absolute',
      });
    } else {
      addClass({
        target: '.btn-top',
        className: 'absolute',
      });
    }
  });
  bottomObserver.observe(document.querySelector('#bottom-pixel-anchor'));
}
