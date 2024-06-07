import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from "react-router-dom"
import Register from './pages/Register';
import './App.css'
import Login from './pages/Login';
import MyNavbar from './component/Navbar';
import List from './pages/List';
import Home from './pages/Home';
import Details from './pages/Details';
import ViewOrder from './pages/ViewOrder';

function App() {
  return (
    <div>
      <MyNavbar />
      <Routes>
        <Route path='/' element = { <Home/> }/>
        <Route path='/register' element = { <Register/> }/>
        <Route path='/login' element = { <Login/> }/>
        <Route path='/book/list' element = { <List/> }/>
        <Route path='/book/view/:bookID' element = { <Details/> }/>
        <Route path='/book/orders' element = { <ViewOrder/> }/>        
      </Routes>
    </div>
  );
}

export default App;
