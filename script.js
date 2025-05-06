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

     // Kaarten weergeven
    //  displayCards = (filteredData) => {
    //     container.innerHTML = filteredData.map(person => `
    //       <li class="card">
    //         <div class="card-inner" style="background-image: url('https://fdnd.directus.app/assets/${person.image}'); opacity:0.6;">
    //         <div>
    //           <h2>${person.name}</h2>
    //           <div class="links">
    //             <a href="${person.website}" target="_blank">Website</a>
    //             ${person.github ? `<a href="${person.github}" target="_blank">GitHub</a>` : ''}
    //             ${person.codepen ? `<a href="${person.codepen}" target="_blank">CodePen</a>` : ''}
    //           </div>
    //         </div>
    //         <div>
    //         <p>"${person.tagline}"</p>
    //         <p>Based: ${person.country}</p>
    //         </div>
    //         </div>
    //       </li>
    //     `).join('');
    //   };

      
    displayCards = (filteredData) => {
        const container = document.getElementById('slider');
    
        if (filteredData.length === 0) {
            container.innerHTML = `
                <li class="card">
                    <div class="card-inner" style="background-image: none; background-color:rgba(45, 41, 41, 0.86);">
                        <img src="content/yournext.png"> 
                            <h2>Are you the next one?</h2>
                            <p>We are IN need of more women in tech</p>
                            <p>Are you the one we need?</p>
                        </div>
                    </div>
                </li>
            `;
            return;
        }
    
        container.innerHTML = filteredData.map(person => `
            <li class="card">
                <div class="card-inner" style="background-image: url('https://fdnd.directus.app/assets/${person.image}'); opacity:0.6;">
                    <div>
                        <h2>${person.name}</h2>
                        <div class="links">
                            <a href="${person.website}" target="_blank">Website</a>
                            ${person.github ? `<a href="${person.github}" target="_blank">GitHub</a>` : ''}
                            ${person.codepen ? `<a href="${person.codepen}" target="_blank">CodePen</a>` : ''}
                        </div>
                    </div>
                    <div>
                        <p>"${person.tagline}"</p>
                        <p>Based: ${person.country}</p>
                    </div>
                </div>
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