import { mount, ReactWrapper } from 'enzyme';
import { left, right } from 'fp-ts/lib/either';
import { fold, none } from 'fp-ts/lib/Option';
import React from 'react';
import * as ReactRedux from 'react-redux';
import { dataGetter, getActionDispatcher, PokemonComparePage } from '.';
import { PokemonDetails } from '../../components/pokemon-details';
import { Button } from '../../components/button';
import ReactRouter from 'react-router';

const pokemonA: any = {
  name: 'POKEMAN_A',
  id: 0,
  sprites: [],
};

const pokemonB: any = {
  name: 'POKEMAN_B',
  id: 1,
  sprites: [],
};

const compareCurrent = jest.fn(() => ({
  a: pokemonA,
  b: pokemonB,
}));

jest.mock('../../service/pokeapi', () => ({
  PokemonService: {
    get: function(id: number) {
      return () => {
        switch (id) {
          case 0:
            return Promise.resolve(right(pokemonA));
          case 1:
            return Promise.resolve(right(pokemonB));
          case 2:
            return Promise.resolve(right(pokemonB));
          case 3:
            return Promise.resolve(right(pokemonB));
          case 4:
            return Promise.resolve(right(pokemonB));
          default:
            return Promise.resolve(left(new Error('NOT FOUND')));
        }
      };
    },
  },
}));
jest.mock('../../state/selectors', () => ({
  compareCurrent,
}));
jest.mock('../../state/actions', () => ({
  setErrorAction: () => ({
    type: 'ERROR',
  }),
  startLoadingAction: () => ({
    type: 'START',
  }),
  stopLoadingAction: () => ({
    type: 'STOP',
  }),
  setPokemonCompareCurrentAction: (payload: any) => ({
    type: 'SET',
    payload,
  }),
}));

describe('PokemonCompare', () => {
  describe('Page', () => {
    const history = {
      push: jest.fn(),
    } as any;
    const props = {
      history,
      match: { params: { aId: pokemonA.id, bId: pokemonB.id } },
    } as any;
    const location: any = {};
    let pokemonComparePage: ReactWrapper;
    const dispatch = jest.fn();

    beforeEach(() => {
      jest.resetAllMocks();
      jest.spyOn(ReactRouter, 'useHistory').mockImplementation(() => history);
      jest.spyOn(ReactRedux, 'useDispatch').mockImplementation(() => dispatch);
      jest.spyOn(ReactRedux, 'useStore');
      jest
        .spyOn(ReactRedux, 'useSelector')
        .mockImplementation(() => ({ a: pokemonA, b: pokemonB }));
      pokemonComparePage = mount(
        <PokemonComparePage
          history={props.history}
          match={props.match}
          location={location}
        />
      );
    });

    it('should display info for A and B Pokemons', () => {
      expect(pokemonComparePage.find(PokemonDetails)).toHaveLength(2);
      expect(
        pokemonComparePage
          .find(PokemonDetails)
          .at(0)
          .props().pokemon
      ).toEqual(pokemonA);
      expect(
        pokemonComparePage
          .find(PokemonDetails)
          .at(1)
          .props().pokemon
      ).toEqual(pokemonB);
    });
    it('should display "go back" button', () => {
      expect(pokemonComparePage.find(Button)).toHaveLength(1);
    });
    it('should have "go back" button which really goes back', () => {
      pokemonComparePage
        .find(Button)
        .at(0)
        .simulate('click');
      expect(history.push).toBeCalledWith('/pokemon');
    });
  });
  describe('DataGetter', () => {
    let useSelector: jest.SpyInstance;

    beforeEach(() => {
      jest.resetAllMocks();
      useSelector = jest.spyOn(ReactRedux, 'useSelector');
    });
    it('should return None on data incomplete', () => {
      useSelector!
        .mockImplementationOnce(() => ({
          a: undefined,
          b: undefined,
        }))
        .mockImplementationOnce(() => ({
          a: pokemonA,
          b: undefined,
        }))
        .mockImplementationOnce(() => ({
          a: undefined,
          b: pokemonB,
        }));

      expect(dataGetter(0, 1)()).toEqual(none);
      expect(dataGetter(0, 1)()).toEqual(none);
      expect(dataGetter(0, 1)()).toEqual(none);
    });
    it('should return Some on data complete', () => {
      const pickData = fold(
        () => undefined,
        x => x
      );
      const data = dataGetter(0, 1);
      const expectedData = {
        a: pokemonA,
        b: pokemonB,
      };

      useSelector.mockImplementation(() => expectedData);

      expect(pickData(data())).toEqual(expectedData);
    });
  });
  describe('ActionDispatcher ', () => {
    const dispatch = jest.fn();
    const NOT_PRESENT = 2;
    const ERROR_ID = 999;
    const currentCompare = { a: pokemonA, b: pokemonB };

    beforeEach(() => {
      jest.resetAllMocks();
      jest.spyOn(ReactRedux, 'useDispatch').mockImplementation(() => dispatch);
      jest
        .spyOn(ReactRedux, 'useSelector')
        .mockImplementation(() => ({ a: pokemonA, b: pokemonB }));
      dispatch.mockReset();
    });

    it('should dispatch LOAD START action when data is not present', () => {
      const actionDispatcher = getActionDispatcher(
        dispatch,
        0,
        NOT_PRESENT,
        currentCompare
      );

      actionDispatcher();

      expect(dispatch).toBeCalledWith({
        type: 'START',
      });
    });
    it('should dispatch LOAD STOP action on successful load', next => {
      const actionDispatcher = getActionDispatcher(
        dispatch,
        0,
        NOT_PRESENT,
        currentCompare
      );

      actionDispatcher().then(() => {
        expect(dispatch).toHaveBeenCalledWith({
          type: 'STOP',
        });
        next();
      });
    });
    it('should test both pokemon ids', next => {
      const actionDispatcher = getActionDispatcher(
        dispatch,
        NOT_PRESENT,
        1,
        currentCompare
      );
      const actionDispatcher2 = getActionDispatcher(
        dispatch,
        0,
        NOT_PRESENT,
        currentCompare
      );
      const payload = { field: 'a', item: pokemonB };
      const payload2 = { field: 'b', item: pokemonB };

      Promise.all([actionDispatcher(), actionDispatcher2()]).then(
        ([result, result2]) => {
          expect(result[0]).toEqual({
            type: 'SET',
            payload,
          });
          expect(result2[0]).toEqual({
            type: 'SET',
            payload: payload2,
          });
          next();
        }
      );
    });
    it('should dispatch compare set action on succesful load', next => {
      const actionDispatcher = getActionDispatcher(
        dispatch,
        0,
        NOT_PRESENT,
        currentCompare
      );
      const payload = { field: 'b', item: pokemonB };

      actionDispatcher().then(([action]) => {
        expect(action).toEqual({
          type: 'SET',
          payload,
        });
        next();
      });
    });
    it('should dispatch ERROR action on error', next => {
      const actionDispatcher = getActionDispatcher(
        dispatch,
        0,
        ERROR_ID,
        currentCompare
      );

      actionDispatcher().then(([action]) => {
        expect(action).toEqual({
          type: 'ERROR',
        });
        next();
      });
    });
  });
});
