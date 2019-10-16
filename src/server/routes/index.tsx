import { Router } from 'express';
import { Either, fold } from 'fp-ts/lib/Either';
import { pipe } from 'fp-ts/lib/pipeable';
import React from 'react';
import { Pokemon, PokemonResponse } from '../../types/pokeapi';
import { PokemonTileItem } from '../../universal/components/pokemon-tile';
import { AppWrapped } from '../../universal/containers/App';
import { PokemonService } from '../../universal/service/pokeapi';
import { State } from '../../universal/state/store';
import { extendEmptyState, renderPage } from '../utils/react';

const indexRouter = Router();

indexRouter.get('/', (req, res, next) => {
  res.redirect('/pokemon');
});
indexRouter.get('/pokemon', (req, res, next) => {
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
        res.send(renderPage(req, state, <AppWrapped />));
      }
    );
  });
});
indexRouter.get('/pokemon/:id', (req, res, next) => {
  PokemonService.get(req.params.id)().then(p => {
    pipe(
      p,
      fold<Error, Pokemon, State>(
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
indexRouter.get('/pokemon/compare/:aId/:bId', async (req, res, next) => {
  const flatten = (x: Either<Error, Pokemon>) =>
    pipe(
      x,
      fold<Error, Pokemon, Pokemon | undefined>(() => undefined, p => p)
    );
  const toPokemonTileItem = ({ id, name }: Pokemon): PokemonTileItem => ({
    id: id.toString(),
    name,
  });
  const a = flatten(await PokemonService.get(req.params.aId)());
  const b = flatten(await PokemonService.get(req.params.bId)());
  res.send(
    renderPage(
      req,
      extendEmptyState({
        pokemonCompare: {
          candidates: {
            a: a ? toPokemonTileItem(a) : undefined,
            b: b ? toPokemonTileItem(b) : undefined,
          },
          current: {
            a: a,
            b: b,
          },
        },
      }),
      <AppWrapped />
    )
  );
});

export { indexRouter };
