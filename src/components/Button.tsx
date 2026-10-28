import type { ButtonHTMLAttributes } from 'react'

type ButtonVariant = 'primary' | 'secondary'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
}

// საერთო სტილები ორივე ვარიანტისთვის
const baseStyles = [
  'rounded-xl px-5 py-2.5 text-sm font-medium',
  'transition duration-200',
  'focus-visible:outline-2 focus-visible:outline-offset-2',
  'disabled:cursor-not-allowed disabled:opacity-50',
].join(' ')

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-neutral-900 text-white hover:bg-neutral-700 focus-visible:outline-neutral-900',
  secondary:
    'border border-neutral-300 bg-neutral-100 text-neutral-900 hover:bg-neutral-200 focus-visible:outline-neutral-400',
}

const Button = ({ variant = 'primary', className = '', type = 'button', ...props }: ButtonProps) => {
  return (
    <button
      type={type}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    />
  )
}

export default Button