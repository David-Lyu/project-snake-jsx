package database

import (
	"database/sql"
	"errors"
	snakeLogger "snake_server/api/logger"
	score "snake_server/api/proto"
	snakeTypes "snake_server/api/types/score"
)

type ScoreDatabase struct{}

func (sd ScoreDatabase) GetScore(db *sql.DB) *snakeTypes.Scores {
	var query = "SELECT * FROM score LIMIT 10;"
	//can't figure out how to return null or empty array. I don't want to use slice
	var response = snakeTypes.Scores{}
	var rows, err = db.Query(query)
	if err != nil {

		snakeLogger.LogApp("error", err)
		return &response
	}
	defer rows.Close()

	//could make into another function... but nah
	var index = 0
	for rows.Next() {
		var data = score.Score{}
		err = rows.Scan(&data.User, &data.Score)
		if err != nil {
			snakeLogger.LogApp("error", err)
			return &response
		}
		response.Score = data
		// response[index] = data
		index++
	}
	return &response
}

func (sd ScoreDatabase) SetScore(db *sql.DB, score snakeTypes.Scores) bool {
	var query = "INSERT INTO score(score, user) VALUES (?, ?);"

	var statement, err = db.Prepare(query)
	if err != nil {
		snakeLogger.LogApp("error", err)
		return false
	}
	resp, err := statement.Exec(score.Score, score.User)
	if err != nil || resp == nil {
		if err == nil {
			err = errors.New("No response")
		}
		snakeLogger.LogApp("error", err)
		statement.Close()
		return false
	}
	return true
}
