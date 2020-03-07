import { load } from 'cheerio';
import { pageTemplate } from '.';

jest.mock('../../../webpack-assets.json', () => ({
  app: {
    js: 'APP.js',
    css: 'APP.css',
  },
}));

describe('pageTemplate()', () => {
  const html = 'CONTENT';
  const state = { foo: 'bar' } as any;

  it('should insert supplied page HTML into #app', () => {
    const result = load(pageTemplate(html, state));

    expect(result('#app').html()).toEqual(html);
  });

  it('should insert supplied state into page', () => {
    const result = pageTemplate(html, state);

    expect(
      result.indexOf(`window.__INITIAL_STATE__ = ${JSON.stringify(state)};`)
    ).not.toBe(-1);
  });

  it('should use webpack generated filenames for PRODUCTION env', () => {
    const result = load(pageTemplate(html, state, 'production'));
    const stylesheet = result('head link[rel=stylesheet][href="/APP.css"]');
    const script = result('script[src="/APP.js"]');
    const script2 = result('script[src="http://localhost:5005/app.js"]');

    expect(stylesheet.length).toEqual(1);
    expect(script.length).toEqual(1);
    expect(script2.length).toEqual(0);
  });
  it('should use webpack generated filenames for DEV env', () => {
    const result = load(pageTemplate(html, state, 'dev'));
    const stylesheet = result('head link[rel=stylesheet][href="/APP.css"]');
    const script = result('script[src="/APP.js"]');
    const script2 = result('script[src="http://localhost:5005/app.js"]');

    expect(stylesheet.length).toEqual(0);
    expect(script.length).toEqual(0);
    expect(script2.length).toEqual(1);
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
