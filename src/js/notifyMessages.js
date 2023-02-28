import { Notify } from 'notiflix/build/notiflix-notify-aio';


function noMatchImagesMessage() {
    Notify.failure('Sorry, there are no images matching your search query. Please try again.')
}
function noSearchQueryMessage() {
    Notify.failure('Pleace, enter your search params')
}
function howManyImagesFoundMessage(number) {
    Notify.success(`Hooray! We found ${number} images.`)
}

function endOfSearchResultMessage() {
    Notify.failure("We're sorry, but you've reached the end of search results.")
}

export { noMatchImagesMessage, noSearchQueryMessage, howManyImagesFoundMessage, endOfSearchResultMessage }