import React, { SyntheticEvent } from 'react';
import { Link } from 'react-router-dom';
import './index.css';
import { Button } from '../button';

export interface PokemonTileItem {
  name: string;
  id: string;
}

export interface Props {
  pokemon: PokemonTileItem;
  onCompareClick: () => void;
}

/**
 * It just works :)
 */
export function getImageUrlForId(id: string) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
}

export function getUrlForId(id: string) {
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
