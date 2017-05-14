import { createSelector } from 'reselect';

/**
 * Direct selector to the github state domain
 */
const selectGetRepos = (state) => state.getIn(['hocs', 'github', 'getRepos']);

/**
 * Other specific selectors
 */


/**
 * Default selector used by github
 */

export const makeSelectGetRepos = () => createSelector(
  selectGetRepos,
  (substate) => substate.toJS()
);
