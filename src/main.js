import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader
} from './js/render-functions.js';

// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";



const form = document.querySelector('.form');
const input = form.elements['search-text'];

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const query = input.value.trim();
  if (!query) {
    iziToast.show({
      message: "Please fill out this field !",
      backgroundColor: "#ff4e4e",
      position: "topRight",
      // timeout:3000, 
    });
    return;
  }
  clearGallery();
  showLoader();

  try {
    const data = await getImagesByQuery(query);
    hideLoader();

    if (data.hits.length === 0) {
  iziToast.show({
    message: "Sorry, there are no images matching your search query. Please try again!",
    backgroundColor: "#ff4e4e",
    position: "topRight",
  });
  return;
}

    createGallery(data.hits);
    input.value = '';
    iziToast.show({
  message: `Found ${data.hits.length} images.`,
  backgroundColor: "#00c851",
  position: "topRight",
  timeout: 3000,
});


  } catch (error) {
  hideLoader();
  console.error('Помилка запиту:', error.message);

  iziToast.show({
    message: "An error occurred while fetching images. Please try again later.",
    backgroundColor: "#ffcc00",
    position: "topRight",
  });
}
});


