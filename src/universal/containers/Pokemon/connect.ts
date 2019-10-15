import { fold } from 'fp-ts/lib/Either';
import { pipe } from 'fp-ts/lib/pipeable';
import { Action, Dispatch } from 'redux';
import { Pokemon } from '../../../types/pokeapi';
import { PokemonService } from '../../service/pokeapi';
import { setErrorAction, setPokemonAction, startLoadingAction, stopLoadingAction } from '../../state/actions';
import { pokemon } from '../../state/selectors';
import { isLoading } from '../../state/selectors/loader';
import { IState } from '../../state/store';

export function mapStateToProps(state: IState) {
  return {
    pokemon: pokemon(state),
    isLoading: isLoading(state),
  };
}

export function mapDispatchToProps(dispatch: Dispatch) {
  return {
    get: (id: string) => {
      dispatch(startLoadingAction());

      return PokemonService.get(id)().then(p => {
        pipe(
          p,
          fold<Error, Pokemon, Action>(
            e => {
              return setErrorAction(e);
            },
            p => {
              return setPokemonAction(p);
            }
          ),
          action => {
            dispatch(action);
            dispatch(stopLoadingAction());
          }
        );
      });
    },
  };
}
