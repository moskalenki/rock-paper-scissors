const paperBtn = document.getElementById('paper');
const scissorsBtn = document.getElementById('scissors');
const rockBtn = document.getElementById('rock');

const counterEl = document.getElementById('counter');

let counter = 0;

const options = ["rock","paper","scissors"];

function getRandomDecision(){
    const randomNumber = Math.floor(Math.random() * 3);
    return options[randomNumber];
}

function getWinner(userChoice, computerChoice){
    if(userChoice === computerChoice){
        console.log("draw")
        return;
    }

    if ((userChoice === "rock" && computerChoice === "scissors") ||
        (userChoice === "paper" && computerChoice === "rock") ||
        (userChoice === "scissors" && computerChoice === "paper")) {
        incrementCounter();
        console.log("you won");
    } else {
        console.log("computer won");
        decrementCounter();
    }

    counterEl.textContent = counter.toString();
}

function handleUserChoice(choice){
    document.getElementById(choice).addEventListener('click',function(){
        const computerDecision = getRandomDecision();
        getWinner(choice, computerDecision);
    })
}

function incrementCounter(){
     counter += 1;
}

function decrementCounter(){
    counter -= 1;
}

options.forEach(handleUserChoice);

