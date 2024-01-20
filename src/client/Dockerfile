# syntax=docker/dockerfile:1

# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/engine/reference/builder/

ARG NODE_VERSION=21.2.0

################################################################################
# Use node image for base image for all stages.
FROM node:${NODE_VERSION}-alpine as base

# Set working directory for all build stages.
WORKDIR /app/src/client

RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=cache,target=/root/.npm \
    npm install

# Copy the rest of the source files into the image.
COPY . .
# Run the build script.
RUN npm run build

FROM alpine:3.19.0 as final
COPY --from=base /app/src/client/dist /app
################################################################################
# Create a new stage to run the application with minimal runtime dependencies
# where the necessary files are copied from the build stage.
# FROM base as final

# Use production node environment by default.
# ENV NODE_ENV production

# Run the application as a non-root user.
# USER node

# Copy package.json so that package manager commands can be used.
# COPY package.json .
# COPY --from=deps /usr/src/app/node_modules ./node_modules

# # Run the application.
# CMD node ./dist/index.html
