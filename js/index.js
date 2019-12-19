let starship1 = document.getElementById('first-box');
let starship2 = document.getElementById('second-box');
const winnerName = document.getElementById('battle-win-draw');

document.getElementById('close').onclick = () => {
    document.getElementById('result').style.display = 'none'; 
    document.body.style.opacity = 1;
}

starship1.addEventListener('change', showRadioField);
starship2.addEventListener('change', showRadioField);

document.getElementById('battle').addEventListener('submit', formSubmit);

function showRadioField() {
    if (starship2.value != -1 && starship1.value != -1) {
        document.getElementById('select-field').style.display = 'block';
    } else {
        document.getElementById('select-field').style.display = 'none';
    }
}

function clearClassCSS(c1, c2) {
    c1.className = "";
    c2.className = "";
    winnerName.innerText = "";  
}

async function formSubmit(e) {

    e.preventDefault();

    let battleCategory = document.querySelector('input[name=field]:checked');
    let starshipValue1;
    let starshipValue2;

    await fetch(`https://swapi.co/api/starships/${starship1.value}/`)
        .then(function (response) {
            return response.json();
        })
        .then(starships => {
            starshipValue1 = starships[battleCategory.value];
            starshipValue1 = starshipValue1 == 'unknown' ? 0 : parseFloat(starshipValue1);

            document.getElementById('starship-name').innerText = starships.name;
            document.getElementById('cargo').innerText = starships.cargo_capacity;
            document.getElementById('hyperdrive').innerText = starships.hyperdrive_rating;
            document.getElementById('mglt').innerText = starships.MGLT;
            document.getElementById('crew').innerText = starships.crew;
            document.getElementById('passengers').innerText = starships.passengers;
            document.getElementById('starship-image').
                setAttribute('src', `assets/img/starships/${starship1.value}.jpg`);
        });


    await fetch(`https://swapi.co/api/starships/${starship2.value}/`)
        .then(function (response) {
            return response.json();
        })
        .then(starships => {
            starshipValue2 = starships[battleCategory.value];
            starshipValue2 = starshipValue2 == 'unknown' ? 0 : parseFloat(starshipValue2);

            document.getElementById('starship-name2').innerText = starships.name;
            document.getElementById('cargo2').innerText = starships.cargo_capacity;
            document.getElementById('hyperdrive2').innerText = starships.hyperdrive_rating;
            document.getElementById('mglt2').innerText = starships.MGLT;
            document.getElementById('crew2').innerText = starships.crew;
            document.getElementById('passengers2').innerText = starships.passengers;
            document.getElementById('starship-image2').
                setAttribute('src', `assets/img/starships/${starship2.value}.jpg`);


        });

    document.getElementById('result').style.display = 'block';
    document.getElementById('battle-category').textContent =
         battleCategory.nextSibling.textContent.trim();

    let card1 = document.getElementById('starship');
    let card2 = document.getElementById('starship2');
    

    if (starshipValue1 == starshipValue2) {
        clearClassCSS(card1, card2);
        card1.classList.add("draw", "card-all");
        card2.classList.add("draw", "card-all");
        document.getElementById('battle-win-draw').innerText = 'Draw';

    } else if (starshipValue1 > starshipValue2) {
        clearClassCSS(card1, card2);
        card1.classList.add("winnerLeft", "card-all");
        card2.classList.add("loser", "card-all");
        const text = document.createTextNode(
            `${starship1.options[starship1.selectedIndex].text}  Win!`
        );
        winnerName.appendChild(text);
    } else {
        clearClassCSS(card1, card2);
        card1.classList.add("loser", "card-all");
        card2.classList.add("winnerRight", "card-all");

        const text = document.createTextNode(
            `${starship2.options[starship2.selectedIndex].text}  Win!`
        );
        winnerName.appendChild(text);
    }

}