import { useState } from 'react';
import type { ChangeEvent, SubmitEvent } from 'react';
import Button from '../components/Button';
import type { FormErrors } from '../types/form'
import type { LoginFormValues } from '../types/user'
import { validateLogin } from '../utils/validation'
import { useNavigate } from 'react-router-dom'
import useAuth  from '../hooks/useAuth'

const LoginPage = () => {
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [errors, setErrors] = useState<FormErrors<LoginFormValues>>({})
    const { login } = useAuth()
    const navigate = useNavigate()

    const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setUsername(event.target.value)
    }

    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setPassword(event.target.value)
    }

    const handleSubmit = (event: SubmitEvent<HTMLFormElement>): void => {
        event.preventDefault()

        const validationErrors = validateLogin({ username, password })
        setErrors(validationErrors)

        if (Object.keys(validationErrors).length > 0) {
            return
        }

        login(username)
        navigate('/')
    }
    
    return (
        <div className='mx-auto max-w-sm space-y-6'>
            <h1 className='text-2xl font-semibold'>Login</h1>

            <form onSubmit={handleSubmit} className='space-y-4'>
                <div className='space-y-1'>
                    <label htmlFor='username' className='text-sm font-medium'>
                        Username
                    </label>
                    <input
                        id='username'
                        type='text'
                        value={username}
                        onChange={handleUsernameChange}
                        className='w-full rounded-xl border border-neutral-300 px-4 py-2.5 transition duration-200 focus:border-neutral-900 focus:outline-none'
                    />
                    {errors.username && <p className='text-sm text-red-600'>{errors.username}</p>}
                </div>

                <div className='space-y-1'>
                    <label htmlFor='password' className='text-sm font-medium'>
                        Password
                    </label>
                    <input
                        id='password'
                        type='password'
                        value={password}
                        onChange={handlePasswordChange}
                        className='w-full rounded-xl border border-neutral-300 px-4 py-2.5 transition duration-200 focus:border-neutral-900 focus:outline-none'
                    />
                    {errors.password && <p className='text-sm text-red-600'>{errors.password}</p>}
                </div>

                <Button type='submit' className='w-full'>
                    Login
                </Button>
            </form>
        </div>
    )
}

export default LoginPage