const inputElement = document.getElementById("fruit");
const suggestionsElement = document.querySelector(".list");

const fruit = ['Apple', 'Apricot', 'Avocado 🥑', 'Banana', 'Bilberry', 'Blackberry', 
  'Blackcurrant', 'Blueberry', 'Boysenberry', 'Currant', 'Cherry', 'Coconut', 
  'Cranberry', 'Cucumber', 'Custard apple', 'Damson', 'Date', 'Dragonfruit', 'Durian', 
  'Elderberry', 'Feijoa', 'Fig', 'Gooseberry', 'Grape', 'Raisin', 'Grapefruit', 'Guava',
  'Honeyberry', 'Huckleberry', 'Jabuticaba', 'Jackfruit', 'Jambul', 'Juniper berry', 
  'Kiwifruit', 'Kumquat', 'Lemon', 'Lime', 'Loquat', 'Longan', 'Lychee', 'Mango', 
  'Mangosteen', 'Marionberry', 'Melon', 'Cantaloupe', 'Honeydew', 'Watermelon', 
  'Miracle fruit', 'Mulberry', 'Nectarine', 'Nance', 'Olive', 'Orange', 'Clementine', 
  'Mandarine', 'Tangerine', 'Papaya', 'Passionfruit', 'Peach', 'Pear', 'Persimmon', 
  'Plantain', 'Plum', 'Pineapple', 'Pomegranate', 'Pomelo', 'Quince', 'Raspberry', 
  'Salmonberry', 'Rambutan', 'Redcurrant', 'Salak', 'Satsuma', 'Soursop', 'Star fruit', 
  'Strawberry', 'Tamarillo', 'Tamarind', 'Yuzu'];

inputElement.addEventListener('input', searchHandler);

function search(str) {
    const results = [];
    const searchTerm = str.toLowerCase();

    for (let i = 0; i < fruit.length; i++) {
        const fruitName = fruit[i].toLowerCase();
        if (fruitName.includes(searchTerm)) {
            results.push(fruit[i]);
        }
    }
    return results;
}

function searchHandler() {
    const userInput = inputElement.value.trim();
    if (userInput === '') {
        suggestionsElement.innerHTML = '';
        suggestionsElement.classList.remove('has-suggestions');
        return;
    }

    const searchResults = search(userInput);
    showSuggestions(searchResults, userInput);
}

function showSuggestions(results, inputVal) {
    suggestionsElement.innerHTML = '';

    if (results.length > 0) {
        results.sort((a, b) => {
            const distanceA = Math.abs(a.toLowerCase().indexOf(inputVal.toLowerCase()));
            const distanceB = Math.abs(b.toLowerCase().indexOf(inputVal.toLowerCase()));
            return distanceA - distanceB;
        });

        const closestMatches = results.slice(0, 4);

        closestMatches.forEach(item => {
            const startPos = item.toLowerCase().indexOf(inputVal.toLowerCase());
            const endPos = startPos + inputVal.length;
            const beforeMatch = item.substring(0, startPos);
            const matched = item.substring(startPos, endPos);
            const afterMatch = item.substring(endPos);
            
            suggestionsElement.innerHTML += `<li>${beforeMatch}<strong>${matched}</strong>${afterMatch}</li>`;
        });

        suggestionsElement.classList.add('has-suggestions');
    } else {
        suggestionsElement.classList.remove('has-suggestions');
    }
}

function useSuggestion(e) {
    inputElement.value = e.target.innerText;
    suggestionsElement.innerHTML = '';
    suggestionsElement.classList.remove('has-suggestions');
}

inputElement.addEventListener('keyup', searchHandler);
suggestionsElement.addEventListener('click', useSuggestion);
