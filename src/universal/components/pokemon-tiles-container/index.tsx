import React from 'react';
import { PokemonTile, TilePokemon } from '../pokemon-tile';

import './index.css';

export interface Props {
  pokemons: TilePokemon[];
}

export function PokemonTilesContainer({ pokemons }: Props) {
  return (
    <div className="pokemon-tile-container">
      {pokemons.map(p => (
        <PokemonTile key={p.name} pokemon={p} />
      ))}
    </div>
  );
}
