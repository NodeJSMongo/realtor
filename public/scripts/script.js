let tabLinks = document.querySelectorAll('.tabPanel');
let tabContents = document.querySelectorAll('.image_height');
let tabImages = document.querySelectorAll('.image_height');

/* Set display on load */
tabLinks[0].classList.add('currentLink');
tabContents[0].classList.add('currentContent');
tabImages[0].classList.add('setFront');
/* Find the current Tab */



tabLinks.forEach(function(link){
  link.onclick = function(){
    if(tabLinks[0] == this){
      /* first click the link*/
      tabLinks[0].classList.add('currentLink');
      tabLinks[1].classList.remove('currentLink');
      /* then seclect the tab content*/
      tabContents[0].classList.add('currentContent');
      tabContents[1].classList.remove('currentContent');
      /* then seclect the tab content*/
      tabImages[0].classList.add('setFront');
      tabImages[1].classList.remove('setFront');

    }else{
      tabLinks[1].classList.add('currentLink');
      tabLinks[0].classList.remove('currentLink');

      tabContents[1].classList.add('currentContent');
      tabContents[0].classList.remove('currentContent');

      tabImages[1].classList.add('setFront');
      tabImages[0].classList.remove('setFront');
    }
  }
});
/* FooterLink Modal*/
let footerLinkModal = document.querySelector('.footerLinks-modal__link');
let footerModal = document.querySelector('.modal1');
let footerModalclose = document.querySelector('.close');

footerLinkModal.onclick = function(){
  footerModal.classList.add('modal1-visible');
  footerModal.classList.remove('modal-close');
}
footerModalclose.onclick = function(){
  footerModal.classList.add('modal-close');
  footerModal.classList.remove('modal1-visible');
}
