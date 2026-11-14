export type SpotifyTrack = {
  isPlaying: boolean;
  title: string;
  artist: string;
  album: string;
  albumImageUrl: string;
  songUrl: string;
};

type SpotifyApiTrack = {
  name: string;
  artists: { name: string }[];
  album: { name: string; images?: { url: string }[] };
  external_urls: { spotify: string };
};

const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const NOW_PLAYING_ENDPOINT = "https://api.spotify.com/v1/me/player/currently-playing";
const RECENTLY_PLAYED_ENDPOINT = "https://api.spotify.com/v1/me/player/recently-played?limit=1";

async function getAccessToken(clientId: string, clientSecret: string, refreshToken: string) {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to refresh Spotify access token (HTTP ${response.status}).`);
  }

  const data = await response.json();
  return data.access_token as string;
}

async function fetchCurrentlyPlaying(accessToken: string) {
  const response = await fetch(NOW_PLAYING_ENDPOINT, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (response.status === 204 || response.status > 400) {
    return null;
  }

  return response.json();
}

async function fetchRecentlyPlayed(accessToken: string) {
  const response = await fetch(RECENTLY_PLAYED_ENDPOINT, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch recently played track (HTTP ${response.status}).`);
  }

  const data = await response.json();
  return data.items?.[0] ?? null;
}

function toTrack(track: SpotifyApiTrack, isPlaying: boolean): SpotifyTrack {
  return {
    isPlaying,
    title: track.name,
    artist: track.artists.map(artist => artist.name).join(", "),
    album: track.album.name,
    albumImageUrl: track.album.images?.[0]?.url ?? "",
    songUrl: track.external_urls.spotify,
  };
}

// GitHub Pages has no server, so this runs at build time (in GitHub Actions)
// and the result is baked into the page until the next build.
export async function getSpotifyTrack(): Promise<SpotifyTrack | null> {
  const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN } = process.env;

  if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET || !SPOTIFY_REFRESH_TOKEN) {
    console.warn("[spotify] Missing Spotify environment variables, skipping.");
    return null;
  }

  try {
    const accessToken = await getAccessToken(SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN);

    const nowPlaying = await fetchCurrentlyPlaying(accessToken);
    if (nowPlaying?.item) {
      return toTrack(nowPlaying.item, nowPlaying.is_playing);
    }

    const recent = await fetchRecentlyPlayed(accessToken);
    if (recent?.track) {
      return toTrack(recent.track, false);
    }

    return null;
  } catch (error) {
    // Don't fail the deploy over Spotify; the page shows a fallback instead.
    console.warn("[spotify]", error);
    return null;
  }
}
