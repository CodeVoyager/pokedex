import React from 'react';
import { ITEMS_PER_PAGE } from '../../service/pokeapi';
import { mapDispatchToProps, mapStateToProps } from './connect';
import { connect } from 'react-redux';
import { Loader } from '../../components/loader';

interface IProps
  extends ReturnType<typeof mapDispatchToProps>,
    ReturnType<typeof mapStateToProps> {}

export function PokemonList({ pokemonList, getPage, page, isLoading }: IProps) {
  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="pokemon-list">
      {pokemonList
        ? pokemonList.map(p => {
            return <div key={p.name}>{p.name}</div>;
          })
        : null}
      <div className="pokemon-list-controls">
        {pokemonList && page > 0 ? (
          <button className="button" onClick={getPage(page - 1)}>
            Previous page
          </button>
        ) : null}
        {pokemonList && pokemonList.length === ITEMS_PER_PAGE ? (
          <button className="button" onClick={getPage(page + 1)}>
            Next page
          </button>
        ) : null}
      </div>
    </div>
  );
}

export const WrappedPokemonList = connect(
  mapStateToProps,
  mapDispatchToProps
)(PokemonList);
