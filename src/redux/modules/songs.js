const LOAD_SONGS = 'redux-example/songs/LOAD_SONGS';
const ADD_TO_PLAYLIST = 'redux-example/songs/ADD_TO_PLAYLIST';
const SET_CURRENT_SONG_ID = 'redux-example/songs/SET_CURRENT_SONG_ID';

const songsFromServer = [
  {
    id: 0,
    name: 'Work',
    description: 'Rihanna work work work...',
    imageUrl: 'https://i.scdn.co/image/661e1a935e2eacdd45c05ef618565535e7bed2ad',
    preview_song: 'https://p.scdn.co/mp3-preview/716d5059aff4caf46c88d09cb7baef5898e3a71c?cid=8897482848704f2a8f8d7c79726a70d4',
    time: '5:23'
  },
  {
    id: 1,
    name: 'Needed Me',
    description: 'Rihanna ...',
    imageUrl: 'https://i.scdn.co/image/64594c0b43d17057434b52debbca4a775989e9bc',
    preview_song: 'https://p.scdn.co/mp3-preview/58db452df6a351cc652e065ac8c6c0febef793cb?cid=8897482848704f2a8f8d7c79726a70d4',
    time: '4:23'
  },
  {
    id: 2,
    name: 'Love On The Brain',
    description: 'Rihanna work work work...',
    imageUrl: 'https://i.scdn.co/image/337f283c3c3085ad02b98b7fc54b6e74bdfe9319',
    preview_song: 'https://p.scdn.co/mp3-preview/16e42342599e423f7da57c9d2ce0c6758fc430e6?cid=8897482848704f2a8f8d7c79726a70d4',
    time: '5:55'
  },
  {
    id: 3,
    name: 'sokco msdky jkdsd',
    description: 'Make love',
    imageUrl: 'https://i.scdn.co/image/337f283c3c3085ad02b98b7fc54b6e74bdfe9319',
    preview_song: 'https://p.scdn.co/mp3-preview/91a31303c4101d8cdd1a7a3894644cc236c6e776?cid=8897482848704f2a8f8d7c79726a70d4',
    time: '3:12'
  },
];

const initialState = {
  songsList: [],
  playlist: [],
  currentSongId: 0
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_SONGS: {
      return {
        ...state,
        songsList: action.payload,
      };
    }
    case ADD_TO_PLAYLIST: {
      const song = state.songsList.find(currentSong => currentSong.id === action.songId);
      if (state.playlist.find(currentSong => currentSong.id === action.songId)) {
        return {
          ...state,
          playlist: [...state.playlist.filter(playlistSong => playlistSong.id !== action.songId)],
        };
      }
      return {
        ...state,
        playlist: [...state.playlist, song],
      };
    }
    case SET_CURRENT_SONG_ID: {
      return {
        ...state,
        currentSongId: action.songId
      };
    }
    default:
      return state;
  }
}

export const loadSongs = () => ({
  type: LOAD_SONGS,
  payload: songsFromServer,
});

export const addToPlaylist = songId => ({
  type: ADD_TO_PLAYLIST,
  songId,
});

export const setCurrentSongId = songId => ({
  type: SET_CURRENT_SONG_ID,
  songId
});
