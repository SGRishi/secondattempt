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
const genericOverlays = document.querySelectorAll('section .overlay');
const highlights = document.querySelectorAll('.highlight');
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
highlights.forEach(el => observer.observe(el));

const steps = document.querySelectorAll('.scrolly .step');

function handleParallax() {
  document.querySelectorAll('main section').forEach(section => {
    const rect = section.getBoundingClientRect();
    const y = rect.top * -0.2;
    section.style.backgroundPosition = `center calc(50% + ${y}px)`;
  });
}


function handleSteps() {
  const center = window.innerHeight / 2;
  steps.forEach(step => {
    const overlay = step.querySelector('.overlay.main');
    const rect = step.getBoundingClientRect();

    if (rect.top <= center && rect.bottom >= center) {
      overlay.classList.add('show');
      overlay.classList.remove('exit-up', 'exit-down');
      step.classList.add('active');
    } else if (rect.top < center) {
      overlay.classList.remove('show');
      overlay.classList.add('exit-up');
      step.classList.remove('active');
    } else {
      overlay.classList.remove('show');
      overlay.classList.add('exit-down');
      step.classList.remove('active');
    }
  });
}

window.addEventListener('scroll', () => {
  updateProgress();
  handleSteps();
  handleParallax();
});

window.addEventListener('resize', () => {
  updateProgress();
  handleSteps();
  handleParallax();
});

handleSteps();
handleParallax();
