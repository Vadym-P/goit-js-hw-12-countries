import '@pnotify/core/dist/PNotify.css';
import '@pnotify/desktop/dist/PNotifyDesktop';
import '@pnotify/core/dist/BrightTheme.css';
import { error } from '@pnotify/core';

function fetchCountries(searchQuery) {
  return fetch(`https://restcountries.eu/rest/v2/name/${searchQuery}`).then(response => {
    if (!response.ok) {
      error({
        title: `There no such country. Try again!`,
        styling: 'brighttheme',
        delay: 3000,
      });
    }
    return response.json();
  });
}

 
export default { fetchCountries };
