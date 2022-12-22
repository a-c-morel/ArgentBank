import React from 'react'
import { Routes, Route } from "react-router-dom"
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import ProfilePage from './pages/ProfilePage'
import ProtectedRoute from "./utils/ProtectedRoute"

function App() {
  return (
      <Routes>
        <Route path="/" element={ <HomePage /> } />
        <Route path="/login" element={ <LoginPage /> }/>
        <Route path="/profile" element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }/>
      </Routes>
  )
}

export default App
