import { NamedAPIResource } from '.';

export interface PokemonColor {
  id: number;
  name: string;
  names?: (NamesEntity)[] | null;
  pokemon_species?: (NamedAPIResource)[] | null;
}
export interface NamesEntity {
  language: NamedAPIResource;
  name: string;
}
