// DOM elements
const vanillaGallery = document.querySelector('.vanila-gallery');
const modalHTML = `
<div class="gallery-modal">
<div class="modal-btns">
  <button id="prev-btn">&lt;</button>
  <button id="next-btn">&gt;</button>
</div>
<div class="modal-section">
  <div class="img-part">
    <img>
  </div>
  <div class="title-part">
    <div class="title-section">
      <div class="modal-text">
        <p></p>
      </div>
      <div class="title-btns">
        <a class="modal-download-link" href="" download="">
          <button class="modal-download-btn"><span><img src="ico/download.png"></span> <span>Download</span></button>
        </a>
        <button class="cross-btn" onclick="hideModal()"><img src="ico/cross.png"></button>
      </div>
    </div>
  </div>
</div>
</div>
`;
vanillaGallery.innerHTML += modalHTML;

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
  galleryCard.addEventListener('click', (event) => {
    galleryModal.querySelector('img').src = galleryCardInfo(galleryCard).imgSrc;
    galleryModal.querySelector('.title-btns .modal-download-link').href = galleryCardInfo(galleryCard).imgSrc;
    if(galleryModal.querySelector('.modal-section .title-part p').innerHTML != null) {
      galleryModal.querySelector('.modal-section .title-part p').innerHTML = galleryCardInfo(galleryCard).title;
    }
    if(!event.target.closest('.download-btn')){
      currCardIndex = i;
      galleryModal.style.visibility = 'visible';
    }
  });
});


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

  galleryModal.querySelector('img').src = galleryCardsInfo()[currCardIndex].imgSrc;
  galleryModal.querySelector('.title-btns .modal-download-link').href = galleryCardsInfo()[currCardIndex].imgSrc;
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
  galleryModal.querySelector('img').src = galleryCardsInfo()[currCardIndex].imgSrc;
  galleryModal.querySelector('.title-btns .modal-download-link').href = galleryCardsInfo()[currCardIndex].imgSrc;
  if(galleryModal.querySelector('p').innerHTML != null) {
    galleryModal.querySelector('p').innerHTML = galleryCardsInfo()[currCardIndex].title;
  }
});

// hide modal function
function hideModal(){
  galleryModal.style.visibility = 'hidden';
}

// hide modal
document.addEventListener('click', function(event) {
  if (event.target.closest('.gallery-modal .modal-btns') && !event.target.closest('#prev-btn') && !event.target.closest('#next-btn')) {
    galleryModal.style.visibility = 'hidden';
    galleryModal.querySelector('img').src = '';
  }
});
