package main

import (
	"fmt"
	"log"
	"net/http"
	database "snake_server/api/database"
	score "snake_server/internal/score"
	user "snake_server/internal/user"
)

func main() {
	//Todo need to change db Init database
	db, err := database.Database()
	if(err != nil) {
		return;
	}

	// Handles logging in
	http.HandleFunc("/api/login", func(w http.ResponseWriter, r *http.Request){
		if(!isValidHttpMethod("POST", w,r)) {
			return
		}
		var user = user.Login(r)
		fmt.Fprint(w,user)
	})

	//Handles creating user
	http.HandleFunc("/api/user", func(w http.ResponseWriter, r *http.Request) {
		if(!isValidHttpMethod("POST", w,r)) {
			return
		}
		var response, err = user.SignUp(r,db)
		if(err != nil) {
			w.WriteHeader(http.StatusBadRequest)
		} else {
			w.WriteHeader(http.StatusCreated)
		}
		fmt.Fprint(w, response)



	})

	//Handles creating logging out
	http.HandleFunc("/api/logout", func(w http.ResponseWriter, r *http.Request){
		if(!isValidHttpMethod("GET", w,r)) {
			return
		}
		// should be get request
		// and then log out session?
		fmt.Fprintf(w, "Hello!")
	})

	//Handles grabbing scores
	http.HandleFunc("/api/score", func(w http.ResponseWriter, r *http.Request){
		if(!isValidHttpMethod("GET", w,r)) {
			return
		}
		// should grab the first 10 high scores
		fmt.Fprintf(w, "Hello!")
		score.Score()
	})

	fmt.Printf("Starting server at port 8091\n")
	if err := http.ListenAndServe(":8091", nil); err != nil {
		log.Fatal(err)
	}
}

func isValidHttpMethod(method string, w http.ResponseWriter, r *http.Request)bool {
	if(r.Method !=method) {
		w.WriteHeader(http.StatusMethodNotAllowed)
		fmt.Fprint(w,"Method not allowed")
		r.Context().Done()
		return false
	}
	return true
}
