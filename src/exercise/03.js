// Flexible Compound Components
// http://localhost:3000/isolated/exercise/03.js

import * as React from 'react'
import {Switch} from '../switch'

const ToggleContext = React.createContext()
ToggleContext.displayName = 'ToggleContext'

function ToggleProvider(props) {
  const [on, setOn] = React.useState(false)
  const toggle = () => setOn(!on)

  return <ToggleContext.Provider value={{ on, toggle }} {...props} />
}

const useToggle = () => {
  const context = React.useContext(ToggleContext);
  if (!context) {
    throw Error('useToggle can only be used within a <ToggleProvider />')
  }
  return context
}

function ToggleOn({ children }) {
  const { on } = useToggle();
  return on ? children : null
}

function ToggleOff({ children }) {
  const { on } = useToggle();
  return on ? null : children
}

function ToggleButton(props) {
  const { on, toggle } = useToggle()
  return <Switch on={on} onClick={toggle} {...props} />
}

function App() {
  return (
    <div>
      <ToggleProvider>
        <ToggleOn>The button is on</ToggleOn>
        <ToggleOff>The button is off</ToggleOff>
        <div>
          <ToggleButton />
        </div>
      </ToggleProvider>
    </div>
  )
}

export default App
