import 'normalize.css';
import React from 'react';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router';
import { Header } from '../../components/header';
import { Loader } from '../../components/loader';
import { PokemonPage } from '../../pages/Pokemon';
import { isLoading } from '../../state/selectors';
import { withTitle } from '../../wrappers/head';
import { ErrorBoundary } from '../ErrorBoundary';
import { PokemonList } from '../PokemonList';
import './index.css';
import { PokemonComparePage } from '../../pages/PokemonCompare';

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
            component={withTitle('All Pokemons')(PokemonList)}
          />
          <Route path="/pokemon/:id" exact component={PokemonPage} />
          <Route
            path="/pokemon/compare/:aId/:bId"
            exact
            component={PokemonComparePage}
          />
        </Switch>
        {showLoader ? <Loader /> : null}
      </ErrorBoundary>
    </div>
  );
}
