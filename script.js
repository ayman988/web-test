
const choices = document.querySelectorAll('.choice');
const answers = document.querySelectorAll('.answer');
const checkScoreButton = document.getElementById('check-score');
const scoreDisplay = document.getElementById('score-display');

let totalChoices = choices.length;
let correctCount = 0;
let incorrectCount = 0;

choices.forEach(choice => {
    choice.addEventListener('dragstart', dragStart);
});

answers.forEach(answer => {
    answer.addEventListener('dragover', dragOver);
    answer.addEventListener('drop', drop);
});

function dragStart(event) {
    event.dataTransfer.setData("text", event.target.id);
    event.target.classList.add('dragging');
}

function dragOver(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();
    const answerId = event.target.id;
    const draggedTargetId = event.dataTransfer.getData("text");
    //const choice = document.querySelector(`[answer="${draggedTarget}"]`);
    const choice = document.getElementById(draggedTargetId)
    choice.classList.add('dragged');
    if (answerId === "answer"+draggedTargetId) {
        event.target.appendChild(choice);
        choice.classList.remove('dragging');    
        correctCount++;
    } else {
        event.target.appendChild(choice);
        incorrectCount++;
    }

    choice.setAttribute('draggable', false); // Disable dragging after dropping
    totalChoices--;

    // Show the button to check the score when all cards are placed
    if (totalChoices === 0) {
        checkScoreButton.classList.remove('hidden');
    }
}

// Check score and display it
checkScoreButton.addEventListener('click', () => {
    scoreDisplay.textContent = `Score: ${(correctCount/choices.length).toFixed(2) * 100} % `;
    scoreDisplay.classList.remove('hidden');
    checkScoreButton.classList.add('hidden');
});
 