import React, { useContext, useEffect } from "react";
import { AppState } from "../../main";

type Score = {
  score: number;
  user: string;
};

export default function GlobalScores() {
  const { globalScores } = useContext(AppState);
  useEffect(() => {
    // const headers = {};
    // const url = "http://localhost:8091/api/score";
    // console.log(url);
    // fetch(url)
    //   .then((resp) => resp.json())
    //   .then((data) => {
    //     console.log(data);
    //   })
    //   .catch((err) => console.log(err));
    const tempData: Score[] = [];
    for (let i = 0; i < 10; i++) {
      tempData.push({
        score: 10 + i,
        user: "test" + i,
      });
    }

    globalScores.value = [...tempData];
  }, []);
  return (
    <table className="global-scores-container">
      <thead>
        <tr>
          <th>Name</th>
          <th>Score</th>
        </tr>
      </thead>
      <tbody>
        {globalScores.value.map((score) => {
          console.log(score);
          return (
            <tr>
              <td>{score.user}</td>
              <td>{score.score}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
