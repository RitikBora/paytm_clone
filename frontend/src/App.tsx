import { BrowserRouter, Route, Routes } from "react-router-dom"
import Signup from "./components/Signup"
import Signin from "./components/Signin"
import Dashboard from "./components/Dashboard"
import Send from "./components/Send"
import Landing from "./components/Landing"

const  App = () => {

  return (
    <>
        <BrowserRouter basename="/paytm">
          <Routes>
            <Route path="/" element={<Landing/>} />
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/signin" element={<Signin/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/send" element={<Send/>}/>
          </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
