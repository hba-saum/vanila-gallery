// modal elements
const vanillaGallery = document.querySelector('.vanilla-gallery');
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
          <button class="modal-download-btn">
          <div class="modal-btn-contents">
            <span class="modal-download-ico">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="Frame">
            <path id="Vector" d="M2 9.33325V13.3333C2 14.0697 2.59695 14.6666 3.33333 14.6666H12.6667C13.4031 14.6666 14 14.0697 14 13.3333V9.33325" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
            <path id="Vector_2" d="M8.00033 2V11.3333M8.00033 11.3333L4.66699 7.70367M8.00033 11.3333L11.3337 7.70373" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
            </g>
            </svg></span> <span class="modal-download-text">Download</span>
          </div>
          </button>
        </a>
        <button class="cross-btn" onclick="hideModal()"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.33301 3.3335L12.6663 12.6668M3.33301 12.6668L12.6663 3.3335" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        </button>
      </div>
    </div>
  </div>
</div>
</div>
`;
vanillaGallery.innerHTML += modalHTML;



const allGalleryCards = document.querySelectorAll('.vanilla-gallery .gallery-card');

// set proper width
vanillaGallery.style.maxWidth = `calc(280px * ${allGalleryCards.length} + 20px * ${allGalleryCards.length - 1})`;
// gallery alignment
if(allGalleryCards.length >= 4){
  vanillaGallery.style.margin = "0px auto";
}

const galleryModal = document.querySelector('.gallery-modal');
const downloadBtn = document.querySelectorAll('.download-btn');
let currCardIndex = 0
const totalCards = galleryCardsInfo().length;

// adding download button
const downloadSvg = `
<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<g id="Frame">
<path id="Vector" d="M2 9.33325V13.3333C2 14.0697 2.59695 14.6666 3.33333 14.6666H12.6667C13.4031 14.6666 14 14.0697 14 13.3333V9.33325" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
<path id="Vector_2" d="M8.00033 2V11.3333M8.00033 11.3333L4.66699 7.70367M8.00033 11.3333L11.3337 7.70373" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
</g>
</svg>
`;
downloadBtn.forEach((btn) => {
  btn.innerHTML = downloadSvg;
});

// getting all galleryCards
function galleryCardsInfo(){
  const galleryCards = document.querySelectorAll('.vanilla-gallery .gallery-card');
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
