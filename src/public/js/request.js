let url = 'https://swapi.co/api/starships/';

function getStarWarsStarships(url = 'https://swapi.co/api/starships/', starships = []) {
    return new Promise((resolve, reject) => fetch(url)
        .then(response => {
            if (response.status !== 200) {
                throw `${response.status}: ${response.statusText}`;
            }
            response.json().then(data => {
                starships = starships.concat(data.results);

                if (data.next) {
                    getStarWarsStarships(data.next, starships).then(resolve).catch(reject)
                } else {
                    resolve(starships);
                }
            }).catch(reject);
        }).catch(reject));
}

getStarWarsStarships()
    .then(starships => {

        starships.map(p => {
            let box = document.getElementById('first-box');
            let item = document.createElement('option');
            item.innerHTML = p.name;
            box.appendChild(item);

        });

        let box = document.getElementById('first-box');
        for (let i = 0; i < box.length; i++) {
            var cln = box[i].cloneNode(true);
            document.getElementById('second-box').appendChild(cln);
        }
        console.log(starships[0].max_atmosphering_speed);

    }).then((starships) => {
        let box1 = document.getElementById('first-box');
        let box2 = document.getElementById('second-box');
        //ONCHANGE
    })
    .catch(console.error);

