
import { Route, Routes, Link} from 'react-router-dom'
import RegisterFormComp from "./components/auth/RegisterForm"
import LoginFormComp from "./components/auth/LoginForm"
import ChatPageComp from './components/Chat/ChatPage'
import MessageListComp from './components/Chat/MessageList'



function App() {
  
  return (
    <>
         <Routes>
      <Route path='/' element={<LoginFormComp />} />
      <Route path='/register' element={<RegisterFormComp />} />
      <Route path='/chat' element={<ChatPageComp/>}>
        <Route path=':userId' element={<MessageListComp />} />
        <Route path='group/:groupId' element={<MessageListComp />} />
      </Route>

    </Routes>
    </>
  )
}
export default App
