import { fold } from 'fp-ts/lib/Either';
import { pipe } from 'fp-ts/lib/pipeable';
import { Action, Dispatch } from 'redux';
import { PokemonResponse } from '../../../types/pokeapi';
import { PokemonService } from '../../service/pokeapi';
import {
  setErrorAction,
  setPokemonListAction,
  setPokemonListPageAction,
  startLoadingAction,
  stopLoadingAction,
} from '../../state/actions';
import { pokemonList, pokemonListPage } from '../../state/selectors';
import { isLoading } from '../../state/selectors/loader';
import { IState } from '../../state/store';

export function mapStateToProps(state: IState) {
  return {
    page: pokemonListPage(state),
    pokemonList: pokemonList(state),
    isLoading: isLoading(state),
  };
}

export function mapDispatchToProps(dispatch: Dispatch) {
  return {
    getPage: (page: number) => () => {
      dispatch(startLoadingAction());

      return PokemonService.list(page)().then(ps => {
        pipe(
          ps,
          fold<Error, PokemonResponse, Action>(
            e => {
              return setErrorAction(e);
            },
            ps => {
              return setPokemonListAction(ps.results);
            }
          ),
          action => {
            dispatch(action);
            dispatch(setPokemonListPageAction(page));
            dispatch(stopLoadingAction());
          }
        );
      });
    },
  };
}
