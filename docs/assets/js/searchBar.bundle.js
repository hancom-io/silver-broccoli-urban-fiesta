(()=>{"use strict";const e=e=>{const r=document.querySelector(e);r&&(r.style.display=r.style.prevDisplay||"block")},r=e=>{const r=document.querySelector(e);r&&(r.style.prevDisplay=getComputedStyle(r).display,r.style.display="none")},s=document.querySelector(".search-bar-open"),c=document.querySelector(".search-bar-close");s.addEventListener("click",(()=>{r(".search-bar-open"),r(".nav-menu-inner-box > .items"),e(".search-bar-form"),e(".search-bar-close")})),c.addEventListener("click",(()=>{e(".search-bar-open"),e(".nav-menu-inner-box > .items"),r(".search-bar-form"),r(".search-bar-close")}))})();