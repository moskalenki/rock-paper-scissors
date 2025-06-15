const paperBtn = document.getElementById('paper');
const scissorsBtn = document.getElementById('scissors');
const rockBtn = document.getElementById('rock');

const counterEl = document.getElementById('counter');

const bgEl = document.querySelector('.bg');

let counter = 0;

const options = ["rock","paper","scissors"];

function getRandomDecision(){
    const randomNumber = Math.floor(Math.random() * 3);
    return options[randomNumber];
}

function getWinner(userChoice, computerChoice){
    if(userChoice === computerChoice){
        return "DRAW";
    }

    if ((userChoice === "rock" && computerChoice === "scissors") ||
        (userChoice === "paper" && computerChoice === "rock") ||
        (userChoice === "scissors" && computerChoice === "paper")) {
        incrementCounter();
        return "YOU WIN";
    } else {
        decrementCounter();
        return "YOU LOSE";
    }
}

function handleUserChoice(choice){
    document.getElementById(choice).addEventListener('click',function(){
        const computerDecision = getRandomDecision();
        bgEl.classList.add("hidden");
        displayRoundResult(choice, computerDecision);
    })
}

function renderRoundResult(containerName, choice){
    containerName.innerHTML +=
        `
                <button class="${choice}">
                    <img 
                        src="../html/images/icon-${choice}.svg" 
                        alt="${choice}-icon" 
                    />
                </button>
        `;
}

function createRoundInfoText(infoText, containerToAppendTo) {
    const p = document.createElement('p');
    p.textContent = infoText;
    containerToAppendTo.appendChild(p);
}


function createResultContainer(result, onPlayAgainClick) {
    const container = document.createElement('div');
    container.classList.add('result-container');

    const message = document.createElement('p');
    message.classList.add('result-message');
    message.textContent = result;

    const button = document.createElement('button');
    button.classList.add('play-again-btn');
    button.textContent = 'PLAY AGAIN';
    button.addEventListener('click', onPlayAgainClick);

    container.appendChild(message);
    container.appendChild(button);

    return container;
}


function showUserChoice(choice) {
    const container = document.createElement('div');
    container.classList.add('player-result-container');

    createRoundInfoText('YOU PICKED', container);
    renderRoundResult(container, choice);

    return container;
}


function showComputerChoice(choice) {
    const container = document.createElement('div');
    container.classList.add('computer-result-container');

    createRoundInfoText('THE HOUSE PICKED', container);

    setTimeout(() => {
        renderRoundResult(container, choice);
    }, 1500);

    return container;
}


function showResultMessage(container, result,containerToInsert, onPlayAgainClick) {
    const resultContainer = createResultContainer(result, onPlayAgainClick);
    container.insertBefore(resultContainer,containerToInsert.nextElementSibling);
}



function displayRoundResult(userChoice, computerChoice) {
    const mainEl = document.querySelector('main');
    const roundResultContainer = document.createElement('div');
    const roundResultWrapper = document.createElement('div');
    roundResultContainer.classList.add('round-result');
    roundResultWrapper.classList.add('round-result-wrapper');
    const userResultContainer = showUserChoice(userChoice);
    const computerResultContainer = showComputerChoice(computerChoice);

    roundResultContainer.appendChild(userResultContainer);
    roundResultContainer.appendChild(computerResultContainer);
    roundResultWrapper.appendChild(roundResultContainer);
    mainEl.appendChild(roundResultWrapper);

    setTimeout(() => {
        const result = getWinner(userChoice, computerChoice);
        counterEl.textContent = counter.toString();

        showResultMessage(roundResultWrapper, result, computerResultContainer, () => {
            roundResultWrapper.remove();
            bgEl.classList.remove('hidden');
        });
    }, 2000);
}



function incrementCounter(){
     counter += 1;
}

function decrementCounter(){
    counter -= 1;
}

options.forEach(handleUserChoice);

