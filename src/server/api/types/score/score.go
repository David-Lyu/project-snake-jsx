package types

type Scores []Score

type Score struct {
	Id    int    `json:"entity_id"`
	User  string `json:user_name`
	Score int    `json:"score"`
}
