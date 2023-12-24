import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="start-screen container">
      <div className="row start-screen-items">
        <h1>SNAKE</h1>
        <h6>Please choose the following options:</h6>
        <button disabled={true}>Login/Sign up</button>
        <Link to="/play">Play Game</Link>
        <div className="scoreboard" id="scoreboard-start-screen"></div>
      </div>
      <section>
        Disclaimer: This is used only for demonstration purposes and is still in
        progress.
      </section>
    </div>
  );
}
