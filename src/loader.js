export function addLoader() {
  document.addEventListener('DOMContentLoaded', function() {
    if(!loading) {
      document.querySelector('#loading').style.display = 'block';
    } else {
      loading.style.display = 'block';
    }
  }, false);
}