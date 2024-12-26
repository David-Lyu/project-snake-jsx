import { signal } from '@preact/signals';
import LocalStorageAdapter from '../../modules/localStorage';

const localStorage = LocalStorageAdapter.GetInstance()
export default {
  time: signal(0),
  score: signal(0),
  highScore: signal(localStorage.getHighscore()),
  intervalId: 0
};
