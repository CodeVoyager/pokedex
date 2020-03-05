import { startLoadingAction, stopLoadingAction } from '.';

describe('State::Actions', () => {
  describe('Loader', () => {
    describe('startLoadingAction creator', () => {
      test('should return correct action', () => {
        expect(startLoadingAction()).toMatchSnapshot();
      });
    });
    describe('stopLoadingAction creator', () => {
      test('should return correct action', () => {
        expect(stopLoadingAction()).toMatchSnapshot();
      });
    });
  });
});
