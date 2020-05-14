/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { shallow } from 'enzyme';
import React from 'react';
import {
  extendEmptyState,
  getActionCollector,
  getEmptyState,
  renderPage,
  renderReact,
  wrapPageElement,
} from '.';

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
      expect(getEmptyState()).toMatchInlineSnapshot(`
        Object {
          "loader": Object {
            "count": 0,
            "isLoading": false,
          },
          "pokemon": Object {
            "page": 0,
          },
          "pokemonCompare": Object {
            "candidates": Object {},
            "current": Object {},
          },
        }
      `);
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
      ).toMatchInlineSnapshot(`
        Object {
          "loader": Object {
            "count": 3,
            "isLoading": true,
          },
          "pokemon": Object {
            "page": 0,
          },
          "pokemonCompare": Object {
            "candidates": Object {},
            "current": Object {},
          },
        }
      `);
    });
  });
  describe('renderPage()', () => {
    it('should render valid page', () => {
      const result = renderPage('/', {} as any, <div>CONTENT</div>);

      expect(result).toMatchInlineSnapshot(`
        "
        <!DOCTYPE html>
        <html>

        <head>
            <meta charset=\\"UTF-8\\">
            <meta name=\\"viewport\\" content=\\"width=device-width, initial-scale=1.0\\">
            <meta http-equiv=\\"X-UA-Compatible\\" content=\\"ie=edge\\">
            <title data-react-helmet=\\"true\\"></title>

            <link href=\\"https://fonts.googleapis.com/css?family=Fira+Sans&display=swap\\" rel=\\"stylesheet\\">
            <link href=\\"https://fonts.googleapis.com/css?family=Josefin+Sans&display=swap\\" rel=\\"stylesheet\\">
        </head>

        <body>
            <main class=\\"container\\">
                <div id=\\"app\\"><div class=\\"static-router\\" data-reactroot=\\"\\"><div class=\\"static-provider\\" store=\\"[object Object]\\"><div>CONTENT</div></div></div></div>
            </main>
            <script>
              window.__INITIAL_STATE__ = {\\"loader\\":{\\"count\\":0,\\"isLoading\\":false},\\"pokemon\\":{\\"page\\":0},\\"pokemonCompare\\":{\\"candidates\\":{},\\"current\\":{}}};

            </script>
            <script src=\\"http://localhost:5005/app.js\\"></script>
        </body>
        </html>
        "
      `);
    });
  });
  describe('renderReact()', () => {
    it('should render valid page', () => {
      const result = renderReact(<div>CONTENT</div>);

      expect(result).toMatchInlineSnapshot(`
        Object {
          "body": "<div data-reactroot=\\"\\">CONTENT</div>",
          "head": Object {
            "title": "<title data-react-helmet=\\"true\\"></title>",
          },
        }
      `);
    });
  });
  describe('wrapPageElement()', () => {
    it('should render valid page', () => {
      const result = shallow(
        wrapPageElement('/', {} as any, <div>CONTENT</div>)
      );

      expect(result).toMatchInlineSnapshot(`
        <div
          className="static-router"
        >
          <Provider
            store={Object {}}
          >
            <div>
              CONTENT
            </div>
          </Provider>
        </div>
      `);
    });
  });
  describe('getActionCollector()', () => {
    it('should return object as a result', () => {
      expect(getActionCollector()).toBeInstanceOf(Object);
    });
    it('should return object with dispatch method', () => {
      expect(getActionCollector().dispatch).toBeInstanceOf(Function);
    });
    it('should return object with getActions method', () => {
      expect(getActionCollector().getActions).toBeInstanceOf(Function);
    });
    it('should give object with methods to dispatch and retrieve dispatched actions', () => {
      const collector = getActionCollector<{ type: 'TEST' }>();
      const action = { type: 'TEST' as 'TEST' };

      collector.dispatch(action);
      collector.dispatch(action);

      expect(collector.getActions()).toEqual([action, action]);
    });
  });
});
