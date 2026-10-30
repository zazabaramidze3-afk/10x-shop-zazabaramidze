import { useState } from 'react';
import type { ChangeEvent, SubmitEvent } from 'react';
import Button from '../components/Button';

const LoginPage = () => {
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setUsername(event.target.value)
    }

    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setPassword(event.target.value)
    }

    const handleSubmit = (event: SubmitEvent<HTMLFormElement>): void => {
        event.preventDefault()
        console.log('Login attempt:', { username })
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
                </div>

                <Button type='submit' className='w-full'>
                    Login
                </Button>
            </form>
        </div>
    )
}

export default LoginPage