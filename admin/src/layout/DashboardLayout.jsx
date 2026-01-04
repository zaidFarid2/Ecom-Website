import React from 'react'
import { Outlet } from 'react-router'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

/**
 * Layout component that renders a header with a navbar/sidebar label and an Outlet for nested routes.
 *
 * Renders a header displaying "navbar slidebar" and includes React Router's Outlet to render child routes inside this layout.
 * @returns {JSX.Element} A React element containing the header and the Outlet placeholder for nested route content.
 */
function dashboardLayout() {
  return (
    <div className="drawer lg:drawer-open" >
      <input  id="my-drawer" type="checkbox" className='drawer-toggle' defaultChecked />
      <div className='drawer-content'>  
        <Navbar/>
        <main className='p-6'>
          <Outlet/>
        </main>
      </div>
      <Navbar/><Sidebar/>
    </div>
  )
}

export default dashboardLayout