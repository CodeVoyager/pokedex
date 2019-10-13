import { NamedAPIResource, NamesEntity, GenerationGameIndex } from '.';

export interface PokemonType {
  damage_relations: DamageRelations;
  game_indices?: (GenerationGameIndex)[] | null;
  generation: NamedAPIResource;
  id: number;
  move_damage_class: NamedAPIResource;
  moves?: (NamedAPIResource)[] | null;
  name: string;
  names?: (NamesEntity)[] | null;
  pokemon?: (PokemonEntity)[] | null;
}
export interface DamageRelations {
  double_damage_from?: (NamedAPIResource)[] | null;
  double_damage_to?: (NamedAPIResource)[] | null;
  half_damage_from?: (NamedAPIResource)[] | null;
  half_damage_to?: (NamedAPIResource)[] | null;
  no_damage_from?: (NamedAPIResource)[] | null;
  no_damage_to?: (null)[] | null;
}

export interface PokemonEntity {
  pokemon: NamedAPIResource;
  slot: number;
}
