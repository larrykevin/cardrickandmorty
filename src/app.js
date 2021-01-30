document.addEventListener('DOMContentLoaded', () => {
    const random = getRandomInt(1,672);
    fetchData(random);
});

const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
};

const fetchData = async (id) => {
    try {
        const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
        const data = await res.json();
        console.log(data)
        const character = {
            image: data.image,
            name: data.name,
            status: data.status,
            species: data.species,
            location: data.location.name,
            origin: data.origin.name
        }
        printCard(character)
    } catch (error) {
        console.error(error)
    };
};

const printCard = (character) => {
    const flex = document.querySelector('.container')
    const template = document.querySelector('#template-card').content
    const clone = template.cloneNode(true)
    const fragment = document.createDocumentFragment()

    clone.querySelector('.card__image img').setAttribute('src', character.image);
    clone.querySelector('.card__data--name').innerHTML = `${character.name}`;
    clone.querySelectorAll('.card__data--status span')[0].textContent = character.status;
    clone.querySelectorAll('.card__data--status span')[1].textContent = ' · ' + character.species;
    clone.querySelector('.card__data--location').innerHTML = `${character.location}`;
    clone.querySelector('.card__data--origin').innerHTML = `${character.origin}`;

    fragment.appendChild(clone);
    flex.appendChild(fragment);
}