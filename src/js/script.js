import { fetchImages } from './fetchImages';
import renderGalery from './renderGallery';
import SimpleLightbox from "simplelightbox";
import 'simplelightbox/dist/simple-lightbox.min.css';
import {
    noMatchImagesMessage,
    noSearchQueryMessage,
    howManyImagesFoundMessage,
    endOfSearchResultMessage
} from './notifyMessages'

const formEl = document.querySelector('#search-form');
const loadMoreBtn = document.querySelector('.load-more-btn');
const gallery = document.querySelector('.gallery');


let lightbox = new SimpleLightbox('.gallery a');
let searchQuery = '';
let perPage = 30;
let page = 1;

formEl.addEventListener('submit', async (e) => {
    e.preventDefault();
    gallery.innerHTML = '';
    page = 1;
    searchQuery = e.currentTarget.searchQuery.value.trim();

    if (searchQuery === '') {
        noSearchQueryMessage()
        return
    }
    // lightbox.destroy();

    try {
        await fetchImages(searchQuery, page, perPage)
            .then(({ data }) => {

                if (data.totalHits === 0) {
                    noMatchImagesMessage()
                    return
                }

                howManyImagesFoundMessage(data.totalHits);
                renderGalery(data.hits);
                lightbox.refresh();
                // lightbox = new SimpleLightbox('.gallery a');

                loadMoreBtn.classList.remove('is-hidden')
            })
    } catch (error) {
        console.log(error);
    }

    formEl.reset()
});


loadMoreBtn.addEventListener('click', () => {
    page += 1;

    try {
        fetchImages(searchQuery, page, perPage)
            .then(({ data }) => {

                renderGalery(data.hits);
                lightbox.refresh();

                loadMoreBtn.classList.remove('is-hidden');

                const totalPages = Math.ceil(data.totalHits / perPage);

                if (page > totalPages) {
                    loadMoreBtn.classList.add('is-hidden');
                    endOfSearchResultMessage()
                }
            })

    } catch (error) {
        console.log('error: ', error);
    }
})

