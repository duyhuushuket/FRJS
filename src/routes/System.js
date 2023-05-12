import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import dashBoard from '../containers/System/dashBoard';
import User from '../containers/System/Mart/User/User';
import Order from '../containers/System/Order';
import ProductManage from '../containers/System/ProductManage';
import RegisterPackageGroupOrAcc from '../containers/System/RegisterPackageGroupOrAcc';

class System extends Component {
  render() {
    const { systemMenuPath } = this.props;
    return (
      <div className="system-container">
        <div className="system-list">
          <Switch>
            <Route path="/dashboard" component={dashBoard} />
            <Route path="/user/list" component={User} />
            <Route path="/order/list" component={Order} />
            <Route path="/system/product-manage" component={ProductManage} />
            <Route path="/system/register-package-group-or-account" component={RegisterPackageGroupOrAcc} />
            <Route component={() => { return (<Redirect to={systemMenuPath} />) }} />
          </Switch>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    systemMenuPath: state.app.systemMenuPath
  };
};

const mapDispatchToProps = dispatch => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
