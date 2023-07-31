import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

import './styles.css';

import { fetchBreeds, fetchCatByBreed } from './cat-api';

const selectElem = document.querySelector('.breed-select');
const loaderElem = document.querySelector('.loader');
const errorElem = document.querySelector('.error');
const catsElem = document.querySelector('.cat-info');

loaderElem.classList.add('is-hidden');
errorElem.classList.add('is-hidden');

let arrNamesId = [];

fetchBreeds()
  .then(data => {
    data.forEach(cat => {
      arrNamesId.push({text: cat.name, value: cat.id});
    });
    new SlimSelect({
      select: selectElem,
      data: arrNamesId,
    });
  })
  .catch(Notify.failure(`Oops! Something went wrong! Try reloading the page!`));


  selectElem.addEventListener('change', handleChange);


function handleChange(evt) {

  loaderElem.classList.remove('is-hidden');
  loaderElem.classList.add('loader');
  selectElem.classList.add('is-hidden');
  catsElem.classList.add('is-hidden');

  const breedId = evt.currentTarget.value;

  fetchCatByBreed(breedId)
    .then(data => {
      loaderElem.classList.remove('loader');
      loaderElem.classList.add('is-hidden');
      selectElem.classList.remove('is-hidden');

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

      catsElem.classList.remove('is-hidden');
    })
    .catch(
      Notify.failure(`Oops! Something went wrong! Try reloading the page!`)
    );
};