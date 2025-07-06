
import { Route, Routes, Link} from 'react-router-dom'
import RegisterFormComp from "../components/RegisterForm"
import LoginFormComp from "../components/LoginForm"



function App() {
  
  return (
    <>
         <Routes>
      <Route path='/' element={<LoginFormComp />} />
      <Route path='/register' element={<RegisterFormComp />} />
      <Route path='/main' />
    </Routes>
    </>
  )
}

export default App
