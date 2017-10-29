import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'multireducer';
import PlayerContainer from './PlayerContainer';
import { setCurrentSongId } from '../../redux/modules/songs';

@connect(
  state => ({ playlist: state.songs.playlist, currentSongId: state.songs.currentSongId }),
  dispatch => bindActionCreators({ setCurrentSongId }, dispatch)
)
export default class PlayerWrapperContainer extends Component {
  static propTypes = {
    currentSongId: PropTypes.number.isRequired,
    setCurrentSongId: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      volume: 0.8,
      isPlaying: false,
      duration: 0,
      currentTime: 0,
    };
  }
  componentDidMount() {
    this.audioElement = document.createElement('audio');
  }
  componentWillUnmount() {
    this.audioElement = null;
    clearTimeout(this.currentTimeChecker);
  }
  setVolume = (volume) => {
    this.setState({ volume });
    this.audioElement.volume = volume;
  }

  checkCurrentTime() {
    if (this.currentTimeChecker) {
      clearTimeout(this.currentTimeChecker);
    }
    this.currentTimeChecker = setTimeout(() => {
      // console.log('in');
      const currentTime = this.audioElement.currentTime;
      this.setState({
        currentTime
      });
      // if (this.audioElement.paused) {
        // console.log('paused');
       // return;
      // }
      this.checkCurrentTime();
    }, 50);
  }

  pauseSong = () => {
    clearTimeout(this.currentTimeChecker);
    this.setState({
      isPlaying: false,
      currentTime: this.audioElement.currentTime,
    });
    this.audioElement.pause();
  }

  playSong = (songUrl) => {
    this.checkCurrentTime();
    this.setState({
      isPlaying: true
    });
    if (this.audioElement.src === songUrl && this.audioElement.paused) {
      return this.audioElement.play();
    }
    this.audioElement.src = songUrl;
    this.audioElement.load();
    this.audioElement.onloadeddata = () => {
      this.setState({
        duration: this.audioElement.duration,
      });
      this.audioElement.play();
    };
  }

  render() {
    return (<PlayerContainer
      isPlaying={this.state.isPlaying}
      duration={this.state.duration}
      currentTime={this.state.currentTime}
      setVolumeFunc={this.setVolume}
      volume={this.state.volume}
      playFunc={this.playSong}
      pauseFunc={this.pauseSong}
      currentSongId={this.props.currentSongId}
      setCurrentSongId={this.props.setCurrentSongId}
    />);
  }
}
