// 1. ES5

const TypeWriter = function(txtElement, words, waitTime = 3000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = ''; // word
    this.wordIndex = 0;
    this.waitTime = parseInt(waitTime, 10);
    this.type();
    this.isDeleting = false;
}

// Type method
TypeWriter.prototype.type = function() {
    // Current index of word
    const currentIndex = this.wordIndex % this.words.length;
    // Get full text of current word
    const fullTxt = this.words[currentIndex];

    // Check if deleting
    if(this.isDeleting){
        // Remove character
        this.txt = fullTxt.substring(0, this.txt.length - 1)
    }else{
        // Add character 
        this.txt = fullTxt.substring(0, this.txt.length + 1)
    }

    // Inser txt into elements
    this.txtElement.innerHTML = '<span class="txt">' + this.txt +'</span>';

    // Initial type speed
    let typeSpeed = 300;
    if(this.isDeleting){
        typeSpeed /= 2;
    }

    // if word is complete 
    if(!this.isDeleting && this.txt === fullTxt){
        // Make pause at end
        typeSpeed = this.waitTime;
        // set delete true
        this.isDeleting = true;
    } else if(this.isDeleting && this.txt === ''){
        this.isDeleting = false;
        // Move to next word
        this.wordIndex++;
        // Pause before start typing
        typeSpeed = 500;
    }

    setTimeout(()=>{
        this.type()
    }, typeSpeed)
}

// Init on DOM load
document.addEventListener('DOMContentLoaded', init);

// Init App
function init() {
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const waitTime = txtElement.getAttribute('data-wait');
    // Init TypeWriter
    new TypeWriter(txtElement, words, waitTime);
}