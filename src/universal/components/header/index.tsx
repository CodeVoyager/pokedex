import React from 'react';
import './index.css';
import { Link } from 'react-router-dom';

export function Header() {
  return (
    <div className="pokemon-header">
      <Link className="pokemon-header-main" title="PokeDex" to="/">
        PokeDex
      </Link>
      <br />
      <span className="pokemon-header-sub">Totally not a rip-off!</span>
    </div>
  );
}
