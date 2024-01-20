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
COPY ./src/client .

RUN npm install
# Run the build script.
RUN npm run build

# FROM golang:lastest as server-build
# WORKDIR /app

# COPY ./src/server /app
# RUN go mod download
# RUN go build ./cmd/snake_server/main.go


FROM golang:latest as server

WORKDIR /app/src/server
COPY ./src/server /app/src/server
#Copy files from
COPY --from=frontend /app/src/client/dist /app/src/client/dist
RUN go mod download
RUN CGO_ENABLED=0 GOOS=linux go build /app/src/server/cmd/snake_server/main.go
EXPOSE 8091

CMD ["./main"]



FROM nginx
# Copy the production dependencies from the deps stage and also
# the built application from the build stage into the image.
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=server /app/src/client/dist /usr/share/nginx/html


# COPY /dist /user/share/nginx/html
# # Expose the port that the application listens on.
EXPOSE 8090
