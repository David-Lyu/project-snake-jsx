package environment

import (
	"bufio"
	"fmt"
	"os"
)

func GetEnvFile() []string{

	var pwd = rootPath()
	// var readFile, errReadFile = os.ReadFile(pwd + "/.env")
	var file, err = os.Open(pwd + "/.env")

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
