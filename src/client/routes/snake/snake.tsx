import { Link } from 'react-router-dom';
import BoardGame from '../../components/boardGame/boardGame';

export default function Snake() {
  return (
    <div className="snake-game container">
      <div className="score"></div>
      {/* placeholder for boardgame component */}
      <BoardGame></BoardGame>
      <Link to="/">Go Back</Link>
    </div>
  );
}
