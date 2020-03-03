import 'normalize.css';
import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router';
import { Header } from '../../components/header';
import { Loader } from '../../components/loader';
import { Pokemon } from '../Pokemon';
import { PokemonCompare } from '../PokemonCompare';
import { PokemonList } from '../PokemonList';
import './index.css';
import { isLoading } from '../../state/selectors';

export function App() {
  const showLoader = useSelector(isLoading);

  return (
    <div className="pokemon-app">
      <Header />
      <Switch>
        <Redirect from="/" to="/pokemon" exact />
        <Route path="/pokemon" exact component={PokemonList} />
        <Route path="/pokemon/:id" exact component={Pokemon} />
        <Route
          path="/pokemon/compare/:aId/:bId"
          exact
          component={PokemonCompare}
        />
      </Switch>
      {showLoader ? <Loader /> : null}
    </div>
  );
}
