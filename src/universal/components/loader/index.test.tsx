import { shallow } from 'enzyme';
import React from 'react';
import { Loader } from '.';

describe('Component::ButtonsContainer', () => {
  it('should render correctly', () => {
    expect(shallow(<Loader />)).toMatchInlineSnapshot(`
      <div
        className="pokemon-loader"
      >
        <div
          className="pokemon-loader-ring"
        >
          <div
            className="pokemon-loader-center"
          />
        </div>
      </div>
    `);
  });
});
