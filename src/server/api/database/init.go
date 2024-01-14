package database

import (
	"database/sql"

	_ "github.com/mattn/go-sqlite3"
)

func Database()(*sql.DB, error) {
	db, err := getDatabase()
	if(err != nil) {
		return db, err
	}
	initDatabase(db)
	return db, nil
}

func getDatabase()(*sql.DB, error) {
	const dbConnection = "../../api/database/snake_db.db"

	return sql.Open("sqlite3",dbConnection)
}

func initDatabase(sql *sql.DB) {
	sql.Begin()
	//Want a sqlite file instead of
	sql.Prepare("")
	// sql.1
}

func CreateUUID() {
	//should it 1234create uuid? or just have it increment with id.
	const Salt = "SNAKE_GAME"

}
