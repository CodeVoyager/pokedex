import React, { HTMLAttributes } from 'react';

import './index.css';

export type Props = HTMLAttributes<HTMLButtonElement> & {
  mini?: boolean;
};

export function Button({ children, className, onClick, mini, ...rest }: Props) {
  return (
    <button
      className={`pokemon-button ${mini ? 'pokemon-button-mini' : ''} ${
        className ? className : ''
      }`}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
}
