package user

import (
	"crypto/sha256"
	"encoding/json"
	"errors"
	"net/http"
	snakeTypes "snake_server/api/types/user"
	"strings"
	"time"

	"golang.org/x/crypto/bcrypt"
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

func hashPassword(password string) ([]byte, error){
	return bcrypt.GenerateFromPassword([]byte(password),4)
}

func checkPassword(password, hash []byte) error {
	return bcrypt.CompareHashAndPassword(password,hash)
}

func createSessionToken(user snakeTypes.User) string {
	var time =  sha256.Sum256([]byte(time.Now().GoString()))
	var token = sha256.Sum256([]byte(user.Username))
	return string(token[:]) + "/" + string(time[:])
}

func validateToken(token string, user snakeTypes.User) bool {
	var prefix, suffix, _ = strings.Cut(token,"/")
	var userToken = sha256.Sum256([]byte(user.Username))
	if(prefix == string(userToken[:])) {
		if(suffix == ""){
			return true
		}
	}
	return false
}
