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

export interface PokemonRouteParams {
  id: string;
}

interface Props
  extends ReturnType<typeof mapDispatchToProps>,
    ReturnType<typeof mapStateToProps>,
    RouteComponentProps<PokemonRouteParams> {}

export const notFoundMessage = (
  <div className="pokemon-not-found">Pokemon not found ;_;</div>
);

export class Pokemon extends React.Component<Props> {
  componentDidMount() {
    const {
      get,
      match: {
        params: { id },
      },
    } = this.props;
    get(id);
  }
  render() {
    const { pokemon, isLoading, history } = this.props;

    const content = pipe(
      pokemon,
      fromNullable,
      fold(() => notFoundMessage, p => <PokemonDetails pokemon={p} />)
    );
    return isLoading ? null : (
      <div className="pokemon">
        {content}
        <div className="pokemon-list-controls">
          <ButtonsContainer>
            <Button onClick={() => history.push('/pokemon')}>Go back</Button>
          </ButtonsContainer>
        </div>
      </div>
    );
  }
}

export const PokemonWrapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(Pokemon);
