package user

import (
	"encoding/json"
	"net/http"
)
type user struct {
	Username string
	Password string
}

func SignUp(r *http.Request)string {

	decoder := json.NewDecoder(r.Body)
	var t user
	err := decoder.Decode(&t)
	if(err != nil) {
		var testError = true
		if(testError) {
			return "error"
		}
			return  "Error"
	}
	return "Test"
}
