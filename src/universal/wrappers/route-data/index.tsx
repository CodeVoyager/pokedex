import { fold, isNone, Option } from 'fp-ts/lib/Option';
import React from 'react';
import { Loader } from '../../components/loader';
import { AllActions } from '../../state/actions';

type DataGetter<T> = () => Option<T>;
type ComponentWithData<T> = React.FC<T> | React.ComponentClass<T>;

export function withRouteData<T>(
  dataGetter: DataGetter<T>,
  actionDispatcher: () => Promise<AllActions[]>
) {
  return function ComponentWithData(Component: ComponentWithData<T>) {
    const { useEffect, useCallback } = React;
    const data = dataGetter();
    const render = fold(
      () => <Loader />,
      (props: T) => <Component {...props} />
    );

    useEffect(
      useCallback(() => {
        if (isNone(data)) {
          actionDispatcher();
        }
      }, [render]),
      [dataGetter, actionDispatcher]
    );

    return render(data);
  };
}
