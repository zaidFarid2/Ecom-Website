import React from 'react'
import {LoaderIcon} from "lucide-react"

/**
 * Renders a full-screen, centered loading spinner.
 *
 * @returns {JSX.Element} A container div that fills the viewport and centers an animated LoaderIcon.
 */
function PageLoader() {
  return (
    <div className=" flex items-center  justify-center h-screen ">
      <LoaderIcon className ="size-12 animate-spin " />
    </div>
  )
}

export default PageLoader