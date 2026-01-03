import { SignIn } from '@clerk/clerk-react'
import React from 'react'

/**
 * Render the login page containing the Clerk SignIn form.
 *
 * Renders a container with a "LoginPage" label and the Clerk `SignIn` component.
 * @returns {JSX.Element} A React element representing the login page.
 */
function LoginPage() {
  return (
    <div>LoginPage
      <SignIn/>
    </div>
  )
}

export default LoginPage