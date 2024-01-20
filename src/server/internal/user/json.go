package user

import (
	"encoding/json"
	"errors"
	"net/http"
	snakeTypes "snake_server/api/types/user"
)

func getUserJSONBody(r *http.Request)(user snakeTypes.User, message string, err error) {
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
