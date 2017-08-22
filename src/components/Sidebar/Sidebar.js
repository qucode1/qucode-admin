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
        height: 100%;
        width: 250px
        background-color: #22bbee
      }
      .container {
        display: flex;
        flex-direction: column;
        align-items: center
      }
      .nav {
        display: flex;
        flex-direction: column
      }
      @media only screen and (min-width: 900px) {
        .sidebar {
          position: relative
        }
      }
    `}</style>
  </sidebar>
)
export default Sidebar
