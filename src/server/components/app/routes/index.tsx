import { Router } from 'express';
import { pokemonRoutesMap } from '../../Pokemon/controllers';

const indexRouter = Router();

Object.entries(pokemonRoutesMap.get).forEach(([path, handler]) => {
  indexRouter.get(path, handler);
});

indexRouter.get('/', (_, res) => {
  res.redirect('/pokemon/1');
});

export { indexRouter };
