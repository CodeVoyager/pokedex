import 'normalize.css';
import React from 'react';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router';
import { Header } from '../../components/header';
import { Loader } from '../../components/loader';
import { PokemonPage } from '../../pages/Pokemon';
import { isLoading } from '../../state/selectors';
import { ErrorBoundary } from '../ErrorBoundary';
import './index.css';
import { PokemonComparePage } from '../../pages/PokemonCompare';
import { PokemonListPage } from '../../pages/PokemonList';

export function App() {
  const showLoader = useSelector(isLoading);

  return (
    <div className="pokemon-app">
      <ErrorBoundary>
        <Helmet titleTemplate="PokeDex - %s" defaultTitle="MainPage" />
        <Header />
        <Switch>
          <Redirect from="/" to="/pokemon" exact />
          <Redirect from="/pokemon" to="/pokemon/1" exact />
          <Route path="/pokemon/:page" exact component={PokemonListPage} />
          <Route path="/pokemon/details/:id" exact component={PokemonPage} />
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
