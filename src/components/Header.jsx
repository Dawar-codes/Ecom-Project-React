import { Link } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { GiBullHorns } from "react-icons/gi";
import { useDispatch } from "react-redux";
import { modalActions } from "../components/store/index.js";
import { useEffect, useState } from "react";
import { useDebounceInput } from "./hooks/use-debouce-input.js";

export default function Header() {
  const dispatch = useDispatch();

  const [searchValue, setSearchValue] = useState("");
  const debouncedInput = useDebounceInput(searchValue);

  function handleModal() {
    dispatch(modalActions.toggle());
  }

  useEffect(() => {
    console.log("debouncedInput", debouncedInput);
    console.log("calling api");
  }, [debouncedInput]);

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
          <input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
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
