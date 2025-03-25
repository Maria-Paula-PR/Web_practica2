export default class Pokemon {
    constructor({ id, name, types, sprites }) {
        this.id = id;
        this.name = name;
        this.types = types.map(typeinfo => typeinfo.type.name);
        this.image = sprites.front_default;
    }

    renderCard() {
        const card = document.createElement("div");
        card.classList.add("col-md-3", "mb-4"); // Changed to col-md-3 for 4 cards per row

        card.innerHTML = `
            <div class="card h-100">
                <img src="${this.image}"
                    class="card-img-top" alt="${this.name}">
                <div class="card-body">
                    <h5 class="card-title text-capitalize">${this.name}</h5>
                    <p class="card-text">ID: ${this.id}</p>
                    <p class="card-text">
                        ${this.types.map(type => `
                            <span class="badge bg-${this.getTypeColor(type)}">${type}</span>
                        `).join(' ')}
                    </p>
                </div>
            </div>
        `;
        return card;
    }

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