/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  setPokemonListPageAction,
  setPokemonListAction,
  setPokemonAction,
} from '.';

describe('State::Actions', () => {
  describe('Pokemon', () => {
    describe('setPokemonListPageAction creator', () => {
      test('should return correct action', () => {
        expect(setPokemonListPageAction(1)).toMatchSnapshot();
      });
    });
    describe('setPokemonListAction creator', () => {
      test('should return correct action', () => {
        expect(setPokemonListAction([])).toMatchSnapshot();
      });
    });
    describe('setPokemonAction creator', () => {
      test('should return correct action', () => {
        expect(
          setPokemonAction({
            pokemon: true,
          } as any)
        ).toMatchSnapshot();
      });
    });
  });
});
