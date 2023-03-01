const gallery = document.querySelector('.gallery');

export function renderGalery(images) {
    const galeryItems = images.map(({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads
    }) => {
        return `<a href="${largeImageURL}" class="gallery__link">
                <div class="card">
                    <img class="card__img" src="${webformatURL}" alt="${tags}" loading="lazy" />
                    <div class="card__info">
                        <p class="info-item">
                            <b>Likes</b>
                            ${likes}
                        </p>
                        <p class="info-item">
                            <b>Views</b>
                            ${views}
                        </p>
                        <p class="info-item">
                            <b>Coments</b>
                            ${comments}
                        </p>
                        <p class="info-item">
                            <b>Downloads</b>
                            ${downloads}
                        </p>
                    </div>
                </div>
                </a>`
    })
        .join('');

    gallery.insertAdjacentHTML('beforeend', galeryItems)
}
