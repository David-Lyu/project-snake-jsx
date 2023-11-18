// Start Page
type User = {
  id: number;
  username: string;
  password?: string | null;
  highscore: number;
};

type ScoreBoard = {
  scores: User[];
};

//Snake Game
