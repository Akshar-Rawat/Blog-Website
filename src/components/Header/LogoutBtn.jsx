import React from 'react'
import {useDispatch} from 'react-redux'
import authService from '../../appwrite/auth'
import {logout} from '../../store/authSlice'

function LogoutBtn() {
    const dispatch = useDispatch()
    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout())
        })
    }
  return (
    <button
    className='px-4 py-1.5 text-sm font-medium text-mist border border-slate rounded-lg hover:border-danger/50 hover:text-danger transition-all duration-200 cursor-pointer'
    onClick={logoutHandler}
    >Logout</button>
  )
}

export default LogoutBtn