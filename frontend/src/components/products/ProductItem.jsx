import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { modalActions } from "../store/modal-slice.js";

import { formatter } from "../store/priceFormatter";
import { cartActions } from "../store/cart-slice.js";

export default function ProductItem({ product }) {

  const dispatch = useDispatch();
  function handleCartOpen() {
    dispatch(cartActions.addToCart(product));
   dispatch(modalActions.handleOpen());
     }

     return (
      <div className="max-w-sm w-full bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-transform duration-300 transform hover:scale-[1.01] flex flex-col h-full">
        {/* Wrap only the top content in the Link */}
        <Link to={`/products/${product.id}`} className="block flex-grow">
          {/* Product Image */}
          <img
            src={product.image_url}
            alt={product.title}
            className="w-full h-48 object-cover"
          />
  
          {/* Product Details */}
          <div className="p-4">
            {/* Product Title */}
            <h3 className="text-base sm:text-lg font-semibold text-gray-800">
              {product.title}
            </h3>
  
            {/* Product Description */}
            <p className="text-xs sm:text-sm text-gray-600 mt-1 block w-full overflow-hidden whitespace-nowrap overflow-ellipsis">
              {product.description}
            </p>
  
            {/* Product Price */}
            <p className="text-lg sm:text-xl font-semibold text-gray-900 mt-2">
              {formatter.format(product.price)}
            </p>
          </div>
        </Link>
  
        {/* Add to Cart Button remains in the container */}
        <div className="p-4">
          <button
            onClick={handleCartOpen}
            className="border border-black p-2 rounded-full text-gray-800 font-semibold hover:bg-gray-200 transition-colors duration-200 w-full text-center block text-sm sm:text-base"
          >
            Add to Cart
          </button>
        </div>
      </div>
    );
  
}
