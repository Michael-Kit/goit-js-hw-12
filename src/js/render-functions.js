// Описаний у документації
import SimpleLightbox from "simplelightbox";
// Додатковий імпорт стилів
import "simplelightbox/dist/simple-lightbox.min.css";


const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function hideLoader() {
  const loader = document.querySelector('.loader');
  if (loader) loader.classList.add('hidden');
}

export function showLoader() {
  const loader = document.querySelector('.loader');
  if (loader) loader.classList.remove('hidden');
}


export function clearGallery() {
  const gallery = document.querySelector('.gallery');
  if (gallery) {
    gallery.innerHTML = '';
  }
}

export function createGallery(images) {
  const gallery = document.querySelector('.gallery');
  const markup = images.map(image => {
    return `
      <li class="gallery-item">
        <a href="${image.largeImageURL}">
          <img src="${image.webformatURL}" alt="${image.tags}" />
        </a>
       <div class="info">
           <div class="labels">
              <span>Likes</span>
              <span>Views</span>
              <span>Comments</span>
              <span>Downloads</span>
           </div>
         <div class="stats">
              <span>${image.likes}</span>
              <span>${image.views}</span>
              <span>${image.comments}</span>
              <span>${image.downloads}</span>
         </div>
       </div>

      </li>
    `;
  }).join('');

  gallery.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}
export function showLoadMoreButton() {
  const btn = document.querySelector('.load-more');
  if (btn) btn.classList.remove('hidden');
}

export function hideLoadMoreButton() {
  const btn = document.querySelector('.load-more');
  if (btn) btn.classList.add('hidden');
}
