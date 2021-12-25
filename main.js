async function searchByIsbn() {
    // clear results
    document.getElementById('book-results-section').innerHTML = 'Loading...';
    document.getElementById('authors-results-section').innerHTML = '';

    // grab isbn input
    const isbn = document.getElementById('isbn').value;

    // fetch the book data
    const bookResponse = await fetch('https://openlibrary.org/isbn/' + isbn + '.json', {
        method: 'GET'
    });
    const bookJson = await bookResponse.json();
    const bookResult = JSON.stringify(bookJson,null,4);
    const authorIdentifiers = [];
    bookJson.authors.forEach((authorEntry) => {
        authorIdentifiers.push(authorEntry.key);
        console.log('got author key: ' + authorEntry.key);
    });

    // fetch the authors data
    let authorsHtml = 'Authors: <pre><code class="prettyprint">';
    for (const authorId of authorIdentifiers) {
        authorsHtml += await fetchAndStringifyAuthor(authorId);
    }
    authorsHtml += '</code></pre>';

    // display the results
    document.getElementById('book-results-section').innerHTML = 'Book: <pre><code class="prettyprint">' + bookResult + '</code></pre>';
    document.getElementById('authors-results-section').innerHTML = authorsHtml;
}

async function fetchAndStringifyAuthor(key) {
    const authorResponse = await fetch('https://openlibrary.org' + key + '.json', {
        method: 'GET'
    });
    const authorJson = await authorResponse.json();

    return JSON.stringify(authorJson,null,4);
}