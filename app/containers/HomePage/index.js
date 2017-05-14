/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import github from 'hocs/github';
import H2 from 'components/H2';
import ReposList from 'components/ReposList';
import AtPrefix from './AtPrefix';
import CenteredSection from './CenteredSection';
import Form from './Form';
import Input from './Input';
import Section from './Section';
import messages from './messages';
import { changeUsername } from './actions';
import { makeSelectUsername } from './selectors';

export class HomePage extends React.PureComponent {
  constructor() {
    super();
    this.getRepos = this.getRepos.bind(this);
  }
  /**
   * when initial state username is not null, submit the form to load repos
   */
  componentDidMount() {
    if (this.props.username && this.props.username.trim().length > 0) {
      this.props.getRepos.start(this.props.username);
    }
  }

  getRepos(e) {
    e.preventDefault();
    this.props.getRepos.start(this.props.username);
  }

  render() {
    const { getRepos, username, onChangeUsername } = this.props;

    return (
      <article>
        <Helmet
          title="Home Page"
          meta={[
            { name: 'description', content: 'A React.js Boilerplate application homepage' },
          ]}
        />
        <div>
          <CenteredSection>
            <H2>
              <FormattedMessage {...messages.startProjectHeader} />
            </H2>
            <p>
              <FormattedMessage {...messages.startProjectMessage} />
            </p>
          </CenteredSection>
          <Section>
            <H2>
              <FormattedMessage {...messages.trymeHeader} />
            </H2>
            <Form onSubmit={this.getRepos}>
              <label htmlFor="username">
                <FormattedMessage {...messages.trymeMessage} />
                <AtPrefix>
                  <FormattedMessage {...messages.trymeAtPrefix} />
                </AtPrefix>
                <Input
                  id="username"
                  type="text"
                  placeholder="mxstbr"
                  value={username}
                  onChange={onChangeUsername}
                />
              </label>
            </Form>
            <ReposList
              loading={getRepos.loading}
              error={getRepos.error}
              repos={getRepos.response}
              currentUser={getRepos.username}
            />
          </Section>
        </div>
      </article>
    );
  }
}

HomePage.propTypes = {
  username: React.PropTypes.string,
  onChangeUsername: React.PropTypes.func,
  getRepos: React.PropTypes.object,
};

export function mapDispatchToProps(dispatch) {
  return {
    onChangeUsername: (evt) => dispatch(changeUsername(evt.target.value)),
  };
}

const mapStateToProps = createStructuredSelector({
  username: makeSelectUsername(),
});

function githubToProps(props) {
  return props;
}

// Wrap the component to inject dispatch and state into it
export default
  connect(mapStateToProps, mapDispatchToProps)(
  github(githubToProps)(
  HomePage
));
