import React, { Component } from 'react';
import { Media } from 'react-bootstrap';
import PropTypes from 'prop-types';

const styles = require('./Song.scss');

export default class Song extends Component {
  static propTypes = {
    song: PropTypes.object.isRequired,
    addToPlaylistFunc: PropTypes.func.isRequired,
    isOnPlaylist: PropTypes.bool.isRequired
  };

  render() {
    return (
      <div onClick={this.props.addToPlaylistFunc}>
        <Media className="songBox" bsClass={styles.songBox}>
          <Media.Left>
            <img width={64} height={64} src={this.props.song.imageUrl} alt="song" />
          </Media.Left>
          <Media.Body>
            <Media.Heading>{this.props.song.name}</Media.Heading>
            <p>{this.props.song.description}</p>
          </Media.Body>
          <Media.Right className={styles.center}>
            <i className={`fa ${(this.props.isOnPlaylist) ? 'fa-heart like' : 'fa-heart-o'} fa-3x`} aria-hidden="true" />
          </Media.Right>
        </Media>
      </div>
    );
  }
}
