FROM --platform=linux/amd64 golang:latest as server
WORKDIR /app/src/server
# RUN sudo apt-get install -y sqlite3 libsqlite3-dev
COPY . .
# Copy files from
RUN go mod download
RUN CGO_ENABLED=1 GOOS=linux go build /app/src/server/cmd/snake_server/main.go

FROM --platform=linux/amd64 golang:latest as final
WORKDIR /app/src/server
# RUN apk add --no-cache sqlite
COPY --from=server /app/src/server/.env .
COPY --from=server /app/src/server/main .
EXPOSE 8091

CMD ["./main"]
