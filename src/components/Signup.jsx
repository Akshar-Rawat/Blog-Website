import React, {useState} from 'react'
import authService from '../appwrite/auth'
import {Link ,useNavigate} from 'react-router-dom'
import {login} from '../store/authSlice'
import {Button, Input, Logo} from './index.js'
import {useDispatch} from 'react-redux'
import {useForm} from 'react-hook-form'

function Signup() {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()

    const create = async(data) => {
        setError("")
        try {
            const userData = await authService.createAccount(data)
            if (userData) {
                const userData = await authService.getCurrentUser()
                if(userData) dispatch(login(userData));
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }

  return (
    <div className="flex items-center justify-center min-h-[70vh] px-4">
        <div className='w-full max-w-md bg-surface rounded-xl p-8 border border-slate shadow-2xl shadow-black/30'>
            <div className="mb-6 flex justify-center">
                <Logo width="100%" />
            </div>
            <h2 className="text-center text-xl font-display font-semibold text-chalk tracking-tight">
                Create your account
            </h2>
            <p className="mt-2 text-center text-sm text-mist">
                Already have an account?{" "}
                <Link
                    to="/login"
                    className="text-cyan hover:text-cyan/80 transition-colors duration-200"
                >
                    Sign in
                </Link>
            </p>
            {error && (
                <div className="mt-6 px-4 py-3 rounded-lg bg-danger/10 border border-danger/20">
                    <p className="text-danger text-sm text-center">{error}</p>
                </div>
            )}

            <form onSubmit={handleSubmit(create)} className='mt-8'>
                <div className='space-y-5'>
                    <Input
                    label="Full Name"
                    placeholder="Your full name"
                    {...register("name", {
                        required: true,
                    })}
                    />
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
                    placeholder="Create a password"
                    {...register("password", {
                        required: true,})}
                    />
                    <Button type="submit" className="w-full">
                        Create account
                    </Button>
                </div>
            </form>
        </div>

    </div>
  )
}

export default Signup