import { Signal, signal } from '@preact/signals';

export default {
  time: signal(0),
  score: signal(0),
  highScore: signal(0),
  intervalId: 0
};
