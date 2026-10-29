import { Component } from 'react'
import type { ErrorInfo, ReactNode } from 'react'
import Button from './Button'

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('Unhandled UI error:', error, info.componentStack)
  }

  handleReset = (): void => {
    this.setState({ hasError: false })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className='mx-auto max-w-md space-y-4 px-4 py-24 text-center'>
          <h1 className='text-2xl font-semibold'>Something went wrong</h1>
          <p className='text-neutral-600'>An unexpected error occurred. Please try again.</p>
          <Button onClick={this.handleReset}>Try again</Button>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary