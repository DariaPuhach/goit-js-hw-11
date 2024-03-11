import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import {ref, showLoader, BASE_URL, API_KEY, fetchImages} from './js/pixabay-api.js'
import {createMarkup} from './js/render-function.js'

const simplyGallery = new SimpleLightbox('.gallery-item a', {
  captionsData: 'alt',
  captionDelay: 250,
});

const refs = {
  form: document.querySelector('.search-form'),
  input: document.querySelector('.search-inp'),
  gallery: document.querySelector('.gallery'),
};



refs.form.addEventListener('submit', event => {
  event.preventDefault();
  const query = refs.form.query.value.trim();
  refs.gallery.innerHTML=''

  if (!query) {
    createMessage(
      `The search field can't be empty! Please, enter your request!`
    );
    return;
  }
  const url = `${BASE_URL}?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true`;

  fetchImages(url)
    .then(data => {
      if (data.hits.length === 0) {
        createMessage(
          `Sorry, there are no images matching your search query. Please, try again!`
        );
        showLoader(false);
      }

      refs.gallery.innerHTML = createMarkup(data.hits);
      showLoader(false);
      simplyGallery.refresh();
    
      refs.form.reset();
    })
    .catch(error => console.error(error));
});




function createMessage(message) {
  iziToast.show({
    class: 'error-svg',
    position: 'topRight',
    icon: 'error-svg',
    message: message,
    maxWidth: '432',
    messageColor: '#fff',
    messageSize: '16px',
    backgroundColor: '#EF4040',
    close: false,
    closeOnClick: true,
  });
}

