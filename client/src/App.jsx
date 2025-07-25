
import { Route, Routes, Link} from 'react-router-dom'
import RegisterFormComp from "./components/auth/RegisterForm"
import LoginFormComp from "./components/auth/LoginForm"

import PrivateChatPageComp from './components/Chat/PrivateChat/PrivateChatPage'

import GroupChatPageComp from './components/Chat/GroupChat/GroupChatPage' 

import MainChatPageComp from './components/Chat/MainChatPage'



function App() {
  
  return (
    <>
         <Routes>
      <Route path='/' element={<LoginFormComp />} />
      <Route path='/register' element={<RegisterFormComp />} />

      <Route path='/chat' element={<MainChatPageComp/>}>
        <Route path='user/:userId' element={<PrivateChatPageComp />} />
        <Route path='group/:groupId' element={<GroupChatPageComp />} />
      </Route>

    </Routes>
    </>
  )
}
export default App
