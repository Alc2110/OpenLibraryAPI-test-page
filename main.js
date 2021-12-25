async function searchByIsbn() {
    // clear results
    document.getElementById('results-section').innerHTML = 'Loading...';

    // grab inputs
    const isbn = document.getElementById('isbn').value;

    // fetch the data
    const response = await fetch('https://openlibrary.org/isbn/' + isbn + '.json', {
        method: 'GET'
    });
    const json = await response.json();
    const result = JSON.stringify(json,null,4);

    // display the results
    document.getElementById('results-section').innerHTML = '<pre><code class="prettyprint">' + result + '</code></pre>';
}