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
    const headers = {
      method: "GET",
      "Content-type": "application/json",
    };

    fetch(url, headers)
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        } else {
          throw Error("Could not get Scores");
        }
      })
      .then((data) => {
        setGlobalScores(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (store.sendScore.value === true) {
      //send score over
      //should retrigger above... but will just adjust locally
      globalScores.pop();
      globalScores.push(store.lowestScore.value);

      store.sendScore.value = false;
    }
  }, [store.sendScore]);

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
                  <tr key={"global_score" + score.user + i}>
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
