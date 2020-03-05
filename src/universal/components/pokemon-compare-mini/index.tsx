import { fold, fromNullable } from 'fp-ts/lib/Option';
import { pipe } from 'fp-ts/lib/pipeable';
import React from 'react';
import { Link } from 'react-router-dom';
import { getImageUrlForId, PokemonTileItem } from '../pokemon-tile';
import './index.css';

export interface Props {
  a?: PokemonTileItem;
  b?: PokemonTileItem;
}

export function getUrlForIds(idA: string, idB: string) {
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
