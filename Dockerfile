# Mintlify's hosted deployment is the supported production path for native
# search. This image is for controlled self-hosted/static deployments and
# preview environments.
FROM node:22-bookworm-slim AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npx mint export --output /tmp/pipeops-docs-export.zip

FROM node:22-bookworm-slim

WORKDIR /app

RUN apt-get update \
  && apt-get install --yes --no-install-recommends unzip \
  && rm -rf /var/lib/apt/lists/*

COPY --from=builder /tmp/pipeops-docs-export.zip /tmp/pipeops-docs-export.zip
RUN unzip /tmp/pipeops-docs-export.zip -d /app \
  && rm /tmp/pipeops-docs-export.zip

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

CMD ["node", "/app/serve.js"]
