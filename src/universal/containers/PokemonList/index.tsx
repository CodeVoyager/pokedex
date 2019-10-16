import { fold, fromNullable } from 'fp-ts/lib/Option';
import { pipe } from 'fp-ts/lib/pipeable';
import React from 'react';
import { connect } from 'react-redux';
import { Button } from '../../components/button';
import { ButtonsContainer } from '../../components/buttons-container';
import { Loader } from '../../components/loader';
import { PokemonTilesContainer } from '../../components/pokemon-tiles-container';
import { ITEMS_PER_PAGE } from '../../service/pokeapi';
import { mapDispatchToProps, mapStateToProps } from './connect';
import './index.css';
import { PokemonCompareMini } from '../../components/pokemon-compare-mini';

interface Props
  extends ReturnType<typeof mapDispatchToProps>,
    ReturnType<typeof mapStateToProps> {}

export class PokemonList extends React.Component<Props> {
  componentDidMount() {
    const { pokemonList, getPage, page } = this.props;
    if (!pokemonList) {
      getPage(page)();
    }
  }
  render() {
    const {
      pokemonList,
      getPage,
      page,
      isLoading,
      pushToCompare,
      compareCandidates,
    } = this.props;
    const pokemons = pipe(
      pokemonList,
      fromNullable,
      fold(
        () => null,
        ps => {
          const pokemons = ps.map(({ name, url }) => {
            const id = pipe(
              url.split('/'),
              ns => fromNullable<string>(ns[ns.length - 2]),
              fold(() => '-1', n => n)
            );

            return { name, id };
          });

          return (
            <PokemonTilesContainer
              onCompareClick={pushToCompare}
              pokemons={pokemons}
            />
          );
        }
      )
    );

    return (
      <div className="pokemon-list">
        {isLoading ? null : (
          <>
            {pokemons}
            <div className="pokemon-list-controls">
              <ButtonsContainer>
                <>
                  {pokemonList && page > 0 ? (
                    <Button onClick={getPage(page - 1)}>Previous page</Button>
                  ) : null}
                  {pokemonList && pokemonList.length === ITEMS_PER_PAGE ? (
                    <Button onClick={getPage(page + 1)}>Next page</Button>
                  ) : null}
                </>
              </ButtonsContainer>
            </div>
            <div className="pokemon-list-compare">
              <PokemonCompareMini {...compareCandidates} />
            </div>
          </>
        )}
      </div>
    );
  }
}

export const WrappedPokemonList = connect(
  mapStateToProps,
  mapDispatchToProps
)(PokemonList);
