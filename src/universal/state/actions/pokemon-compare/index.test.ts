/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  pushPokemonCompareCandidateAction,
  setPokemonCompareCurrentAction,
  clearPokemonCompareCandidatesAction,
  clearPokemonCompareCurrentAction,
} from '.';

describe('State::Actions', () => {
  describe('PokemonCompare', () => {
    describe('pushPokemonCompareCandidateAction creator', () => {
      test('should return correct action', () => {
        expect(
          pushPokemonCompareCandidateAction({
            foo: 'bar',
          } as any)
        ).toMatchSnapshot();
      });
    });
    describe('setPokemonCompareCurrentAction creator', () => {
      test('should return correct action', () => {
        expect(
          setPokemonCompareCurrentAction({
            foo: 'bar',
          } as any)
        ).toMatchSnapshot();
      });
    });
    describe('clearPokemonCompareCandidatesAction creator', () => {
      test('should return correct action', () => {
        expect(clearPokemonCompareCandidatesAction()).toMatchSnapshot();
      });
    });
    describe('clearPokemonCompareCurrentAction creator', () => {
      test('should return correct action', () => {
        expect(clearPokemonCompareCurrentAction()).toMatchSnapshot();
      });
    });
  });
});
