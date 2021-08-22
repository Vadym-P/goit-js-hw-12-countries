import { func } from 'assert-plus';
import countryCardTpl from '../templates/country-card.hbs';
import countryListTpl from '../templates/country-list.hbs';
import API from './api-service';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/desktop/dist/PNotifyDesktop';
import '@pnotify/core/dist/BrightTheme.css';
import { error } from '@pnotify/core';
const debounce = require('lodash.debounce');

const refs = {
  cardContainer: document.querySelector('.js-card-container'),
  input: document.querySelector('.input-field'),
};

refs.input.addEventListener('input', debounce(onInput, 500));

function onInput(e) {
  let searchCountryValue = e.target.value.toLowerCase();
  if (searchCountryValue !== '') {
    API.fetchCountries(searchCountryValue).then(renderCountryCard).catch(onError);
  } else {
    refs.cardContainer.innerHTML = '';
  }
}

function renderCountryCard(country) {
  if (country.length === 1) {
    const markup = countryCardTpl(country);
    refs.cardContainer.innerHTML = markup;
  }
  if (country.length > 1 && country.length <= 10) {
    const markupList = countryListTpl(country);
    refs.cardContainer.innerHTML = markupList;
  }
  if (country.length > 10) {
    error({
      title: `Too many matches found.`,
      text: `We found ${country.length} countries. Please enter a more specific query!`,
      styling: 'brighttheme',
      delay: 3000,
    });
  }
}

function onError(error) {
  error({
    title: `There no such country. Try again!`,
    styling: 'brighttheme',
    delay: 3000,
  });
}
