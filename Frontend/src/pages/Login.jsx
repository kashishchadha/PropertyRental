import AuthFrame from '../modules/auth/components/AuthFrame'
import AuthFormCard from '../modules/auth/components/AuthFormCard'

function Login() {
  return (
    <AuthFrame title="Welcome Back" subtitle="Manage your elite portfolio with precision.">
      <AuthFormCard mode="login" />
    </AuthFrame>
  )
}

export default Login
