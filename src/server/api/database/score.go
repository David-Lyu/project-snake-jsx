package database

import (
	"database/sql"
	"snake_server/api/logger"
	snakeLogger "snake_server/api/logger"
	snakeTypes "snake_server/api/types/score"
)

func GetScore(db *sql.DB) *[10]snakeTypes.Scores  {
	var query = "SELECT * FROM score LIMIT 10;"
	//can't figure out how to return null or empty array. I don't want to use slice
	var response = [10]snakeTypes.Scores{}
	var rows, err = db.Query(query)
	if(err != nil) {
		snakeLogger.HandleError(err)
		return &response
	}
	defer rows.Close()

	//could make into another function... but nah
	var index = 0;
	for(rows.Next()) {
		var data = snakeTypes.Scores{}
  	err = rows.Scan(&data.Id, &data.User_id, &data.Score)
		if err != nil {
			logger.HandleError(err)
			return &response
		}
		response[index] = data
		index++
	}
	return &response
}

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
