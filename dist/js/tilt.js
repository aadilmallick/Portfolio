// Lightweight tilt effect for product images
const DEFAULTS = {
  maxTilt: 12, // degrees
  perspective: 800,
  scale: 1.03,
  speed: 300,
};

/**
 * Attach tilt to a single element
 * @param {HTMLElement} el
 * @param {Object} opts
 */
function attachTilt(el, opts = {}) {
  const settings = { ...DEFAULTS, ...opts };
  let width, height, left, top;

  // if device is touch-first / cannot hover, skip attaching tilt
  const prefersNoHover = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(hover: none)').matches;
  const isCoarse = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
  if (prefersNoHover || isCoarse) {
    // ensure no transform left behind
    el.style.transform = '';
    return;
  }

  function updateBounds() {
    const rect = el.getBoundingClientRect();
    width = rect.width; height = rect.height; left = rect.left; top = rect.top;
  }

  // throttle mousemove to roughly every `throttleMs` milliseconds
  const throttleMs = 15;
  let lastCalled = 0;
  function handleMove(e) {
    const clientX = e.clientX ?? e.touches?.[0]?.clientX;
    const clientY = e.clientY ?? e.touches?.[0]?.clientY;
    if (clientX == null || clientY == null) return;
    const x = clientX - left;
    const y = clientY - top;
    const px = (x / width - 0.5) * 2; // -1 -> 1
    const py = (y / height - 0.5) * 2;
    const tiltX = (-py * settings.maxTilt).toFixed(2);
    const tiltY = (px * settings.maxTilt).toFixed(2);

    el.style.transform = `perspective(${settings.perspective}px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(${settings.scale})`;
    el.style.transition = `transform ${settings.speed}ms cubic-bezier(.2,.9,.2,1)`;
  }

  function onMove(e) {
    const now = performance.now();
    if (now - lastCalled < throttleMs) return;
    lastCalled = now;
    handleMove(e);
  }

  function reset() {
    el.style.transform = `perspective(${settings.perspective}px) rotateX(0deg) rotateY(0deg) scale(1)`;
    el.style.transition = `transform ${settings.speed}ms cubic-bezier(.2,.9,.2,1)`;
  }

  function onEnter() { updateBounds(); el.style.willChange = 'transform'; }

  window.addEventListener('resize', updateBounds);
  el.addEventListener('mouseenter', onEnter);
  el.addEventListener('mousemove', onMove);
  // keep touch handlers passive but do not run tilt on touch devices (handled above by matchMedia)
  el.addEventListener('touchstart', onEnter, { passive: true });
  el.addEventListener('touchmove', onMove, { passive: true });
  el.addEventListener('mouseleave', reset);
}

function initTilt(selector = '.product-image, .fp-media img') {
  const els = document.querySelectorAll(selector);
  els.forEach(img => {
    // wrap image in a container to avoid transforming layout flow
    const wrapper = document.createElement('div');
    wrapper.className = 'tilt-wrap';
    img.parentNode.insertBefore(wrapper, img);
    wrapper.appendChild(img);
    // ensure the image fills wrapper
    img.style.display = 'block';
    img.style.width = '100%';
    attachTilt(img);
  });
}

export { initTilt };
