import { Signal, signal } from '@preact/signals';
import { User } from '../../types/types';

export const userState: Signal<User | null> = signal(null);
