export interface NamedAPIResource {
  name: string;
  url: string;
}

export interface GenerationGameIndex {
  game_index: number;
  generation: NamedAPIResource;
}

export interface NamesEntity {
  language: NamedAPIResource;
  name: string;
}

export interface PokemonResponse {
  count: number;
  next: string;
  previous?: null;
  results?: NamedAPIResource[] | null;
}

export * from './pokemon';
export * from './pokemon-color';
export * from './pokemon-type';
