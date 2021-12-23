async function searchByIsbn() {
    // grab inputs
    const isbn = document.getElementById('isbn').value;

    // fetch the data
    const response = await fetch('https://openlibrary.org/isbn/' + isbn + '.json', {
        method: 'GET'
    });
    const json = await response.json();
    const result = JSON.stringify(json);
    
    // display the results
    document.getElementById('results-section').innerHTML = result;
}