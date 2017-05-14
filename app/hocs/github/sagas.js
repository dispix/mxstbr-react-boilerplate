import { takeLatest, call, put } from 'redux-saga/effects';

import request from 'utils/request';

import { GET_REPOS } from './constants';
import { getRepos } from './actions';

// Individual exports for testing
export function* fetchRepos({ meta: { username } }) {
  const requestURL = `https://api.github.com/users/${username}/repos?type=all&sort=updated`;

  try {
    // Call our request helper (see 'utils/request')
    const repos = yield call(request, requestURL);
    yield put(getRepos.success(repos));
  } catch (err) {
    yield put(getRepos.error(err));
  }
}

export function* watchGetRepos() {
  yield takeLatest(GET_REPOS.START, fetchRepos);
}

// All sagas to be loaded
export default [
  watchGetRepos,
];
