import { useState } from 'react'
import BOELogo from './assets/BOE_logo.svg'
import { ChatForm } from './ChatForm'
import { ChatMemory } from './ChatMemory'
import './App.css'

function App() {
  return (
    <>
      <div>
        <a href="https://www.boe.es/" target="_blank">
          <img src={BOELogo} className="boeLogo" alt="BOE logo" />
        </a>
      </div>
      <ChatMemory />
      <ChatForm />
    </>
  )
}

export default App
