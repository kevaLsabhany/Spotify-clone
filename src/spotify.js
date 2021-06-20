export const authPoint = "https://accounts.spotify.com/authorize";

const redirectUri = "<Your website link>";

const clientId = "<API key>";

const scopes = [
    "user-read-currently-playing",
    "user-read-recently-played",
    "user-top-read",
    "user-read-playback-state",
    "user-modify-playback-state"
];

export const getTokenFromUrl = () => {
    return window.location.hash
        .substring(1)
        .split('&')
        .reduce((initial, item) => {
            let parts = item.split("=");
            initial[parts[0]] = decodeURIComponent(parts[1]);
            return initial;
        }, {})
}

export const loginUrl = `${authPoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`;