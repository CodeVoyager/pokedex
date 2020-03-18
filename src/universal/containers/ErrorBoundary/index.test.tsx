import { render, mount } from 'enzyme';
import React from 'react';
import { ErrorBoundary } from '.';

describe('Component::ErrorBoundary', () => {
  describe('render', () => {
    it('should just show supplied children if there is no error', () => {
      const result = render(
        <ErrorBoundary>
          <div className="content">content</div>
        </ErrorBoundary>
      );
      expect(result).toMatchInlineSnapshot(`
        <div
          class="content"
        >
          content
        </div>
      `);
    });
    it('should stop propagation of an error', () => {
      function BuggyComponent() {
        throw new Error('TEST ERROR');

        return <div>content</div>;
      }
      function getResult() {
        return mount(
          <ErrorBoundary>
            <BuggyComponent />
          </ErrorBoundary>
        );
      }
      expect(getResult).not.toThrow();
    });
    it('should render fallback HTML if error happens', () => {
      function BuggyComponent() {
        throw new Error('TEST ERROR');

        return <div>content</div>;
      }
      const result = mount(
        <ErrorBoundary>
          <BuggyComponent />
        </ErrorBoundary>
      );
      expect(result).toMatchInlineSnapshot(`
        <ErrorBoundary>
          <h1>
            Something went wrong. :(
          </h1>
        </ErrorBoundary>
      `);
    });
  });
});
