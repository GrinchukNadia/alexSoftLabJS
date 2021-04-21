const alphabet = "abcdefghijklmnopqrstuvwxyz"
const arr = []
const elementSelect = document.getElementById('random_letters')
const divWithResult = document.querySelector('.list_name')

//Generate an array of random unique letters with a length equal to 5
for(let i = 0; i<5; i++) {
    let randomLetter = alphabet[Math.floor(Math.random() * alphabet.length)];
    
    if(!arr.includes(randomLetter)) {
        arr.push(randomLetter)
    } else {
        i--
    }
}

//Inserts <option> elements with the value of random letters from the array
for(let one of arr) {
    elementSelect.innerHTML += `
        <option value="letter ${one.toUpperCase()}">${one.toUpperCase()}</option>
    `
}

//Generating result of matches from JSON object
fetch("../js/list.json")
.then(res => res.json())
.then(data => {
    elementSelect.addEventListener('change', () => {
        let valueElementSelect = elementSelect.options[elementSelect.selectedIndex].text;
        divWithResult.innerHTML = '';

        for(let dataItem of data) {
            let nameItem = dataItem.name;
            if(valueElementSelect === dataItem.name.slice(0, 1)) {
                divWithResult.innerHTML += `<div class="name_item">${nameItem}</div>`
            }
        }
        if(divWithResult.innerHTML == "") {
            divWithResult.innerHTML = `No matches on letter ${valueElementSelect}`
        }
    })
}).catch(() => {
    divWithResult.innerHTML = `
        <div>Oops!...</div>
        <div>Something went wrong (⌣_⌣")</div>
    `;
  });