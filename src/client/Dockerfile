# syntax=docker/dockerfile:1

# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/engine/reference/builder/

ARG NODE_VERSION=21.2.0

################################################################################
# Use node image for base image for all stages.
FROM node:${NODE_VERSION}-alpine as build
# Set working directory for all build stages.
WORKDIR /app/src/client
# Copy ignored package-lock since made in M1
COPY . .
RUN npm install
# Run the build script.
RUN npm run build

FROM nginx
# Copy the production dependencies from the deps stage and also
# the built application from the build stage into the image.
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/src/client/dist /usr/share/nginx/html


# COPY /dist /user/share/nginx/html
# # Expose the port that the application listens on.
EXPOSE 80
