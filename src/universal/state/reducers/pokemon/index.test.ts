/* eslint-disable @typescript-eslint/no-explicit-any */
import { initialState, pokemon } from '.';

describe('State::Reducers', () => {
  describe('Pokemon', () => {
    const SET_POKEMON_ACTION = {
      payload: {
        name: 'FOO',
      },
      type: 'SET_POKEMON',
    } as any;
    const SET_POKEMON_LIST_ACTION = {
      payload: ['foo', 'bar'],
      type: 'SET_POKEMON_LIST',
    } as any;
    const SET_POKEMON_LIST_PAGE_ACTION = {
      payload: 999,
      type: 'SET_POKEMON_LIST_PAGE',
    } as any;
    test('should update pokemon data on SET_POKEMON', () => {
      const state = { ...initialState };
      const expected = {
        ...initialState,
        current: SET_POKEMON_ACTION.payload,
      };
      expect(pokemon(state, SET_POKEMON_ACTION)).toEqual(expected);
    });
    test('should update pokemon list on SET_POKEMON_LIST', () => {
      const state = { ...initialState };
      const expected = {
        ...initialState,
        list: SET_POKEMON_LIST_ACTION.payload,
      };
      expect(pokemon(state, SET_POKEMON_LIST_ACTION)).toEqual(expected);
    });
    test('should update list page on SET_POKEMON_LIST_PAGE', () => {
      const state = { ...initialState };
      const expected = {
        ...initialState,
        page: SET_POKEMON_LIST_PAGE_ACTION.payload,
      };
      expect(pokemon(state, SET_POKEMON_LIST_PAGE_ACTION)).toEqual(expected);
    });
    test('should work in immutable fashion', () => {
      const state = { ...initialState };
      expect(pokemon(state, SET_POKEMON_LIST_PAGE_ACTION)).not.toBe(state);
    });
    test('should not change state on UNKNOWN action', () => {
      const state = {
        ...initialState,
      };
      const action = {
        type: 'UNKNOWN',
        payload: 0,
      } as any;
      expect(pokemon(state, action)).toEqual(state);
    });
    test('should work even if state is undefined', () => {
      const expected = {
        ...initialState,
        page: SET_POKEMON_LIST_PAGE_ACTION.payload,
      };
      expect(pokemon(undefined, SET_POKEMON_LIST_PAGE_ACTION)).toEqual(
        expected
      );
    });
  });
});
