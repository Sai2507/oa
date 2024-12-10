// Function to toggle the sidebar visibility
function toggleMenu() {
  const sidebar = document.querySelector(".sidebar");
  const menuToggle = document.querySelector(".menu-toggle");

  sidebar.classList.toggle("visible");
  menuToggle.classList.toggle("clicked");
}

function toggleMenu() {
  const sidebar = document.querySelector(".sidebar");
  const menuToggle = document.querySelector(".menu-toggle");

  sidebar.classList.toggle("open");
  menuToggle.classList.toggle("clicked"); // Add animation class to the menu icon
}

function closeMenu() {
  const sidebar = document.querySelector(".sidebar");
  const menuToggle = document.querySelector(".menu-toggle");

  sidebar.classList.remove("open");
  menuToggle.classList.remove("clicked"); // Remove animation class from the menu icon
}


// Paragraphs to display
const paragraphs = [
  "What if your dev experience was",
  "ALWAYS IN SYNC WITH YOUR TEAM?",
  "Streamline your workflow effortlessly.",
];

// Available random characters to cycle through
const randomChars =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_-+=<>?/";

// Create grid dynamically
const grid = document.getElementById("dynamic-grid");

// Function to update grid with random letters
function updateGridWithRandom(text) {
  // Clear the grid
  grid.innerHTML = "";

  // Split text into individual characters
  let chars = text.split("");

  // Create grid boxes (39 = 3 rows, 13 columns)
  for (let i = 0; i < 39; i++) {
    const span = document.createElement("span");
    const card = document.createElement("div");
    card.classList.add("card");

    // Set up the placeholder letter
    const letterSpan = document.createElement("span");
    if (chars[i]) {
      letterSpan.innerText = chars[i]; // Add letter if it exists
    } else {
      card.classList.add("empty"); // If no letter, mark as empty
    }
    card.appendChild(letterSpan);

    // Append card to grid
    span.appendChild(card);
    grid.appendChild(span);
  }
}

// Function to randomly change letters before settling on the final one
function randomizeLetters(text, reverse = false) {
  const cards = document.querySelectorAll(".card span");

  // Cycle through each character
  cards.forEach((card, index) => {
    // If it's an empty space, ignore
    if (card.innerText === "") return;

    // Store the final correct letter
    const finalLetter = card.innerText;

    // Set initial random letter
    card.innerText = randomChars.charAt(
      Math.floor(Math.random() * randomChars.length)
    );

    // Set interval to randomize the letters
    const intervalId = setInterval(() => {
      // Keep showing random characters
      card.innerText = randomChars.charAt(
        Math.floor(Math.random() * randomChars.length)
      );
    }, 50); // Change character every 50ms for fast cycling

    // After a delay, stop randomizing and either:
    // - Set the correct letter (if reverse is false)
    // - Reset it back to random characters (if reverse is true)
    setTimeout(() => {
      clearInterval(intervalId);

      // Animate the card flip to show the final letter or reset to random characters
      const cardContainer = card.parentElement;
      cardContainer.classList.add("is-flipping"); // Apply flip animation

      setTimeout(() => {
        if (!reverse) {
          card.innerText = finalLetter; // Set final letter
        } else {
          card.innerText = randomChars.charAt(
            Math.floor(Math.random() * randomChars.length)
          ); // Reset to random character
        }
        cardContainer.classList.remove("is-flipping"); // Reset flip
      }, 300); // Time to flip (matches CSS transition)
    }, (index + 1) * 100); // Delay by index to create a wave effect
  });
}

// Function to clear the grid
function clearGrid() {
  const cards = document.querySelectorAll(".card span");
  cards.forEach((card) => {
    card.innerText = ""; // Clear all cards
  });
}

// Calculate time to display based on sentence length
function calculateReadingTime(text) {
  const readingSpeed = 5; // Characters per second (approximation based on average reading speed)
  const delay = (text.length / readingSpeed) * 1000; // Time in milliseconds
  return delay;
}

let paragraphIndex = 0;

