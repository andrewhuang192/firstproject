const beepAudio = new Audio('http://soundbible.com/mp3/Robot_blip-Marianne_Gagnon-120342607.mp3')

const cardLookup = {
    '1': 'dA',
    '2': 'dK',
    '3': 'dQ',
    '4': 'dJ',
    '5': 'd10',
    '6': 'd09',
    '7': 'd08',
    '8': 'd07',
    '9': 'd06',
    '10': 'd05',
    '11': 'd04',
    '12': 'd03',
    '13': 'd02',
    '14': 'hA',
    '15': 'hK',
    '16': 'hQ',
    '17': 'hJ',
    '18': 'h10',
    '19': 'h09',
    '20': 'h08',
    '21': 'h07',
    '22': 'h06',
    '23': 'h05',
    '24': 'h04',
    '25': 'h03',
    '26': 'h02',
    '27': 'sA',
    '28': 'sK',
    '29': 'sQ',
    '30': 'sJ',
    '31': 's10',
    '32': 's09',
    '33': 's08',
    '34': 's07',
    '35': 's06',
    '36': 's05',
    '37': 's04',
    '38': 's03',
    '39': 's02',
    '40': 'cA',
    '41': 'cK',
    '42': 'cQ',
    '43': 'cJ',
    '44': 'c10',
    '45': 'c09',
    '46': 'c08',
    '47': 'c07',
    '48': 'c06',
    '49': 'c05',
    '50': 'c04',
    '51': 'c03',
    '52': 'c02',
}

const arrayLookup = {
    'dA': 14, 
    'dK': 13,
    'dQ': 12,
    'dJ': 11,
    'd10': 10,
    'd09': 9,
    'd08': 8,
    'd07': 7,
    'd06': 6,
    'd05': 5,
    'd04': 4,
    'd03': 3,
    'd02': 2,
    'hA': 14, 
    'hK': 13,
    'hQ': 12,
    'hJ': 11,
    'h10': 10,
    'h09': 9,
    'h08': 8,
    'h07': 7,
    'h06': 6,
    'h05': 5,
    'h04': 4,
    'h03': 3,
    'h02': 2,
    'sA': 14, 
    'sK': 13,
    'sQ': 12,
    'sJ': 11,
    's10': 10,
    's09': 9,
    's08': 8,
    's07': 7,
    's06': 6,
    's05': 5,
    's04': 4,
    's03': 3,
    's02': 2,
    'cA': 14, 
    'cK': 13,
    'cQ': 12,
    'cJ': 11,
    'c10': 10,
    'c09': 9,
    'c08': 8,
    'c07': 7,
    'c06': 6,
    'c05': 5,
    'c04': 4,
    'c03': 3,
    'c02': 2,   
}

const suitsLookup = {
    'dA': 1, 
    'dK': 1,
    'dQ': 1,
    'dJ': 1,
    'd10': 1,
    'd09': 1,
    'd08': 1,
    'd07': 1,
    'd06': 1,
    'd05': 1,
    'd04': 1,
    'd03': 1,
    'd02': 1,
    'hA': 2, 
    'hK': 2,
    'hQ': 2,
    'hJ': 2,
    'h10': 2,
    'h09': 2,
    'h08': 2,
    'h07': 2,
    'h06': 2,
    'h05': 2,
    'h04': 2,
    'h03': 2,
    'h02': 2,
    'sA': 3, 
    'sK': 3,
    'sQ': 3,
    'sJ': 3,
    's10': 3,
    's09': 3,
    's08': 3,
    's07': 3,
    's06': 3,
    's05': 3,
    's04': 3,
    's03': 3,
    's02': 3,
    'cA': 4, 
    'cK': 4,
    'cQ': 4,
    'cJ': 4,
    'c10': 4,
    'c09': 4,
    'c08': 4,
    'c07': 4,
    'c06': 4,
    'c05': 4,
    'c04': 4,
    'c03': 4,
    'c02': 4,
}

let video = document.getElementById("videoToggle");
let playerTurn = null
let flopSuits = [];
let handSuits = [];
let player1Hand = [];
let player2Hand = [];
let currentHand = [];
let flopBoard = [];
let playerNumbers = [];
let playerSuits = [];
let suitsBoard = [];
let player1Suits = [];
let player2Suits = [];
let playerMessage = null;
let whoseTurn = null;
let winner = null;
let round = 1;
let club1Count = 0;
let spade1Count = 0;
let heart1Count = 0;
let diamond1Count = 0;
let club2Count = 0;
let spade2Count = 0;
let heart2Count = 0;
let diamond2Count = 0;

