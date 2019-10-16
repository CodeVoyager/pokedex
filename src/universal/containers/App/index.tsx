import 'normalize.css';
import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router';
import { Header } from '../../components/header';
import { Loader } from '../../components/loader';
import { PokemonWrapped } from '../Pokemon';
import { PokemonCompareWrapped } from '../PokemonCompare';
import { WrappedPokemonList } from '../PokemonList';
import { mapStateToProps } from './connect';
import './index.css';

interface IProps extends ReturnType<typeof mapStateToProps> {}

export function App({ isLoading }: IProps) {
  return (
    <div className="pokemon-app">
      <Header />
      <Switch>
        <Redirect from="/" to="/pokemon" exact />
        <Route path="/pokemon" exact component={WrappedPokemonList} />
        <Route path="/pokemon/:id" exact component={PokemonWrapped} />
        <Route
          path="/pokemon/compare/:aId/:bId"
          exact
          component={PokemonCompareWrapped}
        />
      </Switch>
      {isLoading ? <Loader /> : null}
    </div>
  );
}

export const AppWrapped = connect(mapStateToProps)(App);
