import React, { Component, Fragment, Redirect } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter as Router } from 'connected-react-router';
import { history } from '../redux'
import { ToastContainer } from 'react-toastify';



import { userIsAuthenticated, userIsNotAuthenticated } from '../hoc/authentication';

import { path } from '../utils'

import Home from '../routes/Home';
//import Login from '../routes/Login';
import Login from './Auth/Login';

import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';
import System from '../routes/System';

import { CustomToastCloseButton } from '../components/CustomToast';
import ConfirmModal from '../components/ConfirmModal';

class App extends Component {
  handlePersistorState = () => {
    const { persistor } = this.props;
    let { bootstrapped } = persistor.getState();
    if (bootstrapped) {
      if (this.props.onBeforeLift) {
        Promise.resolve(this.props.onBeforeLift())
          .then(() => this.setState({ bootstrapped: true }))
          .catch(() => this.setState({ bootstrapped: true }));
      } else {
        this.setState({ bootstrapped: true });
      }
    }
    if (!this.props.isLoggedIn) {
      const { isLoggedIn } = this.props;
      if (!isLoggedIn) {
        connect('login check', isLoggedIn);
      }
    }
  };

  componentDidMount() {
    this.handlePersistorState();
  }

  render() {
    console.log(this.props);
    // if (!this.props.isLoggedIn) {
    //   const { navigate } = this.props;
    //   const redirectPath = '/login';
    //   navigate(`${redirectPath}`);
    // }
    return (
      <Fragment>
        <Router history={history}> {/** use history for keep data of page when press F5 hạn chế gọi API nhiều lần */}
          <ConfirmModal />
          {this.props.isLoggedIn && <Header />} {/** Nếu đã đăng nhập thì load hearder */}
          <div class="clearfix"> </div>
          <div className='page-container'>
            <div class="page-sidebar-wrapper">
              {this.props.isLoggedIn && <Sidebar />}
            </div>
            <div className="page-content-wrapper">
              <div className="page-content-wrapper">
                <Switch>
                  <Route path={path.HOME} exact component={(Home)} /> {/** Mặc định gọi home */}
                  <Route path={path.LOGIN} component={userIsNotAuthenticated(Login)} /> {/** userIsNotAuthenticated : kiểm tra người dùng đã đăng nhập hay chưa */}
                  <Route path={path.SYSTEM} component={userIsAuthenticated(System)} />
                  <Route path={path.DASHBOARD} component={userIsAuthenticated(System)} />
                  <Route path={path.ORDER} component={userIsAuthenticated(System)} />
                  <Route path={path.USER} component={userIsAuthenticated(System)} />
                </Switch>
              </div>
              <ToastContainer
                className="toast-container" toastClassName="toast-item" bodyClassName="toast-item-body"
                autoClose={false} hideProgressBar={true} pauseOnHover={false}
                pauseOnFocusLoss={true} closeOnClick={false} draggable={false}
                closeButton={<CustomToastCloseButton />}
              />
            </div>
          </div>
        </Router>
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    started: state.app.started,
    isLoggedIn: state.user.isLoggedIn
  };
};

const mapDispatchToProps = dispatch => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);