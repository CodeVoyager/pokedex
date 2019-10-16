import { isLoading } from '../../state/selectors/loader';
import { State } from '../../state/store';

export function mapStateToProps(state: State) {
  return {
    isLoading: isLoading(state),
  };
}
