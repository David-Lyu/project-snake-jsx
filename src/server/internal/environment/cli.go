package environment

import (
	"flag"
	"os"
)

/*
Initializes any command line commands:
GO_RUN returns true
*/
func InitCommandFlags() {
	cmd := flag.String("go_run", "", "")
	flag.Parse()
	if string(*cmd) == "" {
		return
	}
	os.Setenv("GO_RUN", string(*cmd))
}

func GetGoRunFlag() string {
	return os.Getenv("GO_RUN")
}
