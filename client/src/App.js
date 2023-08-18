import React from 'react'
import {BrowserRouter as Router,
Routes, Route} from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Chat from './pages/Chat';
import SetAvatar from './pages/SetAvatar';
export default function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/register"  element={<Register/>}/>
        <Route exact path="/login"  element={<Login/>}/>
        <Route exact path="/"  element={<Chat/>}/>
        <Route exact path="/setAvatar"  element={<SetAvatar/>}/>
      </Routes>
    </Router>
  )
}
