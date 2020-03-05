import { configure } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import { JSDOM } from 'jsdom';

const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
const { window } = jsdom;

configure({ adapter: new EnzymeAdapter() });

(global as any).window = window;
(global as any).document = window.document;
(global as any).navigator = {
  userAgent: 'Node',
};
// tslint:disable-next-line:only-arrow-functions
(global as any).requestAnimationFrame = function(callback: () => any) {
  return setTimeout(callback, 0);
};
// tslint:disable-next-line:only-arrow-functions
(global as any).cancelAnimationFrame = function(id: number) {
  clearTimeout(id);
};
// tslint:disable-next-line:only-arrow-functions
(global as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ = function(
  ...rest: any[]
) {
  return rest;
};
