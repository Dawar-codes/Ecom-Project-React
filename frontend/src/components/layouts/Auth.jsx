import { Outlet } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";

export default function AuthLayout() {
 

  return (
    <>
    <Header/>
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded shadow-md">
        <Outlet /> {/* Renders the child routes (e.g., LoginPage, SignupPage) */}
      </div>
    </div>
    <Footer/>
    </>
  );
}
