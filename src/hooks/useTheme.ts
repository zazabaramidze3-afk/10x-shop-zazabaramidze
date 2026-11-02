import { useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

const STORAGE_KEY = 'shop_theme'

const loadTheme = (): Theme => {
    try {
        return localStorage.getItem(STORAGE_KEY) === 'dark' ? 'dark' : 'light'
    } catch {
        return 'light'
    }
}

interface UseThemeResult {
    theme: Theme
    toggleTheme: () => void
}

const useTheme = (): UseThemeResult => {
    const [theme, setTheme] = useState<Theme>(loadTheme)

    // theme შეიცვალა: <html>-ზე ვრთავთ/ვთიშავთ "dark" კლასს და ვინახავთ არჩევანს
    useEffect(() => {
        document.documentElement.classList.toggle('dark', theme === 'dark')
        try {
            localStorage.setItem(STORAGE_KEY, theme)
        } catch {
            /* შენახვა ვერ მოხერხდა: თემა მაინც მუშაობს ამ სესიაში */
        }
    }, [theme])

    const toggleTheme = (): void => {
        setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'))
    }

    return { theme, toggleTheme }
}

export default useTheme
