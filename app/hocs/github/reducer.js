/*
 *
 * github reducer
 *
 */

import { fromJS } from 'immutable';
import {
  GET_REPOS,
} from './constants';

const initialState = fromJS({
  getRepos: {
    loading: false,
    user: null,
    response: null,
    error: null,
  },
});

function githubReducer(state = initialState, { type, payload, error, meta }) {
  switch (type) {
    case GET_REPOS.START:
      return initialState
        .setIn(['getRepos', 'username'], meta.username)
        .setIn(['getRepos', 'loading'], true);
    case GET_REPOS.SUCCESS:
      return state
        .setIn(['getRepos', 'loading'], false)
        .setIn(['getRepos', 'response'], payload);
    case GET_REPOS.ERROR:
      return initialState
        .setIn(['getRepos', 'error'], error);
    case GET_REPOS.RESET:
      return initialState;
    default:
      return state;
  }
}

export default githubReducer;
