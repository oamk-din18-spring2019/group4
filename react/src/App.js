import React, { Component } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import MainView from './views/main/MainView'
import './views/main/transitions.css'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <Router>
          <MainView />
        </Router>
      </div>
    )
  }
}

export default App
