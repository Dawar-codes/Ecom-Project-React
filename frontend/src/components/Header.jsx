import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { GiBullHorns } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../components/store//modal-slice.js";
import { useMutation } from "@tanstack/react-query";
import { logout } from "../util/https.js";
import { useEffect, useState } from "react";
import { useDebounceInput } from "./hooks/use-debounce-input.js";

export default function Header() {
  const [searchTerm, setSearchTerm] = useState("");  // State for search input
  const debouncedInput = useDebounceInput(searchTerm, 1000);

  const cartItems = useSelector((state) => state.cart.items);

  const navigate = useNavigate();
  const location = useLocation();

  const {mutate} = useMutation({
    mutationFn: logout
  })


  // 2. Total number of items (if a product can have a quantity > 1)
  const totalItemCount = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const dispatch = useDispatch();

  const userRole = localStorage.getItem("userRole"); //get user role from local storage

  function handleModal() {
    dispatch(modalActions.handleOpen());
  }

  
  useEffect(() => {
    if(location.pathname === "/products" || location.pathname === "/"){
      if (debouncedInput.trim()) {
      navigate(`/products?search=${encodeURIComponent(debouncedInput)}`);
    } else {
      navigate("/products"); 
    }
    }
    
  }, [debouncedInput, navigate]); 

  async function handleLogout() {
    mutate({});
  }

 
  return (
    <header>
      <nav className="flex justify-between items-center h-20 lg:h-[5.5rem] p-4 sm:p-6 bg-zinc-800 text-zinc-200 lg:p-8 relative">
        {/* Profile Icon and conditional button */}
        <div className="flex items-center gap-4 sm:gap-10">
          <Link to="/auth/login" className="z-10">
            <CgProfile
              className="text-2xl lg:text-4xl cursor-pointer hover:text-leather-400 transition"
              aria-label="Profile"
            />
          </Link>
          {userRole && <button onClick={handleLogout}>Logout</button>}
          {userRole === "admin" && (
            <Link
              to="/admin/newProduct"
              className="bg-zinc-700 py-2 px-1 md:px-3 rounded-md hover:border-leather-500 hover:border-[1.3px] text-xs w-20 sm:w-auto sm:text-base whitespace-nowrap"
            >
              New Product
            </Link>
          )}
        </div>

        {/* Logo - Centered */}
        <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-2 z-10">
          <Link to="/products">
            <GiBullHorns
              className="text-3xl sm:text-4xl lg:text-5xl text-leather-500"
              aria-label="Logo"
            />
          </Link>
          <Link to="/products">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">YAK</h1>
          </Link>
        </div>

        {/* Search and Cart */}
        <div className="flex items-center gap-2 sm:gap-4 z-10">
        
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search..."
              className="px-4 py-2 rounded-lg bg-zinc-700 text-zinc-200 placeholder-zinc-400 
                         focus:outline-none focus:ring-[1.3px] focus:ring-leather-500 focus:border-transparent transition"
            />
          
          <button
            onClick={handleModal}
            className="relative text-base sm:text-lg lg:text-xl font-semibold hover:text-leather-400 transition"
          >
            Cart
            {totalItemCount >= 0 && (
              <span
                className="absolute -top-2 -right-3 sm:-right-4 bg-leather-500 text-white text-xs font-bold 
                      w-5 h-5 flex items-center justify-center rounded-full"
              >
                {totalItemCount}
              </span>
            )}
          </button>
        </div>
      </nav>
    </header>
  );
}
