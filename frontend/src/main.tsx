import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css';
import NavBar from './components/Navbar.tsx';
import { RecoilRoot } from 'recoil';
import InitUser from './components/InitUser.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RecoilRoot>
      <NavBar/>   
      <InitUser/> 
      <App />
    </RecoilRoot>
  </React.StrictMode>,
)
