import Modal from "../components/UI/Modal.jsx";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../components/store/modal-slice.js";
import { cartActions } from "../components/store/cart-slice.js";
import { formatter } from "../components/store/priceFormatter.js";

export default function CartPage() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const totalPrice = useSelector((state) => state.cart.totalPrice);

  // const navigate = useNavigate();

  function handleModalClose() {
    dispatch(modalActions.handleClose());
  }

  function handleAddItem(product) {
    dispatch(cartActions.addToCart(product));
  }

  function handleRemoveItem(productId) {
    dispatch(cartActions.removeFromCart(productId));
  }
  function handleDeleteItem(productId) {
    dispatch(cartActions.deleteItem(productId));
  }

  if (!cartItems || cartItems.length === 0) {
    return (
      <Modal onClose={handleModalClose}>
        <div className="text-center py-6">
          <h2 className="text-lg font-semibold text-gray-800">
            Your Cart is Empty
          </h2>
          <button
            onClick={handleModalClose}
            className="mt-4 px-3 py-1 rounded-full bg-gray-600 text-white hover:bg-gray-700"
          >
            Close
          </button>
        </div>
      </Modal>
    );
  }

  return (
    <Modal onClose={handleModalClose}>
      <main className="container mx-auto my-8 px-2 max-w-md">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">Your Cart</h1>

        {cartItems.length === 0 ? (
          <p className="text-gray-600 text-center">Your cart is empty.</p>
        ) : (
          <div className="flex flex-col gap-3">
            {cartItems.map((item) => (
              <div
                key={item.product.id}
                className="flex items-center justify-between border-b pb-4"
              >
                {/* Product Details */}
                <div className="flex items-center gap-4">
                  <div>
                    <h2 className="text-sm font-semibold text-gray-800">
                      {item.product.title}
                    </h2>
                    <p className="text-xs text-gray-600">
                      Price: {formatter.format(item.product.price)}
                    </p>
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleRemoveItem(item.product.id)}
                    className="px-2 py-1 bg-gray-300 rounded-full text-xs"
                  >
                    -
                  </button>
                  <span className="text-sm">{item.quantity}</span>
                  <button
                    onClick={() => handleAddItem(item.product)}
                    className="px-2 py-1 bg-gray-300 rounded-full text-xs"
                  >
                    +
                  </button>
                </div>

                {/* Remove Item */}
                <button
                  onClick={() => handleDeleteItem(item.product.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <RiDeleteBin6Line />
                </button>
              </div>
            ))}

            {/* Cart Summary */}
            <div className="flex justify-between mt-6">
              <p className="text-lg font-semibold text-gray-800">
                Total: {formatter.format(totalPrice)}
              </p>
            </div>

            {/* Cancel & Checkout Buttons */}
            <div className="mt-4 flex gap-3">
              <button
                onClick={handleModalClose}
                className="text-xs hover:text-black border border-gray-400 hover:border-black px-3 py-1 rounded-full transition duration-300 ease-in-out"
              >
                Close
              </button>
              <Link
                to="/checkout"
                onClick={handleModalClose} // Closes modal on checkout
                className="px-3 py-1 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition text-sm"
              >
                Checkout
              </Link>
            </div>
          </div>
        )}
      </main>
    </Modal>
  );
}
