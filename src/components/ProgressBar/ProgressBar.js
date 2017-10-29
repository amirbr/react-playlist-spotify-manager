import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ProgressBar extends Component {
  static propTypes = {
    translate: PropTypes.number.isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      translate: 0,
      progressBarHeight: 25
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.translate !== 0 && !isNaN(nextProps.translate)) {
      this.setState({ translate: nextProps.translate });
    }
  }
  render() {
    return (
      <svg width={800} height={this.state.progressBarHeight}>
        <g>
          <rect x={0} y={0} width={800} height={12} opacity="0" viewBox="0 0 800 12" />
          <rect x={0} y={12} width={800} height={this.state.progressBarHeight} fill="#1a94cb" />
          <rect x={0} y={12} width={this.state.translate} height={this.state.progressBarHeight} fill="#1f6d8f" />
        </g>
      </svg>
    );
  }
}
