// Workshop date: November 29, 2025 at 6:00 PM UTC+3
const workshopDate = new Date("2025-11-29T18:00:00+03:00");

// Get DOM elements
const hoursElement = document.getElementById("hours");
const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");
const countdownSection = document.getElementById("countdownSection");
const linksSection = document.getElementById("linksSection");
const mainLink = document.getElementById("mainLink");
const linkMessage = document.getElementById("linkMessage");
const marketingSection = document.getElementById("marketingSection");
const countdownContainer = document.getElementById("countdownContainer");
const dateContainer = document.querySelector(".date-container");

const workshopUrl ="https://go.meraki-academy.com/FreeIntroductorySessionFormAI";
const registrationUrl = "https://go.meraki-academy.com/RegistrationFormS1AI";
const attendanceUrl = "https://link.meraki-academy.com/AI-Free-Workshop";

let previousMinutes = -1;
let countdownInterval;
let attendanceLinkClicked = false;
let offerShown = false;

function updateCountdown() {
  const now = new Date();
  const difference = workshopDate - now;

  if (difference <= 0) {
    // Timer has ended - workshop has started
    clearInterval(countdownInterval);
    // Hide date container
    if (dateContainer) {
      dateContainer.style.display = "none";
    }
    endCountdown();
    return;
  }

  const hours = Math.floor(difference / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  // Update display
  hoursElement.textContent = String(hours).padStart(2, "0");
  secondsElement.textContent = String(seconds).padStart(2, "0");

  // Flip animation for minutes
  if (minutes !== previousMinutes) {
    minutesElement.classList.add("flip");
    setTimeout(() => {
      minutesElement.textContent = String(minutes).padStart(2, "0");
      minutesElement.classList.remove("flip");
    }, 300);
    previousMinutes = minutes;
  }

  // Pulsing animation when 10 seconds left
  if (hours === 0 && minutes === 0 && seconds <= 10) {
    countdownContainer.classList.add("pulse");
  } else {
    countdownContainer.classList.remove("pulse");
  }

  // Update link and message based on time remaining
  const totalHours = hours + minutes / 60 + seconds / 3600;
 // Calculate when the link will change (1 hour before workshop)
    const oneHourBefore = new Date(workshopDate.getTime() - 60 * 60 * 1000);
    const timeUntilSwitch = oneHourBefore - now;
    const hoursUntilSwitch = Math.floor(timeUntilSwitch / (1000 * 60 * 60));
    const minutesUntilSwitch = Math.floor(
      (timeUntilSwitch % (1000 * 60 * 60)) / (1000 * 60)
    );
    const secondsUntilSwitch = Math.floor(
      (timeUntilSwitch % (1000 * 60)) / 1000
    );
  if (totalHours > 1) {
    // More than 1 hour left - show registration link
    mainLink.href = workshopUrl;
    mainLink.textContent = "سجل الآن";
 linkMessage.textContent = ` رابط الحضور سيكون متاحاً خلال ${hoursUntilSwitch} ساعة ${minutesUntilSwitch} دقيقة  و ${secondsUntilSwitch} ثواني
      سجل في الورشة الان`;
   

    if (hoursUntilSwitch > 1) {
     
      console.log("here")
    } 
    
  } else {
    // 1 hour or less - show attendance link
    mainLink.href = attendanceUrl;
    mainLink.textContent = "رابط الحضور";
    linkMessage.textContent =
      "رابط الحضور متاح الآن  يمكنك الانضمام إلى الورشة";
    
    // Check if 50 minutes have passed since workshop start
    checkAndShowOffer();
  }
}

function checkAndShowOffer() {
  if (offerShown) return;
  
  const now = new Date();
  const timeSinceStart = now - workshopDate;
  const fiftyMinutes = 50 * 60 * 1000; // 50 minutes in milliseconds
  
  // Show offer if 50 minutes have passed OR attendance link was clicked
  if (timeSinceStart >= fiftyMinutes || attendanceLinkClicked) {
    showSpecialOffer();
  }
}

function showSpecialOffer() {
  if (offerShown) return;
  offerShown = true;
  
  // Hide countdown, links, and date sections
  countdownSection.style.display = "none";
  linksSection.style.display = "none";
  marketingSection.style.display = "none";
  if (dateContainer) {
    dateContainer.style.display = "none";
  }
  
  // Show special offer section
  const specialOfferSection = document.getElementById("specialOfferSection");
  if (specialOfferSection) {
    specialOfferSection.classList.add("show");
  }
}

function endCountdown() {
  // Hide date container when workshop starts
  if (dateContainer) {
    dateContainer.style.display = "none";
  }

  // Check if we should show the offer instead
  checkAndShowOffer();
  
  // If offer is shown, don't show marketing section
  if (offerShown) {
    return;
  }

  // Hide countdown and links
  countdownSection.style.display = "none";
  linksSection.style.display = "none";

  // Show marketing section
  marketingSection.classList.add("show");
}

// Check if logo image exists
window.addEventListener("load", function () {
  const logoImg = document.getElementById("logo-img");
  const logoFallback = document.querySelector(".logo-fallback");

  // Set the logo source
  logoImg.src = "logo.png";

  logoImg.onerror = function () {
    logoImg.style.display = "none";
    logoFallback.style.display = "flex";
  };

  logoImg.onload = function () {
    logoImg.style.display = "block";
    logoFallback.style.display = "none";
  };
});

// // Track attendance link click
// mainLink.addEventListener("click", function(e) {
//   if (mainLink.href === attendanceUrl) {
//     attendanceLinkClicked = true;
//     // Show offer after a short delay
//     setTimeout(() => {
//       showSpecialOffer();
//     }, 1000);
//   }
// });

// Check for offer periodically when workshop has started
setInterval(() => {
  const now = new Date();
  if (now >= workshopDate) {
    checkAndShowOffer();
  }
}, 60000); // Check every minute

// Start countdown
updateCountdown();
countdownInterval = setInterval(updateCountdown, 1000);
