import type { InputHTMLAttributes } from 'react'

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string
    id: string
    error?: string
}

const FormField = ({ label, id, error, ...props }: FormFieldProps) => {
    return (
        <div className='space-y-1'>
            <label htmlFor={id} className='text-sm font-medium'>
                {label}
            </label>
            <input
                id={id}
                aria-invalid={error ? true : undefined}
                aria-describedby={error ? `${id}-error` : undefined}
                className='w-full rounded-xl border border-neutral-300 px-4 py-2.5 transition duration-200 focus:border-neutral-900 focus:outline-none'
                {...props}
            />
            {error && (
                <p id={`${id}-error`} className='text-sm text-red-600'>
                    {error}
                </p>
            )}
        </div>
    )
}

export default FormField
