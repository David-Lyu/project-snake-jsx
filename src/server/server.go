package main

import (
    "fmt"
    "log"
    "net/http"
)

func main() {
	http.HandleFunc("/api/login", func(w http.ResponseWriter, r *http.Request){
		fmt.Fprintf(w, "Hello!")
	})

	http.HandleFunc("/api/logout", func(w http.ResponseWriter, r *http.Request){
		fmt.Fprintf(w, "Hello!")
	})

	http.HandleFunc("/api/high-score", func(w http.ResponseWriter, r *http.Request){
		fmt.Fprintf(w, "Hello!")
	})

	fmt.Printf("Starting server at port 8091\n")
	if err := http.ListenAndServe(":8091", nil); err != nil {
		log.Fatal(err)
	}
}
