import { FaMoon, FaSun } from 'react-icons/fa'
import { useTheme } from '../context/ThemeContext'

export default function ThemeToggle({ className = '', onAfterToggle }) {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'
  const label = isDark ? 'Switch to light theme' : 'Switch to dark theme'

  const handleClick = () => {
    toggleTheme()
    if (typeof onAfterToggle === 'function') onAfterToggle()
  }

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={label}
      title={label}
      className={`theme-switch${isDark ? ' theme-switch--dark' : ' theme-switch--light'}${className ? ` ${className}` : ''}`}
      onClick={handleClick}
    >
      <span className="theme-switch__track" aria-hidden="true">
        <FaSun className="theme-switch__icon theme-switch__icon--sun" />
        <FaMoon className="theme-switch__icon theme-switch__icon--moon" />
        <span className="theme-switch__thumb" />
      </span>
    </button>
  )
}
