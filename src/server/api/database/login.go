package database

import (
	"database/sql"
	"snake_server/api/logger"
	snakeTypes "snake_server/api/types/user"
)

func SignUp(db *sql.DB,user snakeTypes.User ) {
	var query = "INSERT INTO user (username, password) VALUES(?,?)"
	var statement, err = db.Prepare(query)
	//handle error here
	if(err != nil) {
		logger.Log("error")
		return
	}

	//Todo: Hash the password
	// grab salt and cryptography

	_, err = statement.Exec(user.Username,user.Password)
	if(err != nil) {
		logger.Log("error")
		//log error here
	}
}