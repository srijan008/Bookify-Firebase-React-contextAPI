import { useState } from 'react';
import './App.css'
import { useFirebase } from "./context/Firebase"

function App() {
  const firebase = useFirebase();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  console.log("Firebase", firebase)
  return (
    <div className="App">
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}  placeholder='Enter Email'/>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}  placeholder='Enter Password'/>
      <button onClick={() => {
        firebase.signupUserWithEmailAndPassword(email, password);
        firebase.putData("users/" + "adfasdf", {email, password});
      }}> Signup </button>
    </div>
  );
}

export default App;
