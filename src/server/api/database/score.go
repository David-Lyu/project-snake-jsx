package database

import (
	"database/sql"
	"errors"
	snakeLogger "snake_server/api/logger"
	score "snake_server/api/proto"
	types "snake_server/api/types/score"
	// score "snake_server/api/proto"
)

type ScoreDatabase struct{}

func GetScore(db *sql.DB) *[10]types.Score {
	var query = "SELECT * FROM score ORDER BY id LIMIT 10 ;"
	//can't figure out how to return null or empty array. I don't want to use slice
	var response = [10]types.Score{}
	var rows, err = db.Query(query)
	if err != nil {

		snakeLogger.LogApp("error", err)
		return &response
	}
	defer rows.Close()

	//could make into another function... but nah
	var index = 0
	for rows.Next() {
		var data = types.Score{}
		err = rows.Scan(&data.Id, &data.User, &data.Score)
		if err != nil {
			snakeLogger.LogApp("error", err)
			return &response
		}
		response[index] = data
		index++
	}
	return &response
}

func SetScore(db *sql.DB, score types.Score) bool {
	var query = "INSERT OR REPLACE INTO score(entity_id, score, user) VALUES (?,?,?);"

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

func (sd ScoreDatabase) GRPCGetScore(db *sql.DB) *score.Scores {
	var query = "SELECT user, score FROM score LIMIT 10;"
	//can't figure out how to return null or empty array. I don't want to use slice
	var response = score.Scores{}
	var rows, err = db.Query(query)
	if err != nil {
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

func (sd ScoreDatabase) GRPCSetScore(db *sql.DB, score *score.Score) bool {
	//grab all score and adjust the score
	// var scoreArr = sd.GetScore(db).Scores
	// if len(scoreArr) >= 10 {
	// Todo: Need to get id and insert into id to replace
	// }

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