let player1Stack = 100;
let player2Stack = 100;
let totalPot = 0;
let currentBet = 1;
let player1Bet = 0;
let player2Bet = 0;
let folded = 0;
let count = 0;

let cards = document.querySelectorAll('section div div')
let callButton = document.querySelector('#call');
let raiseButton = document.querySelector('#raise');
let checkButton = document.querySelector('#check');
let foldButton = document.querySelector('#fold');
let resetButton = document.querySelector('#reset');
let message = document.querySelector('.message');
let player1Message = document.querySelector('.player1message');
let player2Message = document.querySelector('.player2message');
let player1RenderBet = document.querySelector('.player1bet');
let player1RenderStack = document.querySelector('.player1stack');
let player2RenderBet = document.querySelector('.player2bet');
let player2RenderStack = document.querySelector('.player2stack');
let totalRenderPot = document.querySelector('.totalbet');
let countdownEl = document.querySelector('.countdown');

callButton.addEventListener('click', call)
raiseButton.addEventListener('click', raise)
checkButton.addEventListener('click', check)
foldButton.addEventListener('click', fold)

initialize ();

function videoFunction() {
    if (video.style.display === "none") {
      video.style.display = "block";
    } else {
      video.style.display = "none";
    }
  }

function initialize() {
    handSuits = [];
    flopSuits = [];
    player1Hand = [];
    player2Hand = [];
    player1Suits = [];
    player2Suits = [];
    currentHand = [];
    flopBoard = [];
    winner = null 
    message.textContent = 'The winner is'
    playerNumbers = [];
    playerSuits = [];
    playerTurn = 1;
    whoseTurn = 1;
    deal();
    currentBet = 0;
    player1Bet = 0;
    player2Bet = 0;
    totalPot = 0;
    render();
}

function deal() {
    for (let i = 0; i <= 8; i++) {
        currentHand.push(cardLookup[(Math.floor(Math.random() * 52))]);
    };
    return currentHand
}

function nextRound() {
        totalPot = totalPot + player1Bet + player2Bet
        playerTurn = playerTurn + 1
        whoseTurn = 1;
        currentBet = 0;
        player1Bet = 0;
        player2Bet = 0;
}

function showWhoseTurn() {
    if (whoseTurn === -1 && playerTurn < 5) {
        player2Message.textContent = 'It is your turn!'
        player2RenderBet.style.animation = 'blink 0.5s step-end infinite alternate'
        player1Message.textContent = ''
        player1RenderBet.style.animation = null
    }
    else if (whoseTurn === 1 && playerTurn < 5) {
        player1Message.textContent = 'It is your turn!'
        player1RenderBet.style.animation = 'blink 0.5s step-end infinite alternate'
        player2RenderBet.style.animation = null
        player2Message.textContent = ''
    }
    else {
        return
    }
}

function render() {
    showWhoseTurn();
    totalRenderPot.textContent = 'Total Pot: $' + totalPot
    if (playerTurn > 4 || folded === 1) {
        getWinner();
        return
    }
    if (currentBet === 0) {
            callButton.innerHTML = 'Bet'
    }
    else {
            callButton.innerHTML = 'Call'
    }
    if (playerTurn === 1) {
        for (let i = 0; i < 4; i++) {
            let card  = cards[i];
            card.classList.add(currentHand[i]);
        }
    }
    else if(playerTurn === 2) {
        for (let i = 0; i < 7; i++) {
            let card  = cards[i];
            card.classList.add(currentHand[i]);
        }
    }
    else if(playerTurn === 3 ) {
        for (let i = 0; i < 8; i++) {
            let card  = cards[i];
            card.classList.add(currentHand[i]);
        }
    }
    else if (playerTurn === 4) {
        for (let i = 0; i < 9; i++) {
            let card  = cards[i];
            card.classList.add(currentHand[i]);
        }
    }
    else {
        return
    }
    if (currentBet > 0) {
        player1RenderBet.textContent = 'Current Bet: $' + currentBet
        player2RenderBet.textContent = 'Current Bet: $' + currentBet
    }
    else {
        player1RenderBet.textContent = 'Current Bet: $' + player1Bet
        player2RenderBet.textContent = 'Current Bet: $' + player2Bet
    }
    player1RenderStack.textContent = 'Total Bankroll: $' + player1Stack
    player2RenderStack.textContent = 'Total Bankroll: $' + player2Stack
}

