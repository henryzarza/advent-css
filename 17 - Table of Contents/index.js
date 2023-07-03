// Function to check if a section is in the viewport
function isSectionVisible(section) {
  const rect = section.getBoundingClientRect();

  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// from https://blog.webdevsimplified.com/2022-03/debounce-vs-throttle/
function throttle(cb, delay = 100) {
  let shouldWait = false

  return (...args) => {
    if (shouldWait) return

    cb(...args)
    shouldWait = true
    setTimeout(() => {
      shouldWait = false
    }, delay)
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll('.aside__list a');

  function handleScroll() {
    document.querySelectorAll('.main__heading-3').forEach(heading => {
      if (isSectionVisible(heading)) {
        links.forEach(link => {
          link.classList.remove('selected');
          
          if (link.dataset.ref === heading.getAttribute('id')) {
            link.classList.add('selected');
          }
        });
      }
    })
  }

  links.forEach(link => 
    link.addEventListener('click', function() {
      document.getElementById(this.dataset.ref || 'my-story').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    })
  );

  // Attach scroll event listener
  window.addEventListener('scroll', throttle(handleScroll));
});
