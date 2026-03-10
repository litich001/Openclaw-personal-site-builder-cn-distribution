const introScreen = document.getElementById('introScreen');
const introEnter = document.getElementById('introEnter');
const introParticles = document.getElementById('introParticles');
let introDismissed = false;
const prefersDesktopPointer = window.matchMedia('(hover: hover) and (pointer: fine)');
const enableIntro = Boolean(introScreen) && !prefersDesktopPointer.matches;

if (enableIntro) document.body.classList.add('intro-active');
else if (introScreen) {
  introDismissed = true;
  introScreen.remove();
}

if (introParticles) {
  const fragment = document.createDocumentFragment();
  const total = 32;
  for (let i = 0; i < total; i += 1) {
    const dot = document.createElement('span');
    dot.className = 'intro-particle';
    const angle = (Math.PI * 2 * i) / total;
    const distance = 140 + (i % 8) * 26;
    dot.style.setProperty('--tx', `${Math.cos(angle) * distance}px`);
    dot.style.setProperty('--ty', `${Math.sin(angle) * distance}px`);
    dot.style.animationDelay = `${(i % 8) * 20}ms`;
    fragment.appendChild(dot);
  }
  introParticles.appendChild(fragment);
}

const unlockScroll = () => {
  document.body.classList.remove('intro-active');
  document.body.style.overflow = '';
  document.body.style.overflowY = 'auto';
  document.documentElement.style.overflowY = 'auto';
};

const dismissIntro = () => {
  if (!introScreen || introDismissed) return;
  introDismissed = true;
  unlockScroll();
  introScreen.classList.add('is-entering');
  document.body.classList.add('site-entering');
  window.setTimeout(() => {
    document.body.classList.remove('site-entering');
    introScreen.remove();
    unlockScroll();
  }, 1100);
};

if (introEnter) introEnter.addEventListener('click', dismissIntro);

window.addEventListener('wheel', (event) => {
  if (document.body.classList.contains('intro-active') && event.deltaY > 8) dismissIntro();
}, { passive: true });

let touchStartY = null;
window.addEventListener('touchstart', (event) => {
  touchStartY = event.changedTouches[0]?.clientY ?? null;
}, { passive: true });
window.addEventListener('touchend', (event) => {
  const endY = event.changedTouches[0]?.clientY ?? null;
  if (document.body.classList.contains('intro-active') && touchStartY !== null && endY !== null && touchStartY - endY > 24) dismissIntro();
  touchStartY = null;
}, { passive: true });

document.addEventListener('keydown', (event) => {
  if (document.body.classList.contains('intro-active') && (event.key === 'Enter' || event.key === 'ArrowDown' || event.key === ' ')) {
    event.preventDefault();
    dismissIntro();
  }
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.14, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal').forEach((node) => revealObserver.observe(node));

const progressBar = document.getElementById('progressBar');
const updateProgress = () => {
  if (!progressBar) return;
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = `${scrollable <= 0 ? 0 : (window.scrollY / scrollable) * 100}%`;
};
updateProgress();
window.addEventListener('scroll', updateProgress, { passive: true });
window.addEventListener('resize', updateProgress);

const navLinks = document.querySelectorAll('.site-nav a');
const sections = document.querySelectorAll('main section[id]');
const navObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    navLinks.forEach((link) => link.classList.toggle('is-active', link.getAttribute('href') === `#${entry.target.id}`));
  });
}, { threshold: 0.35 });
sections.forEach((section) => navObserver.observe(section));

const buttons = document.querySelectorAll('.filter-button');
const cards = document.querySelectorAll('.media-card');
const applyFilter = (filter) => {
  buttons.forEach((button) => button.classList.toggle('is-active', button.dataset.filter === filter));
  cards.forEach((card) => card.classList.toggle('is-hidden', card.dataset.category !== filter));
};
applyFilter('photos');
const filterHoverMedia = window.matchMedia('(hover: hover) and (pointer: fine)');
buttons.forEach((button) => {
  if (filterHoverMedia.matches) button.addEventListener('mouseenter', () => applyFilter(button.dataset.filter));
  button.addEventListener('click', () => applyFilter(button.dataset.filter));
});

