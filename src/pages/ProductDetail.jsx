export default function ProductDetailPage() {
    return (
        <div>
         
    
          <main className="flex justify-center my-12">
            <div className="w-full max-w-5xl px-4">
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Product Image */}
                <div className="flex-1">
                  <img
                    src="path/to/product-image.jpg"
                    alt="Product"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
    
                {/* Product Information */}
                <div className="flex-1">
                  <h1 className="text-3xl font-semibold text-gray-800 mb-4">
                    Product Name
                  </h1>
                  <p className="text-gray-600 mb-4">
                    A brief description of the product goes here. Explain the features and benefits to help the customer.
                  </p>
                  <p className="text-xl font-semibold text-gray-900 mb-4">
                    $99.99
                  </p>
    
                  <div className="flex gap-4 mb-6">
                    <button className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 transition">
                      Add to Cart
                    </button>
                    <button className="border-2 border-gray-300 py-2 px-6 rounded hover:bg-gray-200 transition">
                      Buy Now
                    </button>
                  </div>
    
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      Product Details
                    </h3>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Feature 1</li>
                      <li>Feature 2</li>
                      <li>Feature 3</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </main>
    
          
        </div>
      );
    
}