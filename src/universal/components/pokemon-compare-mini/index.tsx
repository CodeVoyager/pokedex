import { fold, fromNullable } from 'fp-ts/lib/Option';
import { pipe } from 'fp-ts/lib/pipeable';
import React from 'react';
import { Link } from 'react-router-dom';
import { Pokemon } from '../../../types/pokeapi';
import { State } from '../../state/store';
import { getImageUrlForId, PokemonTileItem } from '../pokemon-tile';
import './index.css';

export type Props = State['pokemonCompare']['candidates'];

export function getUrlForIds(idA: Pokemon['id'], idB: Pokemon['id']) {
  return `/pokemon/compare/${idA}/${idB}`;
}

export function renderItem(el?: PokemonTileItem) {
  return pipe(
    el,
    fromNullable,
    fold(
      () => null,
      el => (
        <div className="pokemon-compare-mini-image">
          <img src={getImageUrlForId(el.id)} alt="pokemon-image" />
        </div>
      )
    )
  );
}

export function PokemonCompareMini({ a, b }: Props) {
  const url = a && b ? getUrlForIds(a.id, b.id) : null;
  const aElement = renderItem(a);
  const bElement = renderItem(b);

  return (
    <div className="pokemon-compare-mini">
      <div className="pokemon-compare-mini-items">
        {aElement}
        {bElement}
      </div>
      <div className="pokemon-compare-mini-controls">
        {url ? (
          <Link className="pokemon-compare-go-to" to={url} children="Compare" />
        ) : null}
      </div>
    </div>
  );
}
