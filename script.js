const progress = document.getElementById('progress');

function updateProgress() {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrolled = (scrollTop / docHeight) * 100;
  progress.style.height = scrolled + '%';
}

window.addEventListener('scroll', updateProgress);
window.addEventListener('resize', updateProgress);
updateProgress();

// Animate text overlays on scroll
const genericOverlays = document.querySelectorAll('section:not(.scrolly) .overlay.main');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
    } else {
      entry.target.classList.remove('in-view');
    }
  });
}, { threshold: 0.3 });

genericOverlays.forEach(el => observer.observe(el));

const steps = document.querySelectorAll('.scrolly .step');

// Toggle detail overlays
document.querySelectorAll('.overlay.main').forEach(main => {
  const details = main.nextElementSibling;
  if (details && details.classList.contains('details')) {
    main.addEventListener('click', () => {
      details.classList.toggle('visible');
    });
  }
});

function handleSteps() {
  const center = window.innerHeight / 2;
  steps.forEach(step => {
    const overlay = step.querySelector('.overlay.main');
    const rect = step.getBoundingClientRect();

    if (rect.top <= center && rect.bottom >= center) {
      overlay.classList.add('show');
      overlay.classList.remove('exit-up', 'exit-down');
    } else if (rect.top < center) {
      overlay.classList.remove('show');
      overlay.classList.add('exit-up');
    } else {
      overlay.classList.remove('show');
      overlay.classList.add('exit-down');
    }
  });
}

window.addEventListener('scroll', () => {
  updateProgress();
  handleSteps();
});

window.addEventListener('resize', () => {
  updateProgress();
  handleSteps();
});

handleSteps();
