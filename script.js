const baseURL = 'https://fdnd.directus.app/';
const endpoint = 'items/women_in_tech';

const continents = {
  Africa: ["Nigeria"],
  Asia: ["Lebanon", "Singapore"],
  Europe: [
    "Greece", "Great Britain", "Romania", "Portugal", "Germany",
    "Belgium", "Austria", "Netherlands", "Luxembourg", "Spain", "Russia"],
  NorthAmerica: ["United States", "Canada"],
  Australia: ["Australia"],
};

fetch(baseURL + endpoint)
    .then(response => response.json())
    .then(data => {
        const WomenInTech = data.data;
        const container = document.getElementById('slider');
        const periodSelect = document.getElementById('period-select');
        const continentSelect = document.getElementById('continent-select');

        // Functie om continent te bepalen op basis van het land
        const getContinent = (country) => {
            for (const [continent, countries] of Object.entries(continents)) {
                if (countries.includes(country)) {
                    return continent;
                }
            }
        };

        //Continent aan data toevoegen
        WomenInTech.forEach(person => {
            person.continent = getContinent(person.country);
        });

        //periodes en continenten ophalen
        const periods = new Set(WomenInTech.map(person => person.period));
        const availableContinents = new Set(WomenInTech.map(person => person.continent).filter(c => c !== "Unknown"));

        // Selects vullen
        periods.forEach(period => {
            const option = document.createElement('option');
            option.value = period;
            option.textContent = period;
            periodSelect.appendChild(option);
        });

        availableContinents.forEach(continent => {
            const option = document.createElement('option');
            option.value = continent;
            option.textContent = continent;
            continentSelect.appendChild(option);
        });

        // Functie om kaarten weer te geven
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
        const filterData = () => {
            const selectedPeriod = periodSelect.value;
            const selectedContinent = continentSelect.value;

            let filteredData = WomenInTech;

            if (selectedPeriod) {
                filteredData = filteredData.filter(p => p.period === selectedPeriod);
            }

            if (selectedContinent) {
                filteredData = filteredData.filter(p => p.continent === selectedContinent);
            }

            displayCards(filteredData);
        };

        displayCards(WomenInTech);

        periodSelect.addEventListener('change', filterData);
        continentSelect.addEventListener('change', filterData);
    });