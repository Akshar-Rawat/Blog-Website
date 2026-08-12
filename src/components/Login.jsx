import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import {Button, Input, Logo} from "./index"
import {useDispatch} from "react-redux"
import authService from "../appwrite/auth"
import {useForm} from "react-hook-form"

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()
    const [error, setError] = useState("")

    const login = async(data) => {
        setError("")
        try {
            const session = await authService.login(data)
            if (session) {
                const userData = await authService.getCurrentUser()
                if(userData) dispatch(authLogin(userData));
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }

  return (
    <div className='flex items-center justify-center w-full min-h-[70vh] px-4'>
        <div className='w-full max-w-md bg-surface rounded-xl p-8 border border-slate shadow-2xl shadow-black/30'>
            <div className="mb-6 flex justify-center">
                <Logo width="100%" />
            </div>
            <h2 className="text-center text-xl font-display font-semibold text-chalk tracking-tight">
                Sign in to your account
            </h2>
            <p className="mt-2 text-center text-sm text-mist">
                Don&apos;t have an account?{" "}
                <Link
                    to="/signup"
                    className="text-cyan hover:text-cyan/80 transition-colors duration-200"
                >
                    Sign up
                </Link>
            </p>
            {error && (
                <div className="mt-6 px-4 py-3 rounded-lg bg-danger/10 border border-danger/20">
                    <p className="text-danger text-sm text-center">{error}</p>
                </div>
            )}
            <form onSubmit={handleSubmit(login)} className='mt-8'>
                <div className='space-y-5'>
                    <Input
                    label="Email"
                    placeholder="you@example.com"
                    type="email"
                    {...register("email", {
                        required: true,
                        validate: {
                            matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                            "Email address must be a valid address",
                        }
                    })}
                    />
                    <Input
                    label="Password"
                    type="password"
                    placeholder="Enter your password"
                    {...register("password", {
                        required: true,
                    })}
                    />
                    <Button
                    type="submit"
                    className="w-full"
                    >Sign in</Button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Login