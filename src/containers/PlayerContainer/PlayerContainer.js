import React, { Component } from 'react';
import { Col, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ProgressBar, Time, Volume } from '../../components';

const styles = require('./PlayerContainer.scss');

@connect(
  state => ({ playlist: state.songs.playlist })
)
export default class PlayerContainer extends Component {
  static propTypes = {
    playlist: PropTypes.array.isRequired,
    playFunc: PropTypes.func.isRequired,
    pauseFunc: PropTypes.func.isRequired,
    setVolumeFunc: PropTypes.func.isRequired,
    isPlaying: PropTypes.bool.isRequired,
    duration: PropTypes.number.isRequired,
    currentTime: PropTypes.number.isRequired,
    volume: PropTypes.number.isRequired,
    currentSongId: PropTypes.number.isRequired,
    setCurrentSongId: PropTypes.func.isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      playerContainerToggle: false,
      iteratorSong: 0
    };
  }
  componentWillMount() {
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.playlist.length > 0) {
      // if (!this.state.playerContainerToggle) {
      this.setState({
        playerContainerToggle: true
      });
      // }
    } else {
      this.setState({
        playerContainerToggle: false
      });
    }
  }
  pausePlay() {
    if (!this.props.isPlaying) {
      this.props.playFunc(this.props.playlist[this.props.currentSongId].preview_song);
    } else {
      this.props.pauseFunc();
    }
  }
  nextSong() {
    // if (this.state.iteratorSong < this.props.playlist.length - 1) {
    //   // should dispatch song id to redux state instead of local state iterator
    //   this.setState({
    //     iteratorSong: ++this.state.iteratorSong
    //   });
    //   this.props.playFunc(this.props.playlist[this.state.iteratorSong].preview_song);
    // }

    if (this.props.currentSongId < this.props.playlist.length - 1) {
      this.props.setCurrentSongId(this.props.currentSongId + 1);
      // this.props.playFunc(this.props.playlist[this.props.currentSongId].preview_song);
      setTimeout(() => {
        this.props.playFunc(this.props.playlist[this.props.currentSongId].preview_song);
      }, 0);
    }
  }
  previousSong() {
    // if (this.state.iteratorSong >= 0) {
    //   // should dispatch song id to redux state instead of local state iterator
    //   this.setState({
    //     iteratorSong: --this.state.iteratorSong
    //   });
    //   this.props.playFunc(this.props.playlist[this.state.iteratorSong].preview_song);
    // }

    if (this.props.currentSongId > 0) {
      this.props.setCurrentSongId(this.props.currentSongId - 1);
      setTimeout(() => {
        this.props.playFunc(this.props.playlist[this.props.currentSongId].preview_song);
      }, 0);
    }
  }
  render() {
    const { playlist, setVolumeFunc, volume } = this.props; // eslint-disable-line no-shadow
    return (
      <div className={`${(this.state.playerContainerToggle) ? styles.openPlayer : styles.closePlayer} ${styles.playerBox}`}>
        {(playlist.length > 0) ? (
          <div className={styles.customContainer}>
            <Row>
              <Col className="text-center" md={4}>
                <Volume setVolume={setVolumeFunc} volume={volume} />
              </Col>
              <Col className="text-center" md={4}>
                <p className={styles.currentSong}>{ playlist[this.props.currentSongId].name }</p>
              </Col>
              <Col md={4} />
            </Row>
            <Row>
              <Col className="text-center" md={4}>
                <i onClick={() => this.previousSong()} className={`${styles.cursor} fa fa-backward fa-2x`} aria-hidden="true" />
              </Col>
              <Col className="text-center" md={4}>
                <i onClick={() => this.pausePlay()} className={`${styles.cursor} fa ${(this.props.isPlaying) ? 'fa-pause' : 'fa-play'} fa-2x`} />
              </Col>
              <Col className="text-center" md={4}>
                <i onClick={() => this.nextSong()} className={`${styles.cursor} fa fa-forward fa-2x`} aria-hidden="true" />
              </Col>
            </Row>
            <Row>
              <Col className="text-center" md={12}>
                <ProgressBar translate={this.props.currentTime * (800 / this.props.duration)} />
              </Col>
            </Row>
            <Row>
              <Col className="text-center">
                <Time time={this.props.duration} />
                <span className={styles.timeSeparator}>{' / '}</span>
                <Time time={this.props.currentTime} />
              </Col>
            </Row>
          </div>
        ) : (<div />) }
      </div>
    );
  }
}
