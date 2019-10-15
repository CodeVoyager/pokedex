import React from 'react';

import './index.css';

export interface Props {
  children: null | string | React.ReactChild | React.ReactChild[];
  onClick?: () => void;
}

export function Button({ children, onClick }: Props) {
  return <button className="pokemon-button" children={children} onClick={onClick} />;
}
