const options = [
  {
    value: 'rock',
    src: './images/rock.png'
  },
  {
    value: 'paper',
    src: './images/paper.png'
  },
  {
    value: 'scissors',
    src: './images/scissors.png',
  }
];

function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function whoWins(origin, target) {
  return (
    origin === 'rock' && target === 'scissors' ||
    origin === 'paper' && target === 'rock' ||
    origin === 'scissors' && target === 'paper'
  );
}

document.addEventListener("DOMContentLoaded", () => {
  const sectionContainer = document.querySelector('.result-section');

  // play logic
  document.querySelector('#btn-play').addEventListener('click', () => {
    const userChoice = document.querySelector('.pick-button:checked').value;
    const computerChoice = options[randomIntFromInterval(0, 2)];

    document.getElementById('user-choice-img').src = document.querySelector(`label[for="${userChoice}"] > img`).src;
    document.getElementById('computer-choice-img').src = computerChoice.src;
    
    sectionContainer.classList.add('result-section--visible');

    // user wins
    if (whoWins(userChoice, computerChoice.value)) {
      sectionContainer.setAttribute('data-win', 'user');
    } // computer wins
    else if (whoWins(computerChoice.value, userChoice)) {
      sectionContainer.setAttribute('data-win', 'computer');
    } else {
      sectionContainer.setAttribute('data-win', 'tie');
    }
  });

  // play again logic
  document.querySelector('#btn-play-again').addEventListener('click', () => {
    sectionContainer.setAttribute('data-win', '');
    sectionContainer.classList.remove('result-section--visible');
  });

});
