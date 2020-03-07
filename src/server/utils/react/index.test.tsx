import {
  extendEmptyState,
  getEmptyState,
  renderPage,
  renderReact,
  wrapPageElement,
} from '.';
import { shallow } from 'enzyme';
import React from 'react';

interface Props {
  children: null | string | React.ReactChild | React.ReactChild[];
}

jest.mock('react-router', () => ({
  StaticRouter: function StaticRouter({ children }: Props) {
    return <div className="static-router">{children}</div>;
  },
}));
jest.mock('react-redux', () => ({
  Provider: function Provider({ children, ...props }: Props) {
    return (
      <div className="static-provider" {...props}>
        {children}
      </div>
    );
  },
}));

describe('React server utils', () => {
  describe('getEmptyState()', () => {
    it('should return valid state', () => {
      expect(getEmptyState()).toMatchSnapshot();
    });
  });
  describe('extendEmptyState()', () => {
    it('should extend valid state with supplied state', () => {
      expect(
        extendEmptyState({
          loader: {
            count: 3,
            isLoading: true,
          },
        })
      ).toMatchSnapshot();
    });
  });
  describe('renderPage()', () => {
    it('should render valid page', () => {
      const result = renderPage(
        { path: '/' } as any,
        { foo: 'bar' } as any,
        <div>CONTENT</div>
      );

      expect(result).toMatchSnapshot();
    });
  });
  describe('renderReact()', () => {
    it('should render valid page', () => {
      const result = renderReact(<div>CONTENT</div>);

      expect(result).toMatchSnapshot();
    });
  });
  describe('wrapPageElement()', () => {
    it('should render valid page', () => {
      const result = shallow(
        wrapPageElement(
          { path: '/' } as any,
          { foo: 'bar' } as any,
          <div>CONTENT</div>
        )
      );

      expect(result).toMatchSnapshot();
    });
  });
});
