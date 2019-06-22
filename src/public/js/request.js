let url = 'https://swapi.co/api/starships/';
var starships

function getStarWarsStarships(url, starships) {
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

getStarWarsStarships(url, starships = [])
    .then(starships => {

        starships.map((p, i) => {
            let box = document.getElementById('first-box');
            let item = document.createElement('option');
            item.innerHTML = p.name;
            item.value = p.url.replace(/[^0-9]*/, '').replace('/', '');
            box.appendChild(item);
        });

        let box = document.getElementById('first-box');
        for (let i = 0; i < box.length; i++) {
            var cln = box[i].cloneNode(true);
            document.getElementById('second-box').appendChild(cln);
        }
    })
    .catch(console.error);
