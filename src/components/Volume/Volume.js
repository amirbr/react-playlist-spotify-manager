import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';

export default class Volume extends Component {
  static propTypes = {
    volume: PropTypes.number.isRequired,
    setVolume: PropTypes.func.isRequired,
    volumeHeight: PropTypes.number
  };
  static defaultProps = {
    volumeHeight: 25
  };

  onVolumeClick = (event) => {
    const newVolume = (event.clientX - event.target.getBoundingClientRect().left);
    this.props.setVolume(Math.round(newVolume) / 100);
  };
  render() {
    const tooltip = (
      <Tooltip id="tooltip"><strong>Volume Me!!!</strong> </Tooltip>
    );
    return (
      <OverlayTrigger placement="top" overlay={tooltip}>
        <svg
          onClick={this.onVolumeClick}
          width={100}
          height={this.props.volumeHeight}
        >
          <g>
            <rect x={0} y={0} width={100} height={12} opacity="0" viewBox="0 0 100 12" />
            <rect x={0} y={12} width={100} height={this.props.volumeHeight} fill="#1a94cb" />
            <rect x={0} y={12} width={this.props.volume * 100} height={this.props.volumeHeight} fill="#1f6d8f" />
          </g>
        </svg>
      </OverlayTrigger>
    );
  }
}
