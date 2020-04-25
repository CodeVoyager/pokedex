import { shallow } from 'enzyme';
import React from 'react';
import { Header } from '.';

describe('Component::ButtonsContainer', () => {
  it('should render correctly', () => {
    expect(shallow(<Header />)).toMatchInlineSnapshot(`
      <div
        className="pokemon-header"
      >
        <Link
          className="pokemon-header-main"
          title="PokeDex"
          to="/"
        >
          PokeDex
        </Link>
        <br />
        <span
          className="pokemon-header-sub"
        >
          Totally not a rip-off!
        </span>
      </div>
    `);
  });
});
