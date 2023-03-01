import { Notify } from 'notiflix/build/notiflix-notify-aio';

export function noMatchImagesMessage() {
    Notify.failure('Sorry, there are no images matching your search query. Please try again.')
}
export function noSearchQueryMessage() {
    Notify.failure('Pleace, enter your search params')
}
export function howManyImagesFoundMessage(number) {
    Notify.success(`Hooray! We found ${number} images.`)
}
export function endOfSearchResultMessage() {
    Notify.failure("We're sorry, but you've reached the end of search results.")
}