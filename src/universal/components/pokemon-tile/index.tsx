import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

export interface TilePokemon {
  name: string;
  id: string;
}

export interface Props {
  pokemon: TilePokemon;
}

function getImageUrlFormId(id: string) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
}

function getUrlForId(id: string) {
  return `/pokemon/${id}`;
}

export function PokemonTile({ pokemon: { id, name } }: Props) {
  return (
    <Link className="pokemon-tile" to={getUrlForId(id)}>
      <div className="pokemon-tile-image">
        <img src={getImageUrlFormId(id)} alt="pokemon-image" />
      </div>
      <div className="pokemon-tile-name">{name}</div>
    </Link>
  );
}
