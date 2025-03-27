// popoverOpener.js
import { filterData, selectedContinent, showAllContinents } from './cardFiller.js';

// Get all continent links in the SVG
const continentLinks = document.querySelectorAll("#board svg a");

// Get the popover element
const popover = document.getElementById("continent-popover");

// Get the show all link
const showAllLink = document.querySelector(".show-all-button");

// Add some basic styling if the popover attribute isn't supported
if (!HTMLElement.prototype.togglePopover) {
  popover.style.display = "none";
  popover.style.position = "absolute";
  popover.style.backgroundColor = "white";
  popover.style.padding = "20px";
  popover.style.boxShadow = "0 2px 10px rgba(0,0,0,0.2)";
  popover.style.zIndex = "1000";
  popover.style.borderRadius = "8px";
}

// Function to show the popover
function showPopover(event) {
  if (HTMLElement.prototype.togglePopover) {
    popover.togglePopover();
  } else {
    // Fallback for browsers without popover support
    popover.style.display = "block";

    // Position the popover near the click
    const rect = event.target.getBoundingClientRect();
    popover.style.top = `${rect.top + window.scrollY}px`;
    popover.style.left = `${rect.left + window.scrollX}px`;
  }
}

// Function to hide the popover
function hidePopover() {
  if (HTMLElement.prototype.hidePopover) {
    popover.hidePopover();
  } else {
    // Fallback
    popover.style.display = "none";
  }
}

// Add click event to each continent
continentLinks.forEach((link) => {
  // Prevent navigation
  link.setAttribute("href", "javascript:void(0)");

  // Add click event listener
  link.addEventListener("click", function (event) {
    event.preventDefault();
    showPopover(event);

    // Get which continent was clicked
    const continentGroup = event.currentTarget.querySelector("g");
    const continentId = continentGroup ? continentGroup.id : "";
    console.log("Clicked continent:", continentId);

    // Set selected continent for filtering (using imported variable)
    selectedContinent = event.currentTarget.getAttribute('data-continent').trim();
    filterData(); // Using imported function
  });
});

// Add show all link functionality
if (showAllLink) {
  showAllLink.addEventListener("click", function (event) {
    event.preventDefault();
    showPopover(event);
    
    console.log("Show all button clicked");
    showAllContinents(); // Using imported function
  });
}

// Close button functionality
const closeButton = document.getElementById("close-popover");
if (closeButton) {
  closeButton.addEventListener("click", hidePopover);
}

// Close when clicking outside (optional)
document.addEventListener("click", function (event) {
  if (
    !popover.contains(event.target) &&
    !event.target.closest("#board svg") &&
    event.target !== showAllLink
  ) {
    hidePopover();
  }
});