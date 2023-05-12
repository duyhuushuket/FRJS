import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
class dashBoard extends Component {

  state = {

  }
  componentDidMount() {
    document.body.style.backgroundColor = "#e9ecf3";
  }
  render() {
    return (
      <div className="text-center">dashBoard Page</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(dashBoard);
