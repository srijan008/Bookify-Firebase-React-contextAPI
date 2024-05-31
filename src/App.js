import './App.css'
import { app } from "./firebase";
import Signin from './pages/Signin';
import Signup from './pages/Signup';

function App() {
  

  return (
    <div className="App">
      <Signin/>
      <Signup/>
    </div>
  );
}

export default App;
