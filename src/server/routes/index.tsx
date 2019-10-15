import { Router } from 'express';
import { fold } from 'fp-ts/lib/Either';
import { pipe } from 'fp-ts/lib/pipeable';
import React from 'react';
import { PokemonResponse, Pokemon } from '../../types/pokeapi';
import { AppWrapped } from '../../universal/containers/App';
import { PokemonService } from '../../universal/service/pokeapi';
import { IState } from '../../universal/state/store';
import { extendEmptyState, renderPage } from '../utils/react';

const indexRouter = Router();

indexRouter.get('/', (req, res, next) => {
  res.redirect('/pokemon');
});
indexRouter.get('/pokemon', (req, res, next) => {
  PokemonService.list(0)().then(ps => {
    pipe(
      ps,
      fold<Error, PokemonResponse, IState>(
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
        res.send(renderPage(req, state, <AppWrapped />));
      }
    );
  });
});
indexRouter.get('/pokemon/:id', (req, res, next) => {
  PokemonService.get(req.params.id)().then(p => {
    pipe(
      p,
      fold<Error, Pokemon, IState>(
        e => {
          return extendEmptyState({
            error: e,
          });
        },
        p => {
          return extendEmptyState({
            pokemon: {
              page: 0,
              current: p,
            },
          });
        }
      ),
      state => {
        res.send(renderPage(req, state, <AppWrapped />));
      }
    );
  });
});

export { indexRouter };
