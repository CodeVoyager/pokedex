import React from 'react';

import './index.css';

export interface Props {
  children: null | string | React.ReactChild | React.ReactChild[];
}

export function ButtonsContainer({ children }: Props) {
  return <div className="pokemon-buttons-container" children={children} />;
}
