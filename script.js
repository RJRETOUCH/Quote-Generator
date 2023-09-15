'use strict'

const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterTb = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQUotes = [];

// Show Loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
};

// Hide Loading
function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}



// SHow new Quote

function newQuote() {
    loading();
    // Pick a random Quote from API QUotes array
    const quote = apiQUotes[Math.floor(Math.random() * apiQUotes.length)];
    // Check if Author field is blank and replace with with unknown
    if (!quote.author) {
        authorText.textContent = 'Unknown'
    } else {
        authorText.textContent = quote.author;
    }

    // CHeck Quote length to determine styling
    if (quote.text.length > 100) {
        quoteText.classList.add('long-quote');

    } else {
        quoteText.classList.remove('long-quote');
    }

    //Set Quote , hide Loader
    quoteText.textContent = quote.text;
    complete();
}

// Get Quotes From API

async function getQuotes() {
    loading();
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';

    try {

        const response = await fetch(apiUrl);
        apiQUotes = await response.json();
        newQuote();
    } catch (error) {
        // Catch Error Here
        console.log('Woops, no quote', error);
    }
}

// Tweet Quote
function tweetQUote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;

    window.open(twitterUrl, '_blank');

}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterTb.addEventListener('click', tweetQUote);


// On load
getQuotes();
