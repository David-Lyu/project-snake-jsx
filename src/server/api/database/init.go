package database

import (
	"database/sql"
	snakeLogger "snake_server/api/logger"

	_ "github.com/mattn/go-sqlite3"
)

func Database(rootPath string) (*sql.DB, error) {
	db, err := getDatabase(rootPath)
	if err != nil {
		snakeLogger.LogApp("Error", err)
		return db, err
	}
	initDatabase(db)
	return db, nil
}

func getDatabase(rootPath string) (*sql.DB, error) {
	//Todo: Create a root dir for go or create db by hand

	var dbConnection = rootPath + "/api/database/snake_db.db"

	return sql.Open("sqlite3", dbConnection)
}

func initDatabase(sql *sql.DB) {
	sql.Begin()
	//Want a sqlite file instead of

	_, err := sql.Exec("CREATE TABLE IF NOT EXISTS score (id INTEGER PRIMARY KEY ASC, user TEXT NOT NULL, score INTEGER NOT NULL)")
	if err != nil {
		snakeLogger.LogApp("error", err)
	}
	// sql.1
}

func CreateUUID() {
	//should it 1234create uuid? or just have it increment with id.
	const Salt = "SNAKE_GAME"

}
