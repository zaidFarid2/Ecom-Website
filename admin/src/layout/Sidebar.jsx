import React from 'react'
import { useUser } from "@clerk/clerk-react";
import { ShoppingBagIcon } from "lucide-react";
import { Link, useLocation } from "react-router"; 
import { NAVIGATION } from "./Navbar";

function Sidebar() {
  const location = useLocation();
  const { user, isLoaded } = useUser();

  if (!isLoaded) return <div className="p-4">Loading...</div>;

  return (
    <div className='drawer-side z-50 overflow-x-hidden'>  
      <label htmlFor="my-drawer" aria-label='close-sidebar' className='drawer-overlay'></label>
      
     
      <div className='flex min-h-full flex-col items-start bg-base-200 
                      transition-all duration-300 ease-in-out
                      w-64 is-drawer-close:w-20'>
        
        {/* Header Section */}
        <div className='p-4 w-full'>
          <div className='flex items-center gap-3'>
            <div className='size-10 bg-primary rounded-xl flex items-center justify-center shrink-0'>
              <ShoppingBagIcon className="text-white size-6"/>
            </div>
            <span className='text-xl font-bold is-drawer-close:hidden transition-opacity duration-200'>
              Admin
            </span>
          </div>
        </div>

        {/* Navigation Section */}
        <ul className='menu w-full grow flex-col gap-2 px-2'>
          {NAVIGATION.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.path}>
                <Link 
                  to={item.path} 
                  className={`flex items-center gap-4 p-3 rounded-lg transition-colors
                  ${isActive ? "bg-primary text-primary-content" : "hover:bg-base-300"}
                  is-drawer-close:justify-center is-drawer-close:tooltip is-drawer-close:tooltip-right`}
                  data-tip={item.name}
                >
                  <span className="shrink-0">{item.icon}</span>
                  <span className='is-drawer-close:hidden whitespace-nowrap'>{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* User Profile Section */}
        <div className='p-4 w-full border-t border-base-300 bg-base-200/50'>
          <div className='flex items-center gap-3'>
            <div className='avatar shrink-0'>
              <div className="w-10 h-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden">
                <img 
                  src={user?.imageUrl} 
                  alt={user?.fullName || "User"} 
                />
              </div>
            </div>
            
            <div className='flex-1 min-w-0 is-drawer-close:hidden'>
              <p className='text-sm font-semibold truncate'>
                {user?.fullName || "Guest User"}
              </p>
              <p className='text-xs opacity-60 truncate'>
                {user?.emailAddresses?.[0]?.emailAddress}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar