package environment

import (
	"os"
)

func GetDBPath() string {

	path := os.Getenv("DB_PATH")
	// Todo: Have user input root file with sql
	return path
}
