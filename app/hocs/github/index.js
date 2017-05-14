/*
 *
 * githubHoc
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { makeSelectGetRepos } from './selectors';
import { getRepos } from './actions';

function githubHoc(bind) {
  return function Wrapper(Component) {
    class Github extends React.Component {
      constructor() {
        super();
        if (typeof bind !== 'function') throw new TypeError('Invalid argument, expected a function.');

        this.injectProps = this.injectProps.bind(this);
      }

      /**
       *  Get the props passed by the HOC (i.e. redux props).
       *  @method  getOwnProps
       *  @return  {Object}     this.props without the props from the parent component
       */
      getOwnProps() {
        return {
          getRepos: {
            start: this.props.hocGetReposStart,
            ...this.props.hocGetReposState,
          },
        };
      }

      /**
       *  Get the props passed by the parent component (i.e. the wrapped component props).
       *  @method  getOwnProps
       *  @return  {Object}     this.props without the redux props
       */
      getParentProps() {
        const props = { ...this.props };
        Object.keys(Github.propTypes).map((prop) => delete props[prop]);
        return props;
      }

      /**
       *  Assembles all the props together, using the binding function passed by the HOC function.
       *  @method  injectProps
       *  @return  {Object}
       */
      injectProps() {
        return {
          ...this.getParentProps(),
          ...bind(this.getOwnProps()),
        };
      }

      render() {
        return (
          <Component {...this.injectProps()} />
        );
      }
    }

    Github.displayName = 'GithubHoc';

    Github.propTypes = {
      hocGetReposState: PropTypes.object.isRequired,
      hocGetReposStart: PropTypes.func.isRequired,
    };

    const mapStateToProps = createStructuredSelector({
      hocGetReposState: makeSelectGetRepos(),
    });

    function mapDispatchToProps(dispatch) {
      return {
        hocGetReposStart: (username) => dispatch(getRepos.start(username)),
      };
    }

    return connect(mapStateToProps, mapDispatchToProps)(Github);
  };
}

export default githubHoc;
