import RegisterContainer from '../components/auth/RegisterContainer'
import { useTheme } from '../context/ThemeContext'

export default function RegisterPage() {
  const { isDarkMode } = useTheme()

  return <RegisterContainer isDarkMode={isDarkMode}/>
}