export default function Checkout() {
  return (
    <main className="container mx-auto my-12 px-4">
      <h1 className="text-3xl font-semibold text-gray-800 mb-8">Checkout</h1>

      {/* Main Checkout Flex Container */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Order Summary */}
        <div className="lg:w-1/3 bg-gray-100 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Order Summary
          </h2>

          {/* Cart Item 2 */}
          <div className="flex justify-between mb-4">
            <p className="text-gray-600">Product 2</p>
            <p className="font-semibold text-gray-800">$30.00</p>
          </div>

          {/* Total */}
          <div className="flex justify-between font-semibold text-xl text-gray-800 mt-6 border-t pt-4">
            <p>Total</p>
            <p>$110.00</p>
          </div>
        </div>

        {/* Form Inputs */}
        <div className="lg:w-2/3 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Shipping Information
          </h2>

          {/* Shipping Form */}
          <form>
            <div className="mb-4">
              <label htmlFor="fullName" className="block text-gray-600">
                Full Name
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                placeholder="John Doe"
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex justify-between mt-6">
              <button
                type="submit"
                className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Place Order
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
