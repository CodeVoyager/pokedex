import { Router } from 'express';
import { fold } from 'fp-ts/lib/Either';
import { pipe } from 'fp-ts/lib/pipeable';
import React from 'react';
import { PokemonResponse } from '../../types/pokeapi';
import { App } from '../../universal/containers/App';
import { getActionDispatcher as pokemonDetailsActionDispatcher } from '../../universal/pages/Pokemon';
import { getActionDispatcher as pokemonCompareActionDispatcher } from '../../universal/pages/PokemonCompare';
import { PokemonService } from '../../universal/service/pokeapi';
import { State } from '../../universal/state/store';
import { extendEmptyState, getEmptyState, renderPage } from '../utils/react';

const indexRouter = Router();

indexRouter.get('/', (_, res) => {
  res.redirect('/pokemon');
});
indexRouter.get('/pokemon', (req, res) => {
  PokemonService.list(0)().then(ps => {
    pipe(
      ps,
      fold<Error, PokemonResponse, State>(
        e => {
          return extendEmptyState({
            error: e,
          });
        },
        pr => {
          return extendEmptyState({
            pokemon: {
              page: 0,
              list: pr.results,
            },
          });
        }
      ),
      state => {
        res.send(renderPage(req, state, <App />));
      }
    );
  });
});
indexRouter.get('/pokemon/:id', (req, res) => {
  const dispatch = (x: any) => x;
  const actionDispatcher = pokemonDetailsActionDispatcher(
    dispatch,
    parseInt(req.params.id, 10)
  );

  actionDispatcher().then(action => {
    res.send(renderPage(req, getEmptyState(), <App />, [action]));
  });
});
indexRouter.get('/pokemon/compare/:aId/:bId', async (req, res) => {
  const {
    params: { aId, bId },
  } = req;
  const dispatch = (x: any) => x;
  const actionDispatcher = pokemonCompareActionDispatcher(
    dispatch,
    parseInt(aId, 10),
    parseInt(bId, 10),
    {}
  );

  actionDispatcher().then(actions => {
    res.send(renderPage(req, getEmptyState(), <App />, actions));
  });
});

export { indexRouter };
