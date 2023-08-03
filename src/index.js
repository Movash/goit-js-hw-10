import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

import './styles.css';

import { fetchBreeds, fetchCatByBreed } from './cat-api';

const selectElem = document.querySelector('.breed-select');
const loaderElem = document.querySelector('.loader');
const errorElem = document.querySelector('.error');
const catsElem = document.querySelector('.cat-info');

loaderElem.classList.add('hidden');
errorElem.classList.add('hidden');

selectElem.addEventListener('change', handleChange);

fetchBreeds()
  .then(data => {
const namesMarkup = data
  .map(cat => {
    return `<option value="${cat.id}">${cat.name}</option>`;
  })
  .join('');
selectElem.insertAdjacentHTML('beforeend', namesMarkup);

    new SlimSelect({
      select: selectElem,
    });
  })
  .catch(() => {
    Notify.failure(`Oops! Something went wrong! Try reloading the page!`);
  });

function handleChange(evt) {
  loaderElem.classList.replace('hidden', 'loader');
  catsElem.innerHTML = '';
  const breedId = evt.currentTarget.value;
  fetchCatByBreed(breedId)
    .then(data => {
      loaderElem.classList.replace('loader', 'hidden');
      createMarkup(data);
    })
    .catch(() => {
      Notify.failure(`Oops! Something went wrong! Try reloading the page!`);
  });
}

const createMarkup = data => {
  const markup = `
    <div>
      <img src="${data[0].url}" alt="${data[0].breeds[0].name}"/>
    </div>
    <div class="text">
      <h1>${data[0].breeds[0].name}</h1>
      <p>${data[0].breeds[0].description}</p>
      <p><b>Temperament: </b>${data[0].breeds[0].temperament}</p>
    </div>`;
    
  catsElem.innerHTML = ('beforeend', markup);
};