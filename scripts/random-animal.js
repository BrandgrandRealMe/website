document.addEventListener('DOMContentLoaded', () => {
    const fetchButtons = document.querySelectorAll('.fetch-button');
    const resultContainer = document.getElementById('animal-result');

    const animalApis = {
        dog: 'https://dog.ceo/api/breeds/image/random',
        cat: 'https://api.thecatapi.com/v1/images/search?limit=1',
        fox: 'https://randomfox.ca/floof/',
        bird: 'https://shibe.online/api/birds?count=1'
    };

    async function fetchAnimal(animalType) {
        resultContainer.innerHTML = ''; // Clear previous content
        try {
            const response = await fetch(animalApis[animalType]);
            if (!response.ok) throw new Error(`Failed to fetch ${animalType} photo`);
            const data = await response.json();

            let imageUrl, animalName;
            switch (animalType) {
                case 'dog':
                    imageUrl = data.message;
                    animalName = 'Dog';
                    break;
                case 'cat':
                    imageUrl = data[0].url;
                    animalName = 'Cat';
                    break;
                case 'fox':
                    imageUrl = data.image;
                    animalName = 'Fox';
                    break;
                case 'bird':
                    imageUrl = data[0];
                    animalName = 'Bird';
                    break;
            }

            // Create animal card
            const card = document.createElement('div');
            card.className = 'animal-card';
            card.innerHTML = `
                <img src="${imageUrl}" alt="${animalName}">
                <h3>${animalName}</h3>
            `;
            resultContainer.appendChild(card);
        } catch (error) {
            console.error(`Error fetching ${animalType}:`, error);
            resultContainer.innerHTML = `<p class="error-message">Failed to fetch ${animalType} photo. Try again!</p>`;
        }
    }

    // Add click listeners to buttons
    fetchButtons.forEach(button => {
        button.addEventListener('click', () => {
            const animalType = button.getAttribute('data-animal');
            fetchAnimal(animalType);
        });
    });

    // Fetch a random animal on page load
    const randomAnimal = Array.from(fetchButtons)[Math.floor(Math.random() * fetchButtons.length)].getAttribute('data-animal');
    fetchAnimal(randomAnimal);
});