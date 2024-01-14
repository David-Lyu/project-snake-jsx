package user

import (
	"database/sql"
	"encoding/json"
	"errors"
	"net/http"
	database "snake_server/api/database"
	snakeTypes "snake_server/api/types/user"
)
type user struct {
	Username string
	Password string
}

func SignUp(r *http.Request, db *sql.DB) (string,error) {

	decoder := json.NewDecoder(r.Body)
	var t snakeTypes.User
	err := decoder.Decode(&t)
	if(err != nil || t.Username == "" || t.Password == "") {
		var message = "error"
		if(err == nil) {
			err = errors.New("Invalid fields")
			message = "Invalid fields"
		}
			return message, err
	}
	database.SignUp(db, t)
	return "success", nil
}
