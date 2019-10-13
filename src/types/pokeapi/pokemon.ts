import { NamedAPIResource, GenerationGameIndex } from '.';

export interface Pokemon {
  abilities?: (AbilitiesEntity)[] | null;
  base_experience: number;
  forms?: (NamedAPIResource)[] | null;
  game_indices?: (GenerationGameIndex)[] | null;
  height: number;
  held_items?: (HeldItemsEntity)[] | null;
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves?: (MovesEntity)[] | null;
  name: string;
  order: number;
  species: NamedAPIResource;
  sprites: Sprites;
  stats?: (StatsEntity)[] | null;
  types?: (TypesEntity)[] | null;
  weight: number;
}
export interface AbilitiesEntity {
  ability: NamedAPIResource;
  is_hidden: boolean;
  slot: number;
}
export interface HeldItemsEntity {
  item: NamedAPIResource;
  version_details?: (VersionDetailsEntity)[] | null;
}
export interface VersionDetailsEntity {
  rarity: number;
  version: NamedAPIResource;
}
export interface MovesEntity {
  move: NamedAPIResource;
  version_group_details?: (VersionGroupDetailsEntity)[] | null;
}
export interface VersionGroupDetailsEntity {
  level_learned_at: number;
  move_learn_method: NamedAPIResource;
  version_group: NamedAPIResource;
}
export interface Sprites {
  back_default?: string;
  back_female?: null;
  back_shiny?: string;
  back_shiny_female?: null;
  front_default?: string;
  front_female?: null;
  front_shiny?: string;
  front_shiny_female?: null;
}
export interface StatsEntity {
  base_stat: number;
  effort: number;
  stat: NamedAPIResource;
}
export interface TypesEntity {
  slot: number;
  type: NamedAPIResource;
}
