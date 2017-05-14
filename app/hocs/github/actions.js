/*
 *
 * github actions
 *
 */
import { fromJS } from 'immutable';

import {
  GET_REPOS,
} from './constants';

export const getRepos = {
  start: (username) => ({
    type: GET_REPOS.START,
    meta: { username },
  }),
  success: (res) => ({
    type: GET_REPOS.SUCCESS,
    payload: fromJS(res),
  }),
  error: (err) => ({
    type: GET_REPOS.ERROR,
    error: fromJS(err),
  }),
  reset: () => ({
    type: GET_REPOS.RESET,
  }),
};
