import React, { Component } from 'react';
import { Media, Image } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const styles = require('./SongPlaylist.scss');

@connect(
  state => ({ playlist: state.songs.playlist }),
)
export default class SongPlaylist extends Component {
  static propTypes = {
    songData: PropTypes.object.isRequired,
    addToPlaylistFunc: PropTypes.func.isRequired
  };

  render() {
    const { songData, addToPlaylistFunc } = this.props;
    return (
      <Media onClick={addToPlaylistFunc} className={styles.border}>
        <Media.Left align="middle">
          <i className={`${styles.red} fa fa-heart fa-2x`} aria-hidden="true" />
        </Media.Left>
        <Media.Left align="middle">
          <Image width={42} height={42} src={songData.imageUrl} alt="songplaylist" circle />
        </Media.Left>
        <Media.Body>
          <Media.Heading>{songData.name}</Media.Heading>
          <p>{songData.description}</p>
        </Media.Body>
        <Media.Right>
          <span>{songData.time}</span>
        </Media.Right>
      </Media>
    );
  }
}
