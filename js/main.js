// --Load the app and initialize
//     -empty flopBoard array
//     -function shuffle()
//     -function deal()
//     -all buttons 'inactive'
//     -playerTurn = 1 //there will be two players only
    
// --Player makes a move (event listener)
//     -change the playerTurn
//          -if call (add $1)
//                 --if hand runs to river (run getWinner())
//          -if fold (reset board)
//                 -other player is the winner
//          -if raise (add $2) 
//                 --if hand runs to river (run getWinner())
//          -if check (add $0)
//                 -if hand runs to river (run getWinner())            
//     -render available buttons

// --deal() 
//     -generates a currentHand[] array that contains all the cards necessary to run the hand to completion.

// --Render ()
//     -get and assign to innerHTML of each players cards
//     -get flop and assign to innerHTML of flopBoard
//     -use the flopBoard array to render the playArea HTML
//     -if hand runs to river (run getWinner())

// --getWinner()
//         -buildArray() - separates into arrays
//         -buildHand() - creates best hand for player 1 and player 2 using flopBoard
//         -checkPairs() - create ranking based on pairs, triples, quads
//         -checkfullHouse() - similar to check pairs
//         -check flush
//         -ETC

// --Call function
// --Fold function
// --Raise function
// --Check function
// --reset function


/*----- define required constants -----*/

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

/*----- define required variables (MVC app's state) -----*/

let playerTurn = null
// let shuffleCards = [];
let player1Hand = [];
let player2Hand = [];
let currentHand = [];
let flopBoard = [];
let playerNumbers = [];
let playerSuits = [];
let suitsBoard = [];
let player1Suits = [];
let player2Suits = [];
let playerMessage = null
let whoseTurn = null
let winner = null

let player1Stack = null
let player2Stack = null
let totalPot = null
let player1Bet = null
let player2Bet = null

/*----- store HTML elements to use in functions and event listeners -----*/
// let playArea 
// let player1Hand
// let player2Hand = document.querySelector('')
// let flopCard3
// let flopCard4
// let flopCard5
// let currentCard = document.querySelectorAll('#card');
let cards = document.querySelectorAll('section div div')
let callButton = document.querySelector('#call');
let raiseButton = document.querySelector('#raise');
let checkButton = document.querySelector('#check');
let foldButton = document.querySelector('#fold');
let resetButton = document.querySelector('#reset');
let message = document.querySelector('.message');
let player1Message = document.querySelector('.player1message');
let player2Message = document.querySelector('.player2message');


/*----- event listeners -----*/
callButton.addEventListener('click', call)
raiseButton.addEventListener('click', raise)
checkButton.addEventListener('click', check)
foldButton.addEventListener('click', fold)
resetButton.addEventListener('click', initialize)


/*----- functions-----*/
initialize ();

function initialize() {
    player1Hand = [];
    player2Hand = [];
    currentHand = [];
    flopBoard = [];
    winner = null
    playerNumbers = [];
    playerTurn = 1;
    whoseTurn = 1;
    // shuffle();
    deal();
    render();
}

// function shuffle() {
//         // const shuffled = currentHand.push(Math.floor(Math.random() * 52))
//         // return shuffled   
// }

function deal() {
    for (let i = 0; i <= 8; i++) {
        currentHand.push(cardLookup[(Math.floor(Math.random() * 52))]);
    };
    return currentHand
}

function showWhoseTurn() {
        player1Message.textContent = '';
        player1Message.textContent = '';
    if(whoseTurn = 1) {
        player1Message.textContent = 'It is your turn!'
    }
    else {
        player2Message.textContent = 'It is your turn!'
    }
}

function render() {

    showWhoseTurn();
    if(playerTurn < 3) {
        for (let i = 0; i < 4; i++) {
            let card  = cards[i];
            card.classList.add(currentHand[i]);
        }
    }
    else if(playerTurn < 5) {
        for (let i = 4; i < 7; i++) {
            let card  = cards[i];
            card.classList.add(currentHand[i]);
        }
    }
    else if(playerTurn < 7) {
        for (let i = 0; i < 8; i++) {
            let card  = cards[i];
            card.classList.add(currentHand[i]);
        }
    }
    else if (7 < playerTurn) {
        for (let i = 8; i < 9; i++) {
            let card  = cards[i];
            card.classList.add(currentHand[i]);
            buildArray();
            buildSuits();
            getWinner();   
        }
    return
    }
}

function call() {
    if(playerTurn > 7) {
        return
    }
    else {
        player1Stack = player1Stack
        playerTurn += 1
        whoseTurn *= -1
        render();
    }
}

function raise() {
    if(playerTurn > 7) {
        return
    }
    else {
    playerTurn += 1
    whoseTurn *= -1
    render();
    }
}

function check() {
    if(playerTurn > 7) {
        return
    }
    else {
    playerTurn += 1
    whoseTurn *= -1
    render();
    }
}

function fold() {
    if(playerTurn > 7) {
        return
    }
    else {
    playerTurn += 1
    whoseTurn *= -1
    getWinner();
    render();
    }
}

