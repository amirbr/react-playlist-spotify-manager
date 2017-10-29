import React, { Component } from 'react';
import { Col, Row, Grid } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'multireducer';
import { loadSongs, addToPlaylist } from '../../redux/modules/songs';
import { Song } from '../../components';

const styles = require('./SongContainer.scss');

@connect(
  state => ({ songsList: state.songs.songsList, playlist: state.songs.playlist }),
  dispatch => bindActionCreators({ loadSongs, addToPlaylist }, dispatch)
)
export default class SongContainer extends Component {
  static propTypes = {
    songsList: PropTypes.array.isRequired,
    playlist: PropTypes.array.isRequired,
    loadSongs: PropTypes.func.isRequired,
    addToPlaylist: PropTypes.func.isRequired,
  }

  componentWillMount() {
    if (this.props.songsList.length === 0) {
      this.props.loadSongs();
    }
  }

  render() {
    const { songsList, addToPlaylist } = this.props; // eslint-disable-line no-shadow
    const songList = songsList.map(song => (
      <Song
        key={song.id}
        song={song}
        addToPlaylistFunc={() => addToPlaylist(song.id)}
        isOnPlaylist={!!this.props.playlist.find(playlistSong => song.id === playlistSong.id)}
      />
    ));

    return (
      <Grid bsClass={`${styles.margin} container`} >
        <Row>
          <Col className={styles.smallDesktopGrid} md={12} sm={6}>
            <div>
              {songList}
            </div>
          </Col>
        </Row>
      </Grid>
    );
  }
}

