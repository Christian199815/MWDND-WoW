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

    // Event listeners voor continent-buttons
    continentButtons.forEach(button => {
        button.addEventListener('click', (e) => {
          selectedContinent = e.target.getAttribute('data-continent').trim();
          filterData();
        });
      });

    displayCards(WomenInTech);
  });
