package environment

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

func GetEnvFile() []string {

	// Todo: need to get main file path and then add it to .env
	// use os.Executable... to get it to work eventually
	var file, err = os.Open(".env")
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
		lines = append(lines, str)
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
