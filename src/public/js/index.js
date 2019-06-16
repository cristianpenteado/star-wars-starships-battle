let box1 = document.getElementById('first-box');
let box2 = document.getElementById('second-box');

box1.addEventListener('change', changeValue);
box2.addEventListener('change', changeValue);
document.getElementById('battle').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('You lose!!!')
})

function changeValue() {
    if (box2.value != -1 && box1.value != -1) {


        fetch(`https://swapi.co/api/starships/?search=${box1.value}`)
            .then(function (response) {
                return response.json();
            })
            .then(starships => {
                document.getElementById('select-field').style.display = 'block';
                //Pegando os valores
                // let starship1 = document.createElement('div');
                // starship1.innerHTML = 'Name: ' +  starships.results[0].name + '<br/>';
                // starship1.innerHTML += 'Hyperdrive rating: ' + starships.results[0].hyperdrive_rating + '<br/>';
                // starship1.innerHTML += 'Cargo capacity: ' + starships.results[0].cargo_capacity + '<br/>';
                //document.body.appendChild(starship1);
            })

    }
}