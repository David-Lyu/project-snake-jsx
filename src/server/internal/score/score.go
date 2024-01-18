package score

import (
	"database/sql"
	"errors"
	"net/http"
	"snake_server/api/database"
)

func Score(r *http.Request, db *sql.DB) {
	//
	var score, message, err = database.GetScoreJSONBody(r)

	if(message == "error" && err == nil) {
		err = errors.New("Malformed Error")
	}
	//Todo check if user exists with ID

	database.SetScore(db, score)
}
