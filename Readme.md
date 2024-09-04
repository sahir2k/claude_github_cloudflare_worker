# GitHub OAuth Worker

This Cloudflare Worker provides a secure way to handle GitHub OAuth authentication and file downloads for [your claude github extension](https://github.com/sahir2k/claude_github_link).

## Setup

1. Clone this repository to your local machine.

2. Install dependencies:

   ```
   npm install
   ```

3. Update the `wrangler.toml` file:

   - Replace `your-client-id` with your GitHub OAuth App's Client ID.
   - Replace `your-client-secret` with your GitHub OAuth App's Client Secret.

   ```toml:wrangler.toml
   startLine: 19
   endLine: 21
   ```

4. In the `src/index.js` file, replace `<extension-id>` with your Chrome extension's ID:

   ```javascript:src/index.js
   startLine: 32
   endLine: 32
   ```

5. Deploy your worker:
   ```
   npx wrangler deploy
   ```

## Usage

This worker exposes two main endpoints:

### 1. OAuth Token Exchange

- **Endpoint**: `/exchange`
- **Method**: POST
- **Purpose**: Exchange the OAuth code for an access token