function call() {
    if (playerTurn > 4 || folded === 1) {
        return
    }
    beepAudio.play();

    whoseTurn = whoseTurn * -1 
    if (currentBet === 0) currentBet = 1;
    if (player1Bet < currentBet) {
        player1Bet = currentBet
        player1Stack = player1Stack - player1Bet
        if (player2Bet === currentBet) {
            nextRound();  
        }
        render();
        return
    }
    else if (player2Bet < currentBet) {
        player2Bet = currentBet
        player2Stack = player2Stack - player2Bet
        if (player1Bet === currentBet) {
            nextRound();  
        }
        render();
        return
    }
    totalPot = totalPot + player1Bet + player2Bet
    render();
    return player1Bet, player1Stack, player2Bet, player2Stack
}

function raise() {
    if (playerTurn > 4 || folded === 1) {
        return
    }
    beepAudio.play();

    whoseTurn = whoseTurn * -1
    if (currentBet === 0) currentBet = 2;
    if (player1Bet < currentBet) {
        player1Bet = currentBet
        player1Stack = player1Stack - player1Bet
        if (player2Bet === currentBet) {
            nextRound();  
        }
        render();
        return
    }
    else if (player2Bet < currentBet) {
        player2Bet = currentBet
        player2Stack = player2Stack - player2Bet
        if (player1Bet === currentBet) {
            nextRound();  
        }
        render();
        return
    }
    totalPot = totalPot + player1Bet + player2Bet
    render();
    return player1Bet, player1Stack, player2Bet, player2Stack
}

function check() {
    if (playerTurn > 4 || folded === 1) {
        return
    }
    beepAudio.play();

    if (currentBet - player1Bet > 0 || currentBet - player2Bet > 0) {
        return
    }
    else if (player1Bet === player2Bet && whoseTurn === -1) {
        whoseTurn = whoseTurn * -1 
        render();
        nextRound();
    }
    else {
        whoseTurn = whoseTurn * -1 
        render();
        return
    }
    render();
    return player1Bet, player1Stack, player2Bet, player2Stack
}

function fold() {
    if (playerTurn > 4 || folded === 1) {
        return
    }
    else {
        beepAudio.play();
        folded = 1;
        totalPot = totalPot + player1Bet + player2Bet
        getWinner();
    }
}

function buildFlush() {
    club1Count = player1Suits.filter(suit => suit === 4)
    spade1Count = player1Suits.filter(suit => suit === 3)
    heart1Count = player1Suits.filter(suit => suit === 2)
    diamond1Count = player1Suits.filter(suit => suit === 1)
    club2Count = player2Suits.filter(suit => suit === 4)
    spade2Count = player2Suits.filter(suit => suit === 3)
    heart2Count = player2Suits.filter(suit => suit === 2)
    diamond2Count = player2Suits.filter(suit => suit === 1)
}

function buildHand(x) {
flopBoard = [playerNumbers[4], playerNumbers[5], playerNumbers[6], playerNumbers[7], playerNumbers[8]]
    for (let i = 0; i < 3; i++) {   
            if (flopBoard.includes(x[i])) {
                x.push(x[i]);
                const index = flopBoard.indexOf(x[i]);
                flopBoard.splice(index, 1);
            }
            else {
                x.push(Math.max(...flopBoard));
                const index = flopBoard.indexOf(Math.max(...flopBoard));
                flopBoard.splice(index, 1);
            }
    }
    x.sort((a,b) => b - a);
    return x
}

function buildArray() {
    for(let i=0; i< 9; i++) {
        playerNumbers.push(arrayLookup[currentHand[i]]);
    } 
    for(let i=0; i<2; i++) {
        player1Hand.push(arrayLookup[currentHand[i]]);
    } 
    for(let i=2; i<4; i++) { 
        player2Hand.push(arrayLookup[currentHand[i]]);
    } 
    return player1Hand, player2Hand, playerNumbers
}

function buildSuits() {
    for(let i=0; i< 9; i++) {
        playerSuits.push(suitsLookup[currentHand[i]]);
    } 
    for(let i=0; i<2; i++) {
        player1Suits.push(suitsLookup[currentHand[i]]);
    } 
    for(let i=2; i<4; i++) { 
        player2Suits.push(suitsLookup[currentHand[i]]);
    } 
    for(let i=4; i< 9; i++) { 
        player1Suits.push(suitsLookup[currentHand[i]]);
        player2Suits.push(suitsLookup[currentHand[i]]);
    } 
    return player1Suits, player2Suits, playerSuits
}

