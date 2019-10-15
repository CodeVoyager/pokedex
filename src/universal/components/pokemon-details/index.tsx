import React from 'react';
import './index.css';
import { Pokemon } from '../../../types/pokeapi';
import { pipe } from 'fp-ts/lib/pipeable';
import { fromNullable, fold } from 'fp-ts/lib/Option';

export interface Props {
  pokemon: Pokemon;
}

export function PokemonDetails({ pokemon }: Props) {
  return (
    <div className="pokemon-details">
      <div className="pokemon-details-left">
        {Object.entries(pokemon.sprites)
          .filter(([_, v]) => v)
          .map(([k, v]) => (
            <div className="pokemon-details-image">
              <img
                key={k}
                alt={k.replace(/_/g, ' ')}
                title={k.replace(/_/g, ' ')}
                src={v}
              />
            </div>
          ))}
      </div>
      <div className="pokemon-details-right">
        <div className="pokemon-details-stats">
          <div className="pokemon-details-stats-name">Name:</div>
          <div className="pokemon-details-stats-value">{pokemon.name}</div>
        </div>
        <div className="pokemon-details-stats">
          <div className="pokemon-details-stats-name">Height:</div>
          <div className="pokemon-details-stats-value"> {pokemon.height}</div>
        </div>
        <div className="pokemon-details-stats">
          <div className="pokemon-details-stats-name">Weight:</div>
          <div className="pokemon-details-stats-value">{pokemon.weight}</div>
        </div>
        <div className="pokemon-details-stats">
          <div className="pokemon-details-stats-name">Weight:</div>
          <div className="pokemon-details-stats-value">{pokemon.weight}</div>
        </div>
        <div className="pokemon-details-stats">
          <div className="pokemon-details-stats-name">Types:</div>
          <div className="pokemon-details-stats-value">
            {pipe(
              pokemon.types,
              fromNullable,
              fold(
                () => '',
                ts => ts.map(t => t.type.name.replace('-', ' ')).join(', ')
              )
            )}
          </div>
        </div>
        <div className="pokemon-details-stats">
          <div className="pokemon-details-stats-name">Abilities:</div>
          <div className="pokemon-details-stats-value">
            {pipe(
              pokemon.abilities,
              fromNullable,
              fold(
                () => '',
                as => as.map(a => a.ability.name.replace('-', ' ')).join(', ')
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
