import { Link } from "react-router-dom";
import React from "react";
import ToggleGlobalScoresButton from "../../components/globalScores/toggleGlobalScoresButton";
export default function HomePage() {
  // const [isDisclaimerClicked, setIsDisclaimerClicked] = useState(false);

  return (
    <div className="start-screen container">
      <div className="row start-screen-items">
        <h1>
          <span className="S">S</span>
          <span className="N">N</span>
          <span className="A">A</span>
          <span className="K">K</span>
          <span className="E">E</span>
        </h1>
        <h6>Please choose the following options:</h6>
        <ToggleGlobalScoresButton />
        <Link to="/play">Play Game</Link>
      </div>
      <section className="home-page-disclaimer">
        Disclaimer: This is used only for demonstration purposes and is still in
        progress.
      </section>
    </div>
  );
}
