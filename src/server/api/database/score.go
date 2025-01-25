package database

import (
	"database/sql"
	"errors"
	"log"
	snakeLogger "snake_server/api/logger"
	score "snake_server/api/proto"
)

type ScoreDatabase struct{}

func (sd ScoreDatabase) GetScore(db *sql.DB) *score.Scores {
	log.Println("In DB")
	var query = "SELECT * FROM score LIMIT 10;"
	//can't figure out how to return null or empty array. I don't want to use slice
	var response = score.Scores{}
	var rows, err = db.Query(query)
	if err != nil {
		log.Print("ajdfkalasldfjasfdlkjasdfljasdl;fajds;lasjf:")
		snakeLogger.LogApp("error", err)
		return &response
	}
	defer rows.Close()

	//could make into another function... but nah
	var index = 0
	for rows.Next() {
		var data = new(score.Score)
		err = rows.Scan(&data.User, &data.Score)
		if err != nil {
			snakeLogger.LogApp("error", err)
			return &response
		}
		response.Scores = append(response.Scores, data)
		// response[index] = data
		index++
	}
	return &response
}

func (sd ScoreDatabase) SetScore(db *sql.DB, score *score.Score) bool {
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
