import { shallow } from 'enzyme';
import React from 'react';
import { Loader } from '.';

describe('Component::ButtonsContainer', () => {
  it('should render correctly', () => {
    expect(shallow(<Loader />)).toMatchSnapshot();
  });
});
