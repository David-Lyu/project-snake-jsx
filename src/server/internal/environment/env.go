package environment

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

func GetEnvFile(rootPath string) []string{

	// var readFile, errReadFile = os.ReadFile(pwd + "/.env")
	var file, err = os.Open(rootPath + "/.env")

	if(err != nil) {
		fmt.Print("some sort of error")
	}

	// fmt.Printf("readFile: %v\n", file)
	var scanner = bufio.NewScanner(file)
	lines := make([]string, 0)
	for scanner.Scan() {
		lines = append(lines, scanner.Text())
	}

	return lines;
}

func StoreEnvironment(lines []string) {
	for _ , line := range lines {
		var prefix, suffix, _ = strings.Cut(line,"=")
		os.Setenv(prefix,suffix)
	}
}
