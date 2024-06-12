//@ts-nocheck

import { logger } from './utils/index'
import logic from './logic/index'
import { useEffect, useState } from 'react'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'

import { errors } from 'com'
import { Context } from './context.ts'

import Login from './pages/Login'
import Register from './pages/Register'
import RegisterManager from './pages/RegisterManager'
import Feedback from './components/Feedback'
import Confirm from './components/Confirm'
import isUserLoggedIn from './logic/isUserLoggedIn'
import getLoggedInfo from './logic/getLoggedInfo'
import HomePlayer from './pages/HomePlayer'
import HomeManager from './pages/HomeManager'
import Profile from './components/Profile'
import Field from './components/Field'

const { UnauthorizedError } = errors



function App() {
  const [feedback, setFeedback] = useState(null)
  const [confirm, setConfirm] = useState(null)


  const navigate = useNavigate()

  const goToLogin = () => navigate('/login')

  //login
  const handleRegisterClick = () => navigate('/register')


  const handleUserLoggedIn = () => {
    try {
      const { role } = getLoggedInfo();

      if (role === 'player') {
        navigate('/')
      } else if (role === 'manager') {
        navigate('/manager')
      }
    } catch (error) {
      alert(error)
      goToLogin()
    }

  }

  const handleUserLoggedOut = () => goToLogin()


  //registerPlayer/ manager
  const handleLoginClick = () => goToLogin()

  const handleFeedbackAcceptClick = () => setFeedback(null)

  const handleFeedback = (error, level = 'warn') => {
    if (error instanceof UnauthorizedError) {
      logic.logoutUser()
      level = 'error'

      goToLogin()
    }
    setFeedback({ message: error.message, level })
  }

  const handleConfirm = (message, callback) => setConfirm({ message, callback })

  const handleConfirmCancelClick = () => {
    confirm.callback(false)

    setConfirm(null)
  }

  const handleConfirmAcceptClick = () => {
    confirm.callback(true)

    setConfirm(null)
  }



  logger.debug('App -> render')
  return <>

    <Context.Provider value={{ showFeedback: handleFeedback, showConfirm: handleConfirm }}>
      <Routes>
        <Route path="/login" element={isUserLoggedIn() && getLoggedInfo().role === 'manager' ? <Navigate to="/manager" /> : isUserLoggedIn() && getLoggedInfo().role === 'player' ? <Navigate to="/" /> : <Login onRegisterClick={handleRegisterClick} onUserLoggedIn={handleUserLoggedIn} />} />

        <Route path="/register" element={isUserLoggedIn() && getLoggedInfo().role === 'manager' ? <Navigate to="/manager" /> : isUserLoggedIn() && getLoggedInfo().role === 'player' ? <Navigate to="/" /> : <Register onLoginClick={handleLoginClick} onUserRegistered={handleLoginClick} />} />

        <Route path="/register/manager" element={isUserLoggedIn() && getLoggedInfo().role === 'manager' ? <Navigate to="/manager" /> : isUserLoggedIn() && getLoggedInfo().role === 'player' ? <Navigate to="/" /> : <RegisterManager onUserRegistered={handleLoginClick} />} />

        <Route path="/*" element={isUserLoggedIn() && getLoggedInfo().role === 'manager' ? <Navigate to="/manager" /> : isUserLoggedIn() && getLoggedInfo().role === 'player' ? <HomePlayer /> : <Navigate to="/login" />} />

        <Route path="/manager/*" element={isUserLoggedIn() && getLoggedInfo().role === 'player' ? <Navigate to="/" /> : isUserLoggedIn() && getLoggedInfo().role === 'manager' ? <HomeManager /> : <Navigate to="/login" />} />

      </Routes>
    </Context.Provider>

    {feedback && <Feedback message={feedback.message} level={feedback.level} onAcceptClick={handleFeedbackAcceptClick} />}

    {confirm && <Confirm message={confirm.message} onCancelClick={handleConfirmCancelClick} onAcceptClick={handleConfirmAcceptClick} />}
  </>

}

export default App
