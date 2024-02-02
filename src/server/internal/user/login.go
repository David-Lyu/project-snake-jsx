package user

import (
	"database/sql"
	"errors"
	"net/http"
	database "snake_server/api/database"
	userTypes "snake_server/api/types/user"
)

func Login(r *http.Request, db *sql.DB)(userTypes.UserResponse, error) {
	//Todo instead of sending string, send object with session token created.
	// Need to look up how to make session token
	var user, message, err = getUserJSONBody(r);
	var userResponse = userTypes.UserResponse{};
	if(err != nil) {
		userResponse.Message = message
		return userResponse, err
	}

	var response = ""

	if(database.GetUser(db,user)) {
		message = "success"
		response = "Success"
		//get response
	} else {
		message = "Username or password is invalid"
		err = errors.New("Failed to get user")
	}
	userResponse.Response = response
	userResponse.Message = message
	return userResponse, err
}
