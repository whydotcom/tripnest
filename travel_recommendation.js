// Fetch the data from the JSON file only once on page load
fetch('travel_recommendation_api.json')
  .then(response => response.json())
  .then(data => {
    console.log(data); // Log the entire data to verify structure

    // Event listener for when the user types in the search bar
    document.getElementById('search-bar').addEventListener('input', function() {
      const query = this.value.trim().toLowerCase(); // Get the search input (converted to lowercase)

      if (query === "") {
        // If the search bar is empty, hide the recommendations container
        const container = document.getElementById('recommendations-container');
        container.style.display = 'none'; // Hide the container
        return; // Exit the function if query is empty
      }

      const filteredData = filterRecommendations(data, query); // Filter the recommendations based on the query
      displayRecommendations(filteredData); // Display the filtered results
    });
  })
  .catch(error => console.error('Error fetching data:', error));

// Function to filter recommendations based on the search query
function filterRecommendations(data, query) {
  const lowerQuery = query.toLowerCase();  // Convert the query to lowercase for case-insensitive matching

  // Filter countries and cities based on search query
  const filteredCountries = data.countries.map(country => {
    const filteredCities = country.cities.filter(city => city.name.toLowerCase().includes(lowerQuery));
    return { ...country, cities: filteredCities };
  }).filter(country => country.cities.length > 0);  // Only include countries with matching cities

  // Filter temples based on search query (using partial matching)
  const filteredTemples = data.temples.filter(temple => temple.name.toLowerCase().includes(lowerQuery));

  // Filter beaches based on search query (using partial matching)
  const filteredBeaches = data.beaches.filter(beach => beach.name.toLowerCase().includes(lowerQuery));

  console.log('Filtered Temples:', filteredTemples); // Log filtered temples
  console.log('Filtered Beaches:', filteredBeaches); // Log filtered beaches

  return { countries: filteredCountries, temples: filteredTemples, beaches: filteredBeaches };
}

// Function to display the filtered recommendations dynamically
function displayRecommendations(data) {
    const container = document.getElementById('recommendations-container');
    container.innerHTML = ''; // Clear previous content
  
    // If there are no results, hide the recommendations container
    if (!data.countries.length && !data.temples.length && !data.beaches.length) {
      container.style.display = 'none';  // Hide if no data found
    } else {
      container.style.display = 'block'; // Make sure it's visible if there are results
    }
  
    // Display filtered countries and cities
    data.countries.forEach(country => {
      const countryElement = document.createElement('div');
      countryElement.classList.add('place');
      countryElement.innerHTML = `<h2>${country.name}</h2>`;
  
      country.cities.forEach(city => {
        const cityElement = document.createElement('div');
        cityElement.classList.add('city');
        cityElement.innerHTML = `
          <h3>${city.name}</h3>
          <img src="${city.imageUrl}" alt="${city.name}" />
          <p>${city.description}</p>
        `;
        countryElement.appendChild(cityElement);
      });
  
      container.appendChild(countryElement);
    });
  
    // Check if temples are being filtered correctly
    console.log('Displaying filtered temples:', data.temples);
  
    // Display filtered temples
    data.temples.forEach(temple => {
      const templeElement = document.createElement('div');
      templeElement.classList.add('temple');
      templeElement.innerHTML = `
        <h3>${temple.name}</h3>
        <img src="${temple.imageUrl}" alt="${temple.name}" />
        <p>${temple.description}</p>
      `;
      
      // Debugging: Check if temple element is created
      console.log('Created temple element:', templeElement);
  
      container.appendChild(templeElement);
    });
  
    // Check if beaches are being filtered correctly
    console.log('Displaying filtered beaches:', data.beaches);
  
    // Display filtered beaches
    data.beaches.forEach(beach => {
      const beachElement = document.createElement('div');
      beachElement.classList.add('beach');
      beachElement.innerHTML = `
        <h3>${beach.name}</h3>
        <img src="${beach.imageUrl}" alt="${beach.name}" />
        <p>${beach.description}</p>
      `;
      
      // Debugging: Check if beach element is created
      console.log('Created beach element:', beachElement);
  
      container.appendChild(beachElement);
    });
  }
  