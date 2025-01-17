# Only works in Unix like servers.
# Need to have .env cwd of terminal that calls main.

# Snake Server

1) Starts on port 8091
2) Routes: /api/score
    - /api/user: removed not going to store users for demo
3) Database:
    - has to be in /server/api/database/snake_db.db

### Todo:
- Remake score db without user.
    - delete db
    - recreate db
    - add init db in function
- Add protobufs to http req
- Grab .env for db route
    - Check init, if not already initialized.
    - Get path to .env (os.Executable)
    - .env should have path to db
- Create database if database doesn't exist
    - Init the snake_db.db with scores
