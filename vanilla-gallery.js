// DOM elements
const allGalleryCards = document.querySelectorAll('.vanila-gallery .gallery-card');
const galleryModal = document.querySelector('.gallery-modal');

// getting all galleryCards
function galleryCardsInfo(){
  const galleryCards = document.querySelectorAll('.vanila-gallery .gallery-card');
  const cardsInfo = Array.from(galleryCards).map(galleryCardInfo);
  return cardsInfo;
}

function galleryCardInfo(galleryCard){
  const title = galleryCard.querySelector('p').innerHTML;
  const imgSrc = galleryCard.querySelector('img').getAttribute('src');
  return {'title': title, "imgSrc": imgSrc};
}

// onclick img popup
allGalleryCards.forEach((galleryCard) => {
  galleryCard.addEventListener('click', () => {
    galleryModal.querySelector('img').src = galleryCardInfo(galleryCard).imgSrc;
    galleryModal.style.visibility = 'visible';
  });
});

// hide modal

// document.addEventListener('click', function(event) {
//   if (!event.target.closest('#gallery-modal')) {
//     modal.style.visibility = 'hidden';
    
//   }
// });