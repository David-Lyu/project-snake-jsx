package main

import (
	"context"
	"database/sql"
	"errors"
	"fmt"
	"log"
	"net"
	"net/http"
	"snake_server/api/database"
	scorePB "snake_server/api/proto"
	env "snake_server/internal/environment"
	scoreModel "snake_server/internal/score"

	"google.golang.org/grpc"
	emptypb "google.golang.org/protobuf/types/known/emptypb"
)

type server struct {
	scorePB.UnimplementedScoreServiceServer
	db *sql.DB
	sd *database.ScoreDatabase
}

func (s server) GetScores(c context.Context, _ *emptypb.Empty) (*scorePB.Scores, error) {
	var score = s.sd.GRPCGetScore(s.db)
	// To do check if user exists
	if score == nil {
		return nil, errors.New("Score does not exist")
	}
	return score, nil
}

func (s server) SetScore(c context.Context, score *scorePB.Score) (*scorePB.ScoreAddResp, error) {
	var isScoreSet = s.sd.GRPCSetScore(s.db, score)
	if !isScoreSet {
		return &scorePB.ScoreAddResp{Saved: &isScoreSet}, nil
	} else {
		return &scorePB.ScoreAddResp{Saved: &isScoreSet}, nil
	}
}

func main() {

	env.InitCommandFlags()
	//stores any env into os.GetEnv
	// var EnvironmentVars = envType.Environment{}
	var envVars = env.GetEnvFile()
	env.StoreEnvironment(envVars)

	db, err := database.Database()
	if err != nil {
		fmt.Printf("Error in DB")
		return
	}
	defer db.Close()

	//Handles grabbing scores
	http.HandleFunc("/api/score", func(w http.ResponseWriter, r *http.Request) {
		switch r.Method {
		case "GET":
			if env.GetGoRunFlag() != "" {
				w.Header().Set("Access-Control-Allow-Origin", "*")
				w.Header().Set("Access-Control-Allow-Headers", "*")

			}
			w.Header().Set("Content-Type", "application/json")

			//Needs to be under Set for it to work
			w.WriteHeader(http.StatusOK)
			fmt.Fprint(w, string(scoreModel.GetScore(db)))
			return
		case "POST":
			w.WriteHeader(http.StatusCreated)
			scoreModel.SetScore(r, db)
			fmt.Fprint(w, "Test")
			return
		default:
			isValidHttpMethod("GET", w, r)
			fmt.Fprint(w, "Method not allowed")
		}
	})

	fmt.Printf("Starting server at port 8091\n")
	if err := http.ListenAndServe(":8091", nil); err != nil {
		log.Fatal(err)
	}
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

func useGRPC(db *sql.DB) {
	var grpcServer = grpc.NewServer()
	var lis net.Listener
	var err error

	// //Todo: Eventually make port an environment variable
	lis, err = net.Listen("tcp", fmt.Sprintf("localhost:%d", 9001))
	if err != nil {
		log.Fatal("\nUh oh could not server at %d\n", 9001)
	}
	//initiate scoredb
	var sd = database.ScoreDatabase{}

	scorePB.RegisterScoreServiceServer(grpcServer, &server{
		db: db,
		sd: &sd,
	})
	fmt.Println("Listening on port 9001")
	err = grpcServer.Serve(lis)
	if err != nil {
		log.Fatal("grpc server fail")
	}
}
