# hono-template-bun

[Hono](https://github.com/honojs/hono) framework w/ [Bun](https://github.com/oven-sh/bun) starter repository 🐢

## Tech Stack

| Environments | Languages  | Linters                           | Frameworks   | Libraries       | Testing        | CI/CD                 | PaaS                                            |
| :----------- | :--------- | :-------------------------------- | :----------- | :-------------- | :------------- | :-------------------- | :---------------------------------------------- |
| ![bun-logo]  | ![ts-logo] | ![biome-logo]<br>![lefthook-logo] | ![hono-logo] | ![valibot-logo] | ![vitest-logo] | ![githubactions-logo] | ![cloudflareworkers-logo]<br>![cloudflare-logo] |

[bun-logo]: https://img.shields.io/badge/-Bun-000000.svg?logo=bun&style=flat&logoColor=ffffff
[biome-logo]: https://img.shields.io/badge/-Biome-60A5FA.svg?logo=biome&style=flat&logoColor=ffffff
[lefthook-logo]: https://img.shields.io/badge/-Lefthook-FF1E1E.svg?logo=lefthook&style=flat&logoColor=ffffff
[ts-logo]: https://img.shields.io/badge/-TypeScript-3178C6.svg?logo=typescript&style=flat&logoColor=ffffff
[hono-logo]: https://img.shields.io/badge/-Hono-E36002.svg?logo=hono&style=flat&logoColor=ffffff
[valibot-logo]: https://img.shields.io/badge/🤖-Valibot-54AEFF.svg?logo=&style=flat&logoColor=ffffff&labelColor=54AEFF
[vitest-logo]: https://img.shields.io/badge/-Vitest-6E9F18.svg?logo=vitest&style=flat&logoColor=ffffff
[githubactions-logo]: https://img.shields.io/badge/-GitHub%20Actions-2088FF.svg?logo=githubactions&style=flat&logoColor=ffffff
[cloudflareworkers-logo]: https://img.shields.io/badge/-Cloudflare%20Workers-F38020.svg?logo=cloudflareworkers&style=flat&logoColor=ffffff
[cloudflare-logo]: https://img.shields.io/badge/-Cloudflare-F38020.svg?logo=cloudflare&style=flat&logoColor=ffffff

### Other

- [wrangler](https://developers.cloudflare.com/workers/wrangler)
- [tsx](https://github.com/privatenumber/tsx)

## Development

1. [Required](#required)
2. [Environment Variables](#environment-variables)
3. [Commands](#commands)

### Required

```ini
bun = ">=1.2"
```

> [!TIP]
>
> See [`.prototools`](./.prototools) for more details.

### Environment Variables

```ini
NODE_ENV=production
API_ENDPOINT_URL=http://localhost:8787
API_ENDPOINT_SECRET=your_generated_secret
GOOGLE_CLIENT_EMAIL=your_google_client_email
GOOGLE_PRIVATE_KEY=your_google_private_key
```

> [!TIP]
>
> See [`.env.example`](./.env.example) for more details.

### Commands

#### Installing Packages

```sh
bun i
```

> [!IMPORTANT]
>
> After the initial installation (if the format-on-save feature is not working), restart VS Code (IDE).

#### Start Development Server

```sh
bun run dev
```

#### Testing Cron

```sh
bun run dev:cron
```

> [!TIP]
>
> To execute all crons, use the following URL:
>
> ```sh
> curl "http://localhost:8787/__scheduled?cron=*+*+*+*+*"
> ```
>
> Docs: https://developers.cloudflare.com/workers/configuration/cron-triggers

#### Making Development Server Public

```sh
bun run dev
bun run start
```

Use [ngrok](https://ngrok.com) to make localhost:8787 publicly accessible.

> [!IMPORTANT]
>
> Install ngrok from [ngrok - Setup & Installation](https://dashboard.ngrok.com/get-started/setup) according to your environment.
> For Windows, download the `Download for Windows (64-Bit)` file, extract it, and place the exe file in the repository's root directory.

#### Linting

```sh
bun run lint
```

#### Formatting Code

```sh
bun run format
```

#### Runs linter and formatter

```sh
bun run check
```

#### Deploy

```sh
bun run deploy:mini
```

#### Generate API Endpoint Authentication Key

```sh
bun run gen:secret
```

> [!IMPORTANT]
>
> Set the generated key in the environment variable `API_ENDPOINT_SECRET`.

## Documents

- [About Authentication](#about-authentication)
- [Changing Execution Schedule](#changing-execution-schedule)

### API Endpoint

Execute the test `ping` API.

```sh
GET http://localhost:8787/api/v1/ping
```

### About Authentication

Authentication can be implemented for API endpoints.

```ts
// src/index.ts
app.use("/api/v1/ping/*", authMiddleware);
```

> [!TIP]
>
> This is configured to work only in production and staging environments.
> For details, refer to [`src/middleware/auth.ts`](./src/middleware/auth.ts).

#### Client Request Example

```ts
async function makeAuthenticatedRequest(path: string) {
  const timestamp = Date.now().toString();
  const apiKey = "your_secure_random_string"; // Same value as API_ENDPOINT_SECRET
  // Generate signature
  const payload = timestamp + path;
  const signature = await generateHMAC(payload, apiKey);
  const response = await fetch(`https://your-api.com${path}`, {
    headers: {
      "X-Request-Timestamp": timestamp,
      "X-Signature": signature,
    },
  });
  return response;
}
```

> [!NOTE]
>
> For the contents of `generateHMAC()`, refer to [`src/utils/crypto.ts`](./src/utils/crypto.ts).

### Changing Execution Schedule

Modify `crons` in [`wrangler.toml`](./wrangler.toml).

> [!TIP]
>
> The timezone for cron is `UTC`.
