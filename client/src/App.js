import { useEffect, useState } from 'react'
import jwt_decode from "jwt-decode"
import './App.css';

function App() {
  const [ user, setUser ] = useState({})

  console.log(user)

  function handleCallbackResponse(response){
    console.log(response.credential);
    const userObject = jwt_decode(response.credential);
    console.log(userObject);
    setUser(userObject);
    document.getElementById("sign-in-div").hidden = true;
  }

  function handleSignOut(e){
    setUser({})
    document.getElementById("sign-in-div").hidden = false;
  }

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: "6042841804-vmcqfpokq00p7799st2qih3r9570vo3f.apps.googleusercontent.com",
      callback: handleCallbackResponse
    });

    google.accounts.id.renderButton(
      document.getElementById("sign-in-div"),
      { theme: "outline", size: "large" }
    )

    google.accounts.id.prompt();
  }, [])

  return (
    <div className="App"> 
      <div id='sign-in-div'></div>
      { Object.keys(user).length !== 0 &&
        <button onClick={(e) => handleSignOut(e)}>Sign Out</button>
      }
      { user &&
        <div>
          <img src={user.picture} alt=""/>
          <h1>{user.given_name} {user.family_name}</h1>
          <h2>{user.email}</h2>
        </div>
      }
    </div>
  );
}

export default App;