// To compare two poker hands, you can just compute their rank individually and then compare the ranks. This makes comparing very easy.

// To compute the rank of a hand, first classify it to one of the rows in the picture you posted. The result of this classification could look like:

// royalflush ace
// royalflush 5
// pair 5, kickers ace jack 4 (note that the kickers are sorted already)
// highcard ace, kickers queen 10 7 3
// These results can be written as lists of numbers:

// 10, 14 (the 10 means royal flush, the 14 means ace)
// 10, 5
// 2, 5, 14, 11, 4
// 1, 14, 12, 10, 7, 3
// Alternatively, you can also encode the complete hand as a single number. Each of the above numbers is less than 100, so you can write the numbers like this:

// 10 14 00 00 00 00 = 101400000000
// 10 05 00 00 00 00
// +2 05 14 11 04 00
// +1 14 12 10 07 03
// And these are trivial to compare.


//check for suits in suitsBoard, add to playerSuits - let playerSuits = player1Suits
function buildHand(x) {

    //get temporary arrays for suits in order to build hand with suits first
    let handSuits = [];
    let flopSuits = [];
    for(let i=0; i<2; i++) {
        handSuits.push(suitsLookup[currentHand[i]]); 
    } 
    for(let i=4; i< 9; i++) { 
        flopSuits.push(suitsLookup[currentHand[i]]);
    } 

    //Now we start building the hand here 
    for (let a=0; a<3; a++) {
        if(flopSuits.includes(handSuits[a])) {
            x.push(handSuits[a])
            const index = flopSuits.indexOf(handSuits[a]);
            flopSuits.splice(index, 1);
        }
        else if(x[0] > x[1]) {
            for(let b = 0; b < 4; b++) {
                if (flopBoard[b] = x[0]) {
                    x.push(x[0])
                }
                else return
            }
        }
        else if(x[0] < x[1]) {
            for(let c = 0; c < 4; c++) {
                if (flopBoard[c] = x[1]) {
                    x.push(x[1])
                }
                else return
            }
        }
        else {
            x.push(Math.max(...flopBoard));
        }
        x.sort((a,b) => b - a);
        return x, flopBoard
    }
}

// for(let i=0; i<3; i++) {
//     if (suitsBoard.includes(x[i])) {
//         x[i] = suitsLookup[x[i]]
//         x.push(x[i]) 
//     } 

function buildArray() {
    for(let i=0; i< 9; i++) {
        playerNumbers.push(arrayLookup[currentHand[i]]);
    } 
    for(let i=4; i< 9; i++) { 
        flopBoard.push(arrayLookup[currentHand[i]]);
    } 
    for(let i=0; i<2; i++) {
        player1Hand.push(arrayLookup[currentHand[i]]);
    } 
    for(let i=2; i<4; i++) { 
        player2Hand.push(arrayLookup[currentHand[i]]);
    } 
    return player1Hand, player2Hand
}

function buildSuits() {
    for(let i=0; i< 9; i++) {
        playerSuits.push(suitsLookup[currentHand[i]]);
    } 
    for(let i=4; i< 9; i++) { 
        suitsBoard.push(suitsLookup[currentHand[i]]);
    } 
    for(let i=0; i<2; i++) {
        player1Suits.push(suitsLookup[currentHand[i]]);
    } 
    for(let i=2; i<4; i++) { 
        player2Suits.push(suitsLookup[currentHand[i]]);
    } 
    return player1Suits, player2Suits
}

//We will run x=player1Hand and x=player2Hand
function checkPair(x) {
    let pairs = [];
    let quads = [];
    let triples = [];
    // let fullHouse =[];
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
        // else {
            // return {pairs, triples, quads}
        // }
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
        // else {
            return fullHouse
        // }
    });
    if (fullHouse.length === 5) {
            x.unshift(7)
    }
    else {
            return x
    }
    console.log('fullHouse' + fullHouse)
}

function checkStraight() {
    let straight = [];
    for (let i = 0; i < player1Hand.length; i++) {
        if (player1Hand[i+4] - player1Hand[i] === 4) {
            straight.push(x[i], x[i+1], x[x+2], x[x+3], x[x+4]);
        }
        // else {
            return straight
        // }
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
    // for(let i=0; i< 9; i++) {
    //     playerSuits.push(suitsLookup[currentHand[i]]);
    // } 
    let flush = [];
    x.map((elem, i) => {
        if (x[i] === x[i+1] === x[x+2] === x[x+3] === x[x+4]) {
            flush.push(x[i], x[i+1], x[x+2], x[x+3], x[x+4]);
        }
        else {
            return flush
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
    if (player1Hand.length > player2Hand.length) {
        message.textContent = 'PLAYER ONE (1)'
    }
    else if (player2Hand.length > player1Hand.length) {
        message.textContent = 'PLAYER ONE (1)'
    }
    else if (player1Hand[0] > player2Hand[0]) {
        message.textContent = 'PLAYER ONE (1)'
    }
    else {
        message.textContent = 'PLAYER TWO (2)'
    }
}