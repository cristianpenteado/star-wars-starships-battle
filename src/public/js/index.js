let box1 = document.getElementById('first-box');
let box2 = document.getElementById('second-box');

box1.addEventListener('change', showRadioField);
box2.addEventListener('change', showRadioField);

document.getElementById('battle').addEventListener('submit', async (e) => {
    e.preventDefault();
    const radio = document.querySelector('input[name=field]:checked');
    let value1;
    let value2;
    await fetch(`https://swapi.co/api/starships/?search=${box1.value}`)
        .then(function (response) {
            return response.json();
        })
        .then(starships => {
            value1 = starships.results[0][radio.value];
            value1 = value1 == 'unknown' ? 0 : value1;

            document.getElementById('starship-name').innerText = starships.results[0].name;
            document.getElementById('cargo').innerText = starships.results[0].cargo_capacity;
            document.getElementById('hyperdrive').innerText = starships.results[0].hyperdrive_rating;
            document.getElementById('mglt').innerText = starships.results[0].MGLT;
            document.getElementById('crew').innerText = starships.results[0].crew;
            document.getElementById('passengers').innerText = starships.results[0].passengers;

            //Pegar imagem a partir do código da url
            let number = starships.results[0].url;
            number = number.replace(/[^0-9]*/, '').replace('/', '');
            document.getElementById('starship-image').setAttribute('src', (`assets/img/starships/${number}.jpg` || "assets/img/big-placeholder.jpg"));
        });


    await fetch(`https://swapi.co/api/starships/?search=${box2.value}`)
        .then(function (response) {
            return response.json();
        })
        .then(starships => {
            value2 = starships.results[0][radio.value];
            value2 = value2 == 'unknown' ? 0 : value2;
            document.getElementById('starship-name2').innerText = starships.results[0].name;
            document.getElementById('cargo2').innerText = starships.results[0].cargo_capacity;
            document.getElementById('hyperdrive2').innerText = starships.results[0].hyperdrive_rating;
            document.getElementById('mglt2').innerText = starships.results[0].MGLT;
            document.getElementById('crew2').innerText = starships.results[0].crew;
            document.getElementById('passengers2').innerText = starships.results[0].passengers;

            //Pegar imagem a partir do código da url
            let number = starships.results[0].url;
            number = number.replace(/[^0-9]*/, '').replace('/', '');
            document.getElementById('starship-image2').setAttribute('src', `assets/img/starships/${number}.jpg`);


        });
    document.getElementById('result').style.display = await 'block';
    document.getElementById('battle-category').textContent = await radio.value;

    if (value1 = value2) {
        await document.getElementById('starship').setAttribute('style', 'border: 5px solid yellow;');
        await document.getElementById('starship2').setAttribute('style', 'border: 5px solid yellow;');
    }else if (value1 > value2) {
        await document.getElementById('starship').setAttribute('style', 'border: 5px solid green;');
        await document.getElementById('starship2').setAttribute('style', 'border: 5px solid red;');
    } else {
        await document.getElementById('starship').setAttribute('style', 'border: 5px solid red;');
        await document.getElementById('starship2').setAttribute('style', 'border: 5px solid green;');
    }

});

function showRadioField() {
    if (box2.value != -1 && box1.value != -1) {
        document.getElementById('select-field').style.display = 'block';
    } else {
        document.getElementById('select-field').style.display = 'none';
    }
}