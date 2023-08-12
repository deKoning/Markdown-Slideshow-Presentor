// script.js

const presentationContainer = document.querySelector('.presentation');
const slideContentContainer = document.querySelector('.slide-content');
const prevSlideButton = document.querySelector('#prevSlide');
const nextSlideButton = document.querySelector('#nextSlide');

let currentSlideIndex = 0;
let slideFilenames = [];

// Function to load and store all slide filenames
async function loadSlides() {
  try {
    const response = await fetch('get-slides.php');
    slideFilenames = await response.json();

    displaySlide(currentSlideIndex);
  } catch (error) {
    console.error('Error loading slide filenames:', error);
  }
}

loadSlides();

// Function to display the current slide
async function displaySlide(index) {
  slideContentContainer.innerHTML = '<div class="slide-loading">Loading...</div>';

  if (slideFilenames.length === 0 || index >= slideFilenames.length) {
    slideContentContainer.innerHTML = '<div class="slide"><p>We are working on more slides. Please check back later!</p></div>';
    return;
  }

  const filename = slideFilenames[index];

  try {
    const response = await fetch(`get-slide-content.php?filename=${encodeURIComponent(filename)}`);

    if (!response.ok) {
      throw new Error('Slide content could not be loaded.');
    }

    const slideContent = await response.text();
    slideContentContainer.innerHTML = slideContent;
  } catch (error) {
    console.error('Error loading slide:', error);
    slideContentContainer.innerHTML = `<p class="error">Error loading slide content: ${error.message}</p>`;
  }
}

// Initial display
displaySlide(currentSlideIndex);

// Button click handlers
prevSlideButton.addEventListener('click', () => {
  if (currentSlideIndex > 0) {
    currentSlideIndex--;
    displaySlide(currentSlideIndex);
  }
});

nextSlideButton.addEventListener('click', () => {
  if (currentSlideIndex < slideFilenames.length - 1) {
    currentSlideIndex++;
    displaySlide(currentSlideIndex);
  }
});

// Dark mode

const darkModeToggle = document.getElementById('dark-mode-toggle');
const body = document.body;

darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    
    // Toggle icon between moon and sun
    const icon = darkModeToggle.querySelector('i');
    if (body.classList.contains('dark-mode')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
});
