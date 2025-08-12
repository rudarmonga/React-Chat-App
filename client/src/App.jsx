import React from 'react'
import './App.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Auth from './pages/auth'
import Chat from './pages/chat'
import Profiler from './pages/profile'

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/auth' element={<Auth />}/>
      <Route path='/chat' element={<Chat />}/>
      <Route path='/profile' element={<Profiler />}/>
      <Route path='*' element={<Navigate to={'/auth'} />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
