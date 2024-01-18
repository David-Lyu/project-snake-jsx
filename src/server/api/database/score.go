package database

import (
	"database/sql"
	"encoding/json"
	"errors"
	"net/http"
	snakeLogger "snake_server/api/logger"
	snakeTypes "snake_server/api/types/score"
)

func SetScore(db *sql.DB, score snakeTypes.Scores) bool {
	var query = "INSERT INTO score(score user_id) VALUES (? ?);"

	var statement, err = db.Prepare(query)
	if(err != nil) {
		snakeLogger.HandleError(err)
		return false
	}
	resp, err := statement.Exec(score.Score, score.User_id)
	if(err != nil || resp != nil) {
		snakeLogger.Log("error")
		statement.Close()
		return false
	}
	return true

}

func GetScoreJSONBody(r *http.Request)( score snakeTypes.Scores, message string, err error) {
	decoder := json.NewDecoder(r.Body)
	var t snakeTypes.Scores
	message = "success"
	err = decoder.Decode(&t)
	if(t.Score == 0 || t.User_id == 0) {
		message = "error"
		err = errors.New("Malformed Data")
	}
	return t, message, err
}
