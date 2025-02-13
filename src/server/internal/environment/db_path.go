package environment

import (
	"os"
	"path/filepath"
	"runtime"
)

func GetDBPath() string {
	return GetMainPath() + os.Getenv("DB_PATH")
}

func GetDefaultPath() string {
	var _, b, _, _ = runtime.Caller(0)
	return filepath.Join(filepath.Dir(b), "../../")
}
