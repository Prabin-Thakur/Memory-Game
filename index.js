let time = document.querySelector('.time');
let flip = document.querySelector('.flip');
let start = document.querySelector('.start_button');
let game = document.querySelector('.game');
let boxes = document.querySelectorAll('.boxes');
let restart = document.querySelector('.restart');
let restartButton = document.querySelector('.restart_button');
let victory = document.querySelector('.victory');
let timer = 100;
let flips = 0;
let lockBoard = false;
let hasFlipped = false;
let firstCard,secondCard;
let corrects = 0;

shuffle = () => {
    boxes.forEach(boxes => {
        let order = Math.floor(Math.random() * 20);
        boxes.style.order = order;
    });
};

function flipCard() {
    if(lockBoard) return;
    if(this == firstCard)return;
    this.classList.add("rotate");
    if(!hasFlipped){
        firstCard = this;
        hasFlipped = true;
        flips++;
        flip.textContent = flips;
        return;
    };
    if(hasFlipped){
        secondCard = this;
        hasFlipped = false;
        lockBoard = true;
        flips++;
        flip.textContent = flips;
        matching();
    };
};

function matching(){
    let matched = firstCard.dataset.name == secondCard.dataset.name;
    matched ? disableCard() : resetCard();
};

function disableCard(){
    firstCard.style.background = 'rgb(212, 181, 123)';
    secondCard.style.background = 'rgb(212, 181, 123)';
    firstCard.removeEventListener('click',flipCard);
    secondCard.removeEventListener('click',flipCard);
    firstCard = null;
    secondCard = null;
    lockBoard = false;
    corrects++;
};

function resetCard(){
    setTimeout(()=>{
        firstCard.classList.remove('rotate');
        secondCard.classList.remove('rotate');
        firstCard = null;
        secondCard = null;
        lockBoard = false;
    },1000);
};

start.addEventListener('click', () => {
    start.style.display = 'none';
    game.style.display = 'inline';
    shuffle();
    setInterval(() => {
        if (timer >= 0) {
            time.textContent = timer--
        };
        if (timer < 0) {
            game.style.display = 'none';
            restart.style.display = 'inline';
            timer = 100;
            victory.innerText = 'Game Over'
        };
    }, 900);
});

restartButton.addEventListener('click', () => {
    start.style.display = 'none';
    game.style.display = 'inline';
    restart.style.display = 'none';
    lockBoard = false;
    hasFlipped = false;
    shuffle();
    timer = 100;
    time.textContent = 100;
    flips = 0;
    corrects = 0;
    flip.textContent = flips;
    boxes.forEach(boxes => {
        boxes.classList.remove("rotate");
        boxes.addEventListener('click',flipCard);
        boxes.style.background = 'rgb(236, 214, 177)';
    });
});

boxes.forEach(boxes =>{
    boxes.addEventListener('click',flipCard)
});

setInterval(() => {
    if(corrects === 10){
        game.style.display = 'none';
        restart.style.display = 'inline';
        timer = 100;
        corrects == 0;
        victory.innerText = 'Victory';
    }
});



            /**************         Fuck u bitches🖕🖕🖕🖕🖕🖕🖕         *************/