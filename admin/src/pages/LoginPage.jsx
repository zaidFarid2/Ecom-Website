import { SignIn } from '@clerk/clerk-react'
import React from 'react'

/**
 * Renders the login page containing the Clerk SignIn form.
 * @returns {JSX.Element} The login page element containing the "LoginPage" label and the Clerk `SignIn` component.
 */
function LoginPage() {
  return (
    <div>LoginPage
      <SignIn/>
    </div>
  )
}

export default LoginPage