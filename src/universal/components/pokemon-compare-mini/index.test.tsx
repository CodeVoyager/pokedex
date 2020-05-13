/* eslint-disable @typescript-eslint/no-explicit-any */
import { PokemonCompareMini, getUrlForIds, renderItem } from '.';
import { shallow } from 'enzyme';
import { PokemonTileItem } from '../pokemon-tile';
import React from 'react';

jest.mock('../pokemon-tile', () => ({
  getImageUrlForId: (id: any) => `/image/${id}`,
}));

describe('Component', () => {
  describe('PokemonCompareMini', () => {
    describe('getUrlForIds', () => {
      test('should return correct URL', () => {
        expect(getUrlForIds(1, 2)).toBe('/pokemon/compare/1/2');
      });
    });
    describe('renderItem', () => {
      test('should handle data not present', () => {
        expect(renderItem(undefined)).toBeNull();
      });
      test('should handle valid data', () => {
        const data = {
          id: 1,
        } as any;
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const result = shallow(renderItem(data)!);

        expect(result.hasClass('pokemon-compare-mini-image')).toBe(true);
        expect(result.find('[alt="pokemon-image"]')).toHaveLength(1);
        expect(result.find('[alt="pokemon-image"]').get(0).props.src).toBe(
          '/image/1'
        );
      });
    });
    it('should not create link if compare set is not full', () => {
      const pokemon: PokemonTileItem = {
        id: 1,
        name: 'POKEMON',
      };
      const component1 = shallow(
        <PokemonCompareMini a={undefined} b={undefined} />
      );
      const component2 = shallow(
        <PokemonCompareMini a={pokemon} b={undefined} />
      );
      const component3 = shallow(
        <PokemonCompareMini a={undefined} b={pokemon} />
      );
      expect(component1.find('.pokemon-compare-go-to')).toHaveLength(0);
      expect(component2.find('.pokemon-compare-go-to')).toHaveLength(0);
      expect(component3.find('.pokemon-compare-go-to')).toHaveLength(0);
    });
    it('should create redirect link on both pokemon present', () => {
      const pokemon: PokemonTileItem = {
        id: 1,
        name: 'POKEMON',
      };
      const pokemon2 = {
        ...pokemon,
        id: 2,
      };
      const component = shallow(
        <PokemonCompareMini a={pokemon} b={pokemon2} />
      );

      expect(component.find('.pokemon-compare-go-to')).toHaveLength(1);
      expect(component.find('.pokemon-compare-go-to').get(0).props.to).toEqual(
        '/pokemon/compare/1/2'
      );
    });
  });
});
