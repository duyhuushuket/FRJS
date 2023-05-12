import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
//import * as actions from "../store/actions";
import * as actions from "../../store/actions";
import './Login.scss';
import { FormattedMessage } from 'react-intl';
// Import services from
import { userService } from '../../services/';

class Login extends Component {
  constructor(props) {
    super(props);
    // khai báo các step
    this.state = {
      username: '',
      password: '',
      isShow: false
    }
  }
  handleChangeUserNameInput = (e) => {
    console.log(e.target.value);
    this.setState({ username: e.target.value });
  }
  handleChangePasswordInput = (e) => {
    console.log(e.target.value);
    this.setState({ password: e.target.value });
  }
  redirectToSystemPage = () => {
    const { navigate } = this.props;
    const redirectPath = '/dashboard';
    navigate(`${redirectPath}`);
  }
  handleLogin = async () => {
    this.setState({ message: '', isError: false });
    try {
      const loginData = {
        username: this.state.username,
        password: this.state.password
      }
      const user = await userService.login(loginData);
      console.log(user);
      const { userLoginSuccess, userLoginFail } = this.props;
      userLoginSuccess(user.userData);
      this.redirectToSystemPage();
    } catch (error) {
      this.setState({ message: error.errorMessage, isError: true });
    }
  }
  handleShowHidePass = () => {
    console.log('show hide pass press');
    this.setState({ isShow: !this.state.isShow });
  }
  handleError = () => {
    this.setState({ message: '', isError: false });
  }
  componentDidMount() {
    document.body.style.backgroundColor = "#3a3636";
  }
  render() {

    return (
      <>
        <div className="login">
          <div className="content">
            <div className="login-form">
              <h3 className="form-title font-green">Sign In</h3>
              <div className={this.state.isError ? 'alert alert-danger display-show' : 'alert alert-danger display-hide'}>
                <button className="close" data-close="alert" onClick={() => { this.handleError() }}></button>
                <span> {this.state.message} </span>
              </div>
              <div className="form-group">
                <label className="control-label visible-ie8 visible-ie9">Username</label>
                <input
                  className="form-control form-control-solid placeholder-no-fix"
                  type="text"
                  autocomplete="off"
                  placeholder="Username"
                  name="username"
                  value={this.state.username}
                  onChange={(event) => { this.handleChangeUserNameInput(event) }}
                /> </div>
              <div className="form-group">
                <label className="control-label visible-ie8 visible-ie9">Password</label>
                <div className="input-icon input-icon-lg right">
                  <i className={this.state.isShow ? 'fa fa-eye' : 'fa fa-eye-slash'} onClick={() => { this.handleShowHidePass() }}></i>
                  <input
                    className="form-control form-control-solid placeholder-no-fix"
                    type={this.state.isShow ? 'text' : 'password'}
                    autocomplete="off"
                    placeholder="Password"
                    name="password"
                    value={this.state.password}
                    onChange={(event) => { this.handleChangePasswordInput(event) }}
                  />
                </div>
              </div>

              <div className="form-actions">
                <button
                  type="submit"
                  className="btn green uppercase"
                  onClick={() => this.handleLogin()}
                >Login</button>
                <a href="/" id="forget-password" className="forget-password">Forgot Password?</a>
              </div>
            </div>
          </div>
          <div className="copyright"> 2023 © SHUKET SERVICES</div>
        </div>
      </>

    )
  }
}
// const của redux
const mapStateToProps = state => {
  return {
    language: state.app.language
  };
};
// const của redux
const mapDispatchToProps = dispatch => {
  return {
    navigate: (path) => dispatch(push(path)),
    adminLoginSuccess: (adminInfo) => dispatch(actions.adminLoginSuccess(adminInfo)),
    adminLoginFail: () => dispatch(actions.adminLoginFail()),
    userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo))
  };
};
// Nhúng 2 const của redux và Login
export default connect(mapStateToProps, mapDispatchToProps)(Login);
