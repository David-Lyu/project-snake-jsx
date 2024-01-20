# syntax=docker/dockerfile:1

# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/engine/reference/builder/

ARG NODE_VERSION=21.2.0

################################################################################
# Use node image for base image for all stages.
FROM node:${NODE_VERSION}-alpine as frontend
# Set working directory for all build stages.
WORKDIR /app/src/client
# Copy ignored package-lock since made in M1
COPY . .
RUN npm install
# Run the build script.
CMD npm run build
