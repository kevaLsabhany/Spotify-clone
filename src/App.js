import { useEffect } from 'react'
import './App.css';
import Login from './Login';
import { getTokenFromUrl } from './spotify'
import Player from './Player'
import SpotifyWebApi from 'spotify-web-api-js'
import { useDataLayerValue } from './DataLayer'

const spotify = new SpotifyWebApi();

function App() {

  const [{ user, token }, dispatch] = useDataLayerValue();
  useEffect(() => {
    const hash = getTokenFromUrl();
    const _token = hash.access_token;
    console.log("ff", _token)
    if (_token) {
      console.log("we ar e in")
      dispatch({ type: "SET_TOKEN", token: _token });

      spotify.setAccessToken(_token);
      spotify.getMe().then(user => {
        dispatch({ type: "SET_USER", user: user });
      });
      spotify.getUserPlaylists().then((playlists) => {
        console.log("pppppp", playlists)
        dispatch(
          {
            type: "SET_PLAYLISTS",
            playlists: playlists
          }
        )
      });
      spotify.getPlaylist('5unt2xMbBlgJLTphgF3hQe').then(response => {
        dispatch(
          {
            type: "SET_DISCOVER_WEEKLY",
            discover_weekly: response
          }
        )
      })
    }
  }, [])
  return (
    <div className="App">
      {
        token ? <Player spotify={spotify} /> : <Login />
      }
    </div>
  );
}

export default App;
