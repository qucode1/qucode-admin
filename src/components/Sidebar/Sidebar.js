import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => (
  <sidebar className='sidebar'>
    <div className='container'>
      <ul className='nav'>
        <li className='navItem'><Link className='link' to='/posts'>Posts</Link></li>
        <li className='navItem'><Link className='link' to='/about'>About</Link></li>
        <li className='navItem'><Link className='link' to='/'>Home</Link></li>
        <li className='navItem'><Link className='link' to='/rows'>Rows</Link></li>
      </ul>
    </div>
    <style jsx>{`
      .sidebar {
        position: fixed;
        left: 0;
        top: 0;
        height: 100%;
        width: 200px
        background-color: #22bbee;
        z-index: 1
      }
      .container {
        margin-top: 70px;
        display: flex;
        flex-direction: column;
        align-items: center
      }
      .nav {
        display: flex;
        flex-direction: column;
        padding-top: 70px;
      }
      @media only screen and (min-width: 900px) {
        .sidebar {
        }
      }
    `}</style>
  </sidebar>
)
export default Sidebar
