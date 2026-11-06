import { useFormik } from 'formik'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import FormField from '../components/FormField'
import useAuth from '../hooks/useAuth'
import { loginSchema } from '../schemas/loginSchema'
import type { LoginFormValues } from '../types/user'

interface LoginLocationState {
    from?: { pathname: string }
}

const LoginPage = () => {
    const { login } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const redirectTo = (location.state as LoginLocationState | null)?.from?.pathname ?? '/'

    const formik = useFormik<LoginFormValues>({
        initialValues: { username: '', password: '' },
        validationSchema: loginSchema,
        onSubmit: (values) => {
            login(values.username)
            navigate(redirectTo, { replace: true })
        },
    })

    return (
        <div className='mx-auto max-w-sm space-y-6'>
            <h1 className='text-2xl font-semibold'>Login</h1>

            <form onSubmit={formik.handleSubmit} className='space-y-4'>
                <FormField
                    id='username'
                    name='username'
                    type='text'
                    label='Username'
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.username ? formik.errors.username : undefined}
                />

                <FormField
                    id='password'
                    name='password'
                    type='password'
                    label='Password'
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.password ? formik.errors.password : undefined}
                />

                <Button type='submit' className='w-full'>
                    Login
                </Button>
            </form>

            <Link to='/' className='inline-block text-sm font-medium underline transition duration-200 hover:opacity-70'>
                ← Back to catalog
            </Link>
        </div>
    )
}

export default LoginPage
