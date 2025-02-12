import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { addProduct } from "../util/https";
import { useMutation } from "@tanstack/react-query";
import { useActionState } from "react";

export default function NewProductPage() {

   /* for authorization */ 
  const role = localStorage.getItem("userRole");

  const navigate = useNavigate();

  useEffect(() => {
    if (role !== "admin") {
      navigate("/"); 
    }
  }, [role, navigate]); 


    // Set up the mutation using TanStack Query
    const { mutate, isPending, isError, error } = useMutation({
        mutationFn: addProduct,
        onSuccess: (data) => {
          // Optionally, you can display a success message or redirect after adding product
          navigate("/products"); // Navigate to a product list page or dashboard
        },

        onError: (err) => {
            console.error("Error adding product", err);
          }
      });
    
      // Action function to handle form submission & validation
      function newProductAction(prevState, formData) {
        const name = formData.get("name");
        const description = formData.get("description");
        const price = formData.get("price");
        const image = formData.get("image");
    
        let errors = [];
    
        if (!name.trim()) {
          errors.push("Please enter the product name.");
        }
        if (!description.trim()) {
          errors.push("Please enter the product description.");
        }
        if (!price.trim() || Number(price) <= 0) {
          errors.push("Please enter a valid price.");
        }
        if (!image.trim()) {
          errors.push("Please enter the image URL.");
        }
    
        // If there are errors, return them along with the entered values
        if (errors.length > 0) {
          return {
            errors,
            enteredValues: { name, description, price, image },
          };
        }
    
        // If validation passes, trigger the mutation
        console.log("Data to send:", { name, description, price, image });
        mutate({ name, description, price: Number(price), image });
    
        return { errors: null };
      }
    
      // useActionState to manage form state and errors (logic copied from SignupPage)
      const [formState, formAction] = useActionState(newProductAction, {
        errors: null,
      });
    


  return (
    <div className="p-6 flex flex-col items-center bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Add New Product
      </h2>

      <form action={formAction} className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl">
        {/* Product Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Product Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="Enter product name"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Category */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Description
          </label>
          <input
            type="text"
            name="description"
            placeholder="Enter description"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Price */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Price
          </label>
          <input
            type="number"
            name="price"
            placeholder="Enter price"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Image
          </label>
          <input
            type="text"
            name="image"
            placeholder="Enter URL"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
        >
          {isPending ? "Adding product" : "Add Product"}
        </button>
      </form>
    </div>
  );
}