function checkPair(x) {
    let pairs = [];
    let quads = [];
    let triples = [];
    let fullHouse =[];
    x.map((elem, i) => {
        if (x[i] === x[i+1] === x[x+2] === x[x+3]) {
            quads.push(x[i], x[i+1], x[x+2], x[x+3]);
        }
        else if (x[i] === x[i+1] === x[x+2]) {
            triples.push(x[i], x[i+1], x[x+2]);
        }
        else if (x[i] === x[i + 1]) {
            pairs.push(x[i], x[i + 1]);
        }
    });
    if (quads.length === 4) {
        x.unshift(8)
    }
    else if (triples.length === 3) {
        x.unshift(4)
    }
    else if (pairs.length === 2) {
        x.unshift(2)
    }
    else if (pairs.length === 4) {
        x.unshift(3)
    }
    else {
        return x
    }
    console.log('pairs' + pairs)
    console.log('triples' + triples)
    console.log('quads' + quads)
}

function checkFullHouse(x) {
    let fullHouse = [];
    x.map((elem, i) => {
        if (x[i] === x[i+1] === x[x+2] && x[x+3] === x[x+4]) {
            fullHouse.push(x[i], x[i+1], x[x+2], x[x+3], x[x+4]);
        }
            return fullHouse
    });
    if (fullHouse.length === 5) {
            x.unshift(7)
    }
    else {
            return x
    }
    console.log('fullHouse' + fullHouse)
}

function checkStraight(x) {
    let straight = [];
    for (let i = 0; i < player1Hand.length; i++) {
        if (player1Hand[i+4] - player1Hand[i] === 4) {
            straight.push(x[i], x[i+1], x[x+2], x[x+3], x[x+4]);
        }
            return straight
    };
    if (straight.length === 5) {
            x.unshift(5)
    }
    else {
            return x
    }
    console.log('straight' + straight)
}

function checkFlush(x) {
    let flush = [];
    x.map((elem, i) => {
        if (x[i] === x[i+1] === x[x+2] === x[x+3] === x[x+4]) {
            flush.push(x[i], x[i+1], x[x+2], x[x+3], x[x+4]);
        }
        else {
            return 
        }
    });    
    if (flush.length === 5) {
        x.unshift(6)
    }
    else {
        return x
    }
    console.log('flush' + flush)
}

function checkRoyalFlush() {

}

function checkStraightFlush() {

}

function getWinner() {
    console.log('game over');
    buildArray();
    buildSuits(); 
    buildFlush();
    buildHand(player1Hand);
    buildHand(player2Hand);
    checkFullHouse(player1Hand);
    checkFullHouse(player2Hand);
    checkStraight(player1Hand);
    checkStraight(player2Hand);
    checkFlush(player1Suits);
    checkFlush(player2Suits);
    checkPair(player1Hand);
    checkPair(player2Hand);
    if (club1Count.length > 4) {
        winner = 1;
        message.textContent = 'PLAYER ONE (1)'
    }
    if (spade1Count.length > 4) {
        winner = 1;
        message.textContent = 'PLAYER ONE (1)'
    }
    if (heart1Count.length > 4) {
        winner = 1;
        message.textContent = 'PLAYER ONE (1)'
    }
    if (diamond1Count.length > 4) {
        winner = 1;
        message.textContent = 'PLAYER ONE (1)'
    }
    if (club2Count.length > 4) {
        winner = -1;
        message.textContent = 'PLAYER TWO (2)'
    }
    if (spade2Count.length > 4) {
        winner = -1;
        message.textContent = 'PLAYER TWO (2)'
    }
    if (heart2Count.length > 4) {
        winner = -1;
        message.textContent = 'PLAYER TWO (2)'
    }
    if (diamond2Count.length > 4) {
        winner = -1;
        message.textContent = 'PLAYER TWO (2)'
    }
    else if (player1Hand.length > player2Hand.length) {
        winner = 1;
        message.textContent = 'PLAYER ONE (1)'
    }
    else if (player2Hand.length > player1Hand.length) {
        winner = -1;
        message.textContent = 'PLAYER TWO (2)'
    }
    else if (player1Hand[0] > player2Hand[0]) {
        winner = 1;
        message.textContent = 'PLAYER ONE (1)'
    }
    else if (player1Hand[0] < player2Hand[0]) {
        winner = -1;
        message.textContent = 'PLAYER TWO (2)'
    }
    else if (player1Hand[1] > player2Hand[1]) {
        winner = 1;
        message.textContent = 'PLAYER ONE (1)'
    }
    else {
        winner = -1;
        message.textContent = 'PLAYER TWO (2)'
    }
}

function countDown() {
        let count = 10;
        beepAudio.play();
        countdownEl.textContent = count;
        countdownEl.style.border = '4px solid black';
        let timerId = setInterval(() => {
          count--;
          if (count) {
            beepAudio.play();
            countdownEl.textContent = count; 
          }
          else {
            clearInterval(timerId)
            countdownEl.textContent = '';
            countdownEl.style.border = '4px solid white';
          }
          check();
        }, 1000)
      }