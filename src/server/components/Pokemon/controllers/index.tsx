import { Request, Response } from 'express';
import React from 'react';
import { Dispatch } from 'redux';
import { Action } from 'redux-actions';
import { App } from '../../../../universal/containers/App';
import { getActionDispatcher as pokemonDetailsActionDispatcher } from '../../../../universal/pages/Pokemon';
import { getActionDispatcher as pokemonCompareActionDispatcher } from '../../../../universal/pages/PokemonCompare';
import { getActionDispatcher as pokemonListActionDispatcher } from '../../../../universal/pages/PokemonList';
import { AllActions } from '../../../../universal/state/actions';
import {
  getActionCollector,
  getEmptyState,
  renderPage,
} from '../../utils/react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ControllerHandler<T extends Action<any>> = (
  req: Request,
  dispatch: Dispatch<T>
) => () => Promise<T[]>;

export const getPokemonList = (
  { params: { page } }: Request,
  dispatch: Dispatch<AllActions>
) => {
  return pokemonListActionDispatcher(dispatch, parseInt(page, 10));
};

export const getPokemon = (
  { params: { id } }: Request,
  dispatch: Dispatch<AllActions>
) => {
  return pokemonDetailsActionDispatcher(dispatch, parseInt(id, 10));
};

export const getPokemonCompare = (
  { params: { aId, bId } }: Request,
  dispatch: Dispatch<AllActions>
) => {
  return pokemonCompareActionDispatcher(
    dispatch,
    parseInt(aId, 10),
    parseInt(bId, 10),
    {}
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function controllerFactory<T extends Action<any>>(
  handler: ControllerHandler<T>
) {
  return (req: Request, res: Response) => {
    const { dispatch, getActions } = getActionCollector<T>();

    handler(req, dispatch)().then(() => {
      res.send(renderPage(req.path, getEmptyState(), <App />, getActions()));
    });
  };
}

export const pokemonRoutesMap = {
  get: {
    '/pokemon/:page': controllerFactory(getPokemonList),
    '/pokemon/details/:id': controllerFactory(getPokemon),
    '/pokemon/compare/:aId/:bId': controllerFactory(getPokemonCompare),
  },
};
