import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { SongPlaylist } from '../../components';
import {bindActionCreators} from "multireducer";
import {addToPlaylist} from "../../redux/modules/songs";

const styles = require('./SidePlaylistContainer.scss');

@connect(
  state => ({ playlist: state.songs.playlist }),
  dispatch => bindActionCreators({ addToPlaylist }, dispatch)
)
export default class SidePlaylistContainer extends Component {
  static propTypes = {
    playlist: PropTypes.array.isRequired,
    addToPlaylist: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = { sidePlaylistToggle: false };
    this.songsPlaylist = [];
  }

  componentWillMount() {
    this.songsPlaylist = this.props.playlist.map((song) => {
      if (!this.state.sidePlaylistToggle) {
        this.setState({
          sidePlaylistToggle: !this.state.sidePlaylistToggle
        });
      }
      return (<SongPlaylist songData={song} key={song.id} />);
    });
  }
  componentWillReceiveProps(nextProps) {
    this.songsPlaylist = nextProps.playlist.map((song) => {
      if (!this.state.sidePlaylistToggle) {
        this.setState({
          sidePlaylistToggle: !this.state.sidePlaylistToggle
        });
      }
      return (
        <SongPlaylist
          songData={song}
          key={song.id}
          addToPlaylistFunc={() => this.props.addToPlaylist(song.id)}
        />
      );
    });
    if (this.songsPlaylist.length > 0) {
      this.setState({ sidePlaylistToggle: true });
    } else {
      this.setState({ sidePlaylistToggle: false });
    }
  }
  render() {
    return (
      <div className={`${(this.state.sidePlaylistToggle) ? styles.openPlaylist : styles.closePlaylist} ${styles.slidePlaylist}`}>
        <h4 className={`${styles.title} text-center`}>My Playlist</h4>
        <div className={styles.padding}>
          {this.songsPlaylist}
        </div>
      </div>
    );
  }
}
