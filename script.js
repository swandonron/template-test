const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

// show loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// hide loading
function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}



//Show new quote

function newQuote() {
    loading();
    //Pick a random quote from api quotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // check if author field is blank and replace it with 'unknown'
    if (!quote.author) {
        authorText.textContent = 'Unknown';
    } else {
        authorText.textContent = quote.author;
    }
    // check if quote length is too long
    if (quote.text.length > 100) {
        quoteText.classList.add('long-quote');
    } else {
    quoteText.classList.remove('long-quote');
    }
    // set quote, hide loader
    quoteText.textContent = quote.text;
    complete();
}

// // Get quotes from APO 
async function getQuotes() {
    loading()
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
     // Catch Error Here
    }
}

// Tweet quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_black');
}

//Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On load
getQuotes();

