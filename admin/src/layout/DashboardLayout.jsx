import React from 'react'
import { Outlet } from 'react-router'
import Navbar from './Navbar'
import Sidebar from './Sidebar'


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