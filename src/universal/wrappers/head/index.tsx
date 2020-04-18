import React from 'react';
import { Helmet } from 'react-helmet';

export function withTitle<T>(title: string = '') {
  return (Component: React.ComponentClass<T> | React.FC<T>): React.FC<T> => {
    return function WithTitleComponent(props: T) {
      return (
        <>
          <Helmet title={title} />
          <Component {...props} />
        </>
      );
    };
  };
}
