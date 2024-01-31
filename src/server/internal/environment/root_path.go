package environment

import (
	"fmt"
	"path/filepath"
	"runtime"
)

func GetRootPath() string {

	var (
    _, b, _, _ = runtime.Caller(0)

    // Root folder of this project
    Root = filepath.Join(filepath.Dir(b), "../..")
  )

	fmt.Print(Root)

	return Root;
}
