package environment

import (
	"path/filepath"
	"runtime"
)

func rootPath() string {

	var (
    _, b, _, _ = runtime.Caller(0)

    // Root folder of this project
    Root = filepath.Join(filepath.Dir(b), "../..")
)

	return Root;
}
