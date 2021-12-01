const startBtn = document.querySelector('#start'),
    screens = document.querySelectorAll('.screen'),
    timeList = document.querySelector('#time-list'),
    timeEl = document.querySelector('#time'),
    board = document.querySelector('#board'),
    colors = ['#fa448c', '#fec859', '#43b5a0', '#491d88', '#aa0139', '#1FF554', '#F5AA10'];

let time = 0;
let score = 0;

startBtn.addEventListener('click', (event) => {
    event.preventDefault();
    screens[0].classList.add('up');
});

timeList.addEventListener('click', event => {
    if(event.target.classList.contains('time-btn')) {
        time = parseInt(event.target.getAttribute('data-time'));
        screens[1].classList.add('up');
        startGame();
    }
});

board.addEventListener('click', (event) => {
    if (event.target.classList.contains('circle')) {
        score++;
        event.target.remove();
        creartRandomCircle();
    }
});

let timerHandler = null;

function startGame() {
    timeEl.parentNode.classList.remove('hide');
    score = 0;
    timerHandler = setInterval(decreaseTime, 1000);
    creartRandomCircle();
    setTime(time);
}

function decreaseTime() {
    if (time === 0) {
        finishGame();
        clearInterval(timerHandler);
    } else {
        let current = --time;
        if (current < 10) {
            current = `0${current}`;
        }
        setTime(current);
    }
    
}

function setTime(value) {
    timeEl.innerHTML = `00:${value}`;
}

function finishGame() {
    timeEl.parentNode.classList.add('hide');
    board.innerHTML = 
    `<div class="score">
        <h1>Cчет: 
        <span class="primary">${score}</span>
        </h1>
        <button class="btn-repeat">Заново</button>
    </div>`;

    const btnRepeat = board.querySelector('.btn-repeat');
    btnRepeat.addEventListener('click', () => {
        // startGame();
        screens[1].classList.remove('up');
        board.innerHTML = '';
    });

}

function creartRandomCircle() {
    const circle = document.createElement('div');
    const size = getRandomNumber(10, 60);

    const{width, height} = board.getBoundingClientRect();
    const x = getRandomNumber(0, width - size);
    const y = getRandomNumber(0, height - size);

    circle.classList.add('circle');
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.top = `${y}px`;
    circle.style.left = `${x}px`;
    circle.style.backgroundColor = `${setColor(circle)}`;

    board.append(circle);
}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min); 
}

function setColor(element) {
    const color = getRandomColor();
    element.style.backgroundColor = color;
    return color;
}

function getRandomColor() {
    const index = Math.floor(Math.random() * colors.length);
    return colors[index];
}

function winTheGame() {
    function kill() {
        const circle = document.querySelector('.circle');
        if (circle) {
            circle.click();
        }
    }

    setInterval(kill, 1000);
}