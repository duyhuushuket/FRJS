import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu } from '../Sidebar/menuApp';
import './Header.scss';
import Logo from '../../assets/images/logo-light.png';
import avatarUser from '../../assets/images/avatar2.jpg';
class Header extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      username: '',
      password: '',
      MenuToggler: false
    }
  }
  handleShowHideMenuToggler = () => {
    this.setState({ MenuToggler: !this.state.MenuToggler });
  }

  render() {
    const { processLogout } = this.props;
    console.log('Header rendered');
    return (
      <>
        <div className="page-header navbar navbar-fixed-top">
          <div className="page-header-inner ">
            <div className="page-logo">
              <a href="index.html">
                <img src={Logo} alt="logo" className="logo-default" /> </a>
              <div className="menu-toggler sidebar-toggler"></div>
            </div>
            <a href="/" className="menu-toggler responsive-toggler" data-toggle="collapse" data-target=".navbar-collapse"> </a>
            <div className="page-actions">
              <div onClick={() => { this.handleShowHideMenuToggler() }} className={this.state.MenuToggler ? 'btn-group open' : 'btn-group'}>
                <button type="button" className="btn red-haze btn-sm dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">
                  <span className="hidden-sm hidden-xs">Actions&nbsp;</span>
                  <i className="fa fa-angle-down"></i>
                </button>
                <ul className="dropdown-menu" role="menu">
                  <li>
                    <a href="/">
                      <i className="icon-docs"></i> New Post </a>
                  </li>
                  <li>
                    <a href="/">
                      <i className="icon-tag"></i> New Comment </a>
                  </li>
                  <li>
                    <a href="/">
                      <i className="icon-share"></i> Share </a>
                  </li>
                  <li className="divider"> </li>
                  <li>
                    <a href="/">
                      <i className="icon-flag"></i> Comments
                      <span className="badge badge-success">4</span>
                    </a>
                  </li>
                  <li>
                    <a href="/">
                      <i className="icon-users"></i> Feedbacks
                      <span className="badge badge-danger">2</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="page-top">
              <form className="search-form" action="page_general_search_2.html" method="GET">
                <div className="input-group">
                  <input type="text" className="form-control input-sm" placeholder="Search..." name="query" />
                  <span className="input-group-btn">
                    <a href="/" class="btn submit">
                      <i className="icon-magnifier"></i>
                    </a>
                  </span>
                </div>
              </form>
              <div className="top-menu">
                <ul className="nav navbar-nav pull-right">
                  <li className="separator hide"> </li>
                  <li onClick={() => { this.handleShowHideMenuToggler() }} className={this.state.MenuToggler ? 'dropdown dropdown-user dropdown-dark open' : 'dropdown dropdown-user dropdown-dark'}>
                    <a href="/" className="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">
                      <span className="username username-hide-on-mobile"> Nick </span>
                      <img alt="" className="img-circle" src={avatarUser} /> </a>
                    <ul className="dropdown-menu dropdown-menu-default">
                      <li>
                        <a href="page_user_profile_1.html">
                          <i className="icon-user"></i> My Profile </a>
                      </li>
                      <li>
                        <a href="app_calendar.html">
                          <i className="icon-calendar"></i> My Calendar </a>
                      </li>
                      <li>
                        <a href="app_inbox.html">
                          <i className="icon-envelope-open"></i> My Inbox
                          <span className="badge badge-danger"> 3 </span>
                        </a>
                      </li>
                      <li>
                        <a href="app_todo_2.html">
                          <i className="icon-rocket"></i> My Tasks
                          <span className="badge badge-success"> 7 </span>
                        </a>
                      </li>
                      <li className="divider"> </li>
                      <li>
                        <a href="page_user_lock_1.html">
                          <i className="icon-lock"></i> Lock Screen </a>
                      </li>
                      <li>
                        <a href="#" onClick={processLogout}>
                          <i className="icon-key"></i> Log Out </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.user.isLoggedIn
  };
};

const mapDispatchToProps = dispatch => {
  return {
    processLogout: () => dispatch(actions.processLogout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
