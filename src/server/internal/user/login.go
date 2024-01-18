package user

import (
	"database/sql"
	"errors"
	"net/http"
	database "snake_server/api/database"
)

func Login(r *http.Request, db *sql.DB)(string, error) {
	//Todo instead of sending string, send object with session token created.
	// Need to look up how to make session token
	var user, message, err = database.GetUserJSONBody(r);
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
