import { Routes, Route, Navigate } from "react-router"
import LoginpPage from "./pages/LoginPage"
import ProductPage from "./pages/ProductsPage"
import OrdersPage from "./pages/OrdersPage"
import DashboardPage from "./pages/DashboardPage"
import { useAuth } from "@clerk/clerk-react";
import DashboarLayout from "./layout/DashboardLayout"
import PageLoader from "./components/PageLoader"



const App = () => {
  const { isSignedIn,isLoaded } = useAuth()

  if(!isLoaded){
    return(
      <PageLoader/>

    )
  }
  return (
    <Routes>
      <Route path="/login" element={isSignedIn ? <Navigate to={"/dashboard"}/>:<LoginpPage/>} />

      <Route path="/" element={isSignedIn ? <DashboarLayout /> : <Navigate to={"/login"} />} >
        <Route index element={< Navigate to={"dashboard"} />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/products" element={<ProductPage />} />
      </Route>

    </Routes>
  )
}

export default App