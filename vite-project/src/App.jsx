import { useState } from 'react'
import './App.css'
import QuizApp from './Quiz'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <QuizApp/>
    </>
  )
}

export default App
