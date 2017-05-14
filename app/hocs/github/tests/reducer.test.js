
import { fromJS } from 'immutable';
import githubReducer from '../reducer';

describe('githubReducer', () => {
  it('returns the initial state', () => {
    expect(githubReducer(undefined, {})).toEqual(fromJS({}));
  });
});
