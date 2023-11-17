import { useState } from 'react';

export default function User() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [userChoice, setUserChoice] = useState('login');

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
