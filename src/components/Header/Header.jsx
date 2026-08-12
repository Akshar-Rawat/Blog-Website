import React from 'react'
import {Container, Logo, LogoutBtn} from '../index'
import { Link } from 'react-router-dom'
import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()

  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    }, 
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
  },
  {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
  },
  {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
  },
  {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
  },
  ]


  return (
    <header className='sticky top-0 z-50 bg-ink/80 backdrop-blur-md border-b border-slate'>
      <Container>
        <nav className='flex items-center justify-between h-16'>
          <Link to='/' className='hover:opacity-80 transition-opacity'>
            <Logo width='70px' />
          </Link>
          <ul className='flex items-center gap-1'>
            {navItems.map((item) => 
            item.active ? (
              <li key={item.name}>
                <button
                onClick={() => navigate(item.slug)}
                className='px-4 py-2 text-sm font-medium text-mist hover:text-chalk transition-colors duration-200 relative after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-0.5 after:bg-cyan after:transition-all after:duration-200 hover:after:w-3/4 cursor-pointer'
                >{item.name}</button>
              </li>
            ) : null
            )}
            {authStatus && (
              <li className='ml-2'>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
        </Container>
    </header>
  )
}

export default Header