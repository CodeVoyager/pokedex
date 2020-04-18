import { mount } from 'enzyme';
import { none, some } from 'fp-ts/lib/Option';
import React from 'react';
import { Action } from 'redux';
import { withRouteData } from '.';

jest.mock('react-redux');
jest.mock('../../components/loader', () => ({
  Loader: () => <div>LOADER</div>,
}));

describe('RouteData', () => {
  describe('Wrapper', () => {
    const dataGetterNone = () => none;
    const dataGetterSome = () => some({ foo: 'bar' });
    const action = { type: 'LOAD' };
    const actionDispatcher = jest.fn(() => action as Action<string>);
    const Component = ({ foo }: any) => <div data-foo={foo}>CONTENT</div>;

    beforeEach(() => {
      jest.resetAllMocks();
      jest.spyOn(React, 'useEffect').mockImplementation(f => f());
      jest.spyOn(React, 'useCallback').mockImplementation(f => f);
    });

    it('should require data validator and data getter', () => {
      const testCase1 = () => {
        mount(withRouteData(undefined as any, undefined as any)(Component));
      };
      const testCase2 = () => {
        mount(withRouteData(dataGetterNone, undefined as any)(Component));
      };
      const testCase3 = () => {
        mount(withRouteData(undefined as any, actionDispatcher)(Component));
      };

      expect(testCase1).toThrow();
      expect(testCase2).toThrow();
      expect(testCase3).toThrow();
    });
    it('should return function that accept target component', () => {
      const componentWrapper = withRouteData(dataGetterNone, actionDispatcher);

      expect(componentWrapper).toBeInstanceOf(Function);
    });

    it('should run action dispatcher on data not present when mounted', () => {
      const componentWrapper = withRouteData(dataGetterNone, actionDispatcher);
      const resultComponent = componentWrapper(Component);

      mount(resultComponent);
      expect(actionDispatcher).toBeCalled();
    });

    it('should not call action dispatcher on data present when mounted', () => {
      const componentWrapper = withRouteData(dataGetterSome, actionDispatcher);
      const resultComponent = componentWrapper(Component);

      mount(resultComponent);

      expect(actionDispatcher).not.toBeCalled();
    });

    it('should use display component when data is present', () => {
      const componentWrapper = withRouteData(dataGetterSome, actionDispatcher);
      const result = mount(componentWrapper(Component));

      expect(result).toMatchInlineSnapshot(`
        <Component
          foo="bar"
        >
          <div
            data-foo="bar"
          >
            CONTENT
          </div>
        </Component>
      `);
    });

    it('should display loader when datais not present', () => {
      const componentWrapper = withRouteData(dataGetterNone, actionDispatcher);
      const result = mount(componentWrapper(Component));

      expect(result).toMatchInlineSnapshot(`
<Loader>
  <div>
    LOADER
  </div>
</Loader>
`);
    });
  });
});
