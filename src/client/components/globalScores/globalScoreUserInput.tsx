import { useContext, useEffect } from "react";
import { AppState } from "../../main";

export default function GlobalScoreUserInput() {
  const store = useContext(AppState);

  useEffect(() => {
    // Check if lowestScore !== score?
  }, [store.globalScores.lowestScore]);
}
