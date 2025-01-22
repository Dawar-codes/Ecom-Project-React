import Modal from "../components/UI/Modal.jsx";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { modalActions } from "../components/store/index.js";

export default function CartPage() {
  const dispatch = useDispatch();

  // const navigate = useNavigate();

  function handleModalClose() {
    dispatch(modalActions.toggle());
  }

  return (
    <Modal

    // onClose={() => navigate("/products")}
    >
      <main className="container mx-auto my-8 px-2 max-w-md">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">Your Cart</h1>

        <div className="flex flex-col gap-3">
          {/* Cart Item 2 */}
          <div className="flex items-center justify-between border-b pb-4">
            {/* Product Details */}
            <div className="flex items-center gap-4">
              <div>
                <h2 className="text-sm font-semibold text-gray-800">
                  Product 2
                </h2>
                <p className="text-xs text-gray-600">Price: $30.00</p>
              </div>
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center gap-2">
              <button className="px-2 py-1 bg-gray-300 rounded-full text-sm">
                -
              </button>
              <span className="text-sm">2</span>
              <button className="px-2 py-1 bg-gray-300 rounded-full text-sm">
                +
              </button>
            </div>

            {/* Remove Item */}
            <button className="text-red-600 hover:text-red-800">
              <RiDeleteBin6Line />
            </button>
          </div>

          {/* Cart Summary */}
          <div className="flex justify-between mt-6">
            <p className="text-lg font-semibold text-gray-800">Total: $60.00</p>
          </div>

          {/* Cancel Button */}
          <div className="mt-4 flex gap-3">
            <button
              onClick={handleModalClose}
              className="text-xs hover:text-black border border-gray-400 hover:border-black px-3 py-1 rounded-full transition duration-300 ease-in-out"
            >
              Cancel
            </button>
            <Link
              to="/checkout"
              className="px-3 py-1 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition text-sm"
            >
              Checkout
            </Link>
          </div>
        </div>
      </main>
    </Modal>
  );
}
