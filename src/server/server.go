package main

import (
	"fmt"
	"log"
	"net/http"
)

func main() {
	http.HandleFunc("/api/login", func(w http.ResponseWriter, r *http.Request){
		//should be post method, and uses a username and password to login.
		// create session?
		if(r.Method!= "POST") {
			//do somthing
			w.WriteHeader(http.StatusMethodNotAllowed)
			fmt.Fprint(w,"Method not allowed")
			r.Context().Done()
			return;
		}

		fmt.Fprintf(w, "Hello!")

	})

	http.HandleFunc("/api/logout", func(w http.ResponseWriter, r *http.Request){
		// should be get request
		// and then log out session?
		fmt.Fprintf(w, "Hello!")
	})

	http.HandleFunc("/api/score", func(w http.ResponseWriter, r *http.Request){
		// should grab the first 10 high scores
		fmt.Fprintf(w, "Hello!")
	})

	// need to handle a way to post high score, maybe reuse the top
	// htpp.HandleFunc("/api/high-score/")

	fmt.Printf("Starting server at port 8091\n")
	if err := http.ListenAndServe(":8091", nil); err != nil {
		log.Fatal(err)
	}
}
