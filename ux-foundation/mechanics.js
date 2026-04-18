/**
 * UX Foundation: Navigation & Behavioral Mechanics
 * Extracted from Atelia Prototype
 * 
 * Focus: Native-feel interactions
 */

/**
 * 1. Edge-Swipe for Back Navigation
 * Detects iOS-style back gesture from the left edge.
 */
function initSwipeBack(containerSelector, onBack) {
  const el = document.querySelector(containerSelector || 'body');
  if (!el) return;

  let touchStartX = 0;
  
  el.addEventListener('touchstart', e => { 
    touchStartX = e.touches[0].clientX; 
  }, { passive: true });

  el.addEventListener('touchend', e => {
    const diff = e.changedTouches[0].clientX - touchStartX;
    // Tweaked threshold for prototype screens
    if (diff > 65 && touchStartX < 50) {
      if (typeof onBack === 'function') onBack();
    }
  }, { passive: true });
}

/**
 * 2. Visual Tab Indicator Sync
 * Smoothly slides a background indicator to the active tab.
 */
function syncTabIndicator(tabBar, activeTab) {
  const indicator = tabBar.querySelector('.tab-indicator');
  if (!indicator || !activeTab) return;

  const barRect = tabBar.getBoundingClientRect();
  const tabRect = activeTab.getBoundingClientRect();

  indicator.style.left = (tabRect.left - barRect.left) + 'px';
  indicator.style.width = tabRect.width + 'px';
}

/**
 * 3. Focus Manager
 * Ensures inputs don't feel "sticky" and handle clear states.
 */
function manageInputFocus(inputEl) {
  inputEl.addEventListener('focus', () => {
    inputEl.classList.add('focused');
  });
  inputEl.addEventListener('blur', () => {
    inputEl.classList.remove('focused');
  });
}

export { initSwipeBack, syncTabIndicator, manageInputFocus };
