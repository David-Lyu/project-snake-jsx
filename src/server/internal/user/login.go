package user

import (
	"database/sql"
	"errors"
	"net/http"
	database "snake_server/api/database"
)

func Login(r *http.Request, db *sql.DB)(string, error) {

	var user, message, err = database.GetJSONBody(r);
	if(err != nil) {
		return message, err
	}

	if(database.GetUser(db,user)) {
		message = "success"
	} else {
		message = "failed"
		err = errors.New("Failed to get user")
	}
	return message, err
}
