package snakedb

import (
	"database/sql"
)

func GetDatabase()(*sql.DB, error) {
	const dbConnection = ""

	return sql.Open("sqlite3",dbConnection)
}

func initDatabase(sql *sql.DB) {
	sql.Begin()
	//Want a sqlite file instead of
	sql.Prepare("")
	// sql.1
}

func CreateUUID() {
	//should it create uuid? or just have it increment with id.
}
