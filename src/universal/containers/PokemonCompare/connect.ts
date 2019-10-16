import { fold } from 'fp-ts/lib/Either';
import { pipe } from 'fp-ts/lib/pipeable';
import { Action, Dispatch } from 'redux';
import { Pokemon } from '../../../types/pokeapi';
import { PokemonService } from '../../service/pokeapi';
import {
  setErrorAction,
  startLoadingAction,
  stopLoadingAction,
} from '../../state/actions';
import { setPokemonCompareCurrentAction } from '../../state/actions/pokemon-compare';
import { compareCurrent, compareCandidates } from '../../state/selectors';
import { isLoading } from '../../state/selectors/loader';
import { State } from '../../state/store';

export function mapStateToProps(state: State) {
  return {
    compared: compareCurrent(state),
    candidates: compareCandidates(state),
    isLoading: isLoading(state),
  };
}

export function mapDispatchToProps(dispatch: Dispatch) {
  return {
    get: (field: 'a' | 'b', id: string) => {
      dispatch(startLoadingAction());

      return PokemonService.get(id)().then(p => {
        pipe(
          p,
          fold<Error, Pokemon, Action>(
            e => {
              return setErrorAction(e);
            },
            p => {
              return setPokemonCompareCurrentAction({
                field,
                item: p,
              });
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
