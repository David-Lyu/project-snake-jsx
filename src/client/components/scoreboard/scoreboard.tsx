import React, { useContext, useEffect, useState } from "react";
import { AppState } from "../../main";
import ToggleGlobalScoresButton from "../globalScores/toggleGlobalScoresButton";
import { useSignals } from "@preact/signals-react/runtime";

type Props = {
  hasGameStarted: boolean;
};

export default function Scoreboard({ hasGameStarted }: Props) {
  useSignals();
  const { scoreboard, globalScores } = useContext(AppState);
  const [time, setTime] = useState("00:00");

  useEffect(() => {
    if (hasGameStarted && !scoreboard.intervalId) {
      scoreboard.intervalId = window.setInterval(() => {
        scoreboard.time.value += 1;
        setTime(formatTime(scoreboard.time.value));
      }, 1000);
    } else {
      setTime("00:00");
    }
    () => {
      clearInterval(scoreboard.intervalId);
      scoreboard.intervalId = 0;
      setTime("00:00");
    };
  }, [hasGameStarted]);

  return (
    <section>
      <div>Time: {time}</div>
      <div>Score: {scoreboard.score.value} </div>
      <div>High Score: {scoreboard.highScore.value} </div>
      {!globalScores.isOpen.value && <ToggleGlobalScoresButton />}
    </section>
  );
}

function formatTime(time: number) {
  const seconds = time % 60;
  const minutes = Math.floor(time / 60);
  let secondsString = "";
  let minutesString = "";

  if (seconds < 10) {
    secondsString = `0${seconds}`;
  } else {
    secondsString = "" + seconds;
  }

  if (minutes < 10) {
    minutesString = `0${minutes}`;
  } else {
    minutesString = "" + minutes;
  }
  return minutesString + ":" + secondsString;
}
