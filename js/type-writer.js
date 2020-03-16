
/* --- typing effect ---- */
class TypeWriter {
  constructor(txtElement, words, wait=500) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait,10);
    this.type();
    this.isDeleting = false;
  }
  /*typing function*/
  type() {
    const current = this.wordIndex % this.words.length;
    const fullTxt = this.words[current];

    /* when to type & when to delete */
    if(this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1)
    }
    else {
      this.txt = fullTxt.substring(0, this.txt.length + 1)
    }

    this.txtElement.innerHTML = `<span class"txt">${this.txt}</span>`;

    /* changes speed of typing */
    let typeSpeed = 100;
    if(this.isDeleting){
      typeSpeed /= 2;
    }
    if(!this.isDeleting && this.txt === fullTxt) {
      if(current===5){
        typeSpeed = parseInt(5000,10)
      }
      else{
        typeSpeed = this.wait;
      }
      this.isDeleting = true
    } else if(this.isDeleting && this.txt === ''){
      this.isDeleting = false;
      this.wordIndex++;
      typeSpeed = 500;
    }

    setTimeout(() => this.type(), typeSpeed)
  }
}


/* initializes typing effect */
document.addEventListener('DOMContentLoaded', init);

function init() {
  const txtElement = document.querySelector('.txt-type');
  const words = JSON.parse(txtElement.getAttribute('data-words'));
  const wait = txtElement.getAttribute('data-wait');

  new TypeWriter(txtElement, words, wait);
}
