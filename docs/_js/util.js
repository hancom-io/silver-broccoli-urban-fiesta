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
