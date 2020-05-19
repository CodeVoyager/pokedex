import { shallow } from 'enzyme';
import React from 'react';
import { Button } from '.';

describe('Component', () => {
  describe('Button', () => {
    test("should work on it's own", () => {
      expect(shallow(<Button />)).toMatchInlineSnapshot(`
        <button
          className="pokemon-button  "
        />
      `);
    });
    test('should use specified children', () => {
      expect(shallow(<Button>CONTENT</Button>)).toMatchInlineSnapshot(`
        <button
          className="pokemon-button  "
        >
          CONTENT
        </button>
      `);
      expect(
        shallow(
          <Button>
            <div>CONTENT IN DIV</div>
          </Button>
        )
      ).toMatchInlineSnapshot(`
        <button
          className="pokemon-button  "
        >
          <div>
            CONTENT IN DIV
          </div>
        </button>
      `);
    });
    test('should handle specifing button as mini version', () => {
      expect(shallow(<Button mini />)).toMatchInlineSnapshot(`
        <button
          className="pokemon-button pokemon-button-mini "
        />
      `);
    });
    test('should run specified onClick event handler', () => {
      const onClick = jest.fn();
      const component = shallow(<Button onClick={onClick} />);

      component.simulate('click');

      expect(onClick).toHaveBeenCalled();
      expect(onClick).toHaveBeenCalledTimes(1);
    });
  });
});
