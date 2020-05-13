/* eslint-disable @typescript-eslint/no-explicit-any */
import { isLoading } from '.';

describe('State::Selectors', () => {
  describe('Loader', () => {
    test('should return loader status', () => {
      const state = { loader: { isLoading: true }, foo: 'bar' } as any;
      expect(isLoading(state)).toBe(true);
    });
    test('should throw on undefined', () => {
      expect(() => {
        isLoading(undefined as any);
      }).toThrow();
      expect(() => {
        isLoading({ foo: 'bar' } as any);
      }).toThrow();
    });
  });
});
