import React from 'react'
import {
  BrowserRouter as Router
} from 'react-router-dom'

import Header from '../Header/Header'
import Sidebar from '../Sidebar/Sidebar'
import Routes from '../Routes/Routes'

const App = () => (
  <Router>
    <div>
      <Header />
      <div className='container'>
        <Sidebar />
        <main>
          <Routes />
        </main>
        <style jsx global>{`
          html, body {
            box-sizing: border-box
          }
          html, body, body > div, body > div > div {
            height: 100%;
            width: 100%;
          }
        `}</style>
        <style jsx>{`
          .container {
            display: flex;
            height: calc(100% - 70px);
            padding-top: 70px
          }
          main {
            flex: 3
          }
        `}</style>
      </div>
    </div>
  </Router>
)
export default App
