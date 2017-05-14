import { combineReducers } from 'redux-immutable';

import githubHocSagas from './github/sagas';
import githubHocReducer from './github/reducer';

const reducer = combineReducers({
  github: githubHocReducer,
});

const sagas = [
  ...githubHocSagas,
];

export { reducer, sagas };
