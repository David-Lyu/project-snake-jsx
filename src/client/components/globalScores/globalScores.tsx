import React, { useContext, useEffect, useState } from "react";
import { AppState } from "../../main";
import { useSignals } from "@preact/signals-react/runtime";
import ToggleGlobalScoresButton from "./toggleGlobalScoresButton";

type Score = {
  score: number;
  user: string;
};

export default function GlobalScores() {
  useSignals();
  const { globalScores: store } = useContext(AppState);
  const [globalScores, setGlobalScores] = useState([] as Score[]);
  useEffect(() => {
    const isProd = import.meta.env.PROD;
    // Add headers to verify with server
    const url = isProd
      ? "https://snake.davidlyu.top/api/score"
      : "http://localhost:8091/api/score";
    console.log(url);
    const headers = {
      // mode: "no-cors",
      method: "GET",
      "Content-type": "application/json",
      // url,
    };

    console.log(headers);
    fetch(url, headers)
      .then((resp) => {
        console.log(resp);
        if (resp.ok) {
          return resp.json();
        } else {
          return null;
        }
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
    const tempData: Score[] = [];
    for (let i = 0; i < 10; i++) {
      tempData.push({
        score: 10 + i,
        user: "test" + i,
      });
    }

    setGlobalScores([...tempData]);
  }, []);

  return (
    store.isOpen.value && (
      <section className="global-scores-container">
        <div className="global-scores-body">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {globalScores.map((score, i) => {
                return (
                  <tr key={score.user + i}>
                    <td>{score.user}</td>
                    <td>{score.score}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <ToggleGlobalScoresButton />
        </div>
      </section>
    )
  );
}
