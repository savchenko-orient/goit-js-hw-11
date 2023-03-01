import SimpleLightbox from "simplelightbox";
import 'simplelightbox/dist/simple-lightbox.min.css';
import fetchImages from './api/fetchImages';
import renderGalery from './render/renderGallery';
import { formEl, loadMoreBtn, gallery } from './elements';
import {
    noMatchImagesMessage,
    noSearchQueryMessage,
    howManyImagesFoundMessage,
    endOfSearchResultMessage
} from './notifyMessages';

let lightbox = new SimpleLightbox('.gallery a');
let searchQuery = '';
let perPage = 30;
let page = 1;
let totalPages = 0;

formEl.addEventListener('submit', onSubmitHandler);
loadMoreBtn.addEventListener('click', onClickHandler);

async function onSubmitHandler(e) {
    e.preventDefault();
    gallery.innerHTML = '';
    page = 1;
    searchQuery = e.currentTarget.searchQuery.value.trim();

    if (searchQuery === '') {
        noSearchQueryMessage()
        return
    }

    const data = await fetchImages(searchQuery, page, perPage);

    if (data.totalHits === 0) {
        noMatchImagesMessage()
        return
    }

    howManyImagesFoundMessage(data.totalHits);
    renderGalery(data.hits);
    lightbox.refresh();
    loadMoreBtn.classList.remove('is-hidden')
    formEl.reset()
}
async function onClickHandler() {
    page += 1;
    const data = await fetchImages(searchQuery, page, perPage)
    totalPages = Math.ceil(data.totalHits / perPage);

    if (page > totalPages) {
        loadMoreBtn.classList.add('is-hidden');
        endOfSearchResultMessage();
    }

    renderGalery(data.hits);
    lightbox.refresh();
}
