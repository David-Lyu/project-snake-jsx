import { Signal, signal } from "@preact/signals";
import { Score } from "../../types/types";

export const globalScoresState: Signal<Score[]> = signal([]);
