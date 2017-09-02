import React from 'react'
import { headerStyles } from './headerStyles'
import { Link } from 'react-router-dom'
import Auth from '../../modules/Auth'

const Header = () => (
  <header className='header'>
    <div className='container'>
      <h1 className='logo'><Link to='/' className='link'>QuCode | Admin Panel</Link></h1>
      <nav>
        <ul className='nav'>
          <li className='navItem'><Link className='link' to='/posts'>Posts</Link></li>
          <li className='navItem'><Link className='link' to='/about'>About</Link></li>
          {Auth.isUserAuthenticated()
          ? <li className='navItem'><Link className='link' to='/logout'>Log Out</Link></li>
          : <li className='navItem'><Link className='link' to='/login'>Log In</Link></li>
          }
          {!Auth.isUserAuthenticated() && <li className='navItem'><Link className='link' to='/signup'>Sign Up</Link></li> }


        </ul>
      </nav>
    </div>
    <style jsx>{ headerStyles }</style>
    <style jsx global>{`
      a.link {
        color: white
      }
      a.link:hover, a.link:focus {
        color: #33ceff
      }
    `}</style>
  </header>
)
export default Header
