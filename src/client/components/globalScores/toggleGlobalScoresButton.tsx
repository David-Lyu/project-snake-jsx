import React, { useContext, useState } from "react";
import { AppState } from "../../main";
import { useSignalEffect } from "@preact/signals-react";

enum texts {}

export default function ToggleGlobalScoresButton() {
  const { globalScores } = useContext(AppState);

  const openText = "Open Global Scores";
  const closeText = "Close Global Scores";
  const [buttonText, setButtonText] = useState(openText);
  useSignalEffect(() => {
    if (globalScores.isOpen.value) {
      setButtonText(closeText);
    } else {
      setButtonText(openText);
    }
  });
  return (
    <button
      className="global-scores-toggle-button"
      onClick={() => {
        globalScores.isOpen.value = !globalScores.isOpen.value;
      }}
    >
      {buttonText}
    </button>
  );
}
