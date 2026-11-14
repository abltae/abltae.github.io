// Gets a Spotify refresh token and stores all three Spotify secrets in the
// GitHub repo, without printing any of them.
//
// Run it in your own terminal (it asks for input):  npm run spotify:auth
// Your Spotify app must list this exact redirect URI:  http://127.0.0.1:8888/callback
import { spawnSync } from "node:child_process";
import { randomBytes } from "node:crypto";
import { createServer } from "node:http";
import { createInterface } from "node:readline";

const REPO = "abltae/abltae.github.io";
const PORT = 8888;
const REDIRECT_URI = `http://127.0.0.1:${PORT}/callback`;
const SCOPES = "user-read-currently-playing user-read-recently-played";

function ask(question, { hidden = false } = {}) {
  return new Promise(resolve => {
    const rl = createInterface({ input: process.stdin, output: process.stdout, terminal: true });
    if (hidden) {
      // Echo nothing while the secret is typed or pasted.
      rl._writeToOutput = text => {
        if (text.startsWith(question)) rl.output.write(question);
      };
    }
    rl.question(question, answer => {
      rl.close();
      if (hidden) process.stdout.write("\n");
      resolve(answer.trim());
    });
  });
}

function setSecret(name, value) {
  const result = spawnSync("gh", ["secret", "set", name, "-R", REPO], { input: value, encoding: "utf8" });
  if (result.status !== 0) {
    throw new Error(`gh secret set ${name} failed: ${result.stderr.trim()}`);
  }
  console.log(`  ✓ ${name}`);
}

const clientId = process.env.SPOTIFY_CLIENT_ID || (await ask("Spotify Client ID: "));
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET || (await ask("Spotify Client Secret (hidden): ", { hidden: true }));
if (!clientId || !clientSecret) {
  console.error("Client ID and Client Secret are both required.");
  process.exit(1);
}

const state = randomBytes(16).toString("hex");
const authorizeUrl =
  "https://accounts.spotify.com/authorize?" +
  new URLSearchParams({ response_type: "code", client_id: clientId, scope: SCOPES, redirect_uri: REDIRECT_URI, state });

const server = createServer(async (req, res) => {
  const url = new URL(req.url, REDIRECT_URI);
  if (url.pathname !== "/callback") {
    res.writeHead(404).end();
    return;
  }

  const finish = (status, message) => {
    res.writeHead(status, { "Content-Type": "text/plain; charset=utf-8" }).end(message);
    server.close();
  };

  if (url.searchParams.get("state") !== state) {
    finish(400, "State mismatch. Run the script again.");
    console.error("State mismatch. Run the script again.");
    process.exitCode = 1;
    return;
  }
  if (url.searchParams.get("error")) {
    finish(400, `Spotify returned: ${url.searchParams.get("error")}`);
    console.error(`Spotify returned: ${url.searchParams.get("error")}`);
    process.exitCode = 1;
    return;
  }

  try {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({ grant_type: "authorization_code", code: url.searchParams.get("code"), redirect_uri: REDIRECT_URI }),
    });
    const data = await response.json();
    if (!response.ok || !data.refresh_token) {
      throw new Error(`Token exchange failed (HTTP ${response.status}): ${data.error_description ?? data.error ?? "no refresh token"}`);
    }

    console.log(`Saving secrets to ${REPO}:`);
    setSecret("SPOTIFY_CLIENT_ID", clientId);
    setSecret("SPOTIFY_CLIENT_SECRET", clientSecret);
    setSecret("SPOTIFY_REFRESH_TOKEN", data.refresh_token);
    finish(200, "Done! Spotify secrets saved to GitHub. You can close this tab.");
    console.log("Done. The next deploy will show your Spotify track.");
  } catch (error) {
    finish(500, "Something went wrong; check the terminal.");
    console.error(error.message);
    process.exitCode = 1;
  }
});

server.listen(PORT, "127.0.0.1", () => {
  console.log("Opening Spotify to approve access…\nIf no browser opens, visit:\n" + authorizeUrl);
  spawnSync("open", [authorizeUrl]);
});
