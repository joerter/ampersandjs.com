/**
 * Expose `requestAnimationFrame()`.
 */

window.requestAnimationFrame
  || window.webkitRequestAnimationFrame
  || window.mozRequestAnimationFrame
  || window.oRequestAnimationFrame
  || window.msRequestAnimationFrame
  || fallback;

/**
 * Fallback implementation.
 */

var prev = new Date().getTime();
function fallback(fn) {
  var curr = new Date().getTime();
  var ms = Math.max(0, 16 - (curr - prev));
  var req = setTimeout(fn, ms);
  prev = curr;
  return req;
}


// fix scrollbar issues in Safari
var isChrome = navigator.userAgent.indexOf('Chrome') > -1;
var isSafari = navigator.userAgent.indexOf('Safari') > -1;
if (isChrome && isSafari) {
    isSafari=false;
}
if (isSafari) {
    var navStyle = document.querySelector('.nav-docs').style;
    navStyle.position = 'relative';
    navStyle.float = 'left';
    navStyle.top = '-40px';
    document.querySelector('.nav-docs .logo-ampersand').style.display = 'none';
}


// grab all our h* tags
var aTags = document.querySelectorAll('.nav-docs a')
var hTags = document.querySelector('.docs-content').querySelectorAll('a.anchor');

function markActive(selected) {
  var id = selected && selected.name;
  var found;
  if (id) {
    window.selected = selected;
    Array.prototype.forEach.call(aTags, function (a) {
      if (a.hash.slice(1) === id) {
        found = a;
        a.classList.add('active');
      } else {
        a.classList.remove('active');
      }
    });
  }
}

function selectCurrent() {
  var found;
  var i = 0;
  var l = hTags.length;
  var scroll = document.body.scrollTop || window.scrollY;
  if (scroll < hTags[0].offsetTop) {
    found = hTags[0];
  } else {
    for (; i < l; i++) {
      if (hTags[i].offsetTop > scroll) {
        found = hTags[i - 1];
        break;
      }
    }
  }
  if (found) markActive(found);
}

if (isSafari) {
  var navStyle = document.querySelector('.nav-docs').style;
  navStyle.position = 'relative';
  navStyle.float = 'left';
  navStyle.top = '-40px';
  document.querySelector('.nav-docs .logo-ampersand').style.display = 'none';
} else {
  window.onscroll = function () {
    window.requestAnimationFrame(selectCurrent);
  };

  selectCurrent();
}
