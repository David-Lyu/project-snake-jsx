package score

import (
	"database/sql"
	"encoding/json"
	"errors"
	"net/http"
	"snake_server/api/database"
	snakeTypes "snake_server/api/types/score"
)

func GetScore(db *sql.DB) []byte {
	var results = database.GetScore(db)
	var json, err = encodeScoreJSONBody(results)

	if err != nil {
		//log error here
		return nil
	}
	return json
}

func SetScore(r *http.Request, db *sql.DB) {
	//Todo check if user exists with ID
	var score, message, err = getScoreJSONBody(r)

	if message == "error" && err == nil {
		err = errors.New("Malformed Error")
	}
	//Todo check if user exists with ID

	database.SetScore(db, score)
}

func getScoreJSONBody(r *http.Request) (score snakeTypes.Score, message string, err error) {
	decoder := json.NewDecoder(r.Body)
	var t snakeTypes.Score
	message = "success"
	err = decoder.Decode(&t)
	if t.Score == 0 || t.User == "" {
		message = "error"
		err = errors.New("Malformed Data")
	}
	return t, message, err
}

func encodeScoreJSONBody(scores *[10]snakeTypes.Score) ([]byte, error) {
	// var test = []snakeTypes.Scores{}
	// for i := 0; i < len(scores); i++ {
	// 	test = append(test, scores[i])

	// }
	return json.Marshal(scores)
}
