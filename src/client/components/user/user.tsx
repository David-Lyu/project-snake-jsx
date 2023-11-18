export default function User() {
  // const [userChoice, setUserChoice] = useState('login');
  let userChoice = '';
  userChoice = 'login';

  return (
    <>
      {userChoice === 'login' ? (
        <div className="sign-in">
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
        </div>
      ) : (
        <div className="sign-up">
          <form></form>
        </div>
      )}
    </>
  );
}
