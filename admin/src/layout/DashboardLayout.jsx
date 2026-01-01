import React from 'react'
import { Outlet } from 'react-router'

/**
 * Layout component that renders a header with a navbar/sidebar label and an Outlet for nested routes.
 *
 * Renders a header displaying "navbar slidebar" and includes React Router's Outlet to render child routes inside this layout.
 * @returns {JSX.Element} A React element containing the header and the Outlet placeholder for nested route content.
 */
function dashboardLayout() {
  return (
    <div>
      <h1>
        navbar slidebar
        <Outlet/>
      </h1>
    </div>
  )
}

export default dashboardLayout