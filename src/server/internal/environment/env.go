package environment

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"strings"
)

func GetMainPath() string {
	var isNotBuild = GetGoRunFlag()
	if isNotBuild != "" {
		return ""
	}
	var mainPath, error = os.Executable()
	if error != nil {
		log.Fatal("main file")
	}

	var prefix string
	if mainPath[len(mainPath)-4:] == "main" {
		prefix = mainPath[:len(mainPath)-4]
	}
	return prefix
}
func GetEnvFile() []string {

	var prefix = GetMainPath()
	var file, err = os.Open(prefix + ".env")
	var reader = bufio.NewReader(file)
	var str string
	var lines = make([]string, 0)

	file.Seek(0, os.O_RDONLY)
	defer file.Close()

	if err != nil {
		fmt.Print("some sort of error")
	}

	for {
		str, err = reader.ReadString('\n')
		if err != nil {
			break
		}
		lines = append(lines, strings.Trim(str, "\n"))
	}

	file.Seek(0, os.O_RDONLY)
	return lines
}

func StoreEnvironment(lines []string) {
	for _, line := range lines {
		var prefix, suffix, _ = strings.Cut(line, "=")
		os.Setenv(prefix, suffix)
	}
}
