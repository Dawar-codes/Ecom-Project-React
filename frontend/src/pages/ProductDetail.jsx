import { useQuery } from "@tanstack/react-query";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { fetchProduct } from "../util/https";
import { formatter } from "../components/store/priceFormatter";
import { useDispatch } from "react-redux";
import { cartActions } from "../components/store/cart-slice";

export default function ProductDetailPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const param = useParams();

  const id = param.id;

  const { data, isPending, isError } = useQuery({
    queryKey: ["products", { id }],
    queryFn: ({ signal }) => fetchProduct({ id, signal }),
  });

  if (isPending) {
    return <h1>Loading data, Please wait...</h1>;
  }

  if (isError) {
    return (
      <h1 className="text-center mt-10 text-red-500">
        Error fetching data. Please refresh.
      </h1>
    );
  }

  function handleAddItemToCart() {
    dispatch(cartActions.addToCart(data))
  }

  function handleBuyNow() {
    dispatch(cartActions.addToCart(data));
    navigate("/checkout");
  }

  return (
    <div>
      <main className="flex justify-center my-12">
        <div className="w-full max-w-5xl px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Product Image */}
            <div className="flex-1">
              <img
                src={data.image_url}
                alt={data.title}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>

            {/* Product Information */}
            <div className="flex-1">
              <h1 className="text-3xl font-semibold text-gray-800 mb-4">
                {data.title}
              </h1>
              <p className="text-gray-600 mb-4">
           {data.description}
              </p>
              <p className="text-xl font-semibold text-gray-900 mb-4">{formatter.format(data.price)}</p>

              <div className="flex gap-4 mb-6">
                <button onClick={handleAddItemToCart} className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 transition">
                  Add to Cart
                </button>
                <button onClick={handleBuyNow} className="border-2 border-gray-300 py-2 px-6 rounded hover:bg-gray-200 transition">
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
