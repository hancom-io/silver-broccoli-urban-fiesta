/*
 * Copyright 2021 Hancom Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 * http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// ref)
// - https://css-tricks.com/styling-based-on-scroll-position/
// - https://gomakethings.com/how-to-check-if-any-part-of-an-element-is-out-of-the-viewport-with-vanilla-js/

import { addClass, removeClass } from './util.js';

if ('IntersectionObserver' in window &&
  'IntersectionObserverEntry' in window &&
  'intersectionRatio' in window.IntersectionObserverEntry.prototype) {

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
