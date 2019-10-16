import React from 'react';
import { PokemonTile, PokemonTileItem } from '../pokemon-tile';

import './index.css';

export interface Props {
  pokemons: PokemonTileItem[];
  onCompareClick: (p: PokemonTileItem) => () => void;
}

export function PokemonTilesContainer({ pokemons, onCompareClick }: Props) {
  return (
    <div className="pokemon-tile-container">
      {pokemons.map(p => (
        <PokemonTile
          onCompareClick={onCompareClick(p)}
          key={p.name}
          pokemon={p}
        />
      ))}
    </div>
  );
}
