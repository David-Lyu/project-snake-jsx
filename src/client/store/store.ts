import { userState } from './user/user';
import { Store } from '../types/types';

export default function createAppState(): Store {
  return {
    user: userState
  };
}
