export default class PokemonService {
    constructor() {
        this.baseUrl = 'https://pokeapi.co/api/v2/pokemon';
        this.pokemonPerPage = 12;
    }

    async getPokemonList(page = 1) {
        const offset = (page - 1) * this.pokemonPerPage;
        try {
            const response = await fetch(
                `${this.baseUrl}?limit=${this.pokemonPerPage}&offset=${offset}`
            );
            const data = await response.json();
            return {
                results: data.results,
                total: data.count,
                pages: Math.ceil(data.count / this.pokemonPerPage)
            };
        } catch (error) {
            console.error('Error fetching pokemon list:', error);
            throw error;
        }
    }

    async getPokemonDetails(url) {
        try {
            const response = await fetch(url);
            return await response.json();
        } catch (error) {
            console.error('Error fetching pokemon details:', error);
            throw error;
        }
    }
} 