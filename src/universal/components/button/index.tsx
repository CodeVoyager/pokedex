import React, { SyntheticEvent } from 'react';

import './index.css';

export interface Props {
  children: null | string | React.ReactChild | React.ReactChild[];
  onClick?: (e: SyntheticEvent) => void;
  mini?: boolean;
}

export function Button({ children, onClick, mini }: Props) {
  return (
    <button
      className={`pokemon-button ${mini ? 'pokemon-button-mini' : ''}`}
      children={children}
      onClick={onClick}
    />
  );
}
