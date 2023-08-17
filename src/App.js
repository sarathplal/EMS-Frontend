import './App.css';
import Edit from './Pages/Edit';
import Home from './Pages/Home';
import Register from './Pages/Register';
import View from './Pages/View';
import Emsfooter from './components/Emsfooter';
import Emsheader from './components/Emsheader';
import { Route,Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <header>
        <Emsheader/>
      </header>

      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/register" element={<Register/>}></Route>
        <Route path="/view/:id" element={<View/>}></Route>
        <Route path="/edit/:id" element={<Edit/>}></Route>
      </Routes>
      <footer>
        <Emsfooter/>
      </footer>
    </>
  );
}

export default App;
