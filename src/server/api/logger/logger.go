package logger

import (
	"log"
)

//struct
// type level "error","warn","info"
func LogApp(level string, err error) {
	// var buf = bytes.Buffer
	// const logger = log.New(&buf, "logger: ", log.Lshortfile)

	// 	var (
	// 	buf    bytes.Buffer
	// 	logger = log.New(&buf, "logger: ", log.Lshortfile)
	// )
	// logger.Panicln(err);

	switch(level) {
	case "error":
		logError(err)
	case "warn":
		logWarn()
	case "info":
		fallthrough
	default:
		logInfo()
	}
}

func logError(err error) {
	//print out a failure log
	log.Println("Oh no errors")
}

func logWarn() {

}

func logInfo() {

}
