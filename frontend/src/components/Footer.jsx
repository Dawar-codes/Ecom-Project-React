import { Link } from "react-router-dom";
import { FaFacebook } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { FaSquareXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-zinc-800 text-zinc-300 p-6 md:p-12">
      <div className="container mx-auto flex flex-col items-start md:flex-row justify-between gap-6">
        {/* Branding Section */}
        <div>
          <h2 className="text-2xl font-bold text-leather-500 mb-2">YAK</h2>
          <p className="text-sm">
            Premium leather products crafted for durability and style.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col md:flex-row gap-6">
          <div>
            <h3 className="font-semibold text-leather-500">Quick Links</h3>
            <ul className="space-y-2 mt-2">
              <li>
                <Link to="/products" className="hover:text-leather-400">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-leather-400">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-leather-400">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-leather-500">Help</h3>
            <ul className="space-y-2 mt-2">
              <li>
                <Link to="/faq" className="hover:text-leather-400">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="hover:text-leather-400">
                  Shipping
                </Link>
              </li>
              <li>
                <Link to="/returns" className="hover:text-leather-400">
                  Returns
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="font-semibold text-leather-500">Follow Us</h3>
          <div className="flex justify-center space-x-4 mt-2">
            <a
              href="#"
              className="hover:text-leather-400 flex flex-col items-center space-y-1"
            >
              <FaFacebook className="text-xl" />
              <span>Facebook</span>
            </a>
            <a
              href="#"
              className="hover:text-leather-400 flex flex-col items-center space-y-1"
            >
              <RiInstagramFill className="text-xl" />
              <span>Instagram</span>
            </a>
            <a
              href="#"
              className="hover:text-leather-400 flex flex-col items-center space-y-1"
            >
              <FaSquareXTwitter className="text-xl" />
              <span>Twitter</span>
            </a>
          </div>
        </div>
      </div>
      {/* Footer Bottom */}
      <div className="mt-6 border-t border-zinc-700 pt-4 text-sm text-center">
        &copy; {new Date().getFullYear()} YAK Leather. All Rights Reserved.
      </div>
    </footer>
  );
}
