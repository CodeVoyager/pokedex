import React from 'react';
import './index.css';
import { Pokemon } from '../../../types/pokeapi';
import { pipe } from 'fp-ts/lib/pipeable';
import { fromNullable, fold } from 'fp-ts/lib/Option';

export interface Props {
  pokemon: Pokemon;
  k?: any;
}

export function PokemonDetails({ pokemon, k }: Props) {
  return (
    <div className="pokemon-details" key={k}>
      <div className="pokemon-details-left">
        {Object.entries(pokemon.sprites)
          .filter(([_, v]) => v)
          .sort(([ka, _], [kb, __]) => {
            if (0 === ka.indexOf('front')) {
              if (0 === kb.indexOf('front')) {
                return 0;
              }

              return -1;
            }

            return 1;
          })
          .map(([k, v]) => (
            <div className="pokemon-details-image" key={k}>
              <img
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
