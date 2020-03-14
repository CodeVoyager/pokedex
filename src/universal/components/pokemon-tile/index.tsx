import React, { SyntheticEvent } from 'react';
import { Link } from 'react-router-dom';
import { Pokemon } from '../../../types/pokeapi';
import { Button } from '../button';
import './index.css';

export type PokemonTileItem = Pick<Pokemon, 'id' | 'name'>;

export interface Props {
  pokemon: PokemonTileItem;
  onCompareClick: () => void;
}

/**
 * It just works :)
 */
export function getImageUrlForId(id: Pokemon['id']) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
}

export function getUrlForId(id: Pokemon['id']) {
  return `/pokemon/${id}`;
}

export function PokemonTile({ pokemon: { id, name }, onCompareClick }: Props) {
  return (
    <Link className="pokemon-tile" to={getUrlForId(id)}>
      <div className="pokemon-tile-image">
        <img src={getImageUrlForId(id)} alt="pokemon-image" />
      </div>
      <div className="pokemon-tile-name">{name}</div>
      <div className="pokemon-tile-controls">
        <Button
          onClick={(e: SyntheticEvent) => {
            e.preventDefault();
            e.stopPropagation();
            onCompareClick();
          }}
          mini
        >
          Add to compare
        </Button>
      </div>
    </Link>
  );
}
