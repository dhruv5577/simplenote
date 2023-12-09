import './App.css';
import Home from './components/Home';
import Navbar from './components/Navbar';
import About from './components/About';
import NoteState from './context/notes/notestate';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Alerts from './components/Alerts';
import { useState } from 'react';

function App() {
  const [alert, setalert] = useState('null');

  const showalert = (message, type) => {
    setalert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setalert('null');
    }, 2000);
  }
  return (
    <>
      <NoteState>
        <BrowserRouter>
          <Navbar />
          <Alerts alert={alert} />
          <div className="container">
            <Routes>
              <Route exact path='/' element={<Home showalert={showalert} />} />
              <Route exact path='/about' element={<About />} />
              <Route exact path='/login' element={<Login showalert={showalert} />} />
              <Route exact path='/signup' element={<Signup showalert={showalert} />} />
            </Routes>
          </div>
        </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
