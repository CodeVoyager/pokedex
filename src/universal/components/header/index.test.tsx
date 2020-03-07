import { shallow } from 'enzyme';
import React from 'react';
import { Header } from '.';

describe('Component::ButtonsContainer', () => {
  it('should render correctly', () => {
    expect(shallow(<Header />)).toMatchSnapshot();
  });
});
