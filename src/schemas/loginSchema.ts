import { object, string } from 'yup'

export const loginSchema = object({
    username: string().trim().required('Username is required'),
    password: string().required('Password is required').min(6, 'Password must be at least 6 characters'),
})