// Function to switch between paragraphs with a smooth break/transition
function changeText() {
  // Get the current paragraph
  const currentText = paragraphs[paragraphIndex];

  // Update grid with empty or random placeholders
  updateGridWithRandom(currentText);

  // Randomize and flip letters to display the correct sentence
  randomizeLetters(currentText);

  // Calculate the time to display this paragraph based on its length
  const readingTime = calculateReadingTime(currentText);

  // After reading time, scramble the sentence back to random characters
  setTimeout(() => {
    randomizeLetters(currentText, true); // Reverse effect
  }, readingTime);

  // After scrambling, clear the grid to make it empty
  setTimeout(() => {
    clearGrid();
  }, readingTime + 1000); // Add 1 second for scrambling effect

  // Introduce a short pause before showing the next sentence (smooth transition)
  setTimeout(() => {
    // Move to the next paragraph, looping back if needed
    paragraphIndex = (paragraphIndex + 1) % paragraphs.length;

    // Call `changeText` again after the grid has been cleared and short pause
    changeText(); // Display next sentence after break
  }, readingTime + 2000); // Add additional time for clearing and pause
}

// Initial call to display the first paragraph and start cycling
changeText();

// Number of dots (particles) to create dynamically based on viewport size
const dotsInRow = Math.floor(window.innerWidth / 30); // Calculates how many dots fit horizontally
const dotsInColumn = Math.floor(window.innerHeight / 30); // Calculates how many dots fit vertically

// Create the dot background
const dotBackground = document.createElement("div");
dotBackground.id = "dot-background";
document.body.appendChild(dotBackground);

// Create grid of dots
function createDots(dotsInRow, dotsInColumn) {
  for (let i = 0; i < dotsInRow * dotsInColumn; i++) {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    dotBackground.appendChild(dot);
  }
}

// Initially create the dots
createDots(dotsInRow, dotsInColumn);

// Update the number of dots on window resize
window.addEventListener("resize", () => {
  // Remove all current dots
  const currentDots = document.querySelectorAll(".dot");
  currentDots.forEach((dot) => dot.remove());

  // Recalculate number of dots
  const newDotsInRow = Math.floor(window.innerWidth / 30);
  const newDotsInColumn = Math.floor(window.innerHeight / 30);

  // Add new dots based on the resized window
  createDots(newDotsInRow, newDotsInColumn);
});

// Function to update grid with random letters, including spaces
function updateGridWithRandom(text) {
  // Clear the grid
  grid.innerHTML = "";

  // Split text into individual characters
  let chars = text.split("");

  // Create grid boxes (39 = 3 rows, 13 columns)
  for (let i = 0; i < 33; i++) {
    const span = document.createElement("span");
    const card = document.createElement("div");
    card.classList.add("card");

    // Set up the placeholder letter
    const letterSpan = document.createElement("span");
    if (chars[i]) {
      if (chars[i] === " ") {
        // If the character is a space, apply the 'empty' class with no content
        card.classList.add("empty");
      } else {
        letterSpan.innerText = chars[i]; // Add letter if it's not a space
      }
    } else {
      card.classList.add("empty"); // If no letter, mark as empty
    }
    card.appendChild(letterSpan);

    // Append card to grid
    span.appendChild(card);
    grid.appendChild(span);
  }
}

let currentSlide = 0;

function showSlide(index) {
  const slides = document.querySelectorAll(".carousel-item");
  const totalSlides = slides.length;
  if (index >= totalSlides) {
    currentSlide = 0;
  } else if (index < 0) {
    currentSlide = totalSlides - 1;
  } else {
    currentSlide = index;
  }
  const offset = -currentSlide * 100;
  document.getElementById("carouselInner").style.transform =
    "translateX(" + offset + "%)";
}

function nextSlide() {
  showSlide(currentSlide + 1);
}

function prevSlide() {
  showSlide(currentSlide - 1);
}

// Initialize the first slide
showSlide(currentSlide);

// Set the automatic slide transition every 3 seconds
setInterval(nextSlide, 3000); // 3000ms = 3 seconds
