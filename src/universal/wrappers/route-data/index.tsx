import { fold, isNone, Option } from 'fp-ts/lib/Option';
import React from 'react';
import { Loader } from '../../components/loader';
import { AllActions } from '../../state/actions';

type DataGetter<T> = () => Option<T>;
type ComponentWithData<T> = React.FC<T> | React.ComponentClass<T>;

export function withRouteData<T>(
  dataFetcher: DataGetter<T>,
  actionDispatcher: () => Promise<AllActions[]>
) {
  return function ComponentWithData(Component: ComponentWithData<T>) {
    const { useEffect } = React;
    const data = dataFetcher();
    const render = fold(
      () => <Loader />,
      (props: T) => <Component {...props} />
    );

    useEffect(() => {
      if (isNone(data)) {
        actionDispatcher();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataFetcher, actionDispatcher]);

    return render(data);
  };
}
