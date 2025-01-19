import { Link } from "react-router-dom";

export default function ProductItem({ product }) {
  return (
    <Link>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl hover:[transform:scale(1.01)] transition">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h3 className="text-md font-semibold text-gray-800">
            {product.name}
          </h3>
          <p className="text-sm text-gray-600 mt-1">{product.description}</p>
          <p className="text-xl font-bold text-gray-900 mt-2">
            ${product.price}
          </p>
          <div className="mt-4">
            <Link
              to={`/products/${product.id}`}
              className="text-pink-500 hover:text-pink-400 font-semibold"
            >
              Add to Cart
            </Link>
          </div>
        </div>
      </div>
    </Link>
  );
}
