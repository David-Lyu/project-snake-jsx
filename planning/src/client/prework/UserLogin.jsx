import 'react' from 'react';

function UserLogin({isLogin,setIsLogin}) {
  //set up user in the top level
  // two types sign in or sign up
  const [userChoice, setUserChoice] = useState('login');


  return (
    <>
      {
        userChoice === 'login' ?
        <div class="sign-in">
          <form>
            <label>
              Username:
              <input></input>
            </label>
            <label>
              Password:
              <input type="password"></input>
            </label>
          </form>
        </div> :
        <div class="sign-up">
          <form></form>
        </div>
      }
    </>
  );
}
