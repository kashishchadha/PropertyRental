import AuthFrame from '../modules/auth/components/AuthFrame'
import AuthFormCard from '../modules/auth/components/AuthFormCard'

function Signup() {
  return (
    <AuthFrame title="Create Account" subtitle="Join EstateConcierge and start managing smarter.">
      <AuthFormCard mode="signup" />
    </AuthFrame>
  )
}

export default Signup
