import React, { HTMLAttributes } from 'react';
import './index.css';

export type Props = HTMLAttributes<HTMLDivElement>;

export function ButtonsContainer({ children, className }: Props) {
  return (
    <div className={`pokemon-buttons-container ${className ? className : ''}`}>
      {children}
    </div>
  );
}
