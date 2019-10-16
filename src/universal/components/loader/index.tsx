import React from 'react';
import './index.css';

export function Loader() {
  return (
    <div className="pokemon-loader">
      <div className="pokemon-loader-ring">
        <div className="pokemon-loader-center"></div>
      </div>
    </div>
  );
}
