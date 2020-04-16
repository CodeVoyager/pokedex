import 'normalize.css';
import React from 'react';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router';
import { Header } from '../../components/header';
import { Loader } from '../../components/loader';
import { isLoading } from '../../state/selectors';
import { withTitle } from '../../wrappers/head';
import { ErrorBoundary } from '../ErrorBoundary';
import { Pokemon } from '../Pokemon';
import { PokemonCompare } from '../PokemonCompare';
import { PokemonList } from '../PokemonList';
import './index.css';

export function App() {
  const showLoader = useSelector(isLoading);

  return (
    <div className="pokemon-app">
      <ErrorBoundary>
        <Helmet titleTemplate="PokeDex - %s" defaultTitle="MainPage" />
        <Header />
        <Switch>
          <Redirect from="/" to="/pokemon" exact />
          <Route
            path="/pokemon"
            exact
            component={withTitle('All Pokemons', PokemonList)}
          />
          <Route
            path="/pokemon/:id"
            exact
            component={withTitle('PokemonDetails', Pokemon)}
          />
          <Route
            path="/pokemon/compare/:aId/:bId"
            exact
            component={withTitle('Pokemon Comparison', PokemonCompare)}
          />
        </Switch>
        {showLoader ? <Loader /> : null}
      </ErrorBoundary>
    </div>
  );
}
