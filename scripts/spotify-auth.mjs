// Gets a Spotify refresh token and stores all three Spotify secrets in the
// GitHub repo, without printing any of them.
//
// Run it in your own terminal (it asks for input):  npm run spotify:auth
// Your Spotify app must list this exact redirect URI:  https://abltae.github.io/callback
// That page (src/app/callback) shows the one-time code to paste back here.
import { spawnSync } from "node:child_process";
import { randomBytes } from "node:crypto";
import { createInterface } from "node:readline";

const REPO = "abltae/abltae.github.io";
const REDIRECT_URI = "https://abltae.github.io/callback";
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

// Accepts either the bare code from the callback page or the whole callback URL.
function parseCode(input, expectedState) {
  if (!input.startsWith("http")) return input;
  const params = new URL(input).searchParams;
  if (params.get("error")) throw new Error(`Spotify returned: ${params.get("error")}`);
  if (params.get("state") !== expectedState) throw new Error("That URL is from a different sign-in. Run the script again.");
  return params.get("code");
}

try {
  const clientId = process.env.SPOTIFY_CLIENT_ID || (await ask("Spotify Client ID: "));
  const clientSecret =
    process.env.SPOTIFY_CLIENT_SECRET || (await ask("Spotify Client Secret (hidden): ", { hidden: true }));
  if (!clientId || !clientSecret) throw new Error("Client ID and Client Secret are both required.");

  const state = randomBytes(16).toString("hex");
  const authorizeUrl =
    "https://accounts.spotify.com/authorize?" +
    new URLSearchParams({ response_type: "code", client_id: clientId, scope: SCOPES, redirect_uri: REDIRECT_URI, state });

  console.log("\nOpening Spotify to approve access…\nIf no browser opens, visit:\n" + authorizeUrl + "\n");
  spawnSync("open", [authorizeUrl]);

  const code = parseCode(await ask("Paste the code from the page: "), state);
  if (!code) throw new Error("No code entered.");

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({ grant_type: "authorization_code", code, redirect_uri: REDIRECT_URI }),
  });
  const data = await response.json();
  if (!response.ok || !data.refresh_token) {
    throw new Error(`Token exchange failed (HTTP ${response.status}): ${data.error_description ?? data.error ?? "no refresh token"}`);
  }

  console.log(`\nSaving secrets to ${REPO}:`);
  setSecret("SPOTIFY_CLIENT_ID", clientId);
  setSecret("SPOTIFY_CLIENT_SECRET", clientSecret);
  setSecret("SPOTIFY_REFRESH_TOKEN", data.refresh_token);
  console.log("Done. The next deploy will show your Spotify track.");
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
