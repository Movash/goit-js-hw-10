const BASE_URL = 'https://api.thecatapi.com';
const API_KEY = 'live_JznGzTRImaNKu1H4pawAVsdwrt8VcdSqCwXgqTM48KJI7lYv22X3GShDB0S3tRfF';

function fetchBreeds() {
  return fetch(`${BASE_URL}/v1/breeds?api_key=${API_KEY}`).then(
    response => {
      if (!response.ok) {
        throw new Error(response.status);
      }

      return response.json();
    });
  }

function fetchCatByBreed(breedId) {
  return fetch(
    `${BASE_URL}/v1/images/search?api_key=${API_KEY}&breed_ids=${breedId}`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }

    return response.json();
  });
}

export { fetchBreeds, fetchCatByBreed };