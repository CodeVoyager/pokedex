/* eslint-disable @typescript-eslint/no-explicit-any */
import { initialState, loader } from '.';
import { State } from '../../store';

describe('State::Reducers', () => {
  describe('Loader', () => {
    const START_ACTON = {
      type: 'START_LOADING',
    } as any;
    const STOP_ACTON = {
      type: 'STOP_LOADING',
    } as any;
    test('should set state as loading for loading START_ACTON', () => {
      const state = { ...initialState };
      const expected: State['loader'] = {
        count: 1,
        isLoading: true,
      };
      expect(loader(state, START_ACTON)).toEqual(expected);
    });
    test('should keep count of loadings for START_ACTON', () => {
      const state = { ...initialState };
      const state2 = loader(state, START_ACTON);
      const state3 = loader(state2, START_ACTON);
      const expected: State['loader'] = {
        count: 3,
        isLoading: true,
      };
      expect(loader(state3, START_ACTON)).toEqual(expected);
    });
    test('should decrease loading counter for STOP_ACTON', () => {
      const state = {
        count: 3,
        isLoading: true,
      };
      const expected = {
        count: 2,
        isLoading: true,
      };
      expect(loader(state, STOP_ACTON)).toEqual(expected);
    });
    test('should set loading to false if counts to ZERO for STOP_ACTON', () => {
      const state = {
        count: 1,
        isLoading: true,
      };
      const expected = {
        count: 0,
        isLoading: false,
      };
      expect(loader(state, STOP_ACTON)).toEqual(expected);
    });
    test('should never go below ZERO for STOP_ACTON', () => {
      const state = {
        ...initialState,
      };
      const expected = {
        ...initialState,
      };
      expect(loader(state, STOP_ACTON)).toEqual(expected);
    });
    test('should work in immutable fashion', () => {
      const state = {
        ...initialState,
      };
      expect(loader(state, START_ACTON)).not.toBe(state);
    });
    test('should not change state on UNKNOWN action', () => {
      const state = {
        ...initialState,
      };
      const action = {
        type: 'UNKNOWN',
        payload: 0,
      } as any;
      expect(loader(state, action)).toEqual(state);
    });
    test('should work even if state is undefined', () => {
      const expected: State['loader'] = {
        count: 1,
        isLoading: true,
      };
      expect(loader(undefined, START_ACTON)).toEqual(expected);
    });
  });
});
