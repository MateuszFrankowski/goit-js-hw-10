import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';
const DEBOUNCE_DELAY = 300;

const countryInfo = document.querySelector('div.country-info');
const inputField = document.querySelector('input#search-box');
const fetchCountries = name => {
  name = inputField.value.trim();
  if (name.length === 0) return;
  return fetch(
    (url = `https://restcountries.com/v2/name/${name}?fields=name,population,flags,languages`)
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
};

function renderCountriesList(countries) {
  const markup = countries
    .map(country => {
      return `      
            <b>Name</b>: ${country.name}</p>
            <b>Population</b>: ${country.population}</p>
            <img src="${country.flags.svg}" alt="${country.name} flag" width="200" >      
      `;
    })
    .join('');
  countryInfo.innerHTML = markup;
}
function renderCountryCard(country) {
  const parsedLangs = country.languages.map(lang => lang.name).join(', ');
  const markup = `        
            <b>Name</b>: ${country.name}</p>
            <b>Population</b>: ${country.population}</p>
            <img src="${country.flags.svg}" alt="${country.name} flag" width="400" >
             <b>Languages</b>: ${parsedLangs}</p>
        
      `;

  countryInfo.innerHTML = markup;
}

const countryListener = country => {
  fetchCountries(country)
    .then(countries => {
      if (countries.length > 10)
        return Notify.info('Too many countries found. Be more specific!');
      if (countries.length === 1) return renderCountryCard(countries[0]);
      return renderCountriesList(countries);
    })
    .catch(error => {
      Notify.failure('Oops, there is no country with that namen ');
    });
};
addEventListener('input', debounce(countryListener, DEBOUNCE_DELAY));
