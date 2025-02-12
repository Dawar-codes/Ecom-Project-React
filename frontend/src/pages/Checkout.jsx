import { useDispatch, useSelector } from "react-redux";
import { formatter } from "../components/store/priceFormatter";
import { useActionState } from "react";
import { checkoutOrder } from "../util/https";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import {persistor} from '../components/store/index';
import { cartActions } from "../components/store/cart-slice";

export default function Checkout() {
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const dispatch = useDispatch();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: checkoutOrder,
    onSuccess: () => {
      persistor.purge();
      dispatch(cartActions.clearCart());
      navigate("/products")},
  });

  async function checkoutAction(prevState, formData) {
    const fullName = formData.get("fullName");
    const email = formData.get("email");
    const address = formData.get("address");
    const city = formData.get("city");
    const zip = formData.get("zip");

    let errors = [];

    // Basic validation
    if (!fullName.trim()) errors.push("Please provide your full name.");
    if (!email.trim() || !email.includes("@"))
      errors.push("Please enter a valid email address.");
    if (!address.trim()) errors.push("Please provide your address.");
    if (!city.trim()) errors.push("Please provide your city.");
    if (!zip.trim() || isNaN(Number(zip)))
      errors.push("Please enter a valid zip code.");

    if (errors.length > 0) {
      return {
        errors,
        enteredValues: { fullName, email, address, city, zip },
      };
    }

    const payload = {
      shippingInfo: { fullName, email, address, city, zip: Number(zip) },
      cartItems, // array from redux; each item should include product info & quantity
      totalPrice, 
    };

    mutate(payload);

    return { errors: null };
  }

  // useActionState returns the form state and a submit handler for our form.
  const [formState, formAction] = useActionState(checkoutAction, {
    errors: null,
  });

  return (
    <main className="container mx-auto my-12 px-4">
      <h1 className="text-3xl font-semibold text-gray-800 mb-8">Checkout</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Order Summary */}
        <div className="lg:w-1/3 bg-gray-100 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Order Summary
          </h2>
          {cartItems &&
            cartItems.map((item) => (
              <div
                key={item.product.id}
                className="flex justify-between items-center mb-4 p-2 border-b border-gray-300"
              >
                <div className="flex gap-4 items-center">
                  <p className="text-gray-700 font-medium">
                    {item.product.title}
                  </p>
                  <p className="text-gray-500 text-sm">x {item.quantity}</p>
                </div>
                <p className="font-semibold text-gray-900">
                  {formatter.format(item.product.price * item.quantity)}
                </p>
              </div>
            ))}
          <div className="flex justify-between font-semibold text-xl text-gray-800 mt-6 border-t pt-4">
            <p>Total</p>
            <p>{formatter.format(totalPrice)}</p>
          </div>
        </div>

        {/* Shipping Information Form */}
        <div className="lg:w-2/3 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Shipping Information
          </h2>
          <form action={formAction}>
            <div className="mb-4">
              <label htmlFor="fullName" className="block text-gray-600">
                Full Name
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                placeholder="John Doe"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-600">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="john.doe@example.com"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="address" className="block text-gray-600">
                Address
              </label>
              <input
                id="address"
                name="address"
                type="text"
                placeholder="123 Main St"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="city" className="block text-gray-600">
                City
              </label>
              <input
                id="city"
                name="city"
                type="text"
                placeholder="New York"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="zip" className="block text-gray-600">
                Zip Code
              </label>
              <input
                id="zip"
                name="zip"
                type="text"
                placeholder="10001"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex justify-between mt-6">
              <button
                type="submit"
                disabled={formState.loading}
                className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                {formState.loading ? "Placing Order..." : "Place Order"}
              </button>
            </div>
            {formState.errors &&
              formState.errors.map((error, idx) => (
                <p key={idx} className="mt-4 text-red-500">
                  {error}
                </p>
              ))}
          </form>
        </div>
      </div>
    </main>
  );
}
