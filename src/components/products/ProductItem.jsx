import { Link } from "react-router-dom";

export default function ProductItem({ product }) {
  return (
    <div className="max-w-sm">
      <Link to={`/products/${product.id}`}>
        <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-transform duration-300 transform hover:scale-[1.01] flex flex-col h-full">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover"
          />
          <div className="p-4 flex flex-col justify-between flex-grow">
            <h3 className="text-lg font-semibold text-gray-800">
              {product.name}
            </h3>
            <p className="text-sm text-gray-600 mt-1 block w-52 overflow-hidden whitespace-nowrap overflow-ellipsis">
              {product.description}
            </p>
            <p className="text-xl font-semibold text-gray-900 mt-2">
              ${product.price}
            </p>

            {/* Add to Cart button inside the product card container */}
            <div className="mt-4">
              <button className="border border-black p-2 rounded-full text-gray-800 font-semibold hover:bg-gray-200 transition-colors duration-200 w-full text-center block">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
