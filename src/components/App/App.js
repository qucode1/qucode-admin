import React from 'react'
import {
  HashRouter as Router
} from 'react-router-dom'

import Header from '../Header/Header'
import Sidebar from '../Sidebar/Sidebar'
import Routes from '../Routes/Routes'

import { baseStyles } from './baseStyles'

const App = () => (
  <Router>
    <div>
      <Header />
      <div className='container'>
        <Sidebar />
        <main>
          <Routes />
        </main>
        <style jsx global>{ baseStyles }</style>
        <style jsx global>{`

        `}</style>
        <style jsx>{`
          .container {
            display: flex;
            justify-content: center;
            height: calc(100% - 70px);
            padding-top: 70px
          }
          main {
            width: 100%;
          }
          @media only screen and (min-width: 900px) {
            .container {
              padding-left: 250px
            }
            main {
              max-width: 900px
            }
          }
        `}</style>
      </div>
    </div>
  </Router>
)
export default App
