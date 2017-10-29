import React, { Component } from 'react';
import { SidePlaylistContainer, SongContainer, PlayerWrapperContainer, SearchContainer } from '../../containers';

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = { artist: '' };
  }

  render() {
    return (
      <div>
        <SearchContainer />
        <SongContainer />
        <SidePlaylistContainer />
        <PlayerWrapperContainer />
      </div>
    );
  }
}

