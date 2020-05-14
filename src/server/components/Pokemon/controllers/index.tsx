import { Request, Response } from 'express';
import React from 'react';
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

/**
 * TODO: Make it DRY
 */
export const getPokemonList = (
  { path, params: { page } }: Request,
  res: Response
) => {
  const { dispatch, getActions } = getActionCollector<AllActions>();
  const getPokemonList = pokemonListActionDispatcher(
    dispatch,
    parseInt(page, 10)
  );

  getPokemonList().then(() => {
    res.send(renderPage(path, getEmptyState(), <App />, getActions()));
  });
};
export const getPokemon = (
  { path, params: { id } }: Request,
  res: Response
) => {
  const { dispatch, getActions } = getActionCollector<AllActions>();
  const getPokemon = pokemonDetailsActionDispatcher(dispatch, parseInt(id, 10));

  getPokemon().then(() => {
    res.send(renderPage(path, getEmptyState(), <App />, getActions()));
  });
};
export const getPokemonCompare = (
  { params: { aId, bId }, path }: Request,
  res: Response
) => {
  const { dispatch, getActions } = getActionCollector<AllActions>();
  const getPokemons = pokemonCompareActionDispatcher(
    dispatch,
    parseInt(aId, 10),
    parseInt(bId, 10),
    {}
  );

  getPokemons().then(() => {
    res.send(renderPage(path, getEmptyState(), <App />, getActions()));
  });
};

export const pokemonRoutesMap = {
  get: {
    '/pokemon/:page': getPokemonList,
    '/pokemon/details/:id': getPokemon,
    '/pokemon/compare/:aId/:bId': getPokemonCompare,
  },
};
