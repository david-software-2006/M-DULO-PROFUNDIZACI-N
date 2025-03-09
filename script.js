async function fetchPokemonList() {
    const pokemonList = document.getElementById("pokemonList");

    const typeColors = {
        normal: "#A8A77A", fire: "#FF5733", water: "#3399FF", electric: "#FFD700",
        grass: "#4CAF50", ice: "#00CCCC", fighting: "#C22E28", poison: "#9C27B0",
        ground: "#E67E22", flying: "#81D4FA", psychic: "#E91E63", bug: "#8BC34A",
        rock: "#795548", ghost: "#673AB7", dragon: "#3F51B5", dark: "#212121",
        steel: "#BDBDBD", fairy: "#FF69B4"
    };

    for (let i = 1; i <= 100; i++) {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
            const pokemon = await response.json();
            const primaryType = pokemon.types[0].type.name;
            const bgColor = typeColors[primaryType] || "#444";

            const card = document.createElement("div");
            card.className = `
                group relative p-6 rounded-xl backdrop-blur-xl 
                bg-white/10 border-[1px] border-white/20 transition-all duration-500 
                transform hover:scale-[0.9] hover:-translate-y-2
            `;
            card.style.borderRadius = "30px 70px 30px 70px";
            card.style.backgroundColor = `${bgColor}40`;
            card.setAttribute("data-name", pokemon.name);
            card.setAttribute("onclick", `showEvolution('${pokemon.name}')`);

            const types = pokemon.types.map(
                (t) => `<span class="bg-white/20 text-white px-2 py-1 rounded-md">${t.type.name.toUpperCase()}</span>`
            ).join(" ");

            const image = pokemon.sprites.other["official-artwork"].front_default;

            card.innerHTML = `
                <div class="relative flex flex-col items-center">
                    <img src="${image}" 
                        alt="${pokemon.name}" 
                        class="w-32 -mt-10 transition-all duration-500 transform 
                               group-hover:scale-[1.2] group-hover:-translate-y-10
                               group-hover:drop-shadow-[0_35px_45px_${bgColor}]" />
                    <h2 class="text-xl font-bold text-white mt-2">${pokemon.name.toUpperCase()}</h2>
                    <p class="text-white/80">Peso: ${pokemon.weight}</p>
                    <p class="text-white/80">Altura: ${pokemon.height}</p>
                    <p class="text-white/80">Ataque: ${pokemon.stats[1].base_stat}</p>
                    <p class="text-white/80">Defensa: ${pokemon.stats[2].base_stat}</p>
                    <div class="mt-2 flex gap-2">${types}</div>
                </div>
            `;

            pokemonList.appendChild(card);
        } catch (error) {
            console.error("Error al obtener Pokémon: " + error);
        }
    }
}

function filterPokemon() {
    const searchInput = document.getElementById("searchInput").value.toLowerCase();
    const cards = document.querySelectorAll("#pokemonList > div");

    cards.forEach((card) => {
        const name = card.getAttribute("data-name");
        if (name.includes(searchInput)) {
            card.classList.remove("hidden");
        } else {
            card.classList.add("hidden");
        }
    });
}

fetchPokemonList();
