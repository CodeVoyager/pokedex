/* eslint-disable @typescript-eslint/no-explicit-any */
import { load } from 'cheerio';
import { pageTemplate } from '.';

jest.mock('../../../webpack-assets.json', () => ({
  app: {
    js: 'APP.js',
    css: 'APP.css',
  },
}));

describe('pageTemplate()', () => {
  const html = {
    body: 'CONTENT',
    head: {
      title: 'TITLE',
    },
  };
  const state = { foo: 'bar' } as any;
  const ASSETS = {
    app: {
      js: 'APP.js',
      css: 'APP.css',
    },
  };

  it('should insert supplied page HTML into #app', () => {
    const result = load(pageTemplate(html, state));

    expect(result('#app').html()).toEqual(html.body);
  });

  it('should insert supplied state into page', () => {
    const result = pageTemplate(html, state);

    expect(
      result.indexOf(`window.__INITIAL_STATE__ = ${JSON.stringify(state)};`)
    ).not.toBe(-1);
  });

  it('should use webpack generated filenames for PRODUCTION env', () => {
    const result = load(pageTemplate(html, state, 'production'));
    const stylesheet = result(
      `link[rel=stylesheet][href="/${ASSETS.app.css}"]`
    );
    const script = result(`script[src="/${ASSETS.app.js}"]`);
    const script2 = result('script[src="http://localhost:5005/app.js"]');

    expect(stylesheet).toHaveLength(1);
    expect(script).toHaveLength(1);
    expect(script2).toHaveLength(0);
  });
  it('should NOT use webpack generated filenames for DEV env', () => {
    const result = load(pageTemplate(html, state, 'dev'));
    const stylesheet = result(
      `link[rel=stylesheet][href="/${ASSETS.app.css}"]`
    );
    const script = result(`script[src="/${ASSETS.app.js}"]`);
    const script2 = result('script[src="http://localhost:5005/app.js"]');

    expect(stylesheet).toHaveLength(0);
    expect(script).toHaveLength(0);
    expect(script2).toHaveLength(1);
  });
  it('should close connection to __REACT_DEVTOOLS_GLOBAL_HOOK__ in production', () => {
    const result = pageTemplate(html, state, 'production');

    expect(
      result.indexOf(
        '(window.__REACT_DEVTOOLS_GLOBAL_HOOK__ || {}).inject = function () {}'
      )
    ).not.toBe(-1);
  });
});
