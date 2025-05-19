const board = document.getElementById('board');
const diceResult = document.getElementById('diceResult');
const rollBtn = document.getElementById('rollBtn');
const quizContainer = document.getElementById('quizContainer');
const quizQuestion = document.getElementById('quizQuestion');
const quizOptions = document.getElementById('quizOptions');

const boardSize = 25;
let playerPos = 0;
let playerToken = document.createElement('div');
playerToken.classList.add('player');

const quizQuestions = [
  {
    question: "Apa ibu kota Indonesia?",
    options: ["Bandung", "Jakarta", "Medan", "Palembang"],
    correct: "Jakarta"
  },
  {
    question: "Berapa jumlah provinsi di Indonesia (per 2023)?",
    options: ["34", "36", "37", "38"],
    correct: "38"
  },
  {
    question: "Siapa presiden pertama Indonesia?",
    options: ["Soeharto", "Habibie", "Soekarno", "Megawati"],
    correct: "Soekarno"
  }
];

function createBoard() {
  for (let i = 0; i < boardSize; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.setAttribute('data-index', i);
    cell.innerText = i + 1;
    board.appendChild(cell);
  }
  updatePlayerPosition();
}

function updatePlayerPosition() {
  document.querySelectorAll('.cell').forEach(cell => {
    cell.innerHTML = cell.innerText;
  });
  const targetCell = document.querySelector(`.cell[data-index="${playerPos}"]`);
  targetCell.appendChild(playerToken);
}

function rollDice() {
  const roll = Math.floor(Math.random() * 6) + 1;
  diceResult.innerText = `Dadu: ${roll}`;
  const nextPos = playerPos + roll;

  if (nextPos >= boardSize) {
    alert("Selamat! Kamu mencapai akhir papan.");
    playerPos = boardSize - 1;
    updatePlayerPosition();
    rollBtn.disabled = true;
  } else {
    playerPos = nextPos;
    updatePlayerPosition();
    if (playerPos % 5 === 0) {
      showQuiz();
    }
  }
}

function showQuiz() {
  const randomQuiz = quizQuestions[Math.floor(Math.random() * quizQuestions.length)];
  quizContainer.classList.remove('hidden');
  quizQuestion.innerText = randomQuiz.question;
  quizOptions.innerHTML = '';
  randomQuiz.options.forEach(option => {
    const btn = document.createElement('button');
    btn.innerText = option;
    btn.onclick = () => {
      if (option === randomQuiz.correct) {
        alert("Jawaban benar!");
        quizContainer.classList.add('hidden');
      } else {
        alert("Jawaban salah! Kamu mundur 2 langkah.");
        playerPos = Math.max(0, playerPos - 2);
        updatePlayerPosition();
        quizContainer.classList.add('hidden');
      }
    };
    quizOptions.appendChild(btn);
  });
}

rollBtn.addEventListener('click', rollDice);

createBoard();
