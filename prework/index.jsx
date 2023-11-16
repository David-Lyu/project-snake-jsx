// import React from 'react'
function App() {
  const [isLogin, setIsLogin] = useState(false);

  //init
  useEffect(() => {
    //check local storage for login info
    //check local storage for score
  }, []);

  //login
  useEffect(() => {
    //should change if they want to login
  }, [isLogin]);

  return (
    <div>
      <div class="init-modal">
        <h1>SNAKE</h1>
        <h4>To Play please pick the following</h4>
        {/* Need to use ReactRouter here */}
        {isLogin ? <button>Sing Up/Sign In</button> : null}
        <button>Play</button>
      </div>
    </div>
  );
}
