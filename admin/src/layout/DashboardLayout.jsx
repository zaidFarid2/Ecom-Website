import React from 'react'
import { Outlet } from 'react-router'

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