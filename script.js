const wordList = document.getElementById('word-list');
const userInput = document.getElementById('user-input');
const message = document.getElementById('message');
const scoreDisplay = document.getElementById('score');
const timeDisplay = document.getElementById('time');
const gameOverScreen = document.getElementById('game-over');
const finalScoreDisplay = document.getElementById('final-score');

let lastWord = '';
let usedWords = [];
let score = 0;
let timer;
let timeLeft = 60;

function startGame() {
    usedWords = [];
    lastWord = '';
    score = 0;
    timeLeft = 60;
    scoreDisplay.textContent = score;
    timeDisplay.textContent = timeLeft;
    message.textContent = '';
    wordList.innerHTML = '';
    gameOverScreen.classList.add('hidden');

    timer = setInterval(() => {
        timeLeft--;
        timeDisplay.textContent = timeLeft;

        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
}

function submitWord() {
    const userWord = userInput.value.trim();
    if (!userWord) {
        message.textContent = '단어를 입력하세요!';
        return;
    }

    if (usedWords.includes(userWord)) {
        message.textContent = '이미 사용된 단어입니다.';
        return;
    }

    if (lastWord && lastWord[lastWord.length - 1] !== userWord[0]) {
        message.textContent = `끝말잇기가 맞지 않습니다. "${lastWord}"로 시작해야 합니다.`;
        return;
    }

    // 단어 유효성 검사 통과
    usedWords.push(userWord);
    lastWord = userWord;
    score++; // 점수 증가
    scoreDisplay.textContent = score; // 점수 업데이트

    // 단어 리스트 업데이트
    const wordItem = document.createElement('div');
    wordItem.textContent = userWord;
    wordList.appendChild(wordItem);

    // 입력 필드 초기화 및 메시지 클리어
    userInput.value = '';
    message.textContent = '';
}

// 엔터키를 눌렀을 때 단어 제출
userInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        submitWord();
    }
});

function endGame() {
    clearInterval(timer);
    finalScoreDisplay.textContent = score;
    gameOverScreen.classList.remove('hidden');
}

function restartGame() {
    startGame();
}

// 게임 시작
startGame();
