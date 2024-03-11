 import showLoader from './main.js'
 
 
 export const BASE_URL = 'https://pixabay.com/api/';
 export const API_KEY = '41899926-74a7536d4d492e936dbb67b5b';

 

export function fetchImages(url) {
    showLoader(true);
    return fetch(url).then(resp => {
      if (!resp.ok) {
        throw new Error(resp.ststusText);
      }
      return resp.json();
    });
  }
  