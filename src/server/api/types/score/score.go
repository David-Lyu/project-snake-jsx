package types

type Scores struct {
	Id int `json:"entity_id"`
	//	User_id int`json:"user_id"`
	User  string `json:user_name`
	Score int    `json:"score"`
}
