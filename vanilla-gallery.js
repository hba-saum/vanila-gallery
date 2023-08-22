// DOM elements
const allGalleryCards = document.querySelectorAll('.vanila-gallery .gallery-card');
const galleryModal = document.querySelector('.gallery-modal');
const downloadBtn = document.querySelectorAll('.download-btn');
let currCardIndex = 0
const totalCards = galleryCardsInfo().length;
// getting all galleryCards
function galleryCardsInfo(){
  const galleryCards = document.querySelectorAll('.vanila-gallery .gallery-card');
  const cardsInfo = Array.from(galleryCards).map(galleryCardInfo);
  return cardsInfo;
}

function galleryCardInfo(galleryCard){
  let title ='';
  if (galleryCard.querySelector('p')){
    title = galleryCard.querySelector('p').innerHTML
  }
  const imgSrc = galleryCard.querySelector('img').getAttribute('src');
  return {'title': title, "imgSrc": imgSrc};
}

// add downloads to images link
downloadBtn.forEach((btn) => {
  btn.setAttribute("download", "");
});

// onclick img popup
allGalleryCards.forEach((galleryCard, i) => {
  galleryCard.addEventListener('click', () => {
    galleryModal.querySelector('img').src = galleryCardInfo(galleryCard).imgSrc;
    if(galleryModal.querySelector('.modal-section .title-part p').innerHTML != null) {
      galleryModal.querySelector('.modal-section .title-part p').innerHTML = galleryCardInfo(galleryCard).title;
    }
    currCardIndex = i;
    galleryModal.style.visibility = 'visible';
  });
});

// hide modal
// document.addEventListener('click', function(event) {
//   if (event.target.closest('.gallery-modal .modal-btns')) {
//     galleryModal.style.visibility = 'hidden';
//     galleryModal.querySelector('img').src = '';
//   }
//   console.log(event.target);
// });

// image swipe
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById("next-btn");

nextBtn.addEventListener('click', () => {
  if(currCardIndex == totalCards - 1){
    currCardIndex = 0;
  }
  else {
    currCardIndex += 1;
  }
  console.log(currCardIndex);

  galleryModal.querySelector('img').src = galleryCardsInfo()[currCardIndex].imgSrc;
  if(galleryModal.querySelector('p').innerHTML != null) {
    galleryModal.querySelector('p').innerHTML = galleryCardsInfo()[currCardIndex].title;
  }
});

prevBtn.addEventListener('click', () => {
  if(currCardIndex == 0){
    currCardIndex = totalCards - 1;
  }
  else {
    currCardIndex -= 1;
  }
  console.log(currCardIndex);
  galleryModal.querySelector('img').src = galleryCardsInfo()[currCardIndex].imgSrc;
  if(galleryModal.querySelector('p').innerHTML != null) {
    galleryModal.querySelector('p').innerHTML = galleryCardsInfo()[currCardIndex].title;
  }
});
// modal download


// hide modal function
function hideModal(){
  galleryModal.style.visibility = 'hidden';
}
