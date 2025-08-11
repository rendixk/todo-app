import { useTheme } from '../context/ThemeContext'
import LoginContainer from '../components/auth/LoginContainer'

export default function LoginPage() {
  const { isDarkMode } = useTheme()

  return (
  <LoginContainer isDarkMode={isDarkMode}/>
  )
}