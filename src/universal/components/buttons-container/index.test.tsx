import { shallow } from 'enzyme';
import React from 'react';
import { ButtonsContainer } from '.';

describe('Component::ButtonsContainer', () => {
  it('should render correctly', () => {
    expect(shallow(<ButtonsContainer>CONTENT</ButtonsContainer>))
      .toMatchInlineSnapshot(`
      <div
        className="pokemon-buttons-container"
      >
        CONTENT
      </div>
    `);
  });
});
