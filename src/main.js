// Імпорти
import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

//  DOM-елементи
const form = document.querySelector('.form');
const input = form.elements['search-text'];
const loadMoreBtn = document.querySelector('.load-more');

// Стани запиту
let currentPage = 1;
let currentQuery = '';

// Обробка пошуку
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const query = input.value.trim();

  if (!query) {
    iziToast.show({
      message: 'Please fill out this field!',
      backgroundColor: '#ff4e4e',
      position: 'topRight',
    });
    return;
  }

  // Скидання стану
  currentPage = 1;
  currentQuery = query;
  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);
    hideLoader();

    if (data.hits.length === 0) {
      iziToast.show({
        message: 'No images found. Try another query!',
        backgroundColor: '#ff4e4e',
        position: 'topRight',
      });
      return;
    }

    createGallery(data.hits);
    input.value = '';

    // Повідомлення про успіх
    iziToast.show({
      message: `Found ${data.totalHits} images for "${currentQuery}".`,
      backgroundColor: '#00c851',
      position: 'topRight',
      timeout: 3000,
    });

    // Перевірка на кінець колекції
    if (data.totalHits > data.hits.length) {
      showLoadMoreButton();
    } else {
      hideLoadMoreButton();
      iziToast.show({
        message: "You've reached the end of search results.",
        backgroundColor: '#ffcc00',
        position: 'topRight',
      });
    }
  } catch (error) {
    hideLoader();
    console.error('Search error:', error.message);
    iziToast.show({
      message: 'Error while fetching images.',
      backgroundColor: '#ffcc00',
      position: 'topRight',
    });
  }
});

// Обробка кнопки Load More
loadMoreBtn.addEventListener('click', async () => {
  currentPage++;
  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);
    hideLoader();
    createGallery(data.hits);

    // Прокрутка
    const { height: cardHeight } = document
      .querySelector('.gallery')
      .firstElementChild.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });

    // Перевірка на завершення
    const totalShownImages = currentPage * 15;
    if (totalShownImages >= data.totalHits) {
      hideLoadMoreButton();
      iziToast.show({
        message: "You've reached the end of search results.",
        backgroundColor: '#ffcc00',
        position: 'topRight',
      });
    }
  } catch (error) {
    hideLoader();
    console.error('Load more error:', error.message);
    iziToast.show({
      message: 'Error while loading more images.',
      backgroundColor: '#ff4e4e',
      position: 'topRight',
    });
  }
});
