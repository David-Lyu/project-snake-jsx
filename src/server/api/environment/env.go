package environment

import (
	"os"
)

func GetEnvFile() {

	var pwd = rootPath()
	os.ReadFile(pwd + "/.env")
	os.Open(pwd + "/.env")

	// fs.ReadFile(.FS,Root)
}
