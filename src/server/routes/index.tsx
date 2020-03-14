import { Router } from 'express';
import { Either, fold } from 'fp-ts/lib/Either';
import { pipe } from 'fp-ts/lib/pipeable';
import React from 'react';
import { Pokemon, PokemonResponse } from '../../types/pokeapi';
import { PokemonTileItem } from '../../universal/components/pokemon-tile';
import { App } from '../../universal/containers/App';
import { PokemonService } from '../../universal/service/pokeapi';
import { State } from '../../universal/state/store';
import { extendEmptyState, renderPage } from '../utils/react';

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
  const id = parseInt(req.params.id, 10);

  PokemonService.get(id)().then(p => {
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
        res.send(renderPage(req, state, <App />));
      }
    );
  });
});
indexRouter.get('/pokemon/compare/:aId/:bId', async (req, res) => {
  const {
    params: { aId, bId },
  } = req;
  const flatten = (x: Either<Error, Pokemon>) =>
    pipe(
      x,
      fold<Error, Pokemon, Pokemon | undefined>(() => undefined, p => p)
    );
  const toPokemonTileItem = ({ id, name }: Pokemon): PokemonTileItem => ({
    id: id,
    name,
  });
  const [a, b] = await Promise.all(
    [aId, bId]
      .map(x => parseInt(x, 10))
      .map(PokemonService.get)
      .map(f => f())
  ).then<ReturnType<typeof flatten>[], never>(xs => xs.map(flatten));
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
      <App />
    )
  );
});

export { indexRouter };
