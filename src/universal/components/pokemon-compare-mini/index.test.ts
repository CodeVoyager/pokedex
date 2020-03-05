import { PokemonCompareMini, getUrlForIds, renderItem } from '.';
import { shallow } from 'enzyme';

jest.mock('../pokemon-tile', () => ({
  getImageUrlForId: (id: any) => `/image/${id}`,
}));

describe('Component', () => {
  describe('PokemonCompareMini', () => {
    describe('getUrlForIds', () => {
      test('should return correct URL', () => {
        expect(getUrlForIds('1', '2')).toBe('/pokemon/compare/1/2');
      });
    });
    describe('renderItem', () => {
      test('should handle data not present', () => {
        expect(renderItem(undefined)).toBe(null);
      });
      test('should handle valid data', () => {
        const data = {
          id: 1,
        } as any;
        const result = shallow(renderItem(data)!);

        expect(result.hasClass('pokemon-compare-mini-image')).toBe(true);
        expect(result.find('[alt="pokemon-image"]').length).toBe(1);
        expect(result.find('[alt="pokemon-image"]').get(0).props.src).toBe(
          '/image/1'
        );
      });
    });
  });
});
