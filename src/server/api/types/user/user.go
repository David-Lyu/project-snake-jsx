package types

type User struct {
	Id string `json:"entity_id"`
	Username string `json:"username"`
	Password string `json:"password"`
	HighScore int `json:"high_score"`
}

type UserResponse struct {
	Response string
	Message string
}
