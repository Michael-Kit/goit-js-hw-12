// Імпорт API-функції для отримання зображень
import { getImagesByQuery } from './js/pixabay-api.js';

// Імпорт функцій візуального рендерингу
import {
  createGallery,        // додає картинки до DOM
  clearGallery,         // очищає галерею перед новим запитом
  showLoader,           // показує loader
  hideLoader,           // ховає loader
  showLoadMoreButton,   // показує кнопку "Load more"
  hideLoadMoreButton    // ховає кнопку "Load more"
} from './js/render-functions.js';

// Імпорт сповіщень (бібліотека iziToast)
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

// Знаходимо DOM-елементи
const form = document.querySelector('.form');
const input = form.elements['search-text'];
const loadMoreBtn = document.querySelector('.load-more');

// Змінні для відстеження запитів
let currentPage = 1;
let currentQuery = '';

// Обробка форми пошуку
form.addEventListener('submit', async (e) => {
  e.preventDefault();                       // зупиняємо перезавантаження сторінки
  const query = input.value.trim();        // отримуємо пошуковий текст

  if (!query) {
    // якщо поле порожнє — показуємо попередження
    iziToast.show({
      message: "Please fill out this field !",
      backgroundColor: "#ff4e4e",
      position: "topRight",
    });
    return;
  }

  // Оновлюємо стан
  currentPage = 1;
  currentQuery = query;

  // Підготовка до нового запиту
  clearGallery();         // очищаємо галерею
  showLoader();           // показуємо loader

  try {
    // Виконуємо запит
    const data = await getImagesByQuery(query);
    hideLoader();         // ховаємо loader після отримання

    if (data.hits.length === 0) {
      // якщо немає зображень — показуємо попередження
      iziToast.show({
        message: "Sorry, there are no images matching your search query. Please try again!",
        backgroundColor: "#ff4e4e",
        position: "topRight",
      });
      hideLoadMoreButton();
      return;
    }

    // Рендеримо зображення
    createGallery(data.hits);
    showLoadMoreButton();       // показуємо кнопку "Load more"
    input.value = '';           // очищаємо поле вводу

    // Показуємо повідомлення про успіх
    iziToast.show({
      message: `Found ${data.hits.length} images.`,
      backgroundColor: "#00c851",
      position: "topRight",
      timeout: 3000,
    });

  } catch (error) {
    // В разі помилки — інформуємо користувача
    hideLoader();
    console.error('Помилка запиту:', error.message);
    iziToast.show({
      message: "An error occurred while fetching images. Please try again later.",
      backgroundColor: "#ffcc00",
      position: "topRight",
    });
  }
});

// Обробка кнопки "Load more"
loadMoreBtn.addEventListener('click', async () => {
  currentPage++;          // переходимо до наступної сторінки + 1 сторінка
  showLoader();

  try {
    // ⛲ Запит на наступну сторінку
    const data = await getImagesByQuery(currentQuery, currentPage);
    hideLoader();
    createGallery(data.hits);  // додаємо нові картинки

    // Плавна прокрутка до нових зображень
    const { height: cardHeight } = document
      .querySelector('.gallery')
      .firstElementChild.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });

    const totalShownImages = currentPage * 15;

if (totalShownImages >= data.totalHits)
       {
      hideLoadMoreButton();
      iziToast.show({
        message: "You've reached the end of search results.",
        backgroundColor: "#ffcc00",
        position: "topRight",
      });
    }

  } catch (error) {
    // В разі помилки при підвантаженні
    hideLoader();
    console.error('Помилка завантаження наступної сторінки:', error.message);
    iziToast.show({
      message: "An error occurred while loading more images.",
      backgroundColor: "#ff4e4e",
      position: "topRight",
    });
  }
});
const loadingMessage = document.getElementById('loading-message');

async function onLoadMoreClick() {
  loadingMessage.style.display = 'block'; // показати повідомлення
  
  try {
    const data = await fetchImages(); // завантажити зображення
    createGallery(data.hits);
    
    // Плавна прокрутка після рендеру
    const { height: cardHeight } = document
      .querySelector('.gallery')
      .firstElementChild.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  } catch (error) {
    console.error('Error loading images:', error);
  } finally {
    loadingMessage.style.display = 'none'; // приховати повідомлення
  }
}
