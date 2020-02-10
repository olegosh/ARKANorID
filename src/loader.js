import { options } from './options';

export function addLoader() {
  document.addEventListener('DOMContentLoaded', function() {
    if(!options.loading) {
      document.querySelector('#loading').style.display = 'block';
    } else {
      options.loading.style.display = 'block';
    }
  }, false);
}