export default function HomePage() {
  return (
    <div className="start-screen">
      <h1>SNAKE</h1>
      <h6>Please choose the following options:</h6>
      <button>Login/Sign up</button>
      <a href="/play">Play Game</a>
      <div className="scoreboard" id="scoreboard-start-screen"></div>
    </div>
  );
}
