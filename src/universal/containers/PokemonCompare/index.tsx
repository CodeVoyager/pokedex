import { fold, fromNullable } from 'fp-ts/lib/Option';
import { pipe } from 'fp-ts/lib/pipeable';
import React from 'React';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Button } from '../../components/button';
import { ButtonsContainer } from '../../components/buttons-container';
import { Loader } from '../../components/loader';
import { PokemonDetails } from '../../components/pokemon-details';
import { mapDispatchToProps, mapStateToProps } from './connect';
import { Pokemon } from '../../../types/pokeapi';

import './index.css';

interface Props
  extends ReturnType<typeof mapDispatchToProps>,
    ReturnType<typeof mapStateToProps>,
    RouteComponentProps {}

export const notFoundMessage = (
  <div className="pokemon-not-found">Pokemon not found ;_;</div>
);

export function renderItem(el?: Pokemon) {
  return pipe(
    el,
    fromNullable,
    fold(
      () => notFoundMessage,
      p => <PokemonDetails key={p.id} k={p.id} pokemon={p} />
    )
  );
}

export class PokemonCompare extends React.Component<Props> {
  componentDidMount() {
    const { get, candidates, compared } = this.props;

    if (
      !compared.a ||
      (compared.a && compared.a!.id.toString() !== candidates.a!.id)
    ) {
      get('a', candidates.a!.id);
    }
    if (
      !compared.b ||
      (compared.b && compared.b!.id.toString() !== candidates.b!.id)
    ) {
      get('b', candidates.b!.id);
    }
  }
  render() {
    const { isLoading, history, compared } = this.props;
    const aElement = renderItem(compared.a);
    const bElement = renderItem(compared.b);

    return isLoading ? null : (
      <div className="pokemon-compare">
        <div className="pokemon-compare-items">
          {aElement}
          {bElement}
        </div>
        <div className="pokemon-compare-controls">
          <ButtonsContainer>
            <Button onClick={() => history.push('/pokemon')}>Go back</Button>
          </ButtonsContainer>
        </div>
      </div>
    );
  }
}

export const PokemonCompareWrapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(PokemonCompare);
