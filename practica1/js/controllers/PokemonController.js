import Pokemon from '../models/Pokemon.js';
import PokemonService from '../services/PokemonService.js';

export default class PokemonController {
    constructor() {
        this.pokemonService = new PokemonService();
        this.currentPage = 1;
        this.totalPages = 1;
        
    
        this.pokemonGrid = document.getElementById('pokemon-grid');
        this.pagination = document.getElementById('pagination');
        
        this.initialize();
    }

    async initialize() {
        await this.loadPokemon(1);
        this.setupEventListeners();
    }

    setupEventListeners() {
        this.pagination.addEventListener('click', (e) => {
            if (e.target.classList.contains('page-link')) {
                e.preventDefault();
                const page = e.target.dataset.page;
                if (page) {
                    this.loadPokemon(parseInt(page));
                }
            }
        });
    }

    async loadPokemon(page) {
        try {
            this.pokemonGrid.innerHTML = '<div class="text-center">Loading...</div>';
            
            // obtener datos de pokemon
            const data = await this.pokemonService.getPokemonList(page);
            this.currentPage = page;
            this.totalPages = data.pages;
            
            // obtener detalles para cada pokemon
            const pokemonPromises = data.results.map(pokemon => 
                this.pokemonService.getPokemonDetails(pokemon.url)
            );
            const pokemonDetails = await Promise.all(pokemonPromises);
                       
            this.pokemonGrid.innerHTML = '';
            
            
            pokemonDetails.forEach(details => {
                const pokemon = new Pokemon(details);
                this.pokemonGrid.appendChild(pokemon.renderCard());
            });
            
            this.renderPagination();
        } catch (error) {
            this.pokemonGrid.innerHTML = '<div class="text-center text-danger">NO SE PUEDE CARGAR EL POKÉMON</div>';
        }
    }

    renderPagination() {
        const pages = this.getPaginationRange();
        
        this.pagination.innerHTML = `
            <li class="page-item ${this.currentPage === 1 ? 'disabled' : ''}">
                <a class="page-link" href="#" data-page="${this.currentPage - 1}">Previous</a>
            </li>
            ${pages.map(page => `
                <li class="page-item ${page === this.currentPage ? 'active' : ''}">
                    <a class="page-link" href="#" data-page="${page}">${page}</a>
                </li>
            `).join('')}
            <li class="page-item ${this.currentPage === this.totalPages ? 'disabled' : ''}">
                <a class="page-link" href="#" data-page="${this.currentPage + 1}">Next</a>
            </li>
        `;
    }

    getPaginationRange() {
        const range = [];
        const maxVisiblePages = 5;
        let start = Math.max(1, this.currentPage - 2);
        let end = Math.min(this.totalPages, start + maxVisiblePages - 1);
        
        if (end - start + 1 < maxVisiblePages) {
            start = Math.max(1, end - maxVisiblePages + 1);
        }
        
        for (let i = start; i <= end; i++) {
            range.push(i);
        }
        
        return range;
    }
// obtener color de tipo de pokemon para que se vea bonito
    getTypeColor(type) {
        const typeColors = {
            normal: 'secondary',
            fire: 'danger',
            water: 'primary',
            electric: 'warning',
            grass: 'success',
            ice: 'info',
            fighting: 'danger',
            poison: 'purple',
            ground: 'warning',
            flying: 'info',
            psychic: 'pink',
            bug: 'success',
            rock: 'secondary',
            ghost: 'purple',
            dragon: 'danger',
            dark: 'dark',
            steel: 'secondary',
            fairy: 'pink'
        };
        return typeColors[type] || 'secondary';
    }
} 