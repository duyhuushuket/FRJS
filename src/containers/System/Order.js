import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
class Order extends Component {
  state = {

  }
  componentDidMount() {

  }
  render() {
    return (
      <div className="text-center">List Orders</div>
    );
  }
}

const mapStateToProps = state => {
  return {
  };
};
const mapDispatchToProps = dispatch => {
  return {
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Order);
