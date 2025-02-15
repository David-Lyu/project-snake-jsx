package score

import (
	"database/sql"
	"encoding/json"
	"errors"
	"net/http"
	"snake_server/api/database"
	snakeTypes "snake_server/api/types/score"
)

// Implement redis for this
var globalScores [10]snakeTypes.Score

func GetScore(db *sql.DB) []byte {
	var results = database.GetScore(db)
	var json, err = encodeScoreJSONBody(results)

	if err != nil {
		//log error here
		return nil
	}
	globalScores = *results
	return json
}

func SetScore(r *http.Request, db *sql.DB) {
	//Todo check if user exists with ID
	var score, message, err = getScoreJSONBody(r)
	var replaceId = 0
	var scores = database.GetScore(db)
	if err != nil && score.Score == 0 {
		err = errors.New("Cannot set 0")
	}

	if message == "error" && err == nil {
		err = errors.New("Malformed Error")
	}

	if err != nil {
		//log error here
		return
	}

	//Todo check if user exists with ID
	for _, diff_score := range scores {
		if diff_score.Score == 0 {
			replaceId = diff_score.Id
			break
		} else if score.Score > diff_score.Score {
			replaceId = scores[9].Id
			break
		}
	}
	score.Id = replaceId
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
