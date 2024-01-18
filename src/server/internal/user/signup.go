package user

import (
	"database/sql"
	"errors"
	"net/http"
	database "snake_server/api/database"
)
type user struct {
	Username string
	Password string
}

func SignUp(r *http.Request, db *sql.DB) (string,error) {

	var user, message, err = database.GetUserJSONBody(r)
	if(err != nil) {
		return message, err
	}

	// decoder := json.NewDecoder(r.Body)
	// var t snakeTypes.User
	// err := decoder.Decode(&t)
	// if(err != nil || t.Username == "" || t.Password == "") {
	// 	var message = "error"
	// 	if(err == nil) {
	// 		err = errors.New("Invalid fields")
	// 		message = "Invalid fields"
	// 	}
	// 		return message, err
	// }
	if(database.SignUp(db, user)) {
		message = "success"
	} else {
		message = "unsuccessful"
		err = errors.New("Can not create user")
	}
	return message, err
}
