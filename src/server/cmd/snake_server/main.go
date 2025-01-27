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

	"google.golang.org/grpc"
	emptypb "google.golang.org/protobuf/types/known/emptypb"
)

type server struct {
	scorePB.UnimplementedScoreServiceServer
	db *sql.DB
	sd *database.ScoreDatabase
}

func (s server) GetScores(c context.Context, _ *emptypb.Empty) (*scorePB.Scores, error) {
	var score = s.sd.GetScore(s.db)
	// To do check if user exists
	if score == nil {
		return nil, errors.New("Score does not exist")
	}
	return score, nil
}

func (s server) SetScore(c context.Context, score *scorePB.Score) (*scorePB.ScoreAddResp, error) {
	var isScoreSet = s.sd.SetScore(s.db, score)
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
	// Placeholder to not throw errors
	defer db.Close()
	// //Runs grpc
	grpcServer := grpc.NewServer()

	var lis net.Listener

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

func isValidHttpMethod(method string, w http.ResponseWriter, r *http.Request) bool {
	if r.Method != method {
		w.WriteHeader(http.StatusMethodNotAllowed)
		fmt.Fprint(w, "Method not allowed")
		r.Context().Done()
		return false
	}
	return true
}
