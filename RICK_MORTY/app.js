document.addEventListener("DOMContentLoaded", () => {
    const cardContainer = document.getElementById("card-container");
    const likedList = document.getElementById("liked-list");
    const dislikedList = document.getElementById("disliked-list");
    const fightButton = document.getElementById("fight");

    let characters = [];
    let currentIndex = 0;
    let likedCharacters = [];
    let dislikedCharacters = [];

    fetch("https://rickandmortyapi.com/api/character")
        .then(response => response.json())
        .then(data => {
            characters = data.results;
            displayCharacter();
        });

    function displayCharacter() {
        if (currentIndex >= characters.length) {
            cardContainer.innerHTML = "<p class='no-more'>No more characters!</p>";
            return;
        }

        const character = characters[currentIndex];
        cardContainer.innerHTML = `
            <div class="character-card" id="character-card">
                <img src="${character.image}" alt="${character.name}">
                <h2>${character.name}</h2>
                <p>${character.species} - ${character.status}</p>
            </div>
        `;

        const characterCard = document.getElementById("character-card");
        setupDrag(characterCard);
    }

    function setupDrag(card) {
        let startX = 0;
        let offsetX = 0;

        card.addEventListener("mousedown", (event) => {
            startX = event.clientX;
            card.style.transition = "none";

            document.addEventListener("mousemove", onDrag);
            document.addEventListener("mouseup", onDrop);
        });

        function onDrag(event) {
            offsetX = event.clientX - startX;
            card.style.transform = `translateX(${offsetX}px) rotate(${offsetX * 0.05}deg)`;
        }

        function onDrop() {
            if (offsetX > 100) {
                handleDrop("like");
            } else if (offsetX < -100) {
                handleDrop("dislike");
            } else {
                card.style.transition = "transform 0.3s ease-out";
                card.style.transform = "translateX(0) rotate(0)";
            }

            document.removeEventListener("mousemove", onDrag);
            document.removeEventListener("mouseup", onDrop);
        }
    }

    function handleDrop(action) {
        const character = characters[currentIndex];

        if (action === "like") {
            likedCharacters.push(character);
            updateList(likedList, likedCharacters);
        } else {
            dislikedCharacters.push(character);
            updateList(dislikedList, dislikedCharacters);
        }

        currentIndex++;
        displayCharacter();
    }

    function updateList(listElement, characterArray) {
        listElement.innerHTML = characterArray.map(c => `
            <li><img src="${c.image}" alt="${c.name}" class="profile-img"> ${c.name}</li>
        `).join("");
    }

    // -------- FUNCIONALIDAD DE BATALLA MEJORADA --------
    fightButton.addEventListener("click", startBattle);

    function startBattle() {
        if (likedCharacters.length === 0 || dislikedCharacters.length === 0) {
            alert("Debe haber al menos un personaje en cada lista para iniciar la batalla.");
            return;
        }

        // Seleccionar un luchador de cada lista al azar
        const fighter1 = { ...likedCharacters[Math.floor(Math.random() * likedCharacters.length)], hp: 100 };
        const fighter2 = { ...dislikedCharacters[Math.floor(Math.random() * dislikedCharacters.length)], hp: 100 };

        // Mostrar batalla en pantalla
        cardContainer.innerHTML = `
            <div class="battle">
                <div class="fighter" id="fighter1">
                    <img src="${fighter1.image}" alt="${fighter1.name}">
                    <h3>${fighter1.name}</h3>
                    <div class="health-bar"><div id="health1" class="health"></div></div>
                </div>
                <div class="versus">VS</div>
                <div class="fighter" id="fighter2">
                    <img src="${fighter2.image}" alt="${fighter2.name}">
                    <h3>${fighter2.name}</h3>
                    <div class="health-bar"><div id="health2" class="health"></div></div>
                </div>
            </div>
        `;

        let turn = 1;
        function fightTurn() {
            if (fighter1.hp <= 0 || fighter2.hp <= 0) {
                declareWinner();
                return;
            }

            let damage = Math.floor(Math.random() * 20) + 10; // Daño entre 10 y 30
            if (turn === 1) {
                // Peleador 1 ataca (se mueve hacia la derecha)
                document.getElementById("fighter1").classList.add("attack-left");
                setTimeout(() => {
                    fighter2.hp -= damage;
                    document.getElementById("fighter1").classList.remove("attack-left");
                    document.getElementById("fighter2").classList.add("battle-impact");
                    document.getElementById("health2").style.width = `${fighter2.hp}%`;
                }, 500);
                turn = 2;
            } else {
                // Peleador 2 ataca (se mueve hacia la izquierda)
                document.getElementById("fighter2").classList.add("attack-right");
                setTimeout(() => {
                    fighter1.hp -= damage;
                    document.getElementById("fighter2").classList.remove("attack-right");
                    document.getElementById("fighter1").classList.add("battle-impact");
                    document.getElementById("health1").style.width = `${fighter1.hp}%`;
                }, 500);
                turn = 1;
            }

            setTimeout(() => {
                document.getElementById("fighter1").classList.remove("battle-impact");
                document.getElementById("fighter2").classList.remove("battle-impact");
                fightTurn();
            }, 1000);
        }

        function declareWinner() {
            let winner = fighter1.hp > 0 ? fighter1 : fighter2;
            let winnerElement = fighter1.hp > 0 ? "fighter1" : "fighter2";
            document.getElementById(winnerElement).classList.add("winner");
            setTimeout(() => {
                alert(`${winner.name} ha ganado la batalla!`);
            }, 1000);
        }

        fightTurn();
    }
});
