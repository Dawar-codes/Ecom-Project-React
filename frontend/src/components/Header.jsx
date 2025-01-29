import { Link } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { GiBullHorns } from "react-icons/gi";
import { useDispatch } from "react-redux";
import { modalActions } from "../components/store/index.js";

export default function Header() {
  const dispatch = useDispatch();

  function handleModal() {
    dispatch(modalActions.handleOpen());
  }
  return (
    <header>
    <nav className="flex justify-between items-center h-20 lg:h-[5.5rem] p-6 bg-zinc-800 text-zinc-200 lg:p-8 relative">
      {/* Profile Icon */}
      <Link to="/auth/login" className="z-10">
        <CgProfile
          className="text-2xl lg:text-4xl cursor-pointer hover:text-leather-400 transition"
          aria-label="Profile"
        />
      </Link>
  
      {/* Logo - Centered */}
      <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-2 z-10">
        <Link to="./"><GiBullHorns
          className="text-4xl lg:text-5xl text-leather-500"
          aria-label="Logo"
        /></Link>
        <Link to="./"><h1 className="text-2xl lg:text-3xl font-bold">YAK</h1></Link>
      </div>
  
      {/* Search and Cart */}
      <div className="flex items-center gap-4 z-10">
      <input
        type="text"
        placeholder="Search..."
        className="px-4 py-2 md:visible invisible  rounded-lg bg-zinc-700 text-zinc-200 placeholder-zinc-400 focus:outline-none focus:ring-[1.3px] focus:ring-leather-500 focus:border-transparent transition"
      />
        <button
          onClick={handleModal}
          className="text-lg lg:text-xl font-semibold hover:hover:text-leather-400 transition"
        >
          Cart
        </button>
      </div>
    </nav>
  </header>
  );
}
