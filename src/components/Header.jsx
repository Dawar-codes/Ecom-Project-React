import { Link } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { GiBullHorns } from "react-icons/gi";
import { useDispatch } from "react-redux";
import { modalActions } from "../components/store/index.js";

export default function Header() {
  const dispatch = useDispatch();

  function handleModal() {
    dispatch(modalActions.toggle());
  }
  return (
    <header>
      <nav className=" flex justify-between items-center h-20 lg:h-[5.5rem] p-6 bg-zinc-800 text-zinc-200 lg:p-8">
        {/* Profile Icon */}
        <Link to="/auth/login">
          <CgProfile
            className="text-2xl lg:text-4xl cursor-pointer hover:text-leather-400 transition"
            aria-label="Profile"
          />
        </Link>

        {/* Logo */}
        <div className="flex items-center gap-2">
          <GiBullHorns
            className="text-4xl lg:text-5xl text-leather-500"
            aria-label="Logo"
          />
          <h1 className="text-2xl lg:text-3xl font-bold ">YAK</h1>
        </div>

        {/* Search and Cart */}
        <div className="flex items-center gap-4">
          <IoIosSearch
            className="text-2xl lg:text-4xl cursor-pointer hover:text-leather-400 transition"
            aria-label="Search"
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
