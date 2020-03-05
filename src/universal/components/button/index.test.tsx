import { shallow } from 'enzyme';
import React from 'react';
import { Button } from '.';

describe('Component', () => {
  describe('Button', () => {
    test("should work on it's own", () => {
      expect(shallow(<Button />)).toMatchSnapshot();
    });
    test('should use specified children', () => {
      expect(shallow(<Button>CONTENT</Button>)).toMatchSnapshot();
      expect(
        shallow(
          <Button>
            <div>CONTENT IN DIV</div>
          </Button>
        )
      ).toMatchSnapshot();
    });
    test('should handle specifing button as mini version', () => {
      expect(shallow(<Button mini />)).toMatchSnapshot();
    });
    test('should run specified onClick event handler', () => {
      const onClick = jest.fn();
      const component = shallow(<Button onClick={onClick} />);

      component.simulate('click');

      expect(onClick).toBeCalled();
      expect(onClick).toBeCalledTimes(1);
    });
  });
});
