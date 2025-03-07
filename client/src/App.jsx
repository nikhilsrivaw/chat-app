import React, { useEffect, useState } from 'react'
import { Button } from './components/ui/button'
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom'
import Auth from './pages/auth'
import Chat from './pages/chat'
import Profile from './pages/profile/Profile'
import { useAppStore } from './store'
import { GET_USER_INFO } from './utils/constants'
import { apiClient } from './lib/api-client'


const PrivateRoute = ({ children }) => {
  const userInfo = useAppStore(); // ✅ Correct Zustand state access
  const isAuthenticated = !!userInfo;
  return isAuthenticated ? children : <Navigate to="/auth" />
}



const AuthRoute = ({ children }) => {
  const userInfo = useAppStore(); // ✅ Correct Zustand state access
  const isAuthenticated = !!userInfo;
  return isAuthenticated ? children : <Navigate to="/chat" />
}
const App = () => {
  const { userInfo, setuserInfo } = useAppStore();
  const [loading, setloading] = useState(true);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await apiClient.get(GET_USER_INFO, {
          withCredentials: true,
        });
        if (response.status === 200 && response.data.id) {
          setuserInfo(response.data);
        } else {
          setuserInfo(undefined);
        }
        console.log({ response });


      } catch (error) {
        setuserInfo(undefined);
      } finally{
        setloading(false);
      }
        
    }

  
    if (!userInfo) {
    getUserData();

  } else {
    setloading(false);
  }


}, [userInfo, setuserInfo]);

if (loading) {
  return <div>loading.......</div>
}

return (
  <BrowserRouter>
    <Routes>
      <Route path="/auth" element={<AuthRoute><Auth /></AuthRoute>} />
      <Route path="/Chat" element={<PrivateRoute><Chat /></PrivateRoute>} />
      <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
      <Route path="*" element={<Navigate to="/auth" />} />
    </Routes>

  </BrowserRouter>
)
}

export default App
