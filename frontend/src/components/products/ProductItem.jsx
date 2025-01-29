import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { modalActions } from "../store";

import { formatter } from "../store/priceFormatter";

export default function ProductItem({ product }) {

  const dispatch = useDispatch();
  function handleCartOpen() {
       dispatch(modalActions.toggle());
     }

  return (
    <div className="max-w-sm w-full">
    <Link to={`/products/${product.id}`}>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-transform duration-300 transform hover:scale-[1.01] flex flex-col h-full">
        {/* Product Image */}
        <img
          src={product.image_url}
          alt={product.title}
          className="w-full h-48 object-cover"
        />
  
        {/* Product Details */}
        <div className="p-4 flex flex-col justify-between flex-grow">
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
  
          {/* Add to Cart Button */}
          <div className="mt-4">
            <button
              onClick={handleCartOpen}
              className="border border-black p-2 rounded-full text-gray-800 font-semibold hover:bg-gray-200 transition-colors duration-200 w-full text-center block text-sm sm:text-base"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </Link>
  </div>
  );
}
