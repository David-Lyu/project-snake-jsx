package types

type Scores []Score

type Score struct {
	Id    int    `json:"id"`
	User  string `json:"user"`
	Score int    `json:"score"`
}
