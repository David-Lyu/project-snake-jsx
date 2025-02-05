package main

import (
	"fmt"
	"google.golang.org/grpc"
	"log"
	"net"
	"snake_server/api/database"
	envType "snake_server/api/types/environment"
	env "snake_server/internal/environment"
	"snake_server/internal/score"
	"snake_server/internal/user"
)

func main() {

	//stores any env into os.GetEnv
	var EnvironmentVars = envType.Environment{}
	EnvironmentVars.RootPath = env.GetRootPath()

	//transfers env variables from .env to the os env vars
	env.StoreEnvironment(env.GetEnvFile(EnvironmentVars.RootPath))

	db, err := database.Database(EnvironmentVars.RootPath)
	if err != nil {
		return
	}

	//Runs grpc
	grpcServer := grpc.NewServer()

	var lis net.Listener
	//Todo: Eventually make port an environment variable
	lis, err = net.Listen("tcp", fmt.Sprintf("localhost:%d", 9001))
	if err != nil {
		log.Fatal("\nUh oh could not server at %d\n", 9001)
	}

	grpcServer.Serve(lis)

	// Handles logging in
	//	http.HandleFunc("/api/login", func(w http.ResponseWriter, r *http.Request) {
	//		if !isValidHttpMethod("POST", w, r) {
	//			return
	//		}
	//		var response, err = user.Login(r, db)
	//		if err != nil {
	//			w.WriteHeader(http.StatusUnauthorized)
	//		} else {
	//			w.WriteHeader(http.StatusOK)
	//		}
	//		fmt.Fprint(w, response)
	//	})
	//
	//	//Handles creating user
	//	http.HandleFunc("/api/user", func(w http.ResponseWriter, r *http.Request) {
	//		if !isValidHttpMethod("POST", w, r) {
	//			return
	//		}
	//		var response, err = user.SignUp(r, db)
	//		if err != nil {
	//			w.WriteHeader(http.StatusBadRequest)
	//		} else {
	//			w.WriteHeader(http.StatusCreated)
	//		}
	//		fmt.Fprint(w, response)
	//
	//	})
	//
	//	//Handles creating logging out
	//	http.HandleFunc("/api/logout", func(w http.ResponseWriter, r *http.Request) {
	//		if !isValidHttpMethod("GET", w, r) {
	//			return
	//		}
	//		// should be get request
	//		// and then log out session?
	//		fmt.Fprintf(w, "Hello!")
	//	})
	//
	//	//Handles grabbing scores
	//	http.HandleFunc("/api/score", func(w http.ResponseWriter, r *http.Request) {
	//		switch r.Method {
	//		case "GET":
	//			w.Header().Set("Content-Type", "application/json")
	//			//Needs to be under Set for it to work
	//			w.WriteHeader(http.StatusOK)
	//			fmt.Fprint(w, string(score.GetScore(db)))
	//			return
	//		case "POST":
	//			w.WriteHeader(http.StatusCreated)
	//			score.SetScore(r, db)
	//			fmt.Fprint(w, "Test")
	//			return
	//		default:
	//			isValidHttpMethod("GET", w, r)
	//			fmt.Fprint(w, "Method not allowed")
	//		}
	//	})
	//
	//	fmt.Printf("Starting server at port 8091\n")
	//	if err := http.ListenAndServe(":8091", nil); err != nil {
	//		log.Fatal(err)
	//	}
}

func isValidHttpMethod(method string, w http.ResponseWriter, r *http.Request) bool {
	if r.Method != method {
		w.WriteHeader(http.StatusMethodNotAllowed)
		fmt.Fprint(w, "Method not allowed")
		r.Context().Done()
		return false
	}
	return true
}