const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxClose = document.getElementById('lightboxClose');
document.querySelectorAll('.media-card').forEach((card) => {
  card.addEventListener('click', () => {
    const image = card.querySelector('img');
    const caption = card.querySelector('figcaption')?.textContent || image?.alt || '';
    if (!image || !lightbox) return;
    lightboxImage.src = image.src;
    lightboxImage.alt = caption;
    lightboxCaption.textContent = caption;
    lightbox.showModal();
  });
});
if (lightboxClose) lightboxClose.addEventListener('click', () => lightbox.close());
if (lightbox) {
  lightbox.addEventListener('click', (event) => {
    const rect = lightbox.getBoundingClientRect();
    const inside = rect.top <= event.clientY && event.clientY <= rect.bottom && rect.left <= event.clientX && event.clientX <= rect.right;
    if (!inside) lightbox.close();
  });
}
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && lightbox?.open) lightbox.close();
});

const themeToggle = document.getElementById('themeToggle');
const applyTheme = (theme) => {
  if (theme === 'light') document.body.setAttribute('data-theme', 'light');
  else document.body.removeAttribute('data-theme');

  if (themeToggle) {
    const isLight = theme === 'light';
    themeToggle.setAttribute('aria-label', isLight ? '切换到深色模式' : '切换到浅色模式');
    themeToggle.setAttribute('title', isLight ? '切换到深色模式' : '切换到浅色模式');
    themeToggle.setAttribute('aria-pressed', String(isLight));
  }
};

const savedTheme = localStorage.getItem('lizhe-theme');
applyTheme(savedTheme === 'light' ? 'light' : 'dark');
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const nextTheme = document.body.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    applyTheme(nextTheme);
    localStorage.setItem('lizhe-theme', nextTheme);
  });
}

const cursorGlow = document.getElementById('cursorGlow');
window.addEventListener('mousemove', (event) => {
  if (!cursorGlow) return;
  cursorGlow.style.opacity = '1';
  cursorGlow.style.left = `${event.clientX}px`;
  cursorGlow.style.top = `${event.clientY}px`;
});
window.addEventListener('mouseleave', () => {
  if (cursorGlow) cursorGlow.style.opacity = '0';
});

const prefersHover = window.matchMedia('(hover: hover) and (pointer: fine)');

if (prefersHover.matches) {
  document.querySelectorAll('.js-tilt').forEach((card) => {
    card.addEventListener('mousemove', (event) => {
      const rect = card.getBoundingClientRect();
      const rotateX = ((event.clientY - rect.top) / rect.height - 0.5) * -5;
      const rotateY = ((event.clientX - rect.left) / rect.width - 0.5) * 7;
      card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-3px)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });
}

const syncExpandableCards = () => {
  const expandOnHover = prefersHover.matches && window.innerWidth > 980;
  document.querySelectorAll('.js-expand-card').forEach((card) => {
    const block = card.querySelector('.detail-block');
    if (!block) return;
    if (expandOnHover) block.classList.add('is-collapsed');
    else block.classList.remove('is-collapsed');
  });
};

syncExpandableCards();
window.addEventListener('resize', syncExpandableCards);
if (typeof prefersHover.addEventListener === 'function') prefersHover.addEventListener('change', syncExpandableCards);

document.querySelectorAll('.js-expand-card').forEach((card) => {
  const block = card.querySelector('.detail-block');
  if (!block || !prefersHover.matches) return;
  card.addEventListener('mouseenter', () => {
    if (window.innerWidth > 980) block.classList.remove('is-collapsed');
  });
  card.addEventListener('mouseleave', () => {
    if (window.innerWidth > 980) block.classList.add('is-collapsed');
  });
});




const resumeLinks = document.querySelectorAll('.js-resume-download');
resumeLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    const url = link.dataset.resumeUrl || link.getAttribute('href');
    if (!url) return;

    const isTouchDevice = window.matchMedia('(hover: none), (pointer: coarse)').matches;
    if (!isTouchDevice) return;

    event.preventDefault();
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.rel = 'noopener';
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
  });
});



const desktopWheelUnlock = () => {
  if (prefersDesktopPointer.matches) unlockScroll();
};

desktopWheelUnlock();
window.addEventListener('resize', desktopWheelUnlock);
window.addEventListener('load', desktopWheelUnlock);
window.addEventListener('pageshow', desktopWheelUnlock);
