import { signal } from "@preact/signals-react";

export const globalScores = {
  isOpen: signal(false),
  lowestScore: signal({ user: "", score: 0 }),
  sendScore: signal(false),
};
