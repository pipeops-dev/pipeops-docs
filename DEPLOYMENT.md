# Deployment

## Recommended production deployment: Mintlify hosting

Use Mintlify hosting when the documentation needs native search. Mintlify
builds and deploys the repository through its GitHub App, and search is
enabled for the connected Mintlify project. The free Starter account can use
search; the project still needs to be created and connected in the Mintlify
dashboard.

1. Create or select the project at [Mintlify](https://mintlify.com/start).
2. Connect the GitHub repository and install the Mintlify GitHub App.
3. Set the deployment branch to `feat/mintlify-migration` for the current
   branch, or to the branch you use for production.
4. Configure `docs.pipeops.io` and its DNS records in the Mintlify dashboard.
5. Open the deployed site and test the search dialog with a known page title.

Mintlify's hosted deployment owns the search index and search API, so no
search API key or search container should be added to this repository.

## Docker deployment

The included `Dockerfile` creates a static Mintlify export and serves it with
the server included in Mintlify's export bundle:

```bash
docker build -t pipeops-docs .
docker run --rm -p 3000:3000 pipeops-docs
```

This is appropriate for a controlled internal/self-hosted deployment or a
static preview. The exported site does not authenticate the Mintlify CLI and
does not provide the same hosted search service. Do not deploy this image as
the production path if native Mintlify search is required.

For local preview search, authenticate the CLI on the host and run:

```bash
npx mint login
npx mint status
npm run dev
```

Do not bake Mintlify session tokens into the image or Dockerfile. If a
self-hosted deployment must have search, it needs a separately approved
search implementation and its own indexing/API setup; that is outside the
native Mintlify feature set used by this migration.

## Runtime notes

- `npm run build` runs Mintlify validation and should be run in CI before
  publishing.
- The Docker image uses Node 22, which satisfies the repository's Node engine
  requirement.
- The Mintlify CLI packages are licensed under Elastic License 2.0. Review
  those terms before using the CLI/export bundle as a public hosted service.
