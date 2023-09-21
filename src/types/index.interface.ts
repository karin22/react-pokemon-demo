export interface PokemonItem {
  name: string;
  url: string;
}
export interface Sprites {
  other: {
    home: {
      front_default: string;
    };
    "official-artwork": {
      front_default: string;
    };
  };
}

export interface Ability {
  ability: PokemonItem;
}

export interface DetailsPokemon {
  name: string;
  sprites: Sprites;
  abilities: Ability[];
}

export interface ItemList {
  pokemon: PokemonItem;
}
