import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { WrappedPokemonList } from '../PokemonList';
import { Loader } from '../../components/loader';

export function App() {
  return (
    <div className="pokemon-app">
      <Switch>
        <Redirect from="/" to="/pokemon" exact />
        <Route path="/pokemon" exact component={WrappedPokemonList} />
      </Switch>
      <Loader />
    </div>
  );
}
