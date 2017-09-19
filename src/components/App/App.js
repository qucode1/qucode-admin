import React from 'react'
import {
  HashRouter as Router,
  Switch
} from 'react-router-dom'

import Header from '../Header/Header'
import Sidebar from '../Sidebar/Sidebar'
import Routes from '../Routes/Routes'
import BaseRoutes from '../BaseRoutes/BaseRoutes'
import CMS from '../CMS/CMS'

import { baseStyles } from './baseStyles'

const App = () => (
  <Router>
    <div>
      <Header />
      <div className='container'>
        <main>
          <BaseRoutes />

        </main>
        <style jsx global>{ baseStyles }</style>
        <style jsx>{`
          .container {
            display: flex;
            justify-content: center;
            height: calc(100% - 70px);
            padding-top: 70px
          }
          main {
            width: 100%;
            padding: 10px
          }
          @media only screen and (max-width: 1300px) and (min-width: 900px) {
            .container {
              padding-left: 200px
            }
          }
          @media only screen and (min-width: 900px) {
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
