import React, { useContext, useEffect, useRef } from "react";
import { AppState } from "../../main";

export default function GlobalScoreUserInput() {
  const store = useContext(AppState);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Check if lowestScore !== score?
  }, [store.globalScores.lowestScore]);

  function onSubmit(e: React.FormEvent) {
    if (!store.globalScores.lowestScore.value.score) {
      return;
    }
    e.preventDefault();

    const body = JSON.stringify({
      user: inputRef.current?.value,
      score: store.globalScores.lowestScore.value.score,
    });

    const url = import.meta.env.PROD
      ? "/api/score"
      : "http://localhost:8091/api/score";
    const init = {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body,
    };

    fetch(url, init)
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        } else {
          throw Error("Could not get Scores");
        }
      })
      .then(() => {
        // console.log(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        store.globalScores.sendScore.value = false;
      });
  }
  return (
    <section className="global-score-form">
      <h3>Congratulation! You Made It to the Global High Score.</h3>
      <p>
        Please enter your three letter name to add to into the global boards
      </p>
      <form onSubmit={onSubmit}>
        <label htmlFor="global-scores"> Add 3 Letter Abbreviation </label>
        <input type="text" ref={inputRef} name="global-scores" />
        <button type="submit"> Send Score </button>
      </form>
    </section>
  );
}
