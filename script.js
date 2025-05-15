const emojis = ['🐶', '🐱', '🐻', '🦁', '🐼', '🐸', '🐵', '🦊'];
const cardsArray = [...emojis, ...emojis]; // duplicar para pares
cardsArray.sort(() => 0.5 - Math.random()); // embaralhar

const gameBoard = document.getElementById('game-board');
let flippedCards = [];
let lockBoard = false;

// Criar cartas
cardsArray.forEach(emoji => {
  const card = document.createElement('div');
  card.classList.add('card');

  card.innerHTML = `
    <div class="card-inner">
      <div class="card-front">❓</div>
      <div class="card-back">${emoji}</div>
    </div>
  `;

  card.addEventListener('click', () => flipCard(card, emoji));
  gameBoard.appendChild(card);
});

function flipCard(card, emoji) {
  if (lockBoard || card.classList.contains('flip')) return;

  card.classList.add('flip');
  flippedCards.push({ card, emoji });

  if (flippedCards.length === 2) {
    lockBoard = true;
    checkMatch();
  }
}

function checkMatch() {
  const [first, second] = flippedCards;

  if (first.emoji === second.emoji) {
    flippedCards = [];
    lockBoard = false;
  } else {
    setTimeout(() => {
      first.card.classList.remove('flip');
      second.card.classList.remove('flip');
      flippedCards = [];
      lockBoard = false;
    }, 1000);
  }
}