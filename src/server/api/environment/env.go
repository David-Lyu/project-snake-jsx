package environment

import (
	"io/fs"
	"path/filepath"
	"runtime"
)

func GetEnvFile() {
	var _, b, _, _ = runtime.Caller(0)

	// Root folder of this project
	var Root = filepath.Join(filepath.Dir(b), "../..")
	fs.FS

	// fs.ReadFile(.FS,Root)
}
