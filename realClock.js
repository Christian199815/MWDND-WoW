// Function to update clock hands based on real time
function updateClock() {
    const now = new Date();
    
    // Get hours, minutes, seconds
    const hours = now.getHours() % 12; // Convert to 12-hour format
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    
    // Calculate rotation angles
    // Hours: 30 degrees per hour (360 / 12) + small adjustment for minutes
    const hourRotation = (hours * 30) + (minutes * 0.5);
    // Minutes: 6 degrees per minute (360 / 60)
    const minuteRotation = minutes * 6;
    // Seconds: 6 degrees per second (360 / 60)
    const secondRotation = seconds * 6;
    
    // Get elements
    const hoursHand = document.querySelector('.hours');
    const minuteHand = document.querySelector('.menu:after');
    const secondHand = document.querySelector('.menu:before');
    
    // Apply rotations
    if (hoursHand) {
      hoursHand.style.transform = `rotate(${hourRotation}deg)`;
    }
    
    // We can't directly select pseudo-elements with JavaScript,
    // so we need to modify the parent element's style
    const menuElement = document.querySelector('.menu');
    if (menuElement) {
      // We need to use CSS custom properties to control pseudo-elements
      menuElement.style.setProperty('--minute-rotation', `${minuteRotation}deg`);
      menuElement.style.setProperty('--second-rotation', `${secondRotation}deg`);
    }
    
    // Call this function again in 1 second
    requestAnimationFrame(updateClock);
  }
  
  // Initial call to start the clock
  updateClock();