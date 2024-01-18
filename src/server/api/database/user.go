package database

import (
	"database/sql"
	"encoding/json"
	"errors"
	"net/http"
	snakeLogger "snake_server/api/logger"
	snakeTypes "snake_server/api/types/user"
)

func SignUp(db *sql.DB,user snakeTypes.User )bool {
	//Todo: Create method to check User inputs

	var query = "INSERT INTO user (username, password) VALUES(?,?);"
	var statement, err = db.Prepare(query)
	//handle error here
	if(err != nil) {
		snakeLogger.Log("error")
		return false
	}

	//Todo: Hash the password
	// grab salt and cryptography

	_, err = statement.Exec(user.Username,hashPassword(user.Password))
	if(err != nil) {
		snakeLogger.Log("error")
		statement.Close()
		return false
	}
	statement.Close()
	return true
}

func GetUser(db *sql.DB, user snakeTypes.User)bool {
	var query = "SELECT * FROM USER WHERE username = ? AND password = ?;"

	var statement, err = db.Prepare(query)
	if(err != nil) {
		snakeLogger.HandleError(err)
		return false
	}
	resp, err := statement.Exec(user.Username,hashPassword(user.Password))
	if(err != nil || resp != nil) {
		snakeLogger.Log("error")
		statement.Close()
		return false
	}
	return true
}

func GetUserJSONBody(r *http.Request)(user snakeTypes.User, message string, err error) {
	decoder := json.NewDecoder(r.Body)
	var t snakeTypes.User
	message = "success"
	err = decoder.Decode(&t)
	if(t.Username == "" || t.Password == "") {
		message = "error"
		if(err == nil) {
			err = errors.New("Invalid fields")
			message = "Invalid fields"
		}
	}
	return t, message, err
}

// Helper Functions
func checkInput(user snakeTypes.User) {
	//can use regex, only allow letters and numbers
}

func hashPassword(pass string)string {
	//need to get salt

	return pass
}

func decryptPassword(pass string) string {

	return pass
}
