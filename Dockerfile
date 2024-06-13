ARG NODE_IMAGE=node:lts-alpine
ARG ENV=production
ARG PORT

FROM $NODE_IMAGE AS build

WORKDIR /opt/app
# Copy all to the working directory.

COPY . .

# Run a npm install and build
RUN yarn install && \
    yarn run build

# Stage 2: Create the production image
FROM $NODE_IMAGE AS prod

# Set the working directory in the container to /opt/app
WORKDIR /opt/app

# Set environment variable
ENV NODE_ENV=$ENV
ENV PORT=$PORT

# Copy package.json and any lockfiles to the working directory.
COPY package.json yarn.lock ./

# Run CI for production
RUN yarn install --production

EXPOSE $PORT

# Copy necessary files from the "builder" stage
COPY --from=build /opt/app/build ./build
COPY --from=build /opt/app/docusaurus.config.js .

# Command to run docusaurus
CMD ["sh", "-c", "yarn run serve --port $PORT"]
