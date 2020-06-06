// script.js
// Weekly Assignment No. 6

/*
 * All of the code must be adequetely commented.
 * This includes the code that you write and the code that was provided.
 */




// Playing card class creation which also sets the card state to 0 which controls the visibility of the card.

class PlayingCard {
    constructor(element, face, suit) {

        this.element = element
        this.suit = suit
        this.face = face
        this.img = `img/${face}_of_${suit}.png`
        this.state = 0

        // event listener to that waits for a click on the card itself to change the state (1 = showing front or  0 = back)

        this.element.addEventListener('click', () => {
            if (this.state == 0) {
                this.element.src = this.img
                this.state = 1
            } else if (this.state == 1) {
                this.element.src = 'img/back.png'
                this.state = 0
            }


        })
    }

    // changes the src of the image to the suit and face assigned to the card object
    showFaces() {
        this.element.src = this.img
    }


    // the opposite of above to show the backs
    showBacks() {
        this.element.src = 'img/back.png'
    }
}


// creating the img element to build out the cards on the dom
function createCardImage() {

    const img = document.createElement('img')
    img.src = 'img/back.png'
    return img
}

// appending a child to the container div to build out the pages html
function displayDeck() {
    deck.forEach(card => {
        container.appendChild(card.element)
    })
}


// sorting the deck array in a random order to shuffle the deck
function shuffleDeck() {
    for (let i = 0; i < 1000; i++) {
        deck.sort(() => Math.random() - 0.5)
    }
}

// selecting the first img on the page and deleting it from the card array
// included logic to check decks length
function removeCard() {
    if (deck.length != 0) {
        card = document.querySelector('img')
        card.remove()
        deck.shift()
        if (deck.length == 0) {
            actions.innerHTML = 'No cards left in the deck. :-('
        }
    }
}


// using for each loops to sort through suits/faces array to build new playingcard objects
function buildDeck() {
    const suits = ['hearts', 'spades', 'diamonds', 'clubs']
    const faces = ['ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king']

    suits.forEach(suit => {
        faces.forEach(face => {
            const image = createCardImage()
            image.setAttribute("id", `${face}_of_${suit}.png`)
            deck.push(new PlayingCard(image, face, suit))
        })
    })
}


//function that clears messages shown below buttons depending on action taken by user
function clearActions() {
    actions.innerHTML = ''
}


// empty deck array to be filled with objects
let deck = []

// handles on html elements
const container = document.querySelector('#container')
const actions = document.querySelector('#actions')
const shuffleBtn = document.querySelector('#shuffle')
const removeBtn = document.querySelector('#remove')
const newDeckBtn = document.querySelector('#newdeck')
const showFacesBtn = document.querySelector('#showfaces')
const showBacksBtn = document.querySelector('#showbacks')


//event listener for shuffle button
//puts out a message that confirms deck shuffled while 
//Shuffles the deck, waits 500ms then displays the deck and removes confirmation message
shuffleBtn.addEventListener('click', () => {
    actions.innerHTML = 'The deck of cards has been shuffled.'
    container.innerHTML = ''
    shuffleDeck()
    setTimeout(displayDeck, 500)
    setTimeout(clearActions, 5000)
})


//Displays message, calls remove card function then clears message after 5000ms
removeBtn.addEventListener('click', () => {
    actions.innerHTML = 'A card was removed.'
    removeCard()
    setTimeout(clearActions, 5000)
})


//Displays message, clears out deck array then builds new deck by calling the buildDeck() function.
newDeckBtn.addEventListener('click', () => {
    actions.innerHTML = 'A new deck of cards has been created.'
    deck = []
    container.innerHTML = ''
    buildDeck()
    setTimeout(displayDeck, 500)
    setTimeout(clearActions, 5000)
})

//Shows all faces of cards by calling show faces function when clicked.
showFacesBtn.addEventListener('click', () => {
    actions.innerHTML = 'All card faces are now showing.'
    deck.forEach(card => {
        card.showFaces()
    })
})

//Displays back of cards when button is clicked by calling the showbacks function 
showBacksBtn.addEventListener('click', () => {
    actions.innerHTML = 'All card backs are now showing.'
    deck.forEach(card => {
        card.showBacks()
    })
})

//function calls 
buildDeck()
shuffleDeck()
displayDeck()