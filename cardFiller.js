const baseURL = 'https://fdnd.directus.app/';
const endpoint = 'items/women_in_tech';

const continents = {
  Africa: ["Nigeria"],
  Asia: ["Lebanon", "Singapore"],
  Europe: [
    "Greece", "Romania", "Portugal", "Germany",
    "Belgium", "Austria", "Netherlands", "Luxembourg", "Spain", "Russia"
  ],
  NorthAmerica: ["United States", "Canada"],
  Australia: ["Australia"],
  SouthAmerica: [],
  Antarctica: []
};

fetch(baseURL + endpoint)
  .then(response => response.json())
  .then(data => {
    const WomenInTech = data.data;
    const container = document.getElementById('slider');
    const periodButtons = document.querySelectorAll('.menu-items .item button');
    const menuToggleButton = document.querySelector('.menu p');
    const continentButtons = document.querySelectorAll('#board button');
    const popoverMenu = document.getElementById('menu-items');
    const continentLinks = document.querySelectorAll('#board svg a');
    const showAllButton = document.querySelector('.show-all-button'); // Assuming you'll add this element

    // Standaardtekst instellen menu button
    menuToggleButton.textContent = "All periods";

    // Continent bepalen op basis van het land
    const getContinent = (country) => {
      for (const [continent, countries] of Object.entries(continents)) {
        if (countries.includes(country)) {
          return continent;
        }
      }
      return "Unknown";
    };

    // Voeg continent toe aan de data
    WomenInTech.forEach(person => {
      person.continent = getContinent(person.country);
    });

    // Function to show all data from all continents
    const showAllContinents = () => {
      selectedContinent = ""; // Clear the continent filter
      filterData(); // Apply filters (which will now show all continents)
    };

    // Kaarten weergeven
    const displayCards = (filteredData) => {
      container.innerHTML = filteredData.map(person => `
                <li class="card">
                    <div>
                        <img src="https://fdnd.directus.app/assets/${person.image}" alt="${person.name}">
                        <h2>${person.name}</h2>
                        <p>"${person.tagline}"</p>
                        <p>Period: ${person.period}</p>
                        <p>Based: ${person.country}</p>
                        <div>
                        <a href="${person.website}" target="_blank">Website</a>
                        ${person.github ? `<a href="${person.github}" target="_blank">GitHub</a>` : ''}
                        ${person.codepen ? `<a href="${person.codepen}" target="_blank">CodePen</a>` : ''}
                        </div>
                    <div>
                </li>
            `).join('');
    };

    // Filterfunctie
    let selectedPeriod = "All periods";
    let selectedContinent = "";

    const filterData = () => {
      let filteredData = WomenInTech;

      if (selectedPeriod !== "All periods") {
        filteredData = filteredData.filter(p => p.period === selectedPeriod);
      }

      if (selectedContinent) {
        filteredData = filteredData.filter(p => p.continent === selectedContinent);
      }

      displayCards(filteredData);
    };

    // Event listeners voor period-buttons
    periodButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        selectedPeriod = e.target.innerText.trim();
        menuToggleButton.textContent = selectedPeriod;
        popoverMenu.hidePopover();
        filterData();
      });
    });

    // Add event listener for the Show All button
    if (showAllButton) {
      showAllButton.addEventListener('click', (e) => {
        e.preventDefault();
        console.log("show-all activated");
        showAllContinents();
      });
    }



    continentLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent default navigation behavior
        selectedContinent = e.currentTarget.getAttribute('data-continent').trim();
        console.log('Selected continent:', selectedContinent);
        filterData();
      });
    });

    // displayCards(WomenInTech);
  });
