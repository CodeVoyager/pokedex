import { isLoading } from '../../state/selectors/loader';
import { IState } from '../../state/store';

export function mapStateToProps(state: IState) {
  return {
    isLoading: isLoading(state),
  };
}