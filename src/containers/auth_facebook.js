import React, { Component } from 'react';
import { connect } from 'react-redux';
import qs from 'qs';
import PropTypes from 'prop-types';

import { facebookLogin } from '../actions';
import Loading from '../components/loading';

class AuthFacebook extends Component {
  static propTypes = {
    history: PropTypes.shape({}).isRequired,
    location: PropTypes.shape({}).isRequired,
    facebookLogin: PropTypes.func.isRequired,
    facebookLoginError: PropTypes.shape({}),
  };

  static defaultProps = {
    facebookLoginError: null,
  };

  constructor(props) {
    super(props);

    const { location } = props;
    const parsed = qs.parse(location.search.substr(1));

    const { code } = parsed;

    this.state = {
      code,
      loading: true,
    };
  }

  componentDidMount() {
    const { facebookLogin } = this.props;
    const { code } = this.state;

    facebookLogin({ code }, this.handleLoginSuccess);
  }

  handleLoginSuccess = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    const { facebookLoginError } = this.props;
    const { code, loading } = this.state;

    const hasCode = code !== undefined && code.length > 0;

    if (!hasCode) {
      return 'Invalid Facebook Authentication';
    }

    if (facebookLoginError) {
      return 'Facebook Login Error';
    }

    if (loading) {
      return <Loading />;
    }

    return (
      <p>Facebook Login Completed</p>
    )
  }
}

const mapStateToProps = state => ({
  facebookLoginError: state.auth.facebookLoginError,
});

export default connect(mapStateToProps, { facebookLogin })(AuthFacebook);
