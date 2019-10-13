import { TaskEither, tryCatch, right } from 'fp-ts/lib/TaskEither';
import fetch from 'isomorphic-fetch';
import {
  Pokemon,
  PokemonColor,
  PokemonResponse,
  PokemonType,
} from '../../../types/pokeapi';

const API_ENDPOINT = 'https://pokeapi.co/api/v2';

export const ITEMS_PER_PAGE = 20;

export interface PokeAPIService<U> {
  list: (page: number) => TaskEither<Error, PokemonResponse>;
  get: (id: string) => TaskEither<Error, U>;
}

const cache: { [x: string]: { [y: string]: any } } = {};

function getFromCache<T>(name: string, id: number | string): T | null {
  if (!cache[name]) {
    cache[name] = {};
  }
  if (cache[name][id]) {
    return cache[name][id];
  }

  return null;
}

function setInCache<T>(name: string, id: number | string, value: T): void {
  if (!cache[name]) {
    cache[name] = {};
  }

  cache[name][id] = value;
}

function setInCacheMiddleware<T>(name: string) {
  return (id: number | string) => (value: T) => {
    setInCache(name, id, value);

    return value;
  };
}

function ApiRequestFactory<T>(endpoint: string): PokeAPIService<T> {
  return {
    list: (page: number = 0) => {
      const valFromCache = getFromCache<PokemonResponse>(endpoint, page);

      if (valFromCache) {
        return right(valFromCache);
      }

      return tryCatch<Error, PokemonResponse>(
        () =>
          fetch(
            `${API_ENDPOINT}/${endpoint}/?limit=${ITEMS_PER_PAGE}&offset=${page *
              ITEMS_PER_PAGE}`
          )
            .then(r => {
              if (r.status >= 400) {
                throw new Error('Bad response from server');
              }

              return r.json() as Promise<PokemonResponse>;
            })
            .then(setInCacheMiddleware<PokemonResponse>(endpoint)(page)),
        reason => new Error(String(reason))
      );
    },
    get: (id: string) => {
      const valFromCache = getFromCache<T>(endpoint, id);

      if (valFromCache) {
        return right(valFromCache);
      }

      return tryCatch<Error, T>(
        () =>
          fetch([API_ENDPOINT, endpoint, id].join('/'))
            .then(r => {
              if (r.status >= 400) {
                throw new Error('Bad response from server');
              }

              return r.json() as Promise<T>;
            })
            .then(setInCacheMiddleware<T>(endpoint)(id)),
        reason => new Error(String(reason))
      );
    },
  };
}

export const PokemonService = ApiRequestFactory<Pokemon>('pokemon');
export const PokemonColorService = ApiRequestFactory<PokemonColor>(
  'pokemon-color'
);
export const PokemonRequestService = ApiRequestFactory<PokemonType>(
  'pokemon-type'
);
