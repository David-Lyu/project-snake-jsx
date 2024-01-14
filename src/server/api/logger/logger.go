package logger

//struct
// type level "error","warn","info"
func Log(level string) {
	switch(level) {
	case "error":
		logError()
	case "warn":
		logWarn()
	case "info":
		fallthrough
	default:
		logInfo()
	}
}

func logError() {

}

func logWarn() {

}

func logInfo() {

}
