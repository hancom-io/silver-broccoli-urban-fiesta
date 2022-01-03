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